import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'

const data = [
  {
    product_id: '1',
    category: 'Entertainment',
    name: 'OTT',
    program_manager: 'ONO',
    kycrequired: true,
    contactlessallowed: true,
    physicalallowed: false,
    tags: 'kyc',
    limit: '30k-1Lakh',
    rewardapplicable: false,
    issued_date: '01-01-2021',
    status: 'true',
  },
  {
    product_id: '2',
    category: 'finance',
    name: 'Shopping',
    program_manager: 'Privacy Card',
    kycrequired: false,
    contactlessallowed: true,
    physicalallowed: true,
    limit: '50k-5Lakh',
    rewardapplicable: true,
    status: 'false',
    issued_date: '02-06-2007',
  },
  {
    product_id: '3',
    category: 'healthcare',
    name: 'Beauty',
    program_manager: 'XFER',
    kycrequired: true,
    contactlessallowed: false,
    physicalallowed: true,
    limit: '25k-5Lakh',
    rewardapplicable: false,
    status: 'true',
    issued_date: '03-03-2024',
  },
]

const ManagerProgramList = ({
  customerCardsData,
  customerCardsDataLoading,
}) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})

  console.log('Customer Cards Data:', customerCardsData)

  const tableData = React.useMemo(() => {
    if (!customerCardsData) return []
    return customerCardsData?.map((cardData) => ({
      id: cardData.name, // Frappe's unique identifier
      card_reference_id: cardData.card_reference_id,
      limit: cardData.limit,
      issued_date: cardData.issue_date,
      card_status: cardData.card_status,
    }))
  }, [customerCardsData])

  const columns = [
    {
      accessorKey: 'name',
      header: 'Reference ID',
      cell: ({ row }) => (
        <div className="capitalize text-center cursor-pointer hover:underline">
          {row.original.card_reference_id}
        </div>
      ),
    },

    {
      accessorKey: 'limit',
      header: 'Limit',
      // ({ column }) => {
      //   return (
      //     <Button
      //       variant="ghost"
      //       onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      //     >
      //       Limit
      //       <ArrowUpDown />
      //     </Button>
      //   )
      // },
      cell: ({ row }) => (
        <div className="text-center">{row.original.limit}</div>
      ),
    },

    {
      accessorKey: 'issued_date',
      header: 'Issued Date',
      // ({ column }) => {
      //   return (
      //     <Button
      //       variant="ghost"
      //       onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      //     >
      //       Launch Date
      //       <ArrowUpDown />
      //     </Button>
      //   )
      // },
      cell: ({ row }) => (
        <div className="text-center">{row.original.issued_date}</div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.original.card_status
        return (
          <div className="text-center">
            {status === 'Active' && (
              <Badge className="bg-[#E4F5E9] text-[#16794C] cursor-pointer">
                Active
              </Badge>
            )}
            {status === 'KYC Pending' && (
              <Badge className="bg-[#E4F5E9] text-[#16794C] cursor-pointer">
                Pending
              </Badge>
            )}
            {status === 'Blocked' && (
              <Badge className="bg-[#FFF0F0] text-[#B52A2A] cursor-pointer">
                Blocked
              </Badge>
            )}
          </div>
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
  return (
    <div className="pt-2 px-4 pb-4">
      <div className="grid grid-cols-1 gap-2 border rounded-md">
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
    </div>
  )
}

export default ManagerProgramList
