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
import DataTableViewOptions from './DataTableViewOptions'
import DataTableToolbar from './DataTableToolbar'
import { ProgramManager } from '../data/all-customer-data'
import { DataTablePagination } from '@/components/DataTablePagination'
import ProgramManagerDetails from '../pages/ProgramManagerDetails/ProgramManagerDetails'
import { useFrappeAuth, useFrappeGetDocList } from 'frappe-react-sdk'

const data = [
  {
    product_id: '1',
    customerId: '123456789',
    Name: 'John Doe',
    ProgramManager: 'Privacy Card',
    totalCards: '4',
    totalTransactions: '120',
    createdBy: 'Admin',
    lastActive: '12-01-2023',
  },
  {
    product_id: '2',
    customerId: '123456789',
    Name: 'Jane Smith',
    ProgramManager: 'Business Card',
    totalCards: '2',
    totalTransactions: '85',
    createdBy: 'Manager1',
    lastActive: '11-05-2021',
  },
  {
    product_id: '3',
    customerId: '123456789',
    Name: 'Robert Brown',
    ProgramManager: 'Travel Card',
    totalCards: '3',
    totalTransactions: '140',
    createdBy: 'SupervisorX',
    lastActive: '11-05-2021',
  },
  {
    product_id: '4',
    customerId: '123456789',
    Name: 'Emily Davis',
    ProgramManager: 'Gift Card',
    totalCards: '1',
    totalTransactions: '15',
    createdBy: 'Admin',
    lastActive: '12-05-2021',
  },
  {
    product_id: '5',
    customerId: '123456789',
    Name: 'Michael Wilson',
    ProgramManager: 'Virtual Card',
    totalCards: '5',
    totalTransactions: '200',
    createdBy: 'AdminAssistant',
    lastActive: '11-05-2021',
  },
  {
    product_id: '6',
    customerId: '123456789',
    Name: 'Olivia Johnson',
    ProgramManager: 'Platinum Card',
    totalCards: '2',
    totalTransactions: '95',
    createdBy: 'Manager3',
    lastActive: '12-05-2021',
  },
  {
    product_id: '7',
    customerId: '123456789',
    Name: 'James White',
    ProgramManager: 'Student Card',
    totalCards: '1',
    totalTransactions: '45',
    createdBy: 'SupervisorY',
    lastActive: '11-05-2021',
  },
  {
    product_id: '8',
    customerId: '123456789',
    Name: 'Sophia Martinez',
    ProgramManager: 'Savings Card',
    totalCards: '3',
    totalTransactions: '130',
    createdBy: 'Admin',
    lastActive: '11-05-2021',
  },
  {
    product_id: '9',
    customerId: '123456789',
    Name: 'Ethan Taylor',
    ProgramManager: 'Cashback Card',
    totalCards: '2',
    totalTransactions: '70',
    createdBy: 'Manager2',
    lastActive: '11-05-2021',
  },
  {
    product_id: '10',
    customerId: '123456789',
    Name: 'Isabella Hernandez',
    ProgramManager: 'Corporate Card',
    totalCards: '6',
    totalTransactions: '300',
    createdBy: 'SupervisorZ',
    lastActive: '12-05-2021',
  },
  {
    product_id: '11',
    customerId: '123456789',
    Name: 'Liam Garcia',
    ProgramManager: 'Premium Card',
    totalCards: '4',
    totalTransactions: '190',
    createdBy: 'Admin',
    lastActive: '12-05-2021',
  },
]

export function AllCustomerTable() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})
  const {currentUser} = useFrappeAuth()

  const { data: customersData, isLoading: customersLoading} = useFrappeGetDocList('Customers', {
      fields: ["*"],
      filters: [
        ["owner", "in", [currentUser, ""]]
      ]
      
    })
  
    if(!customersLoading) {
      console.log("Customers data:", customersData)
    }

  const tableData = React.useMemo(() => {
      if (!customersData) return []
      return customersData.map((customer) => ({
        customer_id: customer.name,
        first_name: customer.first_name,
        last_name: customer.last_name,
        total_cards: '',
        total_transactions: '',
        last_active: customer.modified
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
      accessorKey: 'customer_id',
      header: 'Customer ID',
      cell: ({ row }) => {
        const id = row.original?.customer_id
        return (
          <Link to={`/all-customers/customer/${id}`}>
            <div className="capitalize text-center hover:underline">
              {id}
            </div>
          </Link>
        )
      },
    },

    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => (
        <div className="capitalize text-center">{`${row.original?.first_name} ${row.original?.last_name}`}</div>
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
          {row.original?.total_cards ? row.original.total_cards : '0'}
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
          {row.original?.total_transactions ? row.original?.total_transactions : '0'}
        </div>
      ),
    },
    {
      accessorKey: 'last_active',
      header: 'Last Active',
      cell: ({ row }) => {
        
        // const time1 = row.original.lastActive.split('T')[1]
        // const time2 = time1.split('.')[0]
        //2025-01-20 17:25:49.239942
        //const 
        const dateTime = row.original?.last_active.split('.')[0] || ''
        const date = dateTime.split(' ')[0]
        const time = dateTime.split(' ')[1]


        return (
          <div className="flex flex-col items-center text-center">
            <span>{date?.split('-').reverse().join('-') || ''}</span>
            <span>
              {time}
            </span>
          </div>
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
                Flag
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Block
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
        <CardTitle>All Customer List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <div className="w-full flex gap-2 justify-between max-md:flex-col max-md:gap-2 max-md:items-start max-md:w-[70%]">
            {/* <div className="w-full">
              <DataTableToolbar
                table={table}
                inputFilter="Name"
                ProgramManager={ProgramManager}
              />
            </div> */}
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
