import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import * as React from 'react'
import Lottie from 'lottie-react'
import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineTitle,
  TimelineIcon,
  TimelineDescription,
  TimelineContent,
  TimelineTime,
} from '@/components/ui/timeline'
import OrderTruck from '@/assets/lottie-json/order-details.json'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableFooter,
  TableCaption,
  TableRow,
} from '@/components/ui/table'

import { useNavigate, useParams } from 'react-router-dom'
import { saveAs } from 'file-saver'
import * as Papa from 'papaparse'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import {
  Phone,
  CreditCard,
  Download,
  Mail,
  LocateIcon,
  MapIcon,
  MapPinIcon,
  Edit,
  Cross,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import OnoLogo from '@/assets/ono-logo.png'
import { Separator } from '@/components/ui/separator'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import DataTableViewOptions from '../../components/DataTableViewOptions'
import DataTableToolbar from '../../components/DataTableToolbar'
import Error404 from '@/pages/Error404/Error404'
import { status } from '@/data/program-manager-data'
import { useFrappeGetDoc } from 'frappe-react-sdk'

const items = [
  {
    id: 1,
    title: 'First event',
    date: '23-02-2024',
    description: 'Order Placed',
  },
  {
    id: 2,
    title: 'Second event',
    date: '23-02-2024',
    description: 'Processed',
  },

  {
    id: 3,
    title: 'Third event',
    date: '26-02-2024',
    description: 'Shipped',
  },
  {
    id: 4,
    title: 'Fourth event',
    date: '01-03-2024',
    description: 'Delivered',
  },
]

const OrderDetails = () => {
  const { id } = useParams()

  const navigate = useNavigate()

  const {
    data: orderDetails,
    isLoading: orderDetailsLoading,
    error: errorFetchingOrder,
  } = useFrappeGetDoc('Inventory', id)

  if (!orderDetailsLoading && errorFetchingOrder) {
    console.log('Order Details: ', errorFetchingOrder.httpStatus)
  }

  if (errorFetchingOrder) {
    navigate('/error404')
  }

  const downloadCSV = () => {
    // Convert table data to CSV
    const csv = Papa.unparse(data)
    // Create a Blob object for the CSV
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    // Use FileSaver to trigger a download
    saveAs(blob, 'table-data.csv')
  }

  return (
    <div className="relative w-full flex flex-col md:flex-row gap-2">
      <div className="w-full xl:flex-row gap-2 flex flex-col mt-2">
        <div className="xl:w-[70%] w-full flex flex-col gap-4">
          <div className="h-16 bg-muted/50 rounded-md border shadow-sm flex items-center justify-between px-4 text-md font-medium">
            <div className="flex flex-col">
              <h2>Order ID : {orderDetails?.order_id}</h2>
              <div className="flex gap-2">
                <p className="text-muted-foreground text-sm">
                  Manager : {orderDetails?.owner}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download />
                Invoice
              </Button>
              <Button variant="destructive">Cancel Order</Button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2">
            <div className="w-full">
              <div className="rounded-md border mt-[-10px]">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead className="w-[200px]">Product</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead className="text-right">Total Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orderDetails?.table_ccph?.map((item) => (
                      <TableRow key={item.program_name}>
                        <TableCell className="min-w-[350px]">
                          <div className="flex items-center gap-3 justify-start">
                            <div className="bg-muted/50 rounded-md min-w-20 flex items-center justify-center">
                              <img
                                src={''}
                                className="h-20 min-w-20"
                                alt="Image"
                              />
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm font-medium">
                                {item.program_name}
                              </p>
                              <div className="space-y-1">
                                <p className="text-xs font-medium">
                                  Category : {item.program_category}
                                </p>
                              </div>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell>&#8377;{item?.price}</TableCell>
                        <TableCell>{item?.number_of_cards}</TableCell>
                        <TableCell className="text-right">
                          &#8377;{item?.number_of_cards * item?.price}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>

                  <TableFooter>
                    <TableRow>
                      <TableCell className="text-xl font-semibold" colSpan={3}>
                        Total
                      </TableCell>
                      <TableCell className="text-right text-xl font-semibold">
                        &#8377;{' '}
                        {orderDetails?.table_ccph?.reduce(
                          (acc, item) =>
                            acc + item?.number_of_cards * item?.price,
                          0
                        )}
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col">
            {/* <div className="h-16 w-full flex justify-between gap-2 items-center px-4 text-md font-medium">
              <p>Order Status</p>
              <div className="flex gap-2">
                <Button variant="outline">Change Address</Button>
                <Button variant="destructive">Cancel Order</Button>
              </div>
            </div>
            <Separator /> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="flex flex-col rounded-md bg-muted/50 gap-0 pb-10 border">
                <div className="h-16 flex items-center justify-between px-4 text-md font-medium">
                  <div>Logistic Details</div>
                  <Button variant="outline">Track Order</Button>
                </div>
                <Separator className="mt-[-5px] w-full" />
                <div className="flex items-center justify-center mt-8">
                  <Lottie
                    animationData={OrderTruck}
                    className="dark:text-white"
                    style={{ width: '250px', height: '250px' }}
                    loop={true}
                  />
                </div>
                <div className="flex flex-col justify-center items-center mt-[-20px]">
                  <p className="text-lg font-semibold">
                    ID : {orderDetails?.order_id}
                  </p>
                  <div className="text-sm font-semibold">
                    Payment mode : {orderDetails?.mode?.toUpperCase()}
                  </div>
                </div>
              </div>
              <div className="flex flex-col bg-muted/50 rounded-md border">
                <div className="h-16 flex items-center justify-between px-4 text-md font-medium">
                  <div>Order Status</div>
                </div>
                <Separator className="mt-[-5px] w-full" />
                <div className="mt-10">
                  <Timeline>
                    {items.map((item, index) => {
                      return (
                        <div key={index}>
                          <TimelineItem>
                            {index === items.length - 1 ? null : (
                              <TimelineConnector />
                            )}
                            <TimelineHeader>
                              <TimelineIcon />
                              <TimelineTitle>
                                {item.title} -{' '}
                                <span className="text-sm font-medium">
                                  {item.date}
                                </span>
                              </TimelineTitle>
                            </TimelineHeader>
                            <TimelineContent>
                              <TimelineDescription>
                                {item.description}
                              </TimelineDescription>
                            </TimelineContent>
                          </TimelineItem>
                        </div>
                      )
                    })}
                  </Timeline>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="xl:w-[30%] w-full flex flex-col gap-2">
          {/* <div className="flex flex-col w-full rounded-md bg-muted/50 gap-0 pb-10">
            <div className="h-16 flex items-center justify-between px-4 text-md font-medium">
              <div>Logistic Details</div>
              <Button variant="outline">Track Order</Button>
            </div>
            <Separator className="mt-[-5px] w-full" />
            <div className="flex items-center justify-center mt-[-30px]">
              <Lottie
                animationData={OrderTruck}
                className="dark:text-white"
                style={{ width: '200px', height: '200px' }}
                loop={true}
              />
            </div>
            <div className="flex flex-col justify-center items-center mt-[-20px]">
              <p className="text-lg font-semibold">ID : 12635</p>
              <div className="text-sm font-semibold">Payment mode : Online</div>
            </div>
          </div> */}
          <div className="w-full flex rounded-md flex-col bg-muted/50 gap-3 pb-10 border">
            <div className="h-16 flex items-center justify-between px-4 text-md font-medium">
              <div>Manager Details</div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Edit />
                </Button>
              </div>
            </div>
            <Separator className="mt-[-20px]" />
            <div className="flex flex-col gap-6">
              <div className="flex gap-2 px-2 items-center">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>
                    {orderDetails?.owner?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <p className="text-sm font-medium">{orderDetails?.owner}</p>
                  <p className="text-xs font-medium">Created By</p>
                </div>
              </div>
              <div className="flex flex-col px-4 gap-4">
                <div className="text-sm font-medium flex items-center gap-1">
                  <Mail size={18} strokeWidth={1.5} />
                  <p>dummy@gmail.com</p>
                </div>
                <div className="text-sm font-medium flex items-center gap-1">
                  <Phone size={18} strokeWidth={1.5} />
                  <p>+dummy</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex rounded-md flex-col bg-muted/50 gap-4 pb-8 border">
            <div className="h-16 flex items-center gap-2 px-4 text-md font-medium">
              <MapPinIcon size={18} strokeWidth={1.5} />
              <p className="hover:underline cursor-pointer text-md">
                Billing Address
              </p>
            </div>
            <Separator className="mt-[-20px]" />
            <div className="px-4 flex flex-col gap-2">
              <p className="text-md font-medium">{orderDetails?.owner}</p>
              <p className="text-sm font-medium">+dummy</p>
              <p className="text-sm font-medium">{`${orderDetails?.address_line_1}, ${orderDetails?.address_line_2}, ${orderDetails?.city}, ${orderDetails?.pin_code}`}</p>
              <p className="text-sm font-medium">{orderDetails?.country}</p>
            </div>
          </div>
          {/* <div className="w-full flex rounded-md flex-col bg-muted/50 gap-4 pb-8 border">
            <div className="h-16 flex items-center gap-2 px-4 text-md font-medium">
              <MapPinIcon size={18} strokeWidth={1.5} />
              <p className="hover:underline cursor-pointer text-md">
                Shipping Address
              </p>
            </div>
            <Separator className="mt-[-20px]" />
            <div className="px-4 flex flex-col gap-2">
              <p className="text-md font-medium">Joseph Parker</p>
              <p className="text-sm font-medium">+919876787898</p>
              <p className="text-sm font-medium">Laxmi Nagar, New Delhi</p>
              <p className="text-sm font-medium">India</p>
            </div>
          </div> */}
          <div className="w-full flex rounded-md flex-col bg-muted/50 gap-4 pb-8 border">
            <div className="h-16 flex items-center gap-2 px-4 text-md font-medium">
              <CreditCard size={18} strokeWidth={1.5} />
              <p className="hover:underline cursor-pointer text-md">
                Payment Method
              </p>
            </div>
            <Separator className="mt-[-20px]" />
            <div className="px-4 flex flex-col gap-2">
              <p className="text-md font-medium">
                Transaction : #{orderDetails?.transaction_id}
              </p>
              <p className="text-sm font-medium">
                Payment Method : {orderDetails?.mode?.toUpperCase()}{' '}
              </p>
              <p className="text-sm font-medium">Card Holder Name : Dummy</p>
              <p className="text-sm font-medium">Card Number : xxxx Dummy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetails
