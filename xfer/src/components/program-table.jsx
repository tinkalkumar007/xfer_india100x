import * as React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import MultipleSelector from '@/components/ui/multiple-selector'
import axios from '@/api/axios'
import { debounce } from 'lodash'
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
import { CalendarDateRangePicker } from './CalendarDateRangePicker'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import DataTableToolbar from '@/components/DataTableToolbar'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
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
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import { saveAs } from 'file-saver'
import * as Papa from 'papaparse'
import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogDescription,
} from '@/components/ui/alert-dialog'

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { DataTablePagination } from '@/components/DataTablePagination'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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
import DataTableViewOptions from './DataTableViewOptions'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { date, z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  useFrappeGetDocList,
  useFrappeCreateDoc,
  useFrappeUpdateDoc,
  useFrappeGetDoc,
  useFrappeGetDocCount,
} from 'frappe-react-sdk'
import { useToast } from '@/hooks/use-toast'
import Empty from './Empty'

const productSchema = z.object({
  program_name: z.string().min(1, 'Program name is required'),
  description: z.string().optional(),
  category: z.string().optional(),
  terms_conditions: z.string().optional(),
})

export function ProgramTableDemo() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [selectedFilter, setSelectedFilter] = React.useState('Today')

  const [searchParams, setSearchParams] = useSearchParams()
  const page = parseInt(searchParams.get('page') || '0')
  const limit = parseInt(searchParams.get('limit') || '1')
  const currentCategory = searchParams.get('category') || ''
  const currentStatus = searchParams.get('status') || ''

  const filters = Array.from(searchParams.entries())
    .map(([key, value]) => {
      if (key === 'query') {
        return ['program_name', 'like', `%${value}%`]
      }
      if (!(key === 'page') && !(key === 'limit')) {
        return [key, '=', value]
      }
    })
    .filter((item) => item !== undefined)

  console.log(filters)

  const onSubmit = (data) => {
    console.log(data)

    createDoc('Program', {
      program_name: data.program_name,
      category: data.category,
      description: data.description,
      status: 'Pending For Approval',
      terms_conditions: data.terms_conditions,
    })

    form.reset() // Reset form fields
    // Close the sheet after successful submission
  }

  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      program_name: '',
      description: '',
      category: '',
      terms_conditions: '',
    },
  })

  const columns = [
    {
      id: 'select',
      header: ({ table }) => (
        <div className="flex justify-start">
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
          className=""
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'program_name',
      header: 'Name',
      cell: ({ row }) => {
        return (
          <Link to={`/programs/${row.original.id}`}>
            <div className="capitalize text-center cursor-pointer hover:underline">
              {row.original.program_name || '-'}
            </div>
          </Link>
        )
      },
    },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: ({ row }) => (
        <div className="capitalize text-center">
          {row.original.category || '-'}
        </div>
      ),
    },
    {
      accessorKey: 'date',
      header: 'Created On',
      cell: ({ row }) => {
        console.log(row.original?.date)
        return (
          <div className="capitalize text-center">
            {row.original?.date
              ?.split('.')[0]
              ?.split(' ')[0]
              ?.split('-')
              .reverse()
              .join('-')}
          </div>
        )
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.original?.status
        switch (status) {
          case 'Active':
            return (
              <div className="w-full flex justify-center">
                <Badge
                  variant="outline"
                  className="bg-[#E4F5E9] text-[#16794C] cursor-pointer"
                >
                  {status}
                </Badge>
              </div>
            )
          case 'Pending for approval':
            return (
              <div className="w-full flex justify-center">
                <Badge variant="outline">Pending</Badge>
              </div>
            )
          case 'Inactive':
            return (
              <div className="w-full flex justify-center">
                <Badge
                  variant="outline"
                  className="cursor-pointer bg-[#FFF0F0] text-[#B52A2A]"
                >
                  {status}
                </Badge>
              </div>
            )
          case 'Suspended':
            return (
              <div className="w-full flex justify-center">
                <Badge
                  variant="outline"
                  className="bg-[#FFF0F0] text-[#B52A2A] cursor-pointer"
                >
                  {status}
                </Badge>
              </div>
            )
          case 'Blocked':
            return (
              <div className="w-full flex justify-center">
                <Badge
                  variant="outline"
                  className="bg-[#FFF0F0] text-[#B52A2A] cursor-pointer"
                >
                  {status}
                </Badge>
              </div>
            )
          case 'Terminated':
            return (
              <div className="w-full flex justify-center">
                <Badge
                  variant="outline"
                  className="bg-[#FFF0F0] text-[#B52A2A] cursor-pointer"
                >
                  {status}
                </Badge>
              </div>
            )
          default:
            return (
              <div className="w-full flex justify-center">
                {status ? <Badge variant="primary">{status}</Badge> : <p>-</p>}
              </div>
            )
        }
      },
    },
    {
      accessorKey: 'tags',
      header: 'Tags',
      cell: ({ row }) => {
        const tags = row.original?.tags?.slice(1).split(',')

        console.log('User tags:', row.original?.tags)
        return (
          <div className="flex items-center justify-center gap-2">
            {tags?.length > 0 &&
              tags?.map((tag, index) => {
                if (index <= 3) {
                  switch (tag) {
                    case 'KYC':
                      return (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-[#E4F5E9] text-[#16794C] cursor-pointer tracking-widest max-sm:tracking-normal"
                        >
                          {tag}
                        </Badge>
                      )
                    case 'Reward':
                      return (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-[#FFF1E7] text-[#BD3E0C] cursor-pointer tracking-widest max-sm:tracking-normal"
                        >
                          {tag}
                        </Badge>
                      )
                    case 'Contactless':
                      return (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-[#F9F0FF] text-[#6E399D] cursor-pointer tracking-widest max-sm:tracking-normal"
                        >
                          {tag}
                        </Badge>
                      )
                    case 'Physical':
                      return (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-[#F5FBFC] text-[#267A94] cursor-pointer tracking-widest max-sm:tracking-normal"
                        >
                          {tag}
                        </Badge>
                      )
                    default:
                      return (
                        <Badge key={index} variant="outline" className="">
                          {tag}
                        </Badge>
                      )
                  }
                }
              })}
            {tags?.length > 4 && (
              <div className="flex flex-wrap">
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button
                      className="cursor-pointer tracking-wider text-xs h-6"
                      variant="outline"
                    >
                      +{tags.length - 4} more
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="flex gap-4 flex-wrap">
                      {tags?.map((tag, _i) => {
                        if (_i > 3) {
                          return (
                            <Badge
                              variant="primary"
                              className="cursor-pointer tracking-widest"
                              key={tag}
                            >
                              {tag}
                            </Badge>
                          )
                        }
                      })}
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div>
            )}
          </div>
        )
      },
    },
  ]

  const {
    data: programData,
    isLoading: programDataLoading,
    isValidating: programDataValidating,
  } = useFrappeGetDocList('Program', {
    fields: [
      '_user_tags',
      'name',
      'program_name',
      'category',
      'description',
      'status',
      'creation',
    ],
    filters: searchParams.size > 0 && filters,
    limit_start: page * limit,
    limit: limit,
  })

  const { data, isLoading, isValidating } = useFrappeGetDocList('Program', {
    fields: ['name'],
  })

  const { data: totalCount, isLoading: totalCountLoading } =
    useFrappeGetDocCount('Program', searchParams.size > 0 && filters)

  console.log('Count: ', totalCount)

  if (!programDataLoading) {
    console.log('Program Data:', programData)
  }

  const tableData = React.useMemo(() => {
    if (!programData) return []
    return programData.map((program) => ({
      id: program.name, // Frappe's unique identifier
      program_name: program.program_name,
      category: program.category,
      date: program.creation,
      status: program.status,
      tags: program._user_tags,
    }))
  }, [programData])

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

  const { toast } = useToast()

  const { data: programStatus, isLoading: programStatusLoading } =
    useFrappeGetDocList('Program Status', {
      fields: ['*'],
    })

  const { data: programCategory, isLoading: programCategoryLoading } =
    useFrappeGetDocList('Program Category', {
      fields: ['*'],
    })

  console.log('Program Status:', programStatus)
  console.log('Program Category:', programCategory)

  const { createDoc } = useFrappeCreateDoc()
  const { updateDoc } = useFrappeUpdateDoc()

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
        heading="No Programs Found."
        subHeading="You have not created any programs yet. To create one, contact administrator."
        buttonText="Contact Us"
      />
    )
  }

  // if (programDataLoading) {
  //   return (
  //     <div className="w-full h-full flex justify-center items-center">
  //       <div className="spinner w-14 h-14 rounded-full border-4 border-gray-200 border-r-blue-500 animate-spin"></div>
  //     </div>
  //   )
  // }

  return (
    <Card>
      <CardHeader>
        <CardTitle>PROGRAMS LIST</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full flex flex-col gap-4">
          <div className="w-full flex gap-2 justify-between max-md:flex-col max-md:gap-2 max-md:items-start max-md:w-[70%]">
            <div className="w-full max-md:w-[100%] flex gap-2">
              <div className="w-[25%]">
                <DataTableToolbar />
              </div>
              <div className="flex items-center gap-2">
                <Select
                  value={currentCategory ? currentCategory : 'All Categories'}
                  onValueChange={(value) => {
                    setSearchParams((prev) => {
                      const newParams = new URLSearchParams(prev) // ✅ Clone previous params

                      if (value === 'All Categories') {
                        newParams.delete('category')
                      } else {
                        newParams.set('category', value)
                        newParams.set('page', 0)
                      }
                      return newParams // ✅ Return a new object
                    })
                  }}
                >
                  <SelectTrigger className="w-[180px] h-8">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Category</SelectLabel>
                      <SelectItem value="All Categories">
                        All Categories
                      </SelectItem>
                      {programCategoryLoading ? (
                        <SelectItem value="Loading" disabled></SelectItem>
                      ) : (
                        programCategory?.map((category) => (
                          <SelectItem key={category.name} value={category.name}>
                            {category.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Select
                  value={currentStatus ? currentStatus : 'All Statuses'}
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
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem value="All Statuses">All Statuses</SelectItem>
                      {programStatusLoading ? (
                        <SelectItem value="Loading" disabled></SelectItem>
                      ) : (
                        programStatus?.map((status) => (
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
            {/* <DataTableToolbar
                  table={table}
                  inputFilter="program_name"
                  status={programStatus}
                  category={programCategory}
                /> */}

            <div className="flex gap-2 items-center">
              <Button variant="outline" className="h-8" onClick={downloadCSV}>
                <FileDown />
              </Button>

              <DataTableViewOptions table={table} />
            </div>
          </div>
          <div className="rounded-md border grid grid-cols-1">
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
                {programDataLoading ? (
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
