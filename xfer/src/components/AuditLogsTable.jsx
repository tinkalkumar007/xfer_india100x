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
import {
  ArrowUpDown,
  SquarePen,
  Trash2Icon,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  CirclePlus,
  MoreHorizontal,
  Pencil,
  Trash2,
  CircleX,
  Trash,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
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
import { z } from 'zod'

import { Badge } from '@/components/ui/badge'

const data = [
  {
    id: 1,
    method: 'GET',
    status: 'success', // updated to lowercase
    IP: '192.168.1.1',
    event: 'Program manager accessed user details',
  },
  {
    id: 2,
    status: 'error',
    method: 'POST',
    IP: '192.168.1.2',
    event: 'Login attempt by program manager failed',
  },
  {
    id: 3,
    status: 'success', // corrected casing
    method: 'GET',
    IP: '192.168.1.3',
    event: 'Program manager viewed orders',
  },
  {
    id: 4,
    status: 'success',
    method: 'PUT',
    IP: '192.168.1.4',
    event: 'Program manager updated profile',
  },
  {
    id: 5,
    status: 'error',
    method: 'DELETE',
    IP: '192.168.1.5',
    event: 'Failed to delete program manager account',
  },
  {
    id: 6,
    status: 'success',
    method: 'POST',
    IP: '192.168.1.6',
    event: 'Program manager registered successfully',
  },
  {
    id: 7,
    status: 'success',
    method: 'GET',
    IP: '192.168.1.7',
    event: 'Program manager browsed products',
  },
  {
    id: 8,
    status: 'error',
    method: 'PUT',
    IP: '192.168.1.8',
    event: 'Failed to update program manager details',
  },
  {
    id: 9,
    status: 'success',
    method: 'POST',
    IP: '192.168.1.9',
    event: 'Program manager completed checkout',
  },
  {
    id: 10,
    status: 'success',
    method: 'GET',
    IP: '192.168.1.10',
    event: 'Program manager accessed dashboard',
  },
  {
    id: 11,
    status: 'error',
    method: 'POST',
    IP: '192.168.1.11',
    event: 'Payment process by program manager failed',
  },
  {
    id: 12,
    status: 'success',
    method: 'DELETE',
    IP: '192.168.1.12',
    event: 'Program manager removed item from cart',
  },
  {
    id: 13,
    status: 'success',
    method: 'GET',
    IP: '192.168.1.13',
    event: 'Program manager checked notifications',
  },
  {
    id: 14,
    status: 'error',
    method: 'POST',
    IP: '192.168.1.14',
    event: 'Password reset attempt by program manager failed',
  },
  {
    id: 15,
    status: 'success',
    method: 'PUT',
    IP: '192.168.1.15',
    event: 'Program manager updated settings',
  },
  {
    id: 16,
    status: 'success',
    method: 'GET',
    IP: '192.168.1.16',
    event: 'Program manager accessed reports',
  },
  {
    id: 17,
    status: 'error',
    method: 'DELETE',
    IP: '192.168.1.17',
    event: 'Failed to delete program manager account (ID: 456)',
  },
  {
    id: 18,
    status: 'success',
    method: 'POST',
    IP: '192.168.1.18',
    event: 'Program manager subscribed to service',
  },
  {
    id: 19,
    status: 'error',
    method: 'PUT',
    IP: '192.168.1.19',
    event: 'Failed to update product by program manager (ID: 789)',
  },
  {
    id: 20,
    status: 'success',
    method: 'GET',
    IP: '192.168.1.20',
    event: 'Program manager submitted feedback',
  },
]

export function AuditLogsTable() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})

  const columns = [
    // {
    //   id: 'select',
    //   header: ({ table }) => (
    //     <Checkbox
    //       checked={
    //         table.getIsAllPageRowsSelected() ||
    //         (table.getIsSomePageRowsSelected() && 'indeterminate')
    //       }
    //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //       aria-label="Select all"
    //     />
    //   ),
    //   cell: ({ row }) => (
    //     <Checkbox
    //       checked={row.getIsSelected()}
    //       onCheckedChange={(value) => row.toggleSelected(!!value)}
    //       aria-label="Select row"
    //     />
    //   ),
    //   enableSorting: false,
    //   enableHiding: false,
    // },

    {
      accessorKey: 'method',
      header: 'Method',
      cell: ({ row }) => (
        <div className="capitalize text-center">{row.getValue('method')}</div>
      ),
    },
    {
      accessorKey: 'event',
      header: 'Event',
      cell: ({ row }) => (
        <div className="capitalize text-center">{row.getValue('event')}</div>
      ),
    },

    {
      accessorKey: 'IP',
      header: () => {
        return <div>IP Address</div>
      },
      cell: ({ row }) => (
        <div className="capitalize text-center">{row.getValue('IP')}</div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status')
        return status === 'success' ? (
          <Badge className="bg-[#e4f5e9] text-[#16794c]">Success</Badge>
        ) : (
          <Badge className="bg-[#fff0f0] text-[#b52a2a]">Error</Badge>
        )
      },
    },
    // {
    //   accessorKey: '',
    //   header: 'Actions',
    //   cell: ({ row }) => {
    //     const rowData = row.original // Get the entire row's data for actions
    //     return (
    //       <div className="flex items-center justify-center gap-2">
    //         <Button variant="outline" className="rounded-[50%]">
    //           <SquarePen />
    //         </Button>
    //         <Button variant="outline" className="rounded-[50%]">
    //           <Trash2Icon />
    //         </Button>
    //       </div>
    //       // <DropdownMenu>
    //       //   <DropdownMenuTrigger asChild>
    //       //     <Button variant="ghost" className="h-8 w-8 p-0">
    //       //       <span className="sr-only">Open menu</span>
    //       //       <MoreHorizontal />
    //       //     </Button>
    //       //   </DropdownMenuTrigger>
    //       //   <DropdownMenuContent align="end">
    //       //     <DropdownMenuItem
    //       //       className="cursor-pointer"
    //       //       onClick={() => navigator.clipboard.writeText(payment.id)}
    //       //     >
    //       //       Approve
    //       //     </DropdownMenuItem>
    //       //     <DropdownMenuItem
    //       //       className="cursor-pointer"
    //       //       onClick={() => navigator.clipboard.writeText(payment.id)}
    //       //     >
    //       //       Reject
    //       //     </DropdownMenuItem>
    //       //   </DropdownMenuContent>
    //       // </DropdownMenu>
    //     )
    //   },
    // },
    // {
    //   id: 'actions',
    //   enableHiding: false,
    //   cell: ({ row }) => {
    //     const payment = row.original;

    //     return (
    //       <DropdownMenu>
    //         <DropdownMenuTrigger asChild>
    //           <Button variant="ghost" className="h-8 w-8 p-0">
    //             <span className="sr-only">Open menu</span>
    //             <MoreHorizontal />
    //           </Button>
    //         </DropdownMenuTrigger>
    //         <DropdownMenuContent align="end">
    //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //           <DropdownMenuItem
    //             onClick={() => navigator.clipboard.writeText(payment.id)}
    //           >
    //             Copy payment ID
    //           </DropdownMenuItem>
    //           <DropdownMenuSeparator />
    //           <DropdownMenuItem>View customer</DropdownMenuItem>
    //           <DropdownMenuItem>View payment details</DropdownMenuItem>
    //         </DropdownMenuContent>
    //       </DropdownMenu>
    //     );
    //   },
    // },
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

  return (
    <Card>
      <CardContent>
        <div className="w-full">
          <div className="flex items-center py-4 justify-between ">
            <Input
              placeholder="Search by Name..."
              value={table.getColumn('product_name')?.getFilterValue() ?? ''}
              onChange={(event) =>
                table
                  .getColumn('product_name')
                  ?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    View <ChevronDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) =>
                            column.toggleVisibility(!!value)
                          }
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      )
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
              {/* <Link to="/inventory/create-inventory">
                <Button variant="" className="ml-auto">
                  {' '}
                  <CirclePlus /> Add new
                </Button>
              </Link> */}
            </div>
          </div>
          <div className="rounded-md border">
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
          <div className="flex items-center justify-between px-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{' '}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="flex items-center space-x-6 lg:space-x-8">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium">Rows per page</p>
                <Select
                  value={`${table.getState().pagination.pageSize}`}
                  onValueChange={(value) => {
                    table.setPageSize(Number(value))
                  }}
                >
                  <SelectTrigger className="h-8 w-[70px]">
                    <SelectValue
                      placeholder={table.getState().pagination.pageSize}
                    />
                  </SelectTrigger>
                  <SelectContent side="top">
                    {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                      <SelectItem key={pageSize} value={`${pageSize}`}>
                        {pageSize}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                Page {table.getState().pagination.pageIndex + 1} of{' '}
                {table.getPageCount()}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  className="hidden h-8 w-8 p-0 lg:flex"
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span className="sr-only">Go to first page</span>
                  <ChevronsLeft />
                </Button>
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span className="sr-only">Go to previous page</span>
                  <ChevronLeft />
                </Button>
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <span className="sr-only">Go to next page</span>
                  <ChevronRight />
                </Button>
                <Button
                  variant="outline"
                  className="hidden h-8 w-8 p-0 lg:flex"
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                >
                  <span className="sr-only">Go to last page</span>
                  <ChevronsRight />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
