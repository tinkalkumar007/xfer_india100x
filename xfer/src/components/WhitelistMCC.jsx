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

const WhitelistMCC = ({ mccCodes, programDetailsLoading }) => {
  return (
    <div className="flex flex-col px-4 py-2 gap-4 justify-start border rounded-md bg-muted/50">
      <div>
        <h2 className="font-medium text-md">Whitelist MCC</h2>
      </div>
      <div className="w-full flex justify-between gap-8 items-start">
        <p className="text-xs font-normal text-muted-foreground">
          A whitelist MCC (Merchant Category Code) refers to a list.
        </p>
      </div>

      <div>
        {!programDetailsLoading && mccCodes?.length > 0 ? (
          <div className="flex gap-4">
            {mccCodes?.map((code, index) => {
              if (index <= 3) {
                return (
                  <Badge
                    variant="primary"
                    className="cursor-pointer tracking-widest"
                    key={code.name}
                  >
                    {code.mcc}
                  </Badge>
                )
              }
            })}
            {mccCodes?.length > 4 && (
              <div className="flex">
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button
                      variant=""
                      className="cursor-pointer tracking-wider h-6"
                    >
                      +{mccCodes.length - 4} more
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="flex gap-4">
                      {mccCodes?.map((code, _i) => {
                        if (_i > 3) {
                          return (
                            <Badge
                              variant="primary"
                              className="cursor-pointer tracking-widest"
                              key={code.name}
                            >
                              {code.mcc}
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

export default WhitelistMCC
