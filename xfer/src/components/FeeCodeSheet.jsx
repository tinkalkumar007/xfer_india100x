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

const feeSchema = z.object({
  issuing_fee: z.string(),
  shipping_fee: z.string(),
})

const feeDefault = {
  issuing_fee: '',
  shipping_fee: '',
}

const FeeCodeSheet = () => {
  const [showFees, setShowFees] = useState([])
  const feeForm = useForm({
    resolver: zodResolver(feeSchema),
    defaultValues: feeDefault,
  })

  const onSubmitFeeForm = (data) => {
    console.log(data)
    setShowFees(data)
  }

  return (
    <div className=" rounded-md bg-muted/50 border w-full space-y-2">
      <h2 className="text-md font-medium py-2 px-4">Fee Code</h2>
      <div className="w-full flex justify-center">
        <Separator className="w-[92%] text-center -mt-2" />
      </div>
      {Object.keys(showFees).length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-4">
          <CreditCard strokeWidth={1.5} />
          <h2 className="text-sm font-medium text-center">No Fee code added</h2>
          <p className="text-xs font-normal text-muted-foreground text-center">
            You have not added any Fee Code. Add one below.
          </p>
          <Sheet>
            <SheetTrigger>
              <Button className="h-6">
                <span className="text-xs">CONFIGURE</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Fee Code</SheetTitle>
                <SheetDescription>
                  A fee code is a unique identifier used to categorize and
                  define specific charges or fees within a system.
                </SheetDescription>
              </SheetHeader>
              <Form {...feeForm}>
                <form
                  onSubmit={feeForm.handleSubmit(onSubmitFeeForm)}
                  className="space-y-3 mt-3"
                >
                  {/* Issuing Fee Field */}
                  <FormField
                    control={feeForm.control}
                    name="issuing_fee"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Issuing Fee</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter issuing fee" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Shipping Fee Field */}
                  <FormField
                    control={feeForm.control}
                    name="shipping_fee"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Shipping Fee</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter shipping fee" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Submit Button */}
                  <SheetClose>
                    <Button type="submit">Submit</Button>
                  </SheetClose>
                </form>
              </Form>
            </SheetContent>
          </Sheet>
        </div>
      ) : (
        <div className="">
          <div className="flex flex-col gap-2 px-4 pb-2 bg-muted/40">
            <div className="flex flex-col items-start gap-2">
              <p className="text-sm font-medium">Shipping Fees</p>
              <Input value={showFees.shipping_fee} className="h-10" disabled />
            </div>
            <div className="flex flex-col items-start gap-2">
              <p className="text-sm font-medium">Issuing Fees</p>
              <Input value={showFees.issuing_fee} className="h-10" disabled />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FeeCodeSheet
