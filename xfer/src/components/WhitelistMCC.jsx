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
import { Badge } from '@/components/ui/badge'

const WhitelistMCC = () => {
  const [mccInputValue, setMCCInputValue] = useState('')
  const [savedMCCValues, setMCCSavedValues] = useState([])
  const [showMCCValues, setShowMCCValues] = useState([])

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && mccInputValue.trim() !== '') {
      setMCCSavedValues((prevValues) => [...prevValues, mccInputValue])
      setMCCInputValue('')
    }
  }

  const handleMCCSave = () => {
    setShowMCCValues((prevValues) => [...prevValues, ...savedMCCValues])
    setMCCSavedValues([])
    setMCCInputValue('')
  }
  return (
    <div className="flex flex-col px-4 py-2 gap-4 justify-start border rounded-md bg-muted/50">
      <div>
        <h2 className="font-medium text-md">Whitelist MCC</h2>
      </div>
      <div className="w-full flex justify-between gap-8 items-start">
        <p className="text-xs font-normal text-muted-foreground">
          A whitelist MCC (Merchant Category Code) refers to a list.
        </p>
        <Sheet>
          <SheetTrigger>
            <Button className="h-6">
              <span className="text-xs">
                {showMCCValues.length > 0 ? 'EDIT' : 'CONFIGURE'}
              </span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Whitelist MCC</SheetTitle>
              <SheetDescription>
                A whitelist MCC (Merchant Category Code) refers to a list of
                approved merchants or categories that are allowed for certain
                transactions.
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col gap-2 mt-4">
              <div className="relative">
                <Input
                  value={mccInputValue}
                  onChange={(e) => setMCCInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Write something and press Enter..."
                  className="w-full"
                />
              </div>

              <div className="space-y-2 space-x-2">
                {savedMCCValues.length > 0 ? (
                  savedMCCValues.map((value) => (
                    <Badge className="px-4 py-1" variant="primary">
                      {value}
                    </Badge>
                  ))
                ) : (
                  <p className="text-muted-foreground">No saved MCC yet.</p>
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

      {showMCCValues.length > 0 && (
        <div className="flex gap-2  flex-wrap">
          {showMCCValues.slice(0, 4).map((value, index) => {
            return (
              <Badge className="px-4 py-1" variant="primary">
                {value}
              </Badge>
            )
          })}
          {showMCCValues.length > 4 && (
            <div className="relative">
              <HoverCard className="">
                <HoverCardTrigger asChild>
                  <Button className="text-xs font-medium h-7">
                    +{showMCCValues.length - 4} More
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="min-w-[24rem] absolute top-0 left-0 z-[1000]">
                  <div className="flex gap-2 flex-wrap">
                    {showMCCValues
                      .slice(4, showMCCValues.length)
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

export default WhitelistMCC
