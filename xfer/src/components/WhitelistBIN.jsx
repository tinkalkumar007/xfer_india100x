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

const WhitelistBIN = () => {
  const [binInputValue, setBINInputValue] = useState('')
  const [savedBINValues, setBINSavedValues] = useState([])
  const [showBINValues, setShowBINValues] = useState([])

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && binInputValue.trim() !== '') {
      setBINSavedValues((prevValues) => [...prevValues, binInputValue])
      setBINInputValue('')
    }
  }

  const handleMCCSave = () => {
    setShowBINValues((prevValues) => [...prevValues, ...savedBINValues])
    setBINInputValue('')
  }
  return (
    <div className="flex flex-col px-4 py-2 gap-4 justify-start border rounded-md bg-muted/50">
      <div className="space-y-2">
        <h2 className="font-medium text-md">Whitelist BIN</h2>
      </div>
      <div className="flex w-full justify-between gap-4 items-start">
        <p className="text-xs font-normal text-muted-foreground">
          A whitelist BIN (Bank Identification Number) refers to a list.
        </p>
        <Sheet>
          <SheetTrigger>
            <Button className="h-6">
              <span className="text-xs">
                {showBINValues.length > 0 ? 'EDIT' : 'CONFIGURE'}
              </span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Whitelist BIN</SheetTitle>
              <SheetDescription>
                A whitelist BIN (Bank Identification Number) refers to a list of
                approved BINs that are allowed for specific transactions.
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col gap-2 mt-4">
              <div className="relative">
                <Input
                  value={binInputValue}
                  onChange={(e) => setBINInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Write something and press Enter..."
                  className="w-full"
                />
              </div>

              <div className="space-y-2 space-x-2">
                {savedBINValues.length > 0 ? (
                  savedBINValues.map((value) => (
                    <Badge className="px-4 py-1" variant="primary">
                      {value}
                    </Badge>
                  ))
                ) : (
                  <p className="text-muted-foreground">No saved BIN yet.</p>
                )}
              </div>

              <SheetClose>
                <div className="w-full flex justify-end">
                  <Button onClick={handleMCCSave}>Save</Button>
                </div>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {showBINValues.length > 0 && (
        <div className="flex gap-2 flex-wrap ">
          {showBINValues.slice(0, 4).map((value, index) => {
            return (
              <Badge className="px-4 py-1" variant="primary">
                {value}
              </Badge>
            )
          })}
          {showBINValues.length > 4 && (
            <div className="relative">
              <HoverCard className="">
                <HoverCardTrigger asChild>
                  <Button className="text-xs font-medium h-7">
                    +{showBINValues.length - 4} More
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="min-w-[24rem] absolute top-0 left-0 z-[1000]">
                  <div className="flex gap-2 flex-wrap">
                    {showBINValues
                      .slice(4, showBINValues.length)
                      .map((value) => (
                        <Badge className="py-2" variant="primary">
                          {value}
                        </Badge>
                      ))}
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default WhitelistBIN
