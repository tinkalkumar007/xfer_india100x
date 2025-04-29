import * as React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
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
  FileDown,
  ChevronLeft,
  ChevronsLeft,
  ChevronRight,
  ChevronsRight,
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
import { program_manager, priority } from '@/data/flagged-customers-data'
import { Badge } from '@/components/ui/badge'

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
import { saveAs } from 'file-saver'
import * as Papa from 'papaparse'
import { DataTablePagination } from '@/components/DataTablePagination'
import {
  useFrappeGetDocList,
  useFrappeCreateDoc,
  useFrappeUpdateDoc,
  useFrappeGetDoc,
  useFrappeGetDocCount,
} from 'frappe-react-sdk'

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
import { useToast } from '@/hooks/use-toast'
import Empty from './Empty'
import { DatePickerWithRange } from './ui/daterange-picker'

export function FlaggedCustomerTable() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})
  const { toast } = useToast()
  const [searchParams, setSearchParams] = useSearchParams()
  const page = parseInt(searchParams.get('page') || '0')
  const limit = parseInt(searchParams.get('limit') || '1')
  const customerStatus = searchParams.get('status') || ''

  const filters = React.useMemo(() => {
    return Array.from(searchParams.entries())
      .map(([key, value]) => {
        if (key === 'query') {
          return ['name', 'like', `%${value}%`]
        }
        if (key === 'start') {
          return ['modified', '>=', value]
        }
        if (key === 'end') {
          return ['modified', '<=', value]
        }
        if (!(key === 'page') && !(key === 'limit')) {
          return [key, '=', value]
        }
      })
      .filter((item) => item !== undefined)
  }, [searchParams])

  const { data, isLoading } = useFrappeGetDocList('Customers', {
    fields: ['name'],
  })

  const { data: flaggedCustomersData, isLoading: flaggedCustomersLoading } =
    useFrappeGetDocList('Customers', {
      fields: ['*'],
      filters: [
        ['risk_category', 'not in', [null, undefined, '']],
        ...(searchParams.size > 0 ? [...filters] : []),
      ],
      limit_start: page * limit,
      limit: limit,
    })

  const { data: customerStatuses, isLoading: customerStatusesLoading } =
    useFrappeGetDocList('Customer Status', {
      fields: ['name'],
    })

  const { data: totalCount, isLoading: totalCountLoading } =
    useFrappeGetDocCount('Customers', searchParams.size > 0 && filters)

  const tableData = React.useMemo(() => {
    if (!flaggedCustomersData) return []
    return flaggedCustomersData?.map((customer) => ({
      id: customer.name,
      first_name: customer.first_name,
      last_name: customer.last_name,
      customer_name: `${customer.first_name} ${customer.last_name}`,
      risk_priority: customer.risk_category,
      last_active: customer.modified,
      remark: customer.remark,
    }))
  }, [flaggedCustomersData])
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
      accessorKey: 'id',
      header: 'Customer ID',
      cell: ({ row }) => (
        <Link to={`/customers/${row.original.id}`}>
          <div className="capitalize text-center hover:underline">
            {row.original?.id}
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

    {
      accessorKey: 'flag_type',
      header: 'Flag Type',
      cell: ({ row }) => {
        const flag_type = row.original?.flag_type
        return <div className="text-center">{flag_type ? flag_type : '-'}</div>
      },
    },

    {
      accessorKey: 'flag_description',
      header: 'Description',
      cell: ({ row }) => {
        const description = row.original?.remark
        const length = description?.length

        // Calculate font size based on description length
        const fontSize =
          length > 100 ? 'text-xs' : length > 50 ? 'text-sm' : 'text-md'

        return <div className={`text-center ${fontSize}`}>{description}</div>
      },
    },

    {
      accessorKey: 'last_active',
      header: 'Last Active',
      cell: ({ row }) => {
        const dateTime = row.original?.last_active?.split('.')[0]
        const date = dateTime?.split(' ')[0].split('-').reverse().join('-')
        return <div className="text-center min-w-[80px]">{date}</div>
      },
    },
    {
      accessorKey: 'risk_priority',
      header: 'Priority',
      cell: ({ row }) => {
        const priority = row.original?.risk_priority
        switch (priority) {
          case 'Low':
            return <Badge variant="outline">{priority}</Badge>
          case 'High':
            return <Badge variant="outline">{priority}</Badge>
          case 'Medium':
            return <Badge variant="outline">{priority}</Badge>
          default:
            return <Badge variant="outline">{priority}</Badge>
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
    //           <Button variant="ghost" className="h-8 w-8 p-0">
    //             <span className="sr-only">Open menu</span>
    //             <MoreHorizontal />
    //           </Button>
    //         </DropdownMenuTrigger>
    //         <DropdownMenuContent align="end">
    //           <DropdownMenuItem
    //             className="cursor-pointer"
    //             onClick={() => navigator.clipboard.writeText(payment.id)}
    //           >
    //             Activate
    //           </DropdownMenuItem>
    //           <DropdownMenuItem
    //             className="cursor-pointer"
    //             onClick={() => navigator.clipboard.writeText(payment.id)}
    //           >
    //             Block
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
        heading="No Customers Found."
        subHeading="No suspicious activity detected."
        buttonText="Contact Us"
      />
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>FLAGGED CUSTOMERS LIST</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <div className="w-full flex gap-2 justify-between max-md:flex-col max-md:gap-2 max-md:items-start max-md:w-[70%]">
            <div className="w-full flex gap-4 items-center">
              <div className="w-[25%]">
                <DataTableToolbar />
              </div>
              <div className="flex gap-4 items-center">
                <Select
                  value={customerStatus ? customerStatus : 'All Statuses'}
                  onValueChange={(value) => {
                    setSearchParams((prev) => {
                      const newParams = new URLSearchParams(prev) // ✅ Clone previous params

                      if (value === 'All Statuses') {
                        newParams.delete('status')
                      } else {
                        newParams.set('status', value)
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
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem value="All Statuses">All Statuses</SelectItem>
                      {customerStatusesLoading ? (
                        <SelectItem value="Loading" disabled></SelectItem>
                      ) : (
                        customerStatuses?.map((status) => (
                          <SelectItem key={status.name} value={status.name}>
                            {status.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <div className="flex gap-2 items-center">
                  <DatePickerWithRange />
                </div>
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
                {flaggedCustomersLoading ? (
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
