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
    <div className=" rounded-md bg-muted/50 border w-full space-y-1">
      <h2 className="text-md font-medium py-2 px-4">Fee Code</h2>
      <div className="flex w-full justify-between gap-4 items-start px-4">
        <p className="text-xs font-normal text-muted-foreground">
          A fee code is a unique identifier for categorizing and tracking fees.
        </p>
      </div>
      <div className="">
        <div className="flex gap-2 px-4 pb-2 bg-muted/40 mt-4">
          {feeCodes?.map((feeCode, index) => {
            if (index <= 3) {
              return (
                <Badge
                  key={feeCode?.name}
                  className="flex items-end justify-start gap-2"
                  variant="primary"
                >
                  <p className="text-sm font-medium">{feeCode?.fee_type} : </p>
                  <p className="text-sm font-medium">
                    &#8377;{feeCode?.amount}
                  </p>
                </Badge>
              )
            }
          })}
          {feeCodes?.length > 4 && (
            <div className="flex flex-wrap">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button
                    variant=""
                    className="cursor-pointer tracking-wider h-6"
                  >
                    +{feeCodes.length - 4} more
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="flex gap-4 flex-wrap">
                    {feeCodes?.map((code, _i) => {
                      if (_i > 3) {
                        return (
                          <Badge
                            variant="primary"
                            className="cursor-pointer tracking-widest"
                            key={code}
                          >
                            {code}
                          </Badge>
                        )
                      }
                    })}
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FeeCodeSheet
