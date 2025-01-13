import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'

const data = [
  {
    product_id: '1',
    team_member: 'Alice Johnson',
    date: '01-12-2024',
    event: 'Product Launch',
    team: 'Marketing',
    product: 'EduPal App',
    ip_address: '192.168.1.1',
  },
  {
    product_id: '2',
    team_member: 'Bob Smith',
    date: '02-12-2024',
    event: 'Client Meeting',
    team: 'Sales',
    product: 'Golzo Platform',
    ip_address: '192.168.1.2',
  },
  {
    product_id: '3',
    team_member: 'Charlie Brown',
    date: '03-12-2024',
    event: 'Bug Fix',
    team: 'Development',
    product: 'Call Recorder App',
    ip_address: '192.168.1.3',
  },
]

const ManagerActivityLogs = () => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})

  const columns = [
    {
      accessorKey: 'team_member',
      header: 'Team Member',
      cell: ({ row }) => (
        <div className="capitalize cursor-pointer hover:underline text-center">
          {row.getValue('team_member')}
        </div>
      ),
    },

    {
      accessorKey: 'event',
      header: 'Event',
      cell: ({ row }) => (
        <div className="capitalize pl-4 text-center">
          {row.getValue('event')}
        </div>
      ),
    },

    {
      accessorKey: 'ip_address',
      header: 'IP Address',
      cell: ({ row }) => (
        <div className="lowercase text-center">
          {row.getValue('ip_address')}
        </div>
      ),
    },
    {
      accessorKey: 'date',
      header: 'Date',
      cell: ({ row }) => (
        <div className="lowercase pl-4 text-center">{row.getValue('date')}</div>
      ),
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
  return (
    <div className="pt-2 px-4 pb-4">
      <div className="grid grid-cols-1 gap-2 border rounded-md">
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
                    <TableCell key={cell.id}>
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
    </div>
  )
}

export default ManagerActivityLogs
