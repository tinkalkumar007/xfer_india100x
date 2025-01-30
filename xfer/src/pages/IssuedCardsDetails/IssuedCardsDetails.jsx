import React from 'react'
import VerticalCardFront from '@/assets/front-img.png'
import HorizontalCardBack from '@/assets/HorizontalCardBack.png'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { IndianRupee } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
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
import {
  useFrappeAuth,
  useFrappeCreateDoc,
  useFrappeGetDoc,
  useFrappeGetDocCount,
  useFrappeGetDocList,
} from 'frappe-react-sdk'
import { useNavigate, useParams } from 'react-router-dom'

// const data = {
//   is_physical: true,
//   is_addoncard: true,
// }
const IssuedCardsDetails = () => {
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})

  const { id } = useParams()

  const { data: totalTransactions, isLoading: totalTransactionsLoading } =
    useFrappeGetDocCount('Transaction Logs', [['card_reference_id', '=', id]])

  const { data: totalSpendsData, isLoading: totalSpendsDataLoading } =
    useFrappeGetDocList('Transaction Logs', {
      fields: ['*'],
      filters: [['card_reference_id', '=', id]],
    })

  const totalSpends = totalSpendsData?.reduce((acc, current) => {
    if (current.status === 'Successful') {
      return acc + current.amount
    }
    return acc
  }, 0)

  const { data: cardData, isLoading: cardDataLoading } = useFrappeGetDoc(
    'Cards',
    id
  )

  const { data: programData, isLoading: programDataLoading } = useFrappeGetDoc(
    'Program',
    cardData?.program_name
  )

  console.log('program Data:', programData)

  const { data: cardTransactionLogs, isLoading: cardTransactionLogsLoading } =
    useFrappeGetDocList('Transaction Logs', {
      fields: ['*'],
      filters: [['card_reference_id', '=', id]],
    })

  console.log(cardTransactionLogs)

  const tableData = React.useMemo(() => {
    if (!cardTransactionLogs) return []
    return (
      !cardTransactionLogsLoading &&
      cardTransactionLogs?.map((log) => ({
        id: log.name, // Frappe's unique identifier
        card_reference_id: log.card_reference_id,
        transaction_id: log.transaction_id,
        from: log.from_account,
        to: log.to_account,
        amount: log.amount,
        date: log.creation,
        status: log.status,
      }))
    )
  }, [cardTransactionLogs])

  const columns = [
    {
      accessorKey: 'transaction_id',
      header: 'Transaction ID',
      cell: ({ row }) => (
        <div className="text-center hover:underline">
          {row.original.transaction_id}
        </div>
      ),
    },
    {
      accessorKey: 'card_reference_id',
      header: 'Card Reference ID',
      cell: ({ row }) => (
        <div className="text-center hover:underline">
          {row.original.card_reference_id}
        </div>
      ),
    },

    {
      accessorKey: 'from',
      header: 'From',
      cell: ({ row }) => <div className="text-center">{row.original.from}</div>,
    },
    {
      accessorKey: 'to',
      header: 'To',
      cell: ({ row }) => <div className="text-center">{row.original.to}</div>,
    },

    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: ({ row }) => {
        const amount = row.original.amount // Access the raw data directly
        // const type = row.original.Type // Access the Type from raw data
        // const colorClass = type === 'Credit' ? 'text-green-500' : 'text-red-500'
        const [whole, decimal] = amount.toFixed(2).split('.') // Split the amount into whole and decimal parts
        return (
          <div className="text-center flex items-center justify-center">
            <span>₹{whole}</span>
            <span className="text-gray-500">.{decimal}</span>
          </div>
        )
      },
    },
    {
      accessorKey: 'date',
      header: 'Date',
      cell: ({ row }) => {
        const dateTime = row.original?.date?.split('.')[0]

        const date = dateTime?.split(' ')[0].split('-').reverse().join('-')

        const time = dateTime.split(' ')[1]

        return (
          <div className="flex flex-col items-center text-center">
            <span>{date}</span>
            <span className="text-slate-400">{time}</span>
          </div>
        )
      },
    },
    {
      accessorKey: 'status',
      header: `Status`,
      cell: ({ row }) => {
        const status = row.original.status

        switch (status) {
          case 'Successful':
            return (
              <div className="text-center">
                <Badge className="bg-[#e4f5e9] text-[#16794c] text-center">
                  Success
                </Badge>
              </div>
            )
          case 'Pending':
            return (
              <div className="text-center">
                <Badge className="bg-[#fff7d3] text-[#ab6e05] text-center">
                  Pending
                </Badge>
              </div>
            )

          case 'Failed':
            return (
              <div className="text-center">
                <Badge className="bg-[#ffe6e6] text-[#d32f2f] text-center">
                  Failed
                </Badge>
              </div>
            )

          default:
            return <div className="text-center">-</div>
        }
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
        pageSize: 3, // Set page size to 5
      },
    },
  })

  return (
    <div className="relative w-full flex-col md:flex-row gap-2">
      <div className="w-full lg:w-[100%] flex flex-col gap-2">
        <div className="w-full bg-muted/50 rounded-md border">
          <div className="flex gap-2 px-6 pt-4 pb-2 items-center">
            <h2 className="font-semibold text-md">
              {cardData?.card_reference_id}
            </h2>
            <div className="border-r px-4">
              {cardData?.card_status === 'Active' && (
                <Badge
                  variant="outline"
                  className="bg-[#E4F5E9] text-[#16794C] cursor-pointer"
                >
                  {cardData?.card_status}
                </Badge>
              )}
              {cardData?.card_status === 'Inactive' && (
                <Badge
                  variant="outline"
                  className="bg-[#E4F5E9] text-[#16794C] cursor-pointer"
                >
                  {cardData?.card_status}
                </Badge>
              )}
              {cardData?.card_status === 'Blocked' && (
                <Badge
                  variant="outline"
                  className="bg-[#E4F5E9] text-[#16794C] cursor-pointer"
                >
                  {cardData?.card_status}
                </Badge>
              )}
            </div>

            <p className="font-medium text-md border-r px-4">
              Name :{' '}
              <span className="font-medium text-muted-foreground">
                {cardData?.holder_name}
              </span>
            </p>
          </div>
          <div className="w-full flex justify-center">
            <Separator className="w-[98%]" />
          </div>
          <div className="w-full">
            <div className="flex justify-left w-full  gap-2 px-6 py-6 items-stretch">
              <div className="flex justify-left items-center">
                <img src={VerticalCardFront} className="w-[90%]" alt="" />
              </div>
              <div className=" w-full ">
                <div className="flex w-full flex-col rounded-md border bg-white ">
                  <div className="px-4 py-2">
                    <h2 className="text-lg font-semibold">Card Details</h2>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-4 gap-2 w-full px-4 py-4">
                    <div className="flex flex-col gap-1 justify-between items-start w-full">
                      <p className="font-medium text-xs text-muted-foreground">
                        CARD REF ID
                      </p>
                      <span className="font-medium text-sm">
                        {cardData?.card_reference_id}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1 justify-between items-start w-full">
                      <p className="font-medium text-xs text-muted-foreground">
                        CARD NUMBER
                      </p>
                      <span className="font-medium text-sm">
                        {' '}
                        {cardData?.card_number}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1 justify-between items-start w-full">
                      <p className="font-medium text-xs text-muted-foreground">
                        CARD TYPE
                      </p>
                      <span className="font-medium text-sm">
                        {' '}
                        {cardData?.card_type}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1 justify-between items-start w-full">
                      <p className="font-medium text-xs text-muted-foreground">
                        CARD NATURE
                      </p>
                      <span className="font-medium text-sm">
                        {cardData?.card_nature}
                      </span>
                    </div>
                    <div className="flex flex-col mt-6 gap-1 justify-between items-start w-full">
                      <p className="font-medium text-xs text-muted-foreground">
                        PIN TYPE
                      </p>
                      <span className="font-medium text-sm">
                        {cardData?.pin_type}{' '}
                      </span>
                    </div>
                    <div className="mt-6 flex flex-col gap-1 justify-between items-start w-full">
                      <p className="font-medium text-xs text-muted-foreground">
                        CHANNEL
                      </p>
                      <span className="font-medium text-sm">
                        {cardData?.channel}
                      </span>
                    </div>
                    <div className="mt-6 flex flex-col gap-1 justify-between items-start w-full">
                      <p className="font-medium text-xs text-muted-foreground">
                        KYC STATUS
                      </p>
                      {cardData?.kyc_status === 'Under Review' && (
                        <Badge>{cardData?.kyc_status}</Badge>
                      )}
                    </div>
                    <div className="mt-6 flex flex-col gap-1 justify-between items-start w-full">
                      <p className="font-medium text-xs text-muted-foreground">
                        TAGS
                      </p>
                      <div className="flex font-medium text-sm gap-2">
                        {' '}
                        <Badge className="bg-[#eee4f5] text-[#7105ab]">
                          Add On Card
                        </Badge>
                        <Badge className="bg-[#d3e5ff] text-[#051eab]">
                          Physical
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-4 gap-2 w-full px-4 py-4">
                    <div className="flex flex-col gap-1 justify-between items-start w-full">
                      <p className="font-medium text-xs text-muted-foreground">
                        TOTAL SPENDS
                      </p>
                      <span className="font-medium text-sm">
                        {' '}
                        &#8377; {totalSpends ? totalSpends : '-'}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1 justify-between items-start w-full">
                      <p className="font-medium text-xs text-muted-foreground">
                        TOTAL TRANSACTIONS
                      </p>
                      <span className="font-medium text-sm">
                        {' '}
                        {!totalTransactionsLoading && totalTransactions}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1 justify-between items-start w-full">
                      <p className="font-medium text-xs text-muted-foreground">
                        BALANCE
                      </p>
                      <span className="font-medium text-sm">
                        {' '}
                        {cardData?.balance}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1 justify-between items-start w-full">
                      <p className="font-medium text-xs text-muted-foreground">
                        CARD NATURE
                      </p>
                      <span className="font-medium text-sm"> VISA</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <div className=" w-[30%] rounded-md bg-muted/50 border  space-y-2">
            <h2 className="text-md font-medium py-2 px-4">
              Transaction Limitations
            </h2>
            <div className="w-full flex justify-center">
              <Separator className="w-[96%] text-center -mt-2" />
            </div>
            <div className="w-full flex flex-col gap-2 px-4 py-2">
              {programData?.table_eosn?.map((current) => (
                <div
                  key={current.name}
                  className="flex items-center justify-between space-x-4"
                >
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="text-sm font-medium">{current?.channel}</p>
                      <p className="text-sm text-muted-foreground">
                        {current?.is_enabled ? 'Enabled' : 'Disabled'}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6 items-center">
                    <p
                      className={`${
                        current?.is_enabled ? '' : 'blur-sm'
                      } text-sm font-medium tracking-wide`}
                    >
                      &#8377; {current?.max_amount}
                    </p>
                    <Switch disabled checked={current?.is_enabled} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className=" w-[70%] rounded-md bg-muted/50 border  space-y-2">
            <h2 className="text-md font-medium py-2 px-4">Transaction Logs</h2>
            <div className="w-full flex justify-center">
              <Separator className="w-[96%] text-center -mt-2" />
            </div>
            <div className="grid grid-cols-1 gap-2">
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
        </div>
      </div>
    </div>
  )
}

export default IssuedCardsDetails
