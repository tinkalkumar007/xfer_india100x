import { Separator } from '@/components/ui/separator'
import { Gift } from 'lucide-react'
import { Button } from '@/components/ui/button'
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
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useState } from 'react'

const items = [
  {
    id: 'insurance_card',
    label: 'Insurance Card',
  },
  {
    id: 'insurance_travel',
    label: 'Insurance Travel',
  },
  {
    id: 'lounge_access',
    label: 'Lounge Access',
  },
]

const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one item.',
  }),
})

const defaultValues = {
  items: [],
}

const RewardBenefitsSheet = () => {
  const [showRewards, setShowRewards] = useState([])

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues,
  })

  const onSubmit = (data) => {
    console.log(data)
    setShowRewards(data.items)
  }

  return (
    <div className="rounded-md bg-muted/50 border w-full space-y-2">
      <h2 className="text-md font-medium py-2 px-4">Reward Benefits</h2>
      <div className="w-full flex justify-center">
        <Separator className="w-[92%] text-center -mt-2" />
      </div>
      {console.log(showRewards)}
      {showRewards.length > 0 ? (
        <div className="w-full px-4">
          <div className="bg-muted/40 flex flex-wrap h-full gap-2">
            {showRewards.map((reward) => {
              const rewardLabel = reward.split('_')
              return (
                <div>
                  <Badge variant="primary">
                    {rewardLabel
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(' ')}
                  </Badge>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 py-4">
          <Gift strokeWidth={1.5} />
          <h2 className="text-sm font-medium text-center">
            No Reward Benefits added
          </h2>
          <p className="text-xs font-normal text-muted-foreground text-center">
            You have not added any Reward Details. Add one below.
          </p>
          <Sheet>
            <SheetTrigger>
              <Button className="h-6">
                <span className="text-xs">CONFIGURE</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Rewards Benefits</SheetTitle>
                <SheetDescription>
                  A reward is a benefit or incentive given to individuals for
                  achieving specific goals or behaviors.
                </SheetDescription>
              </SheetHeader>
              <Separator className="mt-4" />
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8 mt-4"
                >
                  <FormField
                    control={form.control}
                    name="items"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel className="text-base">
                            Reward Type
                          </FormLabel>
                          <FormDescription>
                            Select your reward type.
                          </FormDescription>
                        </div>
                        {items.map((item) => (
                          <FormField
                            key={item.id}
                            control={form.control}
                            name="items"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={item.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              item.id,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== item.id
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {item.label}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Submit</Button>
                </form>
              </Form>
            </SheetContent>
          </Sheet>
        </div>
      )}
    </div>
  )
}

export default RewardBenefitsSheet
