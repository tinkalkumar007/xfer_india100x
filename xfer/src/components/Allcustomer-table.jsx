import * as React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import axios from '@/api/axios'
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
import { Badge } from '@/components/ui/badge'
import {
  ArrowUpDown,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  CirclePlus,
  MoreHorizontal,
  Check,
  Pencil,
  Trash2,
  CircleX,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  FileDown,
} from 'lucide-react'
import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogDescription,
} from '@/components/ui/alert-dialog'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { saveAs } from 'file-saver'
import * as Papa from 'papaparse'
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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import DataTableViewOptions from './DataTableViewOptions'
import DataTableToolbar from './DataTableToolbar'
import { ProgramManager } from '../data/all-customer-data'
import { DataTablePagination } from '@/components/DataTablePagination'
import ProgramManagerDetails from '../pages/ProgramManagerDetails/ProgramManagerDetails'
import {
  useFrappeAuth,
  useFrappeGetDocCount,
  useFrappeGetDocList,
} from 'frappe-react-sdk'
import { useToast } from '@/hooks/use-toast'
import Empty from './Empty'
import { filter } from 'lodash'
import { DatePickerWithRange } from './ui/daterange-picker'

export function AllCustomerTable() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})
  const { toast } = useToast()
  const [searchParams, setSearchParams] = useSearchParams()
  const page = parseInt(searchParams.get('page') || '0')
  const limit = parseInt(searchParams.get('limit') || '1')
  const customerStatus = searchParams.get('status') || ''

  const filters = React.useMemo(() => {
    return Array.from(searchParams.entries())
      .map(([key, value]) => {
        if (key === 'query') {
          return ['full_name', 'like', `%${value}%`]
        }
        if (key === 'start') {
          return ['creation', '>=', value]
        }
        if (key === 'end') {
          return ['creation', '<=', value]
        }
        if (!(key === 'page') && !(key === 'limit')) {
          return [key, '=', value]
        }
      })
      .filter((item) => item !== undefined)
  }, [searchParams])

  console.log('Filters: ', filters)

  const { currentUser } = useFrappeAuth()

  const { data, isLoading } = useFrappeGetDocList('Customers', {
    fields: ['name'],
  })

  const { data: customersData, isLoading: customersDataLoading } =
    useFrappeGetDocList('Customers', {
      fields: ['*'],
      filters: [
        ['owner', '=', currentUser],
        ...(searchParams.size > 0 ? [...filters] : []),
      ],
      limit_start: page * limit,
      limit: limit,
    })

  const { data: customerStatuses, isLoading: customerStatusesLoading } =
    useFrappeGetDocList('Customer Status', {
      fields: ['name'],
    })

  const { data: totalCount, isLoading: totalCountLoading } =
    useFrappeGetDocCount('Customers', searchParams.size > 0 && filters)

  if (!customersDataLoading) {
    console.log(customersData)
  }

  const tableData = React.useMemo(() => {
    if (!customersData) return []
    return customersData.map((customer) => ({
      id: customer.name,
      first_name: customer.first_name,
      last_name: customer.last_name,
      customer_name: `${customer.first_name} ${customer.last_name}`,
      last_active: customer.modified,
      status: customer.status,
    }))
  }, [customersData])

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
      accessorKey: 'id',
      header: 'Customer ID',
      cell: ({ row }) => {
        const id = row.original.id
        return (
          <Link to={`/customers/${id}`}>
            <div className="capitalize text-center hover:underline">
              {row.original?.id}
            </div>
          </Link>
        )
      },
    },

    {
      accessorKey: 'customer_name',
      header: 'Name',
      cell: ({ row }) => (
        <div className="capitalize text-center">
          {row.original.first_name} {row.original.last_name}
        </div>
      ),
    },

    {
      accessorKey: 'total_cards',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Total Cards
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="text-center">
          {row.original.total_cards ? row.original.total_cards : '-'}
        </div>
      ),
    },
    {
      accessorKey: 'total_transactions',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Total Transactions
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="text-center">
          {row.original.total_transactions
            ? row.original.total_transactions
            : '-'}
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',

      cell: ({ row }) => {
        const status = row.original?.status
        switch (status) {
          case 'Active':
            return <Badge variant="outline">{status}</Badge>
          case 'Inactive':
            return <Badge variant="outline">{status}</Badge>
          case 'Blocked':
            return <Badge variant="outline">{status}</Badge>
          default:
            return <Badge variant="primary">{status}</Badge>
        }
      },
    },
    {
      accessorKey: 'last_active',
      header: 'Last Active',
      cell: ({ row }) => {
        const dateTime = row.original?.last_active?.split('.')[0]
        console.log(dateTime)
        const date = dateTime?.split(' ')[0].split('-').reverse().join('-')

        const time = dateTime.split(' ')[1]

        return (
          <div className="flex flex-col items-center text-center">
            <span>{date}</span>
            <span>{time}</span>
          </div>
        )
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
        heading="No Customers Found."
        subHeading="No Customers Found."
        buttonText="Contact Us"
      />
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>ALL CUSTOMERS LIST</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <div className="w-full flex gap-2 justify-between max-md:flex-col max-md:gap-2 max-md:items-start max-md:w-[70%]">
            <div className="w-full flex items-center gap-4">
              <div className="w-[25%]">
                <DataTableToolbar />
              </div>
              <div className="flex items-center gap-4">
                <Select
                  value={customerStatus ? customerStatus : 'All Statuses'}
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
                      {customerStatusesLoading ? (
                        <SelectItem value="Loading" disabled></SelectItem>
                      ) : (
                        customerStatuses?.map((status) => (
                          <SelectItem key={status.name} value={status.name}>
                            {status.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <div className="flex gap-2 items-center">
                  <DatePickerWithRange />
                </div>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <Button variant="outline" className="h-8" onClick={downloadCSV}>
                <FileDown />
              </Button>

              <DataTableViewOptions table={table} />
            </div>
          </div>
          <div className="rounded-md border mt-3">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead className="text-center" key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {customersDataLoading ? (
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
