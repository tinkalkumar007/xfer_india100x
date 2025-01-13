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

import { Link, useLocation, useSearchParams, useParams } from 'react-router-dom'
import { saveAs } from 'file-saver'
import * as Papa from 'papaparse'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { DataTablePagination } from '@/components/DataTablePagination'
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
  Phone,
  Layers,
  CreditCard,
  Users,
  Activity,
  DollarSign,
  Grid,
  User,
  IndianRupee,
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
import { status } from '@/data/program-manager-data'

const data = [
  {
    product_name: 'Shopping',
    product_img: OnoLogo,
    product_category: 'Monthly Expense',
    card_nature: 'Virtual',
    price: 200,
    quantity: 10,
    total_amount: 2000,
  },
]
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
  const downloadCSV = () => {
    // Convert table data to CSV
    const csv = Papa.unparse(data)
    // Create a Blob object for the CSV
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    // Use FileSaver to trigger a download
    saveAs(blob, 'table-data.csv')
  }

  const { id } = useParams()

  return (
    <div className="relative w-full flex flex-col md:flex-row gap-2">
      <div className="w-full xl:flex-row gap-2 flex flex-col mt-2">
        <div className="xl:w-[70%] w-full flex flex-col gap-4">
          <div className="h-16 bg-muted/50 rounded-md border shadow-sm flex items-center justify-between px-4 text-md font-medium">
            <div className="flex flex-col">
              <h2>Order ID : 125467</h2>
              <div className="flex gap-2">
                <p className="text-muted-foreground text-sm">Manager : ONO</p>
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
                    {data.map((product) => (
                      <TableRow key={product.product_name}>
                        <TableCell className="min-w-[350px]">
                          <div className="flex items-center gap-3 justify-start">
                            <div className="bg-muted/50 rounded-md min-w-20 flex items-center justify-center">
                              <img
                                src={product.product_img}
                                className="h-20 min-w-20"
                                alt="Image"
                              />
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm font-medium">
                                {product.product_name}
                              </p>
                              <div className="space-y-1">
                                <p className="text-xs font-medium">
                                  Category : {product.product_category}
                                </p>
                                <p className="text-xs font-medium">
                                  Card Nature : {product.card_nature}
                                </p>
                              </div>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell>&#8377;{product.price}</TableCell>
                        <TableCell>{product.quantity}</TableCell>
                        <TableCell className="text-right">
                          &#8377;{product.total_amount}
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
                        &#8377;2,000.00
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
                  <p className="text-lg font-semibold">ID : 12635</p>
                  <div className="text-sm font-semibold">
                    Payment mode : Online
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
                        <>
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
                        </>
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
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <p className="text-sm font-medium">Joseph Parker</p>
                  <p className="text-xs font-medium">Customer</p>
                </div>
              </div>
              <div className="flex flex-col px-4 gap-4">
                <div className="text-sm font-medium flex items-center gap-1">
                  <Mail size={18} strokeWidth={1.5} />
                  Joseph@gmail.com
                </div>
                <div className="text-sm font-medium flex items-center gap-1">
                  <Phone size={18} strokeWidth={1.5} />
                  +914858659874
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
              <p className="text-md font-medium">Joseph Parker</p>
              <p className="text-sm font-medium">+919876787898</p>
              <p className="text-sm font-medium">Laxmi Nagar, New Delhi</p>
              <p className="text-sm font-medium">India</p>
            </div>
          </div>
          <div className="w-full flex rounded-md flex-col bg-muted/50 gap-4 pb-8 border">
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
          </div>
          <div className="w-full flex rounded-md flex-col bg-muted/50 gap-4 pb-8 border">
            <div className="h-16 flex items-center gap-2 px-4 text-md font-medium">
              <CreditCard size={18} strokeWidth={1.5} />
              <p className="hover:underline cursor-pointer text-md">
                Payment Method
              </p>
            </div>
            <Separator className="mt-[-20px]" />
            <div className="px-4 flex flex-col gap-2">
              <p className="text-md font-medium">Transaction : #123223</p>
              <p className="text-sm font-medium">Payment Method : Debit Card</p>
              <p className="text-sm font-medium">
                Card Holder Name : Joseph Parker
              </p>
              <p className="text-sm font-medium">
                Card Number : xxxx xxxx xxxx 3245
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetails
