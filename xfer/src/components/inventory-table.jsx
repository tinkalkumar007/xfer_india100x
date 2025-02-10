import * as React from 'react'
import { Link } from 'react-router-dom'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import DataTableFacetedFilter from '@/components/DataTableFacetedFilter'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import DataTableViewOptions from '@/components/DataTableViewOptions'

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
  FileDown,
  ChevronLeft,
  ChevronsLeft,
  ChevronRight,
  ChevronsRight,
  X,
  Plus,
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
import { status, card_nature } from '../data/inventory-data'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { DataTablePagination } from '@/components/DataTablePagination'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { saveAs } from 'file-saver'
import * as Papa from 'papaparse'
import { Input } from '@/components/ui/input'
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
import { useFrappeGetDocList } from 'frappe-react-sdk'
import { useToast } from '@/hooks/use-toast'
import Empty from './Empty'

export function InventoryTable() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})
  const { toast } = useToast()

  const {
    data: inventoryData,
    isLoading: inventoryDataLoading,
    mutate: inventoryRefetch,
  } = useFrappeGetDocList('Inventory', {
    fields: ['*'],
  })

  if (!inventoryDataLoading) console.log('Inventory Data:', inventoryData)

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
        return (
          <div className="capitalize text-center cursor-pointer">
            &#8377; {row.original?.amount}
          </div>
        )
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
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 5, // Set page size to 5
      },
    },
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

  if (!inventoryDataLoading && inventoryData.length === 0) {
    return (
      <Empty
        heading="No Orders Found."
        subHeading="You have no order history."
        buttonText="Create Order"
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
          <div className="w-full flex gap-2 justify-between max-md:flex-col max-md:gap-2 max-md:items-start max-md:w-[70%]">
            <div className="w-full">
              <DataTableToolbar
                table={table}
                inputFilter="order_id"
                // status={status}
                // card_nature={card_nature}
              />
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
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell className="text-center" key={cell.id}>
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
