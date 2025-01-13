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
//import ApiConfig from '@/config/ApiConfig'

//import Cookies from 'js-cookie'

const fieldIconMap = {
  Active: {
    icon: <Badge className="bg-[#e4f5e9] text-[#16794c]">Active</Badge>,
    label: 'Successful transaction',
  },
  Inactive: {
    icon: <Badge className="bg-[#fff0f0] text-[#b52a2a]">Inactive</Badge>,
    label: 'Failed transaction',
  },
}

const data = [
  {
    product_id: '1',
    accountNumber: '53264738991022',
    bankName: 'Dummy Bank',
    bin: '98287',
    totalAmount: '569234432.23',
    status: 'Active',
  },
  {
    product_id: '2',
    accountNumber: '42367853401234',
    bankName: 'Global Trust Bank',
    bin: '98279',
    totalAmount: '123456789.50',
    status: 'Active',
  },
  {
    product_id: '3',
    accountNumber: '28763495023871',
    bankName: 'Techno Bank',
    bin: '98290',
    totalAmount: '87945632.75',
    status: 'Inactive',
  },
  {
    product_id: '4',
    accountNumber: '94857629385016',
    bankName: 'Sunrise Financial',
    bin: '98301',
    totalAmount: '23456789.30',
    status: 'Active',
  },
  {
    product_id: '5',
    accountNumber: '76834599023840',
    bankName: 'Prime Capital Bank',
    bin: '98288',
    totalAmount: '987654321.10',
    status: 'Active',
  },
  {
    product_id: '6',
    accountNumber: '65873498126754',
    bankName: 'Standard Bank',
    bin: '98299',
    totalAmount: '52347645.55',
    status: 'Inactive',
  },
  {
    product_id: '7',
    accountNumber: '34267192375631',
    bankName: 'Citywide Bank',
    bin: '98285',
    totalAmount: '102345678.90',
    status: 'Active',
  },
  {
    product_id: '8',
    accountNumber: '84723659802142',
    bankName: 'BlueOcean Bank',
    bin: '98305',
    totalAmount: '39456780.40',
    status: 'Active',
  },
  {
    product_id: '9',
    accountNumber: '92737463501728',
    bankName: 'Innovative Financial Group',
    bin: '98291',
    totalAmount: '76543210.20',
    status: 'Active',
  },
  {
    product_id: '10',
    accountNumber: '65839276293715',
    bankName: 'MetroBank',
    bin: '98302',
    totalAmount: '34567890.60',
    status: 'Inactive',
  },
]
//const data=[];
export function PoolAccountsTable() {
  //const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})
  //const data= await axios.get(ApiConfig.poolAccount);
  //console.log(data);
  // const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(true) // State for loading
  const [error, setError] = React.useState(null) // State for error handling

  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true)
  //       //const token=Cookies.get("auth_token");
  //       //console.log(token);
  //       //axios.default.withCredentials=true;
  //       const response = await axios.get('/wallet/get_balance', {
  //         withCredentials: true,
  //       }) // Replace with your API endpoint
  //       console.log(response)
  //       setData(response.data.data) // Assuming the response is an array of pool accounts
  //       console.log(response.data)
  //     } catch (err) {
  //       console.error(error)
  //       setError(err)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }
  //   fetchData()
  // }, [])
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
      accessorKey: 'accountNumber',
      header: 'Account Number',
      cell: ({ row }) => (
        <Sheet>
          <SheetTrigger>
            <div className="text-center hover:underline">
              {row.getValue('accountNumber')}
            </div>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-md">
            <SheetHeader>
              <SheetTitle className="text-xl">Pool Account Overview</SheetTitle>
            </SheetHeader>
            <Separator className="mt-2" />
            <div className="flex flex-col gap-4 mt-4">
              {/* <div className="border rounded-md flex gap-2 justify-between items-center px-4 py-4 mt-6">
                <div className="flex gap-2 items-center ">
                  <div className="rounded-full p-2 bg-[#e4f5e9] text-[#16794c]">
                    <ArrowUp strokeWidth={1.5} className=" rounded-full" />
                  </div>
                  <div className="flex flex-col">
                    <p className="font-medium text-md">
                      Sending money to Harshit
                    </p>
                    <p className="font-medium text-md text-muted-foreground">
                      Sent
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <p className="font-medium text-md">- &#8377; 200</p>
                  <p className="font-medium text-md text-muted-foreground">
                    &#8377; 20
                  </p>
                </div>
              </div> */}

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
      accessorKey: 'bankName',
      header: 'Bank Name',
      cell: ({ row }) => (
        <div className="text-center cursor-pointer hover:underline">
          {row.getValue('bankName')}
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
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('bin')}</div>
      ),
    },
    {
      accessorKey: 'totalAmount',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Amount
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => {
        const amount = Number(row.original.totalAmount) // Access the raw data directly
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
        return status === true ? (
          <Badge className="bg-[#e4f5e9] text-[#16794c]">Active</Badge>
        ) : (
          <Badge className="bg-[#fff0f0] text-[#b52a2a]">Inactive</Badge>
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
