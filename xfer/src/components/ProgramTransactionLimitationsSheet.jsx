import { Separator } from '@/components/ui/separator'
import {
  ArrowDown,
  ArrowUp,
  IndianRupee,
  Power,
  Send,
  ShoppingBag,
  ShoppingCart,
  Wifi,
} from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import React, { useEffect, useState } from 'react'

const formSchema = z.object({
  atm: z.object({
    status: z.boolean(),
    max_limit: z
      .union([z.string(), z.number()])
      .optional()
      .transform((val) => (typeof val === 'string' ? parseFloat(val) : val)),
  }),
  pos: z.object({
    status: z.boolean(),
    max_limit: z
      .union([z.string(), z.number()])
      .optional()
      .transform((val) => (typeof val === 'string' ? parseFloat(val) : val)),
  }),
  imps: z.object({
    status: z.boolean(),
    max_limit: z
      .union([z.string(), z.number()])
      .optional()
      .transform((val) => (typeof val === 'string' ? parseFloat(val) : val)),
  }),
  ecommerce: z.object({
    status: z.boolean(),
    max_limit: z
      .union([z.string(), z.number()])
      .optional()
      .transform((val) => (typeof val === 'string' ? parseFloat(val) : val)),
  }),
  contactless: z.object({
    status: z.boolean(),
    max_limit: z
      .union([z.string(), z.number()])
      .optional()
      .transform((val) => (typeof val === 'string' ? parseFloat(val) : val)),
  }),
  offline: z.object({
    status: z.boolean(),
    max_limit: z
      .union([z.string(), z.number()])
      .optional()
      .transform((val) => (typeof val === 'string' ? parseFloat(val) : val)),
  }),
  load_max_limit: z.object({
    status: z.boolean(),
    max_limit: z
      .union([z.string(), z.number()])
      .optional()
      .transform((val) => (typeof val === 'string' ? parseFloat(val) : val)),
  }),
})

const ProgramTransactionLimitationsSheet = ({
  transactionLimitations,
  programDetailsLoading,
}) => {
  console.log(transactionLimitations)
  const limitations = React.useMemo(() => {
    if (!transactionLimitations) return []
    return transactionLimitations?.reduce((acc, current) => {
      const channelKey = current.channel.replace(' ', '_').replace('-', '')
      acc[channelKey] = {
        status: current.is_enabled === 1,
        max_limit: parseFloat(current.max_amount),
      }
      return acc
    }, {})
  }, [transactionLimitations])

  const { ATM, POS, IMPS, ECommerce, Contactless, Offline, Load_Amount } =
    limitations

  console.log('Limitation: ', limitations)
  console.log(!programDetailsLoading && transactionLimitations)
  const [data, setData] = useState({
    atm: {
      status: true,
      max_limit: 10000,
    },
    pos: {
      status: false,
      max_limit: 50000,
    },
    imps: {
      status: true,
      max_limit: 60000,
    },
    ecommerce: {
      status: false,
      max_limit: 40000,
    },
    contactless: {
      status: true,
      max_limit: 40000,
    },
    offline: {
      status: true,
      max_limit: 50000,
    },
    load_max_limit: {
      status: false,
      max_limit: 100000,
    },
  })

  return (
    <div className=" rounded-md bg-muted/50 border w-full space-y-2">
      <div className="flex justify-between gap-2 items-center py-2 px-4">
        <h2 className="text-md font-medium ">Transaction Limitations</h2>
      </div>
      <div className="w-full flex justify-center">
        <Separator className="w-[96%] text-center" />
      </div>
      <div className="grid grid-cols-2 gap-2 px-4 py-2">
        <div className="flex flex-col gap-8 border rounded-md px-4 py-4">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-4">
              <div>
                <p className="text-sm font-medium">ATM</p>
                <p className="text-sm text-muted-foreground">
                  {ATM?.status === true ? 'Enabled' : 'Disabled'}
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-center">
              <p
                className={`${
                  ATM?.status ? '' : 'blur-sm'
                } text-sm font-medium tracking-wide`}
              >
                &#8377; {ATM?.max_limit}
              </p>
              <Switch disabled checked={ATM?.status} />
            </div>
          </div>
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-4">
              <div>
                <p className="text-sm font-medium ">POS</p>
                <p className="text-sm text-muted-foreground">
                  {POS?.status === true ? 'Enabled' : 'Disabled'}
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-center">
              <p
                className={`${
                  POS?.status ? '' : 'blur-sm'
                } text-sm font-medium tracking-wide`}
              >
                &#8377; {POS?.max_limit}
              </p>
              <Switch disabled checked={POS?.status === true} />
            </div>
          </div>
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-4">
              <div>
                <p className="text-sm font-medium">IMPS</p>
                <p className="text-sm text-muted-foreground">
                  {IMPS?.status === true ? 'Enabled' : 'Disabled'}
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-center">
              <p
                className={`${
                  IMPS?.status ? '' : 'blur-sm'
                } text-sm font-medium tracking-wide`}
              >
                &#8377; {IMPS?.max_limit}
              </p>
              <Switch disabled checked={IMPS?.status === true} />
            </div>
          </div>
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-4">
              <div>
                <p className="text-sm font-medium leading-none">E-Commerce</p>
                <p className="text-sm text-muted-foreground">
                  {ECommerce?.status === true ? 'Enabled' : 'Disabled'}
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-center">
              <p
                className={`${
                  ECommerce?.status ? '' : 'blur-sm'
                } text-sm font-medium tracking-wide`}
              >
                &#8377; {ECommerce?.max_limit}
              </p>
              <Switch disabled checked={ECommerce?.status === true} />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8 border rounded-md px-4 py-4">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-4">
              <div>
                <p className="text-sm font-medium">Contactless</p>
                <p className="text-sm text-muted-foreground">
                  {Contactless?.status === true ? 'Enabled' : 'Disabled'}
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-center">
              <p
                className={`${
                  Contactless?.status ? '' : 'blur-sm'
                } text-sm font-medium tracking-wide`}
              >
                &#8377; {Contactless?.max_limit}
              </p>
              <Switch disabled checked={Contactless?.status === true} />
            </div>
          </div>
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-4">
              <div>
                <p className="text-sm font-medium">Offline</p>
                <p className="text-sm text-muted-foreground">
                  {Offline?.status === true ? 'Enabled' : 'Disabled'}
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-center">
              <p
                className={`${
                  Offline?.status ? '' : 'blur-sm'
                } text-sm font-medium tracking-wide`}
              >
                &#8377; {Offline?.max_limit}
              </p>
              <Switch disabled checked={Offline?.status === true} />
            </div>
          </div>
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-4">
              <div>
                <p className="text-sm font-medium">Max Load Limit</p>
                <p className="text-sm text-muted-foreground">
                  {Load_Amount?.status === true ? 'Enabled' : 'Disabled'}
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-center">
              <p
                className={`${
                  Load_Amount?.status ? '' : 'blur-sm'
                } text-sm font-medium tracking-wide`}
              >
                &#8377; {Load_Amount?.max_limit}
              </p>
              <Switch disabled checked={Load_Amount?.status === true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgramTransactionLimitationsSheet
