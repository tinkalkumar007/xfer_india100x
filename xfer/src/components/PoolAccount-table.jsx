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
import { DataTablePagination } from '@/components/DataTablePagination'
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
  Binary,
  Cookie,
  FileDown,
  ArrowUp,
} from 'lucide-react'
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
import { Separator } from '@/components/ui/separator'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { saveAs } from 'file-saver'
import * as Papa from 'papaparse'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
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

import { Badge } from '@/components/ui/badge'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import DataTableViewOptions from './DataTableViewOptions'
import DataTableToolbar from './DataTableToolbar'
import {
  useFrappeGetDoc,
  useFrappeGetDocCount,
  useFrappeGetDocList,
} from 'frappe-react-sdk'
import { useToast } from '@/hooks/use-toast'
import Empty from './Empty'

export function PoolAccountsTable() {
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})
  const { toast } = useToast()
  const [searchParams, setSearchParams] = useSearchParams()
  const page = parseInt(searchParams.get('page') || '0')
  const limit = parseInt(searchParams.get('limit') || '1')

  const filters = Array.from(searchParams.entries())
    .map(([key, value]) => {
      if (key === 'query') {
        return ['account_number', 'like', `%${value}%`]
      }
      if (!(key === 'page') && !(key === 'limit')) {
        return [key, '=', value]
      }
    })
    .filter((item) => item !== undefined)

  const [accountID, setAccountID] = React.useState('')

  const { data, isLoading } = useFrappeGetDocList('Pool Account', {
    fields: ['name'],
  })

  const { data: PoolAccountsData, isLoading: poolAccountsDataLoading } =
    useFrappeGetDocList('Pool Account', {
      fields: ['*'],
      filters: searchParams.size > 0 && filters,
      limit_start: page * limit,
      limit: limit,
    })
  const { data: totalCount, isLoading: totalCountLoading } =
    useFrappeGetDocCount('Pool Account', searchParams.size > 0 && filters)

  const { data: accountDetails, isLoading: accountDetailsLoading } =
    useFrappeGetDoc('Pool Account', accountID, {
      enabled: accountID,
    })

  console.log('Account Details: ', accountDetails)

  const tableData = React.useMemo(() => {
    if (!PoolAccountsData) return []
    return PoolAccountsData?.map((poolAccount) => ({
      id: poolAccount.name, // Frappe's unique identifier
      account_number: poolAccount.account_number,
      account_balance: poolAccount.account_balance,
      bank_name: poolAccount.bank_name,
      bin: poolAccount.bin,
      status: poolAccount.status,
    }))
  }, [PoolAccountsData])

  const columns = [
    {
      id: 'select',
      header: ({ table }) => (
        <div className="flex justify-center">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex justify-center">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'account_number',
      header: 'Account Number',
      cell: ({ row }) => (
        <div className="flex justify-center">
          <Sheet>
            <SheetTrigger>
              <div
                className="text-center hover:underline"
                onClick={() => {
                  setAccountID(row.original.account_number)
                }}
              >
                {row.original.account_number}
              </div>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle className="text-xl">
                  Pool Account Overview
                </SheetTitle>
              </SheetHeader>
              <Separator className="mt-2" />
              <div className="flex flex-col gap-4 mt-4">
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-4">
                    <h2 className="text-lg font-medium">Account Details</h2>
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center gap-2">
                        <p className="text-sm font-medium text-muted-foreground">
                          Status :{' '}
                        </p>
                        <p className="text-sm font-medium ">
                          {accountDetails?.status === 'Active' && (
                            <Badge
                              className="px-2 py-1 bg-[#e4f5e9] text-[#16794c] flex gap-1 items-end"
                              variant="outline"
                            >
                              {accountDetails?.status}
                            </Badge>
                          )}
                        </p>
                      </div>
                      <div className="flex justify-between items-center gap-2">
                        <p className="text-sm font-medium text-muted-foreground">
                          Account Balance :{' '}
                        </p>
                        <p className="text-sm font-medium ">
                          &#8377;{accountDetails?.account_balance}
                        </p>
                      </div>
                      <div className="flex justify-between items-center gap-2">
                        <p className="text-sm font-medium text-muted-foreground">
                          Account Holder Name :{' '}
                        </p>
                        <p className="text-sm font-medium ">Dummy</p>
                      </div>
                      <div className="flex justify-between items-center gap-2">
                        <p className="text-sm font-medium text-muted-foreground">
                          Account Number :{' '}
                        </p>
                        <p className="text-sm font-medium">
                          {accountDetails?.account_number}
                        </p>
                      </div>

                      <div className="flex justify-between items-center gap-2">
                        <p className="text-sm font-medium text-muted-foreground ">
                          Bank Name :{' '}
                        </p>
                        <p className="text-sm font-medium ">
                          {accountDetails?.bank_name}
                        </p>
                      </div>
                      <div className="flex justify-between items-center gap-2">
                        <p className="text-sm font-medium text-muted-foreground ">
                          BIN :{' '}
                        </p>
                        <p className="text-sm font-medium ">98290</p>
                      </div>

                      <div className="flex justify-between items-center gap-2">
                        <p className="text-sm font-medium text-muted-foreground ">
                          Account Opening Date :{' '}
                        </p>
                        <p className="text-sm font-medium ">
                          {accountDetails?.creation
                            ?.split('.')[0]
                            ?.split(' ')[0]
                            ?.split('-')
                            .reverse()
                            .join('/')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      ),
    },
    {
      accessorKey: 'bank_name',
      header: 'Bank Name',
      cell: ({ row }) => (
        <div className="text-center cursor-pointer hover:underline">
          {row.original.bank_name}
        </div>
      ),
    },
    {
      accessorKey: 'bin',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            BIN
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div className="text-center">{row.original.bin}</div>,
    },
    {
      accessorKey: 'account_balance',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Account Balance
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => {
        const amount = Number(row.original.account_balance) // Access the raw data directly
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
      header: `Status`,
      cell: ({ row }) => {
        const status = row.original?.status
        switch (status) {
          case 'Active':
            return (
              <div className="flex justify-center">
                <Badge variant="outline">{status}</Badge>
              </div>
            )
          case 'Inactive':
            return (
              <div className="flex justify-center">
                {' '}
                <Badge variant="outline">{status}</Badge>
              </div>
            )
          default:
            return (
              <div className="flex justify-center">
                <Badge variant="primary">{status}</Badge>
              </div>
            )
        }
      },
    },
    // {
    //   accessorKey: 'actions',
    //   header: '',
    //   cell: ({ row }) => {
    //     const rowData = row.original // Get the entire row's data for actions
    //     return (
    //       <DropdownMenu>
    //         <DropdownMenuTrigger asChild>
    //           <Button variant="ghost" className="h-8 w-8 p-0 ">
    //             <span className="sr-only">Open menu</span>
    //             <MoreHorizontal />
    //           </Button>
    //         </DropdownMenuTrigger>
    //         <DropdownMenuContent align="end" className="cursor-pointer">
    //           <DropdownMenuItem
    //             className="cursor-pointer"
    //             onClick={() => navigator.clipboard.writeText(payment.id)}
    //           >
    //             Block
    //           </DropdownMenuItem>
    //           <DropdownMenuItem
    //             className="cursor-pointer"
    //             onClick={() => navigator.clipboard.writeText(payment.id)}
    //           >
    //             Activate
    //           </DropdownMenuItem>
    //         </DropdownMenuContent>
    //       </DropdownMenu>
    //     )
    //   },
    // },
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

  const openDialog = (rowData) => {
    setIsDialogOpen(true)
  }

  const closeDialog = () => {
    setIsDialogOpen(false)
    // Clear any row data when canceled
  }

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
        heading="No Data Found."
        subHeading="No account history found."
        buttonText="Contact Us"
      />
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>POOL ACCOUNTS</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <div className="w-full flex gap-2 justify-between max-md:flex-col max-md:gap-2 max-md:items-start max-md:w-[70%]">
            <div className="w-full">
              <div className="w-[25%]">
                <DataTableToolbar />
              </div>
              <div></div>
            </div>
            <div className="flex gap-2 items-center">
              <Button variant="outline" className="h-8" onClick={downloadCSV}>
                <FileDown />
              </Button>

              <DataTableViewOptions table={table} />
            </div>
          </div>
          <div className="overflow-hidden rounded-md border border-muted shadow-md mt-3">
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
                {poolAccountsDataLoading ? (
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
          <DataTablePagination table={table} />
        </div>
      </CardContent>
    </Card>
  )
}
