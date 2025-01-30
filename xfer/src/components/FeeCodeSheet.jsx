import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { CreditCard } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'

const FeeCodeSheet = ({ feeCodes }) => {
  console.log('Fee Codes', feeCodes)
  return (
    <div className=" rounded-md bg-muted/50 border w-full space-y-2">
      <h2 className="text-md font-medium py-2 px-4">Fee Code</h2>
      <div className="w-full flex justify-center">
        <Separator className="w-[92%] text-center -mt-2" />
      </div>

      <div className="">
        <div className="grid grid-cols-2 items-start gap-2 px-4 pb-2 bg-muted/40">
          {feeCodes?.map((feeCode) => {
            return (
              <Badge
                key={feeCode?.name}
                className="flex items-end justify-start gap-2"
                variant="primary"
              >
                <p className="text-sm font-medium">{feeCode?.fee_type} : </p>
                <p className="text-sm font-medium">&#8377;{feeCode?.amount}</p>
              </Badge>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default FeeCodeSheet
