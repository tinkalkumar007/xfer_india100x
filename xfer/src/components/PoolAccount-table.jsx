import * as React from 'react'
import { Link } from 'react-router-dom'
import axios from '@/api/axios'
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
import { useFrappeGetDoc, useFrappeGetDocList } from 'frappe-react-sdk'

export function PoolAccountsTable() {
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})

  const [accountID, setAccountID] = React.useState('')

  const { data: PoolAccountsData, isLoading: poolAccountsDataLoading } =
    useFrappeGetDocList('Pool Account', {
      fields: ['*'],
    })

  const { data: accountDetails } = useFrappeGetDoc()

  console.log(PoolAccountsData)

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
    // {
    //   accessorKey: 'product_id',
    //   header: ({ column }) => {
    //     return (
    //       <Button
    //         variant="ghost"
    //         onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    //       >
    //         Sr No
    //         <ArrowUpDown />
    //       </Button>
    //     )
    //   },
    //   cell: ({ row }) => (
    //     <div className="capitalize text-center">
    //       {row.getValue('product_id')}
    //     </div>
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
      accessorKey: 'account_number',
      header: 'Account Number',
      cell: ({ row }) => (
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
              <SheetTitle className="text-xl">Pool Account Overview</SheetTitle>
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
                        <Badge
                          className="px-2 py-1 bg-[#e4f5e9] text-[#16794c] flex gap-1 items-end"
                          variant="outline"
                        >
                          Active
                        </Badge>
                      </p>
                    </div>
                    <div className="flex justify-between items-center gap-2">
                      <p className="text-sm font-medium text-muted-foreground">
                        Account Holder Name :{' '}
                      </p>
                      <p className="text-sm font-medium ">Harshit Adhikari</p>
                    </div>
                    <div className="flex justify-between items-center gap-2">
                      <p className="text-sm font-medium text-muted-foreground">
                        Account Number :{' '}
                      </p>
                      <p className="text-sm font-medium">487656787685</p>
                    </div>
                    <div className="flex justify-between items-center gap-2">
                      <p className="text-sm font-medium text-muted-foreground">
                        Account Type :{' '}
                      </p>
                      <p className="text-sm font-medium">Savings</p>
                    </div>
                    <div className="flex justify-between items-center gap-2">
                      <p className="text-sm font-medium text-muted-foreground">
                        IFSC Code :{' '}
                      </p>
                      <p className="text-sm font-medium">TCH0003333</p>
                    </div>
                    <div className="flex justify-between items-center gap-2">
                      <p className="text-sm font-medium text-muted-foreground">
                        Phone Number :{' '}
                      </p>
                      <p className="text-sm font-medium">7428630762</p>
                    </div>

                    <div className="flex justify-between items-center gap-2">
                      <p className="text-sm font-medium text-muted-foreground ">
                        Bank Name :{' '}
                      </p>
                      <p className="text-sm font-medium ">Techno Bank</p>
                    </div>
                    <div className="flex justify-between items-center gap-2">
                      <p className="text-sm font-medium text-muted-foreground ">
                        BIN :{' '}
                      </p>
                      <p className="text-sm font-medium ">98290</p>
                    </div>
                    <div className="flex justify-between items-center gap-2">
                      <p className="text-sm font-medium text-muted-foreground ">
                        Branch Address :{' '}
                      </p>
                      <p className="text-sm font-medium ">
                        Noida, Uttar Pradesh
                      </p>
                    </div>
                    <div className="flex justify-between items-center gap-2">
                      <p className="text-sm font-medium text-muted-foreground ">
                        Account Opening Date :{' '}
                      </p>
                      <p className="text-sm font-medium ">22/12/2020</p>
                    </div>
                    <div className="flex justify-between items-center gap-2">
                      <p className="text-sm font-medium text-muted-foreground ">
                        Account Activation Date :{' '}
                      </p>
                      <p className="text-sm font-medium ">24/12/2020</p>
                    </div>
                  </div>
                </div>

                {/* <div className="flex flex-col gap-4">
                  <h2 className="text-lg font-medium">Harshit Bank Details</h2>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2 justify-between items-center">
                      <p className="text-sm font-medium text-muted-foreground">
                        Account Number :
                      </p>
                      <p className="text-sm font-medium">465465546789</p>
                    </div>
                    <div className="flex gap-2 justify-between items-center">
                      <p className="text-sm font-medium text-muted-foreground">
                        BIN :
                      </p>
                      <p className="text-sm font-medium">12324643</p>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </SheetContent>
        </Sheet>
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
        const status = row.original.status
        return (
          <>
            {status === 'Active' && (
              <Badge className="bg-[#e4f5e9] text-[#16794c]">Active</Badge>
            )}
            {status === 'Inactive' && (
              <Badge className="bg-[#fff0f0] text-[#b52a2a]">Inactive</Badge>
            )}
          </>
        )
      },
    },
    {
      accessorKey: 'actions',
      header: '',
      cell: ({ row }) => {
        const rowData = row.original // Get the entire row's data for actions
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 ">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="cursor-pointer">
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Block
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Activate
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
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
        <CardTitle>Pool Accounts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <div className="w-full flex gap-2 justify-between max-md:flex-col max-md:gap-2 max-md:items-start max-md:w-[70%]">
            <div className="w-full">
              <DataTableToolbar table={table} inputFilter="accountNumber" />
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
                {table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell className="text-center" key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <DataTablePagination table={table} />
        </div>
      </CardContent>
    </Card>
  )
}
