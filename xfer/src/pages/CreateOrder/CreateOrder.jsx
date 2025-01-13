import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { v4 as uuidv4 } from 'uuid'

import { CirclePlus, Trash } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useEffect, useState } from 'react'
import MakePayment from '../../components/MakePayment'
import CreateOrderForm from '../../components/CreateOrderForm'
import { useNavigate } from 'react-router-dom'

const CreateOrder = () => {
  const [screen, setScreen] = useState('create_order')
  const navigate = useNavigate()

  const [tableData, setTableData] = useState([])

  return (
    <Sheet className="">
      <SheetTrigger>
        <Button>
          <CirclePlus />
          Create Order
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-xl">
        <SheetHeader>
          {screen === 'create_order' && (
            <>
              <SheetTitle>Create Order</SheetTitle>
              <SheetDescription>
                Streamline the process of initiating and managing new orders
                seamlessly.
              </SheetDescription>
            </>
          )}
          {screen === 'order_summary' && (
            <>
              <SheetTitle>Order Summary</SheetTitle>
              <SheetDescription>
                Here&apos;s a summary of your order. Review the products,
                quantities, and total price before proceeding to the next step.
              </SheetDescription>
            </>
          )}

          {screen === 'make_payment' && (
            <>
              <SheetTitle>Make Payment</SheetTitle>
              <SheetDescription>
                Review your selected items and provide accurate shipping
                information to complete your purchase.
              </SheetDescription>
            </>
          )}
        </SheetHeader>

        {screen === 'create_order' && (
          <div>
            <CreateOrderForm
              screen={screen}
              setScreen={setScreen}
              setTableData={setTableData}
            />
          </div>
        )}
        {screen === 'order_summary' && (
          <div className="flex flex-col gap-4 select-none w-full mt-3">
            <div className="w-full border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-md">Product Name</TableHead>
                    <TableHead className="text-md">Quantity</TableHead>
                    <TableHead className="text-right text-md">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tableData.length > 0
                    ? tableData.map((data) => (
                        <TableRow key={data.id}>
                          <TableCell className="font-medium text-md">
                            {data.product_name}
                          </TableCell>
                          <TableCell className="font-medium text-md">
                            {data.quantity}
                          </TableCell>

                          <TableCell className="font-medium text-md text-right">
                            &#8377; 400
                          </TableCell>
                        </TableRow>
                      ))
                    : null}
                </TableBody>
              </Table>
            </div>
            <div className="px-4 py-2 border rounded-md">
              <div className="grid gap-4 grid-cols-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-md">subtotal</p>
                  <p className="font-medium text-md">&#8377; 400.00</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-medium text-md">shipping</p>
                  <p className="font-medium text-md">&#8377; 0.00</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-medium text-md">tax</p>
                  <p className="font-medium text-md">&#8377; 0.00</p>
                </div>
                <Separator className="w-full" />
                <div className="flex items-center justify-between font-medium">
                  <div>Total</div>
                  <div>&#8377; 400.00</div>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-between gap-4">
              <Button
                className=""
                variant="outline"
                onClick={() => {
                  setScreen('create_order')
                }}
              >
                Back
              </Button>

              <Button
                className=""
                onClick={() => {
                  setScreen('make_payment')
                }}
              >
                Make Payment
              </Button>
            </div>
          </div>
        )}
        {screen === 'make_payment' && (
          <div>
            <MakePayment />
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

export default CreateOrder
