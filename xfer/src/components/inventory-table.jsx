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

const fieldIconMap = {
  approved: {
    icon: <Badge className="bg-[#e4f5e9] text-[#16794c]">Approved</Badge>,
    label: 'Approved',
  },
  rejected: {
    icon: <Badge className="bg-[#fff0f0] text-[#b52a2a]">Rejected</Badge>,
    label: 'Rejected',
  },

  progress: {
    icon: <Badge className="bg-[#F5FBFC] text-[#267A94]">Progress</Badge>,
    label: 'Progress',
  },
}
const data = [
  {
    product_id: 1,
    product_name: 'Smartphone',
    product_category: 'Example',
    card_nature: 'virtual',
    ordered_cards: 10,
    status: 'approved',
    approved: true,
    created_date: '12-01-2024',
  },
  {
    product_id: 2,
    product_name: 'Tablet',
    product_category: 'Example',
    card_nature: 'physical',
    ordered_cards: 5,
    status: 'progress',
    progress: true,
    created_date: '11-05-2023',
  },
  {
    product_id: 3,
    product_name: 'Headphones',
    product_category: 'Example',
    card_nature: 'physical',
    ordered_cards: 2,
    status: 'rejected',
    rejected: true,
    created_date: '10-03-2012',
  },
  {
    product_id: 4,
    product_name: 'Smartwatch',
    product_category: 'Example',
    card_nature: 'physical',
    ordered_cards: 3,
    status: 'progress',
    progress: true,
    created_date: '09-10-2023',
  },
  {
    product_id: 5,
    product_name: 'Keyboard',
    product_category: 'Example',
    card_nature: 'physical',
    ordered_cards: 1,
    status: 'approved',
    approved: true,
    created_date: '08-03-2023',
  },
  {
    product_id: 6,
    product_name: 'Mouse',
    product_category: 'Example',
    card_nature: 'physical',
    ordered_cards: 4,
    status: 'approved',
    approved: true,
    created_date: '07-05-2022',
  },
  {
    product_id: 7,
    product_name: 'Monitor',
    product_category: 'Example',
    card_nature: 'physical',
    ordered_cards: 2,
    status: 'rejected',
    rejected: true,
    created_date: '06-03-2021',
  },
  {
    product_id: 8,
    product_name: 'Mousepad',
    product_category: 'Example',
    card_nature: 'physical',
    ordered_cards: 1,
    status: 'progress',
    progress: true,
    created_date: '05-05-2005',
  },
  {
    product_id: 9,
    product_name: 'Mousepad',
    product_category: 'Example',
    card_nature: 'physical',
    ordered_cards: 1,
    status: 'progress',
    progress: true,
    created_date: '04-03-2024',
  },
  {
    product_id: 10,
    product_name: 'Mousepad',
    product_category: 'Example',
    card_nature: 'physical',
    ordered_cards: 1,
    status: 'progress',
    progress: true,
    created_date: '03-05-2023',
  },
]

export function InventoryTable() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})

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
      accessorKey: 'product_name',
      header: 'Product Name',
      cell: ({ row }) => {
        const id = row.original.product_id
        return (
          <Link to={`/inventory/order-details/${id}`}>
            <div className="capitalize text-center cursor-pointer hover:underline">
              {row.getValue('product_name')}
            </div>
          </Link>
        )
      },
    },
    {
      accessorKey: 'product_category',
      header: 'Product Category',
      cell: ({ row }) => (
        <div className="capitalize text-center">
          {row.getValue('product_category')}
        </div>
      ),
    },
    {
      accessorKey: 'card_nature',
      header: 'Card Nature',
      cell: ({ row }) => (
        <div className="capitalize text-center">
          {row.getValue('card_nature')}
        </div>
      ),
    },
    {
      accessorKey: 'ordered_cards',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Ordered Cards
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('ordered_cards')}</div>
      ),
    },

    {
      accessorKey: 'created_date',
      header: 'Created Date',
      cell: ({ row }) => (
        <div className="lowercase text-center">
          {row.getValue('created_date')}
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-2">
          {Object.keys(fieldIconMap).map((field) => {
            if (row.original[field]) {
              return (
                <span
                  key={field}
                  className="flex items-center gap-1"
                  title={fieldIconMap[field].label}
                >
                  {fieldIconMap[field].icon}
                </span>
              )
            }
            return null
          })}
        </div>
      ),
    },
    {
      accessorKey: 'actions',
      header: '',
      cell: ({ row }) => {
        const rowData = row.original // Get the entire row's data for actions
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Approve
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Reject
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const table = useReactTable({
    data,
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

  const openDialog = (rowData) => {
    setIsDialogOpen(true)
  }

  const closeDialog = () => {
    setIsDialogOpen(false)
    // Clear any row data when canceled
  }
  const downloadCSV = () => {
    // Convert table data to CSV
    const csv = Papa.unparse(data)
    // Create a Blob object for the CSV
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    // Use FileSaver to trigger a download
    saveAs(blob, 'table-data.csv')
  }

  const isFiltered = table.getState().columnFilters.length > 0
  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <div className="w-full flex gap-2 justify-between max-md:flex-col max-md:gap-2 max-md:items-start max-md:w-[70%]">
            <div className="w-full">
              <DataTableToolbar
                table={table}
                inputFilter="product_name"
                status={status}
                card_nature={card_nature}
              />
            </div>
            <div className="flex gap-2 items-center">
              <Button variant="outline" className="h-8" onClick={downloadCSV}>
                <FileDown />
              </Button>

              <DataTableViewOptions table={table} />
              <CreateOrder />
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
