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
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { Badge } from '@/components/ui/badge'

const WhitelistMID = ({ midCodes, programDetailsLoading }) => {
  return (
    <div className="flex flex-col px-4 py-2 gap-4 justify-start border rounded-md bg-muted/50">
      <div>
        <h2 className="font-medium text-md">Whitelist MID</h2>
      </div>
      <div className="w-full flex justify-between gap-8 items-start">
        <p className="text-xs font-normal text-muted-foreground">
          A whitelist MID (Merchant ID's) refers to a list.
        </p>
      </div>

      <div>
        {!programDetailsLoading && midCodes?.length > 0 ? (
          <div className="flex gap-4">
            {midCodes?.map((mid, index) => {
              if (index <= 3) {
                return (
                  <Badge
                    variant="primary"
                    className="cursor-pointer tracking-widest"
                    key={mid.name}
                  >
                    {mid.merchant_id}
                  </Badge>
                )
              }
            })}
            {midCodes?.length > 4 && (
              <div className="flex">
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button
                      variant=""
                      className="cursor-pointer tracking-wider h-6"
                    >
                      +{midCodes.length - 4} more
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="flex gap-4">
                      {midCodes?.map((mid, _i) => {
                        if (_i > 3) {
                          return (
                            <Badge
                              variant="primary"
                              className="cursor-pointer tracking-widest"
                              key={mid.name}
                            >
                              {mid.merchant_id}
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
          <p className="text-sm font-medium">No MID&apos;s configured yet.</p>
        )}
      </div>
    </div>
  )
}

export default WhitelistMID
