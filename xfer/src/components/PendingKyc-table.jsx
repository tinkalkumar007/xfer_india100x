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
  SelectGroup,
  SelectItem,
  SelectLabel,
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
import { useFrappeGetDocCount, useFrappeGetDocList } from 'frappe-react-sdk'
import { useToast } from '@/hooks/use-toast'
import Empty from './Empty'

export function PendingKycTable() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})
  const { toast } = useToast()
  const [searchParams, setSearchParams] = useSearchParams()

  const page = parseInt(searchParams.get('page') || '0')
  const limit = parseInt(searchParams.get('limit') || '1')
  const customerStatus = searchParams.get('kyc_level') || ''

  const filters = Array.from(searchParams.entries())
    .map(([key, value]) => {
      if (key === 'query') {
        return ['full_name', 'like', `%${value}%`]
      }
      if (!(key === 'page') && !(key === 'limit')) {
        return [key, '=', value]
      }
    })
    .filter((item) => item !== undefined)

  const { data, isLoading } = useFrappeGetDocList('Customers', {
    fields: ['name'],
  })

  const { data: pendingCustomersData, isLoading: pendingCustomersDataLoading } =
    useFrappeGetDocList('Customers', {
      fields: ['*'],
      filters: [
        ['kyc_level', '=', 'Pending'],
        ...(searchParams.size > 0 ? [...filters] : []),
      ],
      limit_start: page * limit,
      limit: limit,
    })

  const { data: kycLevel, isLoading: kycLevelLoading } = useFrappeGetDocList(
    'KYC Level',
    {
      fields: ['name'],
    }
  )

  const { data: totalCount, isLoading: totalCountLoading } =
    useFrappeGetDocCount('Customers', [
      ['kyc_level', '=', 'Pending'],
      ...(searchParams.size > 0 ? [...filters] : []),
    ])

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
            <div className="w-full flex gap-4">
              <div className="w-[25%]">
                <DataTableToolbar />
              </div>
              <div>
                <Select
                  value={customerStatus ? customerStatus : 'All Statuses'}
                  onValueChange={(value) => {
                    setSearchParams((prev) => {
                      const newParams = new URLSearchParams(prev) // ✅ Clone previous params

                      if (value === 'All Statuses') {
                        newParams.delete('kyc_level')
                      } else {
                        newParams.set('kyc_level', value)
                        newParams.set('page', 0)
                      }
                      return newParams // ✅ Return a new object
                    })
                  }}
                >
                  <SelectTrigger className="w-[180px] h-8">
                    <SelectValue placeholder="Select the status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>KYC Level</SelectLabel>
                      <SelectItem value="All Statuses">
                        All KYC Levels
                      </SelectItem>
                      {kycLevelLoading ? (
                        <SelectItem value="Loading" disabled></SelectItem>
                      ) : (
                        kycLevel?.map((level) => (
                          <SelectItem key={level.name} value={level.name}>
                            {level.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
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
                {pendingCustomersDataLoading ? (
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
                        <TableCell key={cell.id} className="text-center">
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
