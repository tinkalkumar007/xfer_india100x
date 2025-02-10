import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DataTablePagination } from '@/components/DataTablePagination'

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'

import { Link } from 'react-router-dom'

const TransactionActivityLogs = ({
  customerTransactionLogs,
  customerTransactionLogsLoading,
}) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})

  console.log('Customer Transaction Logs: ', customerTransactionLogs)

  const tableData = React.useMemo(() => {
    if (!customerTransactionLogs) return []
    return (
      !customerTransactionLogsLoading &&
      customerTransactionLogs?.map((log) => ({
        id: log.name, // Frappe's unique identifier
        card_reference_id: log.card_reference_id,
        from: log.from_account,
        to: log.to_account,
        amount: log.amount,
        date: log.creation,
        status: log.status,
      }))
    )
  }, [customerTransactionLogs])

  const initialTableData = React.useMemo(() => {
    return tableData.slice(0, 3)
  }, [tableData])

  const columns = [
    {
      accessorKey: 'card_reference_id',
      header: 'ID',
      cell: ({ row }) => (
        <Link>
          <div className="text-center hover:underline">
            {row.original.card_reference_id}
          </div>
        </Link>
      ),
    },

    {
      accessorKey: 'from',
      header: 'From',
      cell: ({ row }) => <div className="text-center">{row.original.from}</div>,
    },
    {
      accessorKey: 'to',
      header: 'To',
      cell: ({ row }) => <div className="text-center">{row.original.to}</div>,
    },

    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: ({ row }) => {
        const amount = row.original.amount // Access the raw data directly
        // const type = row.original.Type // Access the Type from raw data
        // const colorClass = type === 'Credit' ? 'text-green-500' : 'text-red-500'
        const [whole, decimal] = amount.toFixed(2).split('.') // Split the amount into whole and decimal parts
        return (
          <div className="text-center flex items-center justify-center">
            <span>₹{whole}</span>
            <span className="text-gray-500">.{decimal}</span>
          </div>
        )
      },
    },
    {
      accessorKey: 'date',
      header: 'Date',
      cell: ({ row }) => {
        const dateTime = row.original?.date?.split('.')[0]

        const date = dateTime?.split(' ')[0].split('-').reverse().join('-')

        const time = dateTime.split(' ')[1]

        return (
          <div className="flex flex-col items-center text-center">
            <span>{date}</span>
            <span className="text-slate-400">{time}</span>
          </div>
        )
      },
    },
    {
      accessorKey: 'status',
      header: `Status`,
      cell: ({ row }) => {
        const status = row.original.status

        switch (status) {
          case 'Success':
            return (
              <div className="text-center">
                <Badge className="bg-[#e4f5e9] text-[#16794c]">Success</Badge>
              </div>
            )
          case 'Pending':
            return (
              <div className="text-center">
                <Badge className="bg-[#fff7d3] text-[#ab6e05]">Pending</Badge>
              </div>
            )

          case 'Rejected':
            return (
              <div className="text-center">
                <Badge className="bg-[#ffe6e6] text-[#d32f2f]">Rejected</Badge>
              </div>
            )

          default:
            return <div className="text-center">-</div>
        }
      },
    },
  ]

  const initialTable = useReactTable({
    data: initialTableData,
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
  })

  const entireTable = useReactTable({
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
        pageSize: 5,
      },
    },
  })
  return (
    <div className="pt-2 px-4 pb-4 space-y-4">
      <div className="grid grid-cols-1 gap-2 border rounded-md">
        <Table>
          <TableHeader>
            {initialTable.getHeaderGroups().map((headerGroup) => (
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
            {initialTable.getRowModel().rows?.length ? (
              initialTable.getRowModel().rows.map((row) => (
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
      <div className="w-full flex justify-center pb-6">
        <Sheet>
          <SheetTrigger>
            <p className="text-sm font-semibold underline tracking-wide cursor-pointer">
              View All Logs
            </p>
          </SheetTrigger>
          <SheetContent className="w-[32rem] max-w-2xl md:w-[48rem] md:max-w-3xl lg:w-[56rem] lg:max-w-4xl">
            <SheetHeader>
              <SheetTitle>Transaction Logs</SheetTitle>
            </SheetHeader>

            <div className="w-full border rounded-md mt-4">
              <Table>
                <TableHeader>
                  {entireTable.getHeaderGroups().map((headerGroup) => (
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
                  {entireTable.getRowModel().rows?.length ? (
                    entireTable.getRowModel().rows.map((row) => (
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
            <DataTablePagination table={entireTable} />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

export default TransactionActivityLogs
