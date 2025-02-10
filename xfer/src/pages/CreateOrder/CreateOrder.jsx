import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'

import { Badge } from '@/components/ui/badge'

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

import { CircleCheckIcon, CirclePlus, Trash } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useEffect, useState } from 'react'
import MakePayment from '../../components/MakePayment'
import CreateOrderForm from '../../components/CreateOrderForm'
import { useNavigate } from 'react-router-dom'
import { useFrappeCreateDoc } from 'frappe-react-sdk'

const CreateOrder = ({ inventoryRefetch }) => {
  const [screen, setScreen] = useState('create_order')
  const navigate = useNavigate()

  const { createDoc, loading, error } = useFrappeCreateDoc()

  const [tableData, setTableData] = useState([])

  return (
    <Sheet className="">
      <SheetTrigger>
        <Button>
          <CirclePlus />
          Create Order
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full lg:w-[28rem] lg:max-w-md">
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
          {screen === 'order_successful' && (
            <div className="flex flex-col gap-4 items-center mt-10">
              <div>
                <CircleCheckIcon className="w-16 h-16 text-green-500" />
              </div>
              <div className="flex flex-col gap-2 items-center text-center">
                <SheetTitle>Thank you for your order!</SheetTitle>
                <SheetDescription>
                  Your order was successfully placed and is being processed.
                </SheetDescription>
              </div>

              <div className="w-full">
                <SheetClose className="w-full">
                  <Button
                    className="w-full"
                    onClick={() => {
                      setScreen('create_order')
                    }}
                  >
                    Done
                  </Button>
                </SheetClose>
              </div>
            </div>
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
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                Program Name :{' '}
              </span>
              <span className="text-sm font-medium">
                {tableData.program_name}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                Physical Quantity :{' '}
              </span>
              <span className="text-sm font-medium">
                {tableData.physical_quantity}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                Virtual Quantity :{' '}
              </span>
              <span className="text-sm font-medium">
                {tableData.virtual_quantity}
              </span>
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
                  createDoc('Inventory', {
                    ...tableData,
                  })
                    .then((response) => {
                      inventoryRefetch()
                      setScreen('order_successful')
                      setTableData({})
                    })
                    .catch((err) => console.log(err))
                }}
                disabled={loading}
              >
                Place Your Order
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

export default CreateOrder
