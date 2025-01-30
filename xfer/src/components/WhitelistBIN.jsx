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
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useState } from 'react'

const WhitelistBIN = ({ bins, programDetailsLoading }) => {
  return (
    <div className="flex flex-col px-4 py-2 gap-4 justify-start border rounded-md bg-muted/50">
      <div className="space-y-2">
        <h2 className="font-medium text-md">Whitelist BIN</h2>
      </div>
      <div className="flex w-full justify-between gap-4 items-start">
        <p className="text-xs font-normal text-muted-foreground">
          A whitelist BIN (Bank Identification Number) refers to a list.
        </p>
      </div>

      <div>
        {!programDetailsLoading && bins?.length > 0 ? (
          <div className="flex gap-4">
            {bins?.map((code, index) => {
              if (index <= 3) {
                return (
                  <Badge
                    variant="primary"
                    className="cursor-pointer tracking-widest"
                    key={code.bin_number}
                  >
                    {code.bin_number}
                  </Badge>
                )
              }
            })}
            {bins?.length > 4 && (
              <div className="flex">
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button
                      variant=""
                      className="cursor-pointer tracking-wider h-6"
                    >
                      +{bins.length - 4} more
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="flex gap-4">
                      {bins?.map((code, _i) => {
                        if (_i > 3) {
                          return (
                            <Badge
                              variant="primary"
                              className="cursor-pointer tracking-widest"
                              key={code.bin_number}
                            >
                              {code.bin_number}
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
        ) : (
          <p className="text-sm font-medium">No MCC&apos;s configured yet.</p>
        )}
      </div>
    </div>
  )
}

export default WhitelistBIN
