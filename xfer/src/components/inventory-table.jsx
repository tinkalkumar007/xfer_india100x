import * as React from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import DataTableViewOptions from '@/components/DataTableViewOptions'

import { FileDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DataTablePagination } from '@/components/DataTablePagination'

import { saveAs } from 'file-saver'
import * as Papa from 'papaparse'

import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import DataTableToolbar from './DataTableToolbar'
import CreateOrder from '../pages/CreateOrder/CreateOrder'
import {
  useFrappeGetDocCount,
  useFrappeGetDocList,
  useSearch,
} from 'frappe-react-sdk'
import { useToast } from '@/hooks/use-toast'
import Empty from './Empty'
import { DateTimePicker } from './ui/datetime-picker'
import DatePickerAndTimeInput from './DatePickerAndTimeInput'

export function InventoryTable() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [date, setDate] = React.useState(undefined)
  const [time, setTime] = React.useState(undefined)
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [selectedFilter, setSelectedFilter] = React.useState('Today')
  const { toast } = useToast()
  const [searchParams, setSearchParams] = useSearchParams()
  const page = parseInt(searchParams.get('page') || '0')
  const limit = parseInt(searchParams.get('limit') || '1')
  const orderStatus = searchParams.get('status') || ''

  const filters = Array.from(searchParams.entries())
    .map(([key, value]) => {
      if (key === 'query') {
        return ['name', 'like', `%${value}%`]
      }
      if (!(key === 'page') && !(key === 'limit')) {
        return [key, '=', value]
      }
    })
    .filter((item) => item !== undefined)

  const { data, isLoading } = useFrappeGetDocList('Inventory', {
    fields: ['name'],
  })

  const {
    data: inventoryData,
    isLoading: inventoryDataLoading,
    mutate: inventoryRefetch,
  } = useFrappeGetDocList('Inventory', {
    fields: ['name', 'creation', 'total_amount', 'status'],
    filters: searchParams.size > 0 && filters,
    limit_start: page * limit,
    limit: limit,
  })

  const { data: orderStatuses, isLoading: orderStatusesLoading } =
    useFrappeGetDocList('Order Status', {
      fields: ['name'],
    })

  if (!inventoryDataLoading) console.log('Inventory Data:', inventoryData)

  const { data: totalCount, isLoading: totalCountLoading } =
    useFrappeGetDocCount('Inventory', searchParams.size > 0 && filters)

  console.log('Count: ', totalCount)

  const tableData = React.useMemo(() => {
    if (!inventoryData) return []
    return inventoryData?.map((order) => ({
      id: order.name,
      order_id: order.name,
      status: order.status,
      amount: order.amount,
      date: order.creation,
    }))
  }, [inventoryData])

  const columns = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'order_id',
      header: 'Order ID',
      cell: ({ row }) => {
        const id = row.original.order_id
        return (
          <Link to={`/inventory/${id}`}>
            <div className="capitalize text-center cursor-pointer hover:underline">
              #{row.original?.order_id}
            </div>
          </Link>
        )
      },
    },
    {
      accessorKey: 'amount',
      header: 'Order Amount',
      cell: ({ row }) => {
        const amount = row.original?.amount
        {
          return amount ? (
            <div className="capitalize text-center cursor-pointer">
              &#8377;{amount}
            </div>
          ) : (
            <div className="capitalize text-center cursor-pointer">-</div>
          )
        }
      },
    },
    {
      accessorKey: 'date',
      header: 'Order Date',
      cell: ({ row }) => (
        <div className="capitalize text-center">
          {row.original?.date
            ?.split('.')[0]
            .split(' ')[0]
            .split('-')
            .reverse()
            .join('-')}
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.original?.status
        if (!status) return <div>-</div>
        switch (status) {
          default:
            return <Badge variant="primary">{status}</Badge>
        }
      },
    },
  ]

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination: {
        pageIndex: page,
        pageSize: limit,
      },
    },
    enableRowSelection: true,
    manualPagination: true,
    pageCount: Math.ceil(((!totalCountLoading && totalCount) || 0) / limit),
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  const downloadCSV = () => {
    if (!tableData || tableData.length === 0) {
      toast({
        title: 'No data available to download',
      })
      return
    }
    // Convert table data to CSV
    const csv = Papa.unparse(tableData)
    // Create a Blob object for the CSV
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    // Use FileSaver to trigger a download
    saveAs(blob, 'table-data.csv')
  }

  if (!isLoading && data?.length === 0) {
    return (
      <Empty
        heading="No Orders Found."
        subHeading="You have no order history."
        buttonText="Create Order"
        inventoryRefetch={inventoryRefetch}
      />
    )
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>INVENTORY</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <div className="w-full flex gap-2 justify-between items-center max-md:flex-col max-md:gap-2 max-md:items-start max-md:w-[70%]">
            <div className="w-full flex gap-4">
              <div className="w-[25%]">
                <DataTableToolbar />
              </div>

              <div className="flex items-center gap-2">
                <Select
                  value={orderStatus ? orderStatus : 'All Statuses'}
                  onValueChange={(value) => {
                    setSearchParams((prev) => {
                      const newParams = new URLSearchParams(prev) // ✅ Clone previous params

                      if (value === 'All Statuses') {
                        newParams.delete('status')
                      } else {
                        newParams.set('status', value)
                        newParams.set('page', 0)
                      }
                      return newParams // ✅ Return a new object
                    })
                  }}
                >
                  <SelectTrigger className="w-[180px] h-8">
                    <SelectValue placeholder="Select the status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem value="All Statuses">All Statuses</SelectItem>
                      {orderStatusesLoading ? (
                        <SelectItem value="Loading" disabled></SelectItem>
                      ) : (
                        orderStatuses?.map((status) => (
                          <SelectItem key={status.name} value={status.name}>
                            {status.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <Button variant="outline" className="h-8" onClick={downloadCSV}>
                <FileDown />
              </Button>

              <DataTableViewOptions table={table} />
              <CreateOrder inventoryRefetch={inventoryRefetch} />
            </div>
          </div>
          <div className="rounded-md border mt-3">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead className="text-center" key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {inventoryDataLoading ? (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      <div className="w-full h-full flex justify-center items-center">
                        <div className="spinner w-14 h-14 rounded-full border-4 border-gray-200 border-r-blue-500 animate-spin"></div>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="text-center">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <DataTablePagination table={table} />
        </div>
      </CardContent>
    </Card>
  )
}
