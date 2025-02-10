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
import { useFrappeGetDocList } from 'frappe-react-sdk'
import { useToast } from '@/hooks/use-toast'
import Empty from './Empty'

export function PendingKycTable() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})
  const { toast } = useToast()

  const { data: pendingCustomersData, isLoading: pendingCustomersDataLoading } =
    useFrappeGetDocList('Customers', {
      fields: ['*'],
      filters: [['kyc_level', '=', 'Pending']],
    })

  if (!pendingCustomersDataLoading) {
    console.log('Pending Customers Data:', pendingCustomersData)
  }

  const tableData = React.useMemo(() => {
    if (!pendingCustomersData) return []
    return pendingCustomersData.map((customer) => ({
      id: customer.name,
      first_name: customer.first_name,
      last_name: customer.last_name,
      customer_name: `${customer.first_name} ${customer.last_name}`,
      last_active: customer.creation,
      kyc_level: customer.kyc_level,
    }))
  }, [pendingCustomersData])

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
      accessorKey: 'id',
      header: 'Customer ID',
      cell: ({ row }) => (
        <Link to={`/customers/${row.original.id}`}>
          <div className="capitalize text-center hover:underline">
            {row.original.id}
          </div>
        </Link>
      ),
    },
    {
      accessorKey: 'customer_name',
      header: 'Name',
      cell: ({ row }) => (
        <div className="capitalize text-center">
          {row.original?.first_name} {row.original?.last_name}
        </div>
      ),
    },

    // {
    //   accessorKey: 'verificationRemarks',
    //   header: 'Verification Remarks',
    //   cell: ({ row }) => (
    //     <div className="text-center">{row.getValue('verificationRemarks')}</div>
    //   ),
    // },

    {
      accessorKey: 'submission_date',
      header: 'Submission Date',
      cell: ({ row }) => {
        const dateTime = row.original?.last_active?.split('.')[0]
        const date = dateTime?.split(' ')[0].split('-').reverse().join('-')

        return (
          <div className="flex flex-col items-center text-center">
            <span>{date}</span>
          </div>
        )
      },
    },
    {
      accessorKey: 'kyc_level',
      header: 'KYC Level',
      cell: ({ row }) => {
        const kyc_level = row.original?.kyc_level

        switch (kyc_level) {
          case 'Basic':
            return (
              <Badge className="bg-[#fff7d3] text-[#ab6e05]" variant="outline">
                {kyc_level}
              </Badge>
            )
          case 'Completed':
            return (
              <Badge className="bg-[#fff7d3] text-[#ab6e05]" variant="outline">
                {kyc_level}
              </Badge>
            )
          default:
            return (
              <Badge className="" variant="primary">
                {kyc_level}
              </Badge>
            )
        }
      },
    },
    // {
    //   accessorKey: 'actions',
    //   header: '',
    //   cell: ({ row }) => {
    //     const id = row.original.product_id
    //     const rowData = row.original // Get the entire row's data for actions
    //     return (
    //       <DropdownMenu>
    //         <DropdownMenuTrigger asChild>
    //           <Button variant="ghost" className="h-8 w-8 p-0">
    //             <span className="sr-only">Open menu</span>
    //             <MoreHorizontal />
    //           </Button>
    //         </DropdownMenuTrigger>
    //         <DropdownMenuContent align="end">
    //           <DropdownMenuItem className="cursor-pointer">
    //             <Link to={`/programs/program/${id}`}>View Details</Link>
    //           </DropdownMenuItem>
    //           <DropdownMenuItem
    //             className="cursor-pointer"
    //             onClick={() => {
    //               handleCopy(rowData)
    //             }}
    //           >
    //             Copy
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

  if (!pendingCustomersDataLoading && pendingCustomersData.length === 0) {
    return (
      <Empty
        heading="No Customers Found!"
        subHeading="No suspicious activity detected."
        buttonText="Contact Us"
      />
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>PENDING KYC CUSTOMERS</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <div className="w-full flex gap-2 justify-between max-md:flex-col max-md:gap-2 max-md:items-start max-md:w-[70%]">
            <div className="w-full">
              <DataTableToolbar
                table={table}
                inputFilter="customer_name"
                // program_manager={program_manager}
                // status={status}
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
