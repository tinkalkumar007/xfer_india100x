import * as React from 'react'
import { Link } from 'react-router-dom'
import axios from '../api/axios'
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
import { status } from '@/data/issued-cards-data'
import DataTableToolbar from './DataTableToolbar'
import DataTableViewOptions from './DataTableViewOptions'
import { useFrappeGetDocList } from 'frappe-react-sdk'

const fieldIconMap = {
  kycRequired: {
    icon: (
      <Badge className="bg-[#e4f5e9] text-[#16794c] cursor-pointer">KYC</Badge>
    ),
    label: 'KYC Required',
  },
  contactlessAllowed: {
    icon: (
      <Badge className="bg-[#f9f0ff] text-[#6e399d]  cursor-pointer">
        Contactless
      </Badge>
    ),
    label: 'Contactless Allowed',
  },
  isPhysical: {
    icon: (
      <Badge className="bg-[#F5FBFC] text-[#267A94]  cursor-pointer">
        Physical
      </Badge>
    ),
    label: 'Physical Not Allowed',
  },
  isRewardsApplicable: {
    icon: (
      <Badge className="bg-[#fff1e7] text-[#bd3e0c] cursor-pointer">
        Reward
      </Badge>
    ),
    label: 'Rewards Applicable',
  },
}

export function IssuedCardsTable() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  // const [data, setData] = React.useState([]);
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})

  const { data: issuedCardsData, isLoading: issuedCardsLoading } =
    useFrappeGetDocList('Cards', {
      fields: [
        'card_reference_id',
        'card_number',
        'program_category',
        'modified',
        'issue_date',
        'card_status',
        '_user_tags',
      ],
    })

  if (!issuedCardsLoading) {
    console.log(issuedCardsData)
  }

  const tableData = React.useMemo(() => {
    if (!issuedCardsData) return []
    return issuedCardsData.map((card) => ({
      id: card.card_reference_id,
      card_number: card.card_number,
      program_category: card.program_category,
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
          <Link to={`/issued-cards/issuedcards-details/${id}`}>
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
      accessorKey: 'program_category',
      header: 'Program Category',
      cell: ({ row }) => {
        const category = row.original.program_category
        //console.log(product);
        return <div className="capitalize">{category ? category : '-'}</div>
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
        return (
          <div>
            {status === null && '-'}
            {status === 'Active' && (
              <Badge className="bg-[#e4f5e9] text-[#16794c]">Active</Badge>
            )}
            {status === 'Inactive' && (
              <Badge className="bg-[#fff0f0] text-[#b52a2a]">Inactive</Badge>
            )}
          </div>
        )
      },
    },
    {
      header: 'Tags',
      cell: ({ row }) => {
        const tags = row.original?.tags.slice(1).split(',')

        console.log('Tags: ', tags)
        return (
          <div className="flex items-center justify-center gap-2">
            {tags.map((tag) => {
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
                  return (
                    <Badge key={tag} className="bg-gray-100 text-gray-800">
                      -
                    </Badge>
                  )
              }
            })}
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
                Activate
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
  // /card/allIssuedCards
  // State for table data
  // const [loading, setLoading] = React.useState(true); // State for loading
  // const [error, setError] = React.useState(null); // State for error handling

  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('/card/allIssuedCards',{
  //         withCredentials: true,
  //       });
  //       console.log(response.data.data);
  //       setData(response.data.data);
  //     } catch (err) {
  //       console.error('Error fetching data:', err);
  //       //setError('Failed to fetch data. Please try again later.');
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Issued Cards</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <div className="w-full flex gap-2 justify-between max-md:flex-col max-md:gap-2 max-md:items-start max-md:w-[70%]">
            <div className="w-full">
              {/* <DataTableToolbar
                table={table}
                inputFilter="card_ref_id"
                status={status}
              /> */}
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
