import * as React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  useReactTable,
} from '@tanstack/react-table'
import { DataTablePagination } from '@/components/DataTablePagination'
import {
  ArrowUpDown,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  MoreHorizontal,
  CirclePlus,
  Pencil,
  Trash2,
  CircleX,
  FileDown,
  ChevronLeft,
  ChevronsLeft,
  ChevronRight,
  ChevronsRight,
  ActivityIcon,
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
import { useFrappeGetDocCount, useFrappeGetDocList } from 'frappe-react-sdk'
import { useToast } from '@/hooks/use-toast'
import Empty from './Empty'

export function ActivityLogsTable() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})
  const { toast } = useToast()
  const [searchParams, setSearchParams] = useSearchParams()
  const page = parseInt(searchParams.get('page') || '0')
  const limit = parseInt(searchParams.get('limit') || '1')

  const { data, isLoading } = useFrappeGetDocList('Activity Log', {
    fields: ['name'],
  })

  const { data: activityLogsData, isLoading: activityLogsLoading } =
    useFrappeGetDocList('Activity Log', {
      fields: ['*'],
      limit_start: page * limit,
      limit: limit,
    })

  const { data: totalCount, isLoading: totalCountLoading } =
    useFrappeGetDocCount('Activity Log')

  const tableData = React.useMemo(() => {
    if (!activityLogsData) return []
    return activityLogsData.map((log) => ({
      user: log.full_name,
      event: log.subject,
      ip_address: log.ip_address,
      date: log.creation,
    }))
  }, [activityLogsData])

  const columns = [
    {
      id: 'select',
      header: ({ table }) => (
        <div className="text-left">
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
      accessorKey: 'user',
      header: () => <div className="">User</div>,
      cell: ({ row }) => (
        <div className="capitalize text-center cursor-pointer hover:underline">
          {row.original?.user}
        </div>
      ),
    },

    {
      accessorKey: 'event',
      header: () => <div className="text-left">Event</div>,
      cell: ({ row }) => (
        <div className="capitalize">{row.original?.event}</div>
      ),
    },

    {
      accessorKey: 'ip_address',
      header: () => <div className="text-left">IP Address</div>,
      cell: ({ row }) => (
        <div className="lowercase">{row.original?.ip_address}</div>
      ),
    },
    {
      accessorKey: 'date',
      header: () => <div className="text-left">Date</div>,
      cell: ({ row }) => {
        const date_time = row.original?.date?.split('.')[0]
        const date = date_time?.split(' ')[0].split('-').reverse().join('-')
        const time = date_time?.split(' ')[1]
        return (
          <div className="lowercase flex flex-col justify-center">
            <span>{date}</span>
            <span>{time}</span>
          </div>
        )
      },
    },
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
        heading="No logs found."
        subHeading="No activities found."
        buttonText="Contact Us"
      />
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>ACTIVITY LOGS</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <div className="w-full flex gap-2 justify-between max-md:flex-col max-md:gap-2 max-md:items-start max-md:w-[70%]">
            <div className="w-full">
              {/* <DataTableToolbar table={table} inputFilter="card_ref_id" /> */}
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
                {activityLogsLoading ? (
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
