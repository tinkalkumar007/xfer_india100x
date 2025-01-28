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
import { Badge } from '@/components/ui/badge'

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

const WhitelistMID = () => {
  const [midInputValue, setMIDInputValue] = useState('')
  const [savedMIDValues, setMIDSavedValues] = useState([])
  const [showMIDValues, setShowMIDValues] = useState([])

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && midInputValue.trim() !== '') {
      setMIDSavedValues((prevValues) => [...prevValues, midInputValue])
      setMIDInputValue('')
    }
  }

  const handleMCCSave = () => {
    setShowMIDValues((prevValues) => [...prevValues, ...savedMIDValues])
    setMIDInputValue('')
  }
  return (
    <div className="flex flex-col px-4 py-2 gap-4 justify-start border rounded-md bg-muted/50">
      <div className="space-y-2">
        <h2 className="font-medium text-md">Whitelist MID</h2>
      </div>
      <div className="flex w-full justify-between gap-4 items-start">
        <p className="text-xs font-normal text-muted-foreground">
          The Reload Applicable is for the program reload amount.
        </p>
        <Sheet>
          <SheetTrigger>
            <Button className="h-6">
              <span className="text-xs">
                {showMIDValues.length > 0 ? 'EDIT' : 'CONFIGURE'}
              </span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Whitelist MCC</SheetTitle>
              <SheetDescription>
                A reward is a benefit or incentive given to individuals for
                achieving specific goals or behaviors. It is often used as a
                motivation tool in programs or systems.
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col gap-2 mt-4">
              <div className="relative">
                <Input
                  value={midInputValue}
                  onChange={(e) => setMIDInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Write something and press Enter..."
                  className="w-full"
                />
              </div>

              <div className="space-y-2 space-x-2">
                {savedMIDValues.length > 0 ? (
                  savedMIDValues.map((value) => (
                    <Badge className="px-4 py-1" variant="primary">
                      {value}
                    </Badge>
                  ))
                ) : (
                  <p className="text-muted-foreground">No saved MID yet.</p>
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

      {showMIDValues.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {showMIDValues.slice(0, 4).map((value, index) => {
            return (
              <Badge className="px-4 py-1" variant="primary">
                {value}
              </Badge>
            )
          })}
          {showMIDValues.length > 4 && (
            <div className="relative">
              <HoverCard className="">
                <HoverCardTrigger asChild>
                  <Button className="text-xs font-medium h-7">
                    +{showMIDValues.length - 4} More
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="min-w-[24rem] absolute top-0 left-0 z-[1000]">
                  <div className="flex gap-2 flex-wrap">
                    {showMIDValues
                      .slice(4, showMIDValues.length)
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

export default WhitelistMID
