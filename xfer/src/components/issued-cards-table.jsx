import * as React from 'react'
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import axios from '../api/axios'
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
  MoreHorizontal,
  Check,
  CirclePlus,
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
import { status } from '@/data/issued-cards-data'
import DataTableToolbar from './DataTableToolbar'
import DataTableViewOptions from './DataTableViewOptions'
import { useFrappeGetDocCount, useFrappeGetDocList } from 'frappe-react-sdk'
import { useToast } from '@/hooks/use-toast'
import Empty from './Empty'

export function IssuedCardsTable() {
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})
  const { toast } = useToast()
  const [searchParams, setSearchParams] = useSearchParams()
  const page = parseInt(searchParams.get('page') || '0')
  const limit = parseInt(searchParams.get('limit') || '1')
  const cardStatus = searchParams.get('card_status') || ''

  const filters = Array.from(searchParams.entries())
    .map(([key, value]) => {
      if (key === 'query') {
        return ['card_reference_id', 'like', `%${value}%`]
      }
      if (!(key === 'page') && !(key === 'limit')) {
        return [key, '=', value]
      }
    })
    .filter((item) => item !== undefined)

  console.log('Search Params: ', filters)

  const { data, isLoading } = useFrappeGetDocList('Cards', {
    fields: ['name'],
  })

  const { data: issuedCardsData, isLoading: issuedCardsLoading } =
    useFrappeGetDocList('Cards', {
      fields: [
        'card_reference_id',
        'card_number',
        'modified',
        'issue_date',
        'card_status',
        'program_name',
        '_user_tags',
      ],
      filters: searchParams.size > 0 && filters,
      limit_start: page * limit,
      limit: limit,
    })

  const { data: totalCount, isLoading: totalCountLoading } =
    useFrappeGetDocCount('Cards', searchParams.size > 0 && filters)

  const { data: cardStatuses, isLoading: cardStatusesLoading } =
    useFrappeGetDocList('Card Status', {
      fields: ['name'],
    })

  if (!issuedCardsLoading) {
    console.log(issuedCardsData)
  }

  if (!issuedCardsLoading) {
    console.log(issuedCardsData)
  }

  const tableData = React.useMemo(() => {
    if (!issuedCardsData) return []
    return issuedCardsData.map((card) => ({
      id: card.card_reference_id,
      card_number: card.card_number,
      program_name: card.program_name,
      last_active: card.modified,
      issued_date: card.issue_date,
      card_status: card.card_status,
      tags: card._user_tags,
    }))
  }, [issuedCardsData])

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
      header: 'Card Ref ID',
      cell: ({ row }) => {
        const id = row.original?.id
        return (
          <Link to={`/issued-cards/${id}`}>
            <div className="capitalize text-center hover:underline">{id}</div>
          </Link>
        )
      },
    },
    {
      accessorKey: 'last_four_digits',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Card Last Four Digits
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => {
        const last_four_digits = row.original?.card_number?.slice(-4)
        return <div className="capitalize">{last_four_digits}</div>
      },
    },
    {
      accessorKey: 'program_name',
      header: 'Program Name',
      cell: ({ row }) => {
        const program_name = row.original.program_name
        return (
          <div className="capitalize">{program_name ? program_name : '-'}</div>
        )
      },
    },
    {
      // accessorKey: "createdAt",
      accessorKey: 'issued_date',
      header: 'Issued Date',
      cell: ({ row }) => {
        const dateTime = row.original?.last_active?.split('.')[0]
        console.log(dateTime)
        const date = dateTime?.split(' ')[0].split('-').reverse().join('-')

        return (
          <div className="flex flex-col items-center text-center">
            <span>{date}</span>
          </div>
        )
      },
    },

    {
      accessorKey: 'kyc_status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.original?.card_status
        switch (status) {
          case 'Active':
            return (
              <Badge variant="outline" className="bg-[#E4F5E9] text-[#16794C]">
                {status}
              </Badge>
            )
          case 'Inactive':
            return (
              <Badge variant="outline" className="">
                {status}
              </Badge>
            )
          case 'Blocked':
            return (
              <Badge
                variant="outline"
                className="bg-[#FFF1E7] text-[#BD3E0C] cursor-pointer"
              >
                {status}
              </Badge>
            )
          default:
            return <Badge variant="outline">{status}</Badge>
        }
      },
    },
    {
      header: 'Tags',
      cell: ({ row }) => {
        const tags = row.original?.tags?.slice(1).split(',')

        console.log('Tags: ', tags)
        return (
          <div className="flex items-center justify-center gap-2">
            {tags?.map((tag) => {
              switch (tag) {
                case 'KYC':
                  return (
                    <Badge key={tag} className="bg-blue-100 text-blue-800">
                      {tag}
                    </Badge>
                  )
                case 'Physical':
                  return (
                    <Badge key={tag} className="bg-green-100 text-green-800">
                      {tag}
                    </Badge>
                  )
                case 'Contactless':
                  return (
                    <Badge key={tag} className="bg-yellow-100 text-yellow-800">
                      {tag}
                    </Badge>
                  )
                case 'Reward':
                  return (
                    <Badge key={tag} className="bg-red-100 text-red-800">
                      {tag}
                    </Badge>
                  )
                default:
                  return <Badge key={tag}></Badge>
              }
            })}
          </div>
        )
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
        heading="No Cards Found."
        subHeading="No cards issued yet."
        buttonText="Contact Us"
      />
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>ISSUED CARDS</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <div className="w-full flex gap-2 justify-between max-md:flex-col max-md:gap-2 max-md:items-start max-md:w-[70%]">
            <div className="w-full flex gap-4 items-center">
              <div className="w-[25%]">
                <DataTableToolbar />
              </div>
              <div className="flex items-center gap-2">
                <Select
                  value={cardStatus ? cardStatus : 'All Statuses'}
                  onValueChange={(value) => {
                    setSearchParams((prev) => {
                      const newParams = new URLSearchParams(prev) // ✅ Clone previous params

                      if (value === 'All Statuses') {
                        newParams.delete('card_status')
                      } else {
                        newParams.set('card_status', value)
                        newParams.set('page', 0)
                      }
                      return newParams // ✅ Return a new object
                    })
                  }}
                >
                  <SelectTrigger className="w-[180px] h-8">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem value="All Statuses">All Statuses</SelectItem>
                      {cardStatusesLoading ? (
                        <SelectItem value="Loading" disabled></SelectItem>
                      ) : (
                        cardStatuses?.map((status) => (
                          <SelectItem key={status.name} value={status.name}>
                            {status.name}
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
                {issuedCardsLoading ? (
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
