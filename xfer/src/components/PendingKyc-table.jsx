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
import { saveAs } from 'file-saver'
import * as Papa from 'papaparse'
import { DataTablePagination } from '@/components/DataTablePagination'
import {
  ArrowUpDown,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  Check,
  CirclePlus,
  Pencil,
  Trash2,
  CircleX,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
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

import { Badge } from '@/components/ui/badge'
import { status, program_manager } from '@/data/pending-kyc-data'
import DataTableViewOptions from './DataTableViewOptions'
import DataTableToolbar from './DataTableToolbar'

const data = [
  {
    product_id: '1',
    customerId: '123654789',
    Name: 'Mona',
    ProgramManager: 'Sales Card',
    status: 'pending',
    verificationRemarks: 'Resubmission Required',
    submissionDate: '2022-10-05',
  },
  {
    product_id: '2',
    customerId: '123664789',
    Name: 'John Doe',
    ProgramManager: 'Platinum Card',
    status: 'pending',
    verificationRemarks: 'Address proof missing',
    submissionDate: '2023-09-15',
  },
  {
    product_id: '3',
    customerId: '123654782',
    Name: 'Sophia Smith',
    ProgramManager: 'Business Loan',
    status: 'under review',
    verificationRemarks: 'Verification in progress',
    submissionDate: '2023-11-01',
  },
  {
    product_id: '4',
    customerId: '123684789',
    Name: 'Ethan Brown',
    ProgramManager: 'Travel Card',
    status: 'rejected',
    verificationRemarks: 'ID proof mismatch',
    submissionDate: '2023-08-20',
  },
  {
    product_id: '5',
    customerId: '123656554',
    Name: 'Liam Wilson',
    ProgramManager: 'Premium Savings',
    status: 'pending',
    verificationRemarks: 'Photo unclear, resubmit',
    submissionDate: '2023-10-10',
  },
  {
    product_id: '6',
    customerId: '123654779',
    Name: 'Emma Davis',
    ProgramManager: 'Retail Finance',
    status: 'under review',
    verificationRemarks: 'Cross-verifying documents',
    submissionDate: '2023-09-25',
  },
  {
    product_id: '7',
    customerId: '123654798',
    Name: 'Oliver Martinez',
    ProgramManager: 'Gold Card',
    status: 'pending',
    verificationRemarks: 'Bank statement not submitted',
    submissionDate: '2023-10-02',
  },
  {
    product_id: '8',
    customerId: '189654789',
    Name: 'Ava Taylor',
    ProgramManager: 'Student Plan',
    status: 'pending',
    verificationRemarks: 'Document not signed',
    submissionDate: '2023-11-15',
  },
  {
    product_id: '9',
    customerId: '123654756',
    Name: 'Michael Johnson',
    ProgramManager: 'Cashback Offers',
    status: 'rejected',
    verificationRemarks: 'Document not legible',
    submissionDate: '2023-07-30',
  },
  {
    product_id: '10',
    customerId: '123654723',
    Name: 'Emily Clark',
    ProgramManager: 'Merchant Services',
    status: 'under review',
    verificationRemarks: 'Final verification stage',
    submissionDate: '2023-11-10',
  },
]

//console.log(data)

export function PendingKycTable() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})
  // const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)

  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);
  //       //const token=Cookies.get("auth_token");
  //       //console.log(token);
  //       //axios.default.withCredentials=true;
  //       const response = await axios.get('/customer/allPendingKycCustomers',{
  //         withCredentials: true,
  //       }); // Replace with your API endpoint
  //       //setData(response.data.data); // Assuming the response is an array of pool accounts
  //       console.log(response.data.data);

  //       const transformedData = response.data.data.map((item, index) => ({
  //         customerId: item.id, // Generate a unique ID
  //         Name: `${item.firstName} ${item.lastName}`, // Combine firstName and lastName
  //         ProgramManager: `${item.user.firstName} ${item.user.lastName}`, // Access nested user details
  //         verificationRemarks:`${item.kyc.remarks}`,
  //         totalCards: item.totalCards || 0, // Default value if undefined
  //         totalTransactions: item.totalTransactions || 0, // Default value if undefined
  //         submissionDate:`${item.kyc.updatedAt}`, // Format the date
  //         status:`${item.kyc.status}`

  //       }));
  //       setData(transformedData);
  //     } catch (err) {
  //       console.error('Error fetching data:', err);
  //       setError('Failed to fetch data. Please try again later.');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []);

  async function handleCopy(rowData) {
    try {
      const entireRow = `{\n\n\tID: ${rowData.productId},\n\tName: ${rowData.Name},\n\tProgram Manager: ${rowData.programManager},\n\tStatus: ${rowData.status},\n\tVerification Remark: ${rowData.verificationRemarks},\n\tSubmission Date: ${rowData.submissionDate}\n\n}`
      await navigator.clipboard.writeText(entireRow)
    } catch (error) {
      console.log(error)
    }
  }

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
      accessorKey: 'customerId',
      header: 'Customer Id',
      cell: ({ row }) => (
        <Link to={`/pending-for-kyc/customer/${row.original.id}`}>
          <div className="capitalize text-center hover:underline">
            {row.getValue('customerId')}
          </div>
        </Link>
      ),
    },
    {
      accessorKey: 'Name',
      header: 'Name',
      cell: ({ row }) => (
        <div className="capitalize text-center">{row.getValue('Name')}</div>
      ),
    },
    {
      accessorKey: 'ProgramManager',
      header: 'Program Manager',
      cell: ({ row }) => (
        <div className="text-center hover:underline">
          {row.getValue('ProgramManager')}
        </div>
      ),
    },

    {
      accessorKey: 'verificationRemarks',
      header: 'Verification Remarks',
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('verificationRemarks')}</div>
      ),
    },

    {
      accessorKey: 'submissionDate',
      header: 'Submission Date',
      cell: ({ row }) => {
        const date = row.original.submissionDate
        // const time1 = row.original.submissionDate.split('T')[1]
        // const time2 = time1.split('.')[0]
        //const

        return (
          <div className="flex flex-col items-center text-center">
            <span>{date}</span>
            {/* <span className="text-slate-400">{time2}</span> */}
          </div>
        )
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.original.status

        switch (status) {
          case 'pending':
            return (
              <Badge className="bg-[#fff7d3] text-[#ab6e05]">Pending</Badge>
            )
          case 'under review':
            return (
              <Badge className="bg-[#e3f2fd] text-[#1976d2]">
                Under Review
              </Badge>
            )
          case 'rejected':
            return (
              <Badge className="bg-[#ffe6e6] text-[#d32f2f]">Rejected</Badge>
            )
        }
      },
    },
    {
      accessorKey: 'actions',
      header: '',
      cell: ({ row }) => {
        const id = row.original.product_id
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
              <DropdownMenuItem className="cursor-pointer">
                <Link to={`/programs/program/${id}`}>View Details</Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => {
                  handleCopy(rowData)
                }}
              >
                Copy
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
        <CardTitle>Pending KYC List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <div className="w-full flex gap-2 justify-between max-md:flex-col max-md:gap-2 max-md:items-start max-md:w-[70%]">
            <div className="w-full">
              <DataTableToolbar
                table={table}
                inputFilter="product_name"
                program_manager={program_manager}
                status={status}
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
                      {row.getVisibleCells().map((cell) => {
                        const clickableColumns = [
                          'customerId',
                          'ProgramManager',
                        ] // List of clickable column keys

                        return (
                          <TableCell className="text-center" key={cell.id}>
                            {clickableColumns.includes(cell.column.id) ? (
                              // If the column is in the clickable list, render a clickable element (e.g., link or button)
                              <button
                                onClick={() => handleClick(cell.row.original)}
                                style={{
                                  background: 'transparent',
                                  border: 'none',
                                  cursor: 'pointer',
                                }}
                              >
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                              </button>
                            ) : (
                              // Otherwise, render the regular cell content
                              flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )
                            )}
                          </TableCell>
                        )
                      })}
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
