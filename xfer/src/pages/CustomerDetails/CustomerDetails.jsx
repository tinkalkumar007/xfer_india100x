import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import ManagerProgramList from '@/components/ManagerProgramList'
import TransactionActivityLogs from '@/components/TransactionActivityLogs'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import OnoLogo from '@/assets/ono-logo.png'
import { Separator } from '@/components/ui/separator'
import {
  Accessibility,
  Clock,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  User,
} from 'lucide-react'

import { AlertTriangle } from 'lucide-react'
import { useParams } from 'react-router-dom'
import {
  useFrappeGetDoc,
  useFrappeGetDocCount,
  useFrappeGetDocList,
} from 'frappe-react-sdk'
import { filterFns } from '@tanstack/react-table'
import React from 'react'

const activities = [
  {
    id: 1,
    type: 'Large Transaction',
    description: 'Unusual transaction amount detected',
    severity: 'High',
    date: '2024-03-10',
  },
  {
    id: 2,
    type: 'Login Attempt',
    description: 'Multiple failed login attempts',
    severity: 'Medium',
    date: '2024-03-09',
  },
  {
    id: 3,
    type: 'Card Purchase',
    description: 'Card purchased with suspicious amount',
    severity: 'Low',
    date: '2024-03-08',
  },
]

const CustomerDetails = () => {
  const { id } = useParams()
  const { data: totalCards, isLoading: totalCardsLoading } =
    useFrappeGetDocCount('Cards', [['mobile_number', '=', id]])

  const { data: customerCardsData, isLoading: customerCardsDataLoading } =
    useFrappeGetDocList('Cards', {
      fields: ['*'],
      filters: [['mobile_number', '=', id]],
    })
  const { data: CustomerDetails, isLoading: customerDetailsLoading } =
    useFrappeGetDoc('Customers', id)

  console.log('Customer details', CustomerDetails)

  const {
    data: customerTransactionLogs,
    isLoading: customerTransactionLogsLoading,
  } = useFrappeGetDocList('Transaction Logs', {
    fields: ['*'],
    filters: [['customer_mobile_number', '=', id]],
  })

  if (!customerTransactionLogsLoading) {
    console.log('Customer Transaction Logs', customerTransactionLogs)
  }

  const totalBalance = React.useMemo(() => {
    if (!customerCardsData) return null
    return customerCardsData.reduce((acc, current) => acc + current.balance, 0)
  }, [customerCardsData])

  return (
    <>
      <div className="w-full flex flex-col lg:flex-row gap-2 items-center border rounded-md px-2">
        <div className="flex gap-4 px-4 py-6 items-center w-full lg:w-[30%]">
          <div className=" lg:w-[30%] flex justify-center items-center">
            <img src={OnoLogo} alt="" width={90} height={90} />
          </div>
          <div className="flex flex-col gap-1 w-[70%]">
            <div className="flex gap-2">
              <h2 className="font-bold text-xl">
                {CustomerDetails?.first_name} {CustomerDetails?.last_name}
              </h2>
              <Badge className="bg-[#e4f5e9] text-[#16794c]">Active</Badge>
            </div>
            <h2 className="text-sm text-muted-foreground">
              Customer ID :{' '}
              <span className="font-medium">{CustomerDetails?.name}</span>
            </h2>
            <p className="text-sm text-muted-foreground">
              Created On :{' '}
              <span className="font-medium">
                {CustomerDetails?.creation
                  ?.split('.')[0]
                  ?.split(' ')[0]
                  .split('-')
                  .reverse()
                  .join('-')}
              </span>
            </p>
          </div>
        </div>

        <div>
          <Separator orientation="vertical" className="h-28" />
        </div>

        <div className="flex flex-col gap-2 w-full lg:w-[70%] px-4 py-2">
          <div className="flex justify-between">
            <div className="flex gap-2 items-center w-full">
              <div>
                <User size={20} />
              </div>
              <div className="w-full">
                <p className="text-sm text-muted-foreground w-[50%]">
                  {CustomerDetails?.first_name}
                </p>
                <p className="text-sm font-medium text-muted-foreground w-[50%]">
                  First Name
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center w-full">
              <div>
                <Phone size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground ">
                  {CustomerDetails?.mobile_no}
                </p>
                <p className="text-sm font-medium text-muted-foreground">
                  Phone
                </p>
              </div>
            </div>
            <div className="flex gap-2  items-center w-full">
              <div>
                <Mail size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {CustomerDetails?.email}
                </p>
                <p className="text-sm font-medium text-muted-foreground ">
                  Email
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-2 items-center w-full">
              <div>
                <ShieldCheck size={20} />
              </div>
              <div>
                <Badge className="bg-[#e4f5e9] text-[#16794c]">
                  {CustomerDetails?.kyc_level}
                </Badge>
                <p className="text-sm font-medium text-muted-foreground">
                  KYC Status
                </p>
              </div>
            </div>
            <div className="flex gap-1 items-center w-full">
              <div>
                <Clock size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">-</p>
                <p className="text-sm font-medium text-muted-foreground">
                  Last Active
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center w-full">
              <div>
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground ">
                  {`${CustomerDetails?.address_line_1} ${CustomerDetails?.address_line_2} ${CustomerDetails?.city} ${CustomerDetails?.country}`}
                </p>
                <p className="text-sm font-medium text-muted-foreground ">
                  Address
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-full flex flex-col md:flex-row gap-2">
        <div className="w-full lg:w-[40%] flex flex-col gap-2">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-2 items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Flagged Activities
                </h2>
                <AlertTriangle className="text-[#B52A2A] w-6 h-6" />
              </div>
            </div>

            <div className="space-y-4">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className={`border-l-4 ${
                    activity.severity === 'High' && 'border-[#B52A2A]'
                  } ${activity.severity === 'Medium' && 'border-[#BD3E0C]'} ${
                    activity.severity === 'Low' && 'border-[#267A94]'
                  } bg-muted/50 p-4`}
                >
                  <div className="flex justify-between">
                    <h3
                      className={`text-sm font-medium ${
                        activity.severity === 'High' && ' text-[#B52A2A]'
                      }
                    ${activity.severity === 'Medium' && 'text-[#BD3E0C]'}
                    ${activity.severity === 'Low' && 'text-[#267A94]'}
                      `}
                    >
                      {activity.type}
                    </h3>
                    <Badge
                      className={`px-2.5 py-0.5 text-xs font-medium ${
                        activity.severity === 'High' &&
                        'bg-[#FFF0F0] text-[#B52A2A]'
                      } ${
                        activity.severity === 'Medium' &&
                        'bg-[#FFF1E7] text-[#BD3E0C]'
                      } ${
                        activity.severity === 'Low' &&
                        'bg-[#F5FBFC] text-[#267A94]'
                      }`}
                    >
                      {activity.severity}
                    </Badge>
                  </div>
                  <p
                    className={`mt-1 text-sm ${
                      activity.severity === 'High' && ' text-[#B52A2A]'
                    } ${activity.severity === 'Medium' && ' text-[#BD3E0C]'} ${
                      activity.severity === 'Low' && ' text-[#267A94]'
                    }`}
                  >
                    {activity.description}
                  </p>
                  <p
                    className={`mt-2 text-xs ${
                      activity.severity === 'High' && ' text-[#B52A2A]'
                    } ${activity.severity === 'Medium' && ' text-[#BD3E0C]'} ${
                      activity.severity === 'Low' && ' text-[#267A94]'
                    }`}
                  >
                    {activity.date}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full lg:w-[60%] flex flex-col gap-2">
          <div className="flex flex-col gap-2 rounded-md border bg-muted/50">
            <div className="flex flex-col px-4 pt-4 pb-2">
              <h2 className="font-semibold text-lg">Card Details</h2>
              <p className="text-muted-foreground">
                Invite your team members to collaborate.
              </p>
            </div>
            <div className="w-full flex justify-center">
              <Separator className="w-[96%]" />
            </div>
            <div>
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-2 px-4 py-2 w-full">
                <div className="flex flex-col gap-1 xl:border-r-2 ">
                  <p className="font-medium text-sm text-muted-foreground">
                    Total Cards
                  </p>
                  <p className="font-medium text-md">
                    {!totalCardsLoading && totalCards}
                  </p>
                </div>

                <div className="flex flex-col gap-1 xl:border-r-2">
                  <p className="font-medium text-sm text-muted-foreground">
                    Total Balance
                  </p>
                  <p className="font-medium text-md">&#8377;{totalBalance}</p>
                </div>

                <div className="flex flex-col gap-1 xl:border-r-2 ">
                  <p className="font-medium text-sm text-muted-foreground">
                    Total Spends
                  </p>
                  <p className="font-medium text-md">&#8377;500</p>
                </div>

                <div className="flex flex-col gap-1">
                  <p className="font-medium text-sm text-muted-foreground">
                    Transaction Limit
                  </p>
                  <p className="font-medium text-md">&#8377;100000</p>
                </div>
              </div>
            </div>
          </div>
          <div className="border rounded-md flex flex-col gap-2">
            <div className="px-4 py-2 flex flex-col">
              <h2 className="text-lg font-semibold">Cards List</h2>
              <p className="text-muted-foreground text-md ">
                Below are the total cards list.
              </p>
            </div>
            <div className="w-full flex justify-center">
              <Separator className="w-[96%]" />
            </div>
            <div>
              <ManagerProgramList
                customerCardsData={customerCardsData}
                customerCardsDataLoading={customerCardsDataLoading}
              />
              <div className="w-full flex justify-center pb-6">
                <p className="text-sm font-semibold underline tracking-wide cursor-pointer">
                  View All Cards
                </p>
              </div>
            </div>
          </div>
          <div className="border rounded-md flex flex-col gap-2">
            <div className="px-4 py-2 flex flex-col">
              <h2 className="text-lg font-semibold">Transaction Logs</h2>
              <p className="text-muted-foreground text-md ">
                Below are the total transaction logs.
              </p>
            </div>
            <div className="w-full flex justify-center">
              <Separator className="w-[96%]" />
            </div>
            <div>
              <TransactionActivityLogs
                customerTransactionLogs={customerTransactionLogs}
                customerTransactionLogsLoading={customerTransactionLogsLoading}
              />
            </div>
            <div className="w-full flex justify-center">
              <Separator className="w-[96%]" />
            </div>
            <div className="w-full flex justify-center pb-6">
              <p className="text-sm font-semibold underline tracking-wide cursor-pointer">
                View All Logs
              </p>
            </div>
          </div>
        </div>
        {/* <div className="w-full ">
          <Card>
            <CardHeader>
              <CardTitle>
                <div className="flex gap-2 items-center">
                  <div>
                    <Avatar>
                      <AvatarImage src={OnoLogo} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>
                  <div>ONO</div>
                </div>
              </CardTitle>
              <CardDescription>
                <div className="mt-2 flex  gap-4">
                  <div>
                    <h2>
                      Status :{' '}
                      <span className="font-semibold">
                        <Badge variant="primary">Active</Badge>
                      </span>
                    </h2>
                  </div>
                  <div className="">
                    <h2 className="">
                      Category :{' '}
                      <span className="font-semibold">Entertainment</span>
                    </h2>
                  </div>
                  <div>
                    <h2>
                      Manager : <span className="font-semibold">ONO</span>
                    </h2>
                  </div>
                  <div>
                    <h2>
                      Launch Date :{' '}
                      <span className="font-semibold">14/12/2024</span>
                    </h2>
                  </div>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Customers
                      </CardTitle>
                      <Users strokeWidth={1.5} />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">200</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Amount
                      </CardTitle>
                      <IndianRupee strokeWidth={1.5} />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">&#8377;5000</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Active Programs
                      </CardTitle>
                      <Activity strokeWidth={1.5} />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">34</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Programs
                      </CardTitle>
                      <Grid strokeWidth={1.5} />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">50</div>
                    </CardContent>
                  </Card>
                </div>
                
  
                <div className="w-full space-y-2">
                  <Card>
                    <Table>
                      <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                          <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                              return (
                                <TableHead
                                  className="text-center"
                                  key={header.id}
                                >
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
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </div> */}
      </div>
    </>
  )
}

export default CustomerDetails
