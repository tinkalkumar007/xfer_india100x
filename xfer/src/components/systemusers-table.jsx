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
import { DataTablePagination } from '@/components/DataTablePagination'
import {
  ArrowUpDown,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  MoreHorizontal,
  Check,
  CirclePlus,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  CircleX,
  FileDown,
} from 'lucide-react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

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
import { status, team, role } from '@/data/system-users-data'

import { Badge } from '@/components/ui/badge'
import DataTableViewOptions from './DataTableViewOptions'
import DataTableToolbar from './DataTableToolbar'

const data = [
  {
    product_id: '1',
    user_id: 'U001',
    name: 'Alice Johnson',
    role: 'Manager',
    created_at: '01-01-2024',
    team: 'XFER',
    status: 'Active',
  },
  {
    product_id: '2',
    user_id: 'U002',
    name: 'Bob Smith',
    role: 'User',
    created_at: '02-02-2024',
    team: 'Privacy Card',
    status: 'Active',
  },
  {
    product_id: '3',
    user_id: 'U003',
    name: 'Charlie Brown',
    role: 'Manager',
    created_at: '03-03-2024',
    team: 'XFER',
    status: 'Blocked',
  },
  {
    product_id: '4',
    user_id: 'U004',
    name: 'David Wilson',
    role: 'User',
    created_at: '04-04-2024',
    team: 'XFER',
    status: 'Suspended',
  },
  {
    product_id: '5',
    user_id: 'U005',
    name: 'Emily Davis',
    role: 'User',
    created_at: '05-05-2024',
    team: 'Privacy Card',
    status: 'Active',
  },
  {
    product_id: '6',
    user_id: 'U006',
    name: 'Frank Wilson',
    role: 'Manager',
    created_at: '06-06-2024',
    team: 'ONO',
    status: 'Blocked',
  },
]

export function SystemUsersTable() {
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
    // {
    //   accessorKey: 'user_id',
    //   header: 'User ID',
    //   cell: ({ row }) => (
    //     <div className="capitalize">{row.getValue('user_id')}</div>
    //   ),
    // },
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
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => (
        <div className="capitalize cursor-pointer hover:underline">
          {row.getValue('name')}
        </div>
      ),
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row }) => (
        <div className="capitalize pl-4">{row.getValue('role')}</div>
      ),
    },
    {
      accessorKey: 'team',
      header: 'Team',
      cell: ({ row }) => (
        <div className="capitalize pl-4">{row.getValue('team')}</div>
      ),
    },

    {
      accessorKey: 'created_at',
      header: 'Created On',
      cell: ({ row }) => (
        <div className="lowercase pl-4">{row.getValue('created_at')}</div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.original.status
        switch (status) {
          case 'Active':
            return <Badge className="bg-[#e4f5e9] text-[#16794c]">Active</Badge>
          case 'Blocked':
            return (
              <Badge className="bg-[#fff0f0] text-[#b52a2a]">Blocked</Badge>
            )
          case 'Suspended':
            return (
              <Badge className="bg-[#FFF1E7] text-[#BD3E0C]">Suspended</Badge>
            )
        }
      },
    },
    {
      accessorKey: 'actions',
      header: '',
      cell: ({ row }) => {
        const status = row.original.status
        console.log(status)
        switch (status) {
          case 'Active':
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
                    onClick={() => {}}
                  >
                    Suspend
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => {}}
                  >
                    Block
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )
          case 'Blocked':
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
                    onClick={() => {}}
                  >
                    Activate
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => {}}
                  >
                    Suspend
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )
          case 'Suspended':
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
                    onClick={() => {}}
                  >
                    Activate
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => {}}
                  >
                    Block
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )
        }
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Users</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <div className="w-full flex gap-2 justify-between max-md:flex-col max-md:gap-2 max-md:items-start max-md:w-[70%]">
            <div className="w-full">
              <DataTableToolbar
                table={table}
                inputFilter="card_ref_id"
                status={status}
                team={team}
                role={role}
              />
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
