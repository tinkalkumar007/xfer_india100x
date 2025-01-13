import { Input } from '@/components/ui/input'
import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useState } from 'react'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const paymentMethodSchema = z.object({
  name: z.string().min(1),
  card_number: z.string().min(1),
  expiry_month: z.string().min(1),
  expiry_year: z.string().min(1),
  cvv: z.string().min(3),
})

const getCardType = (cardNumber) => {
  // Remove spaces and dashes
  const cleanNumber = cardNumber.replace(/[\s-]/g, '')

  // Visa
  if (/^4/.test(cleanNumber)) {
    return 'visa'
  }
  // Mastercard
  if (/^5[1-5]/.test(cleanNumber)) {
    return 'mastercard'
  }
  // RuPay
  if (/^6[0-9]{15}/.test(cleanNumber)) {
    return 'rupay'
  }

  return null
}

const MakePayment = () => {
  const [screen, setScreen] = useState('card')
  const paymentForm = useForm({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: {
      name: '',
      card_number: '',
      expiry_month: '',
      expiry_year: '',
      cvc: '',
    },
  })

  const onSubmitPaymentDetails = (data) => {
    console.log(data)
  }

  return (
    <Card className="mt-3">
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
        <CardDescription>
          Add a new payment method to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div>
          <RadioGroup defaultValue="card" className="grid grid-cols-3 gap-4">
            <div>
              <RadioGroupItem
                onClick={() => {
                  setScreen('card')
                }}
                value="card"
                id="card"
                className="peer sr-only"
              />
              <Label
                htmlFor="card"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="mb-3 h-6 w-6"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M2 10h20" />
                </svg>
                Card
              </Label>
            </div>
            <div>
              <RadioGroupItem
                value="paypal"
                id="paypal"
                className="peer sr-only"
                onClick={() => {
                  setScreen('paypal')
                  console.log(screen)
                }}
              />
              <Label
                htmlFor="paypal"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <Icons.paypal className="mb-3 h-6 w-6" />
                Paypal
              </Label>
            </div>
            <div>
              <RadioGroupItem
                onClick={() => {
                  setScreen('apple')
                }}
                value="apple"
                id="apple"
                className="peer sr-only"
              />
              <Label
                htmlFor="apple"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <Icons.apple className="mb-3 h-6 w-6" />
                Apple
              </Label>
            </div>
            <div>
              <RadioGroupItem
                value="upi"
                id="upi"
                className="peer sr-only"
                onClick={() => {
                  setScreen('upi')
                }}
              />
              <Label
                htmlFor="upi"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <Icons.upi className="mb-3 h-6 w-6" />
                UPI
              </Label>
            </div>
          </RadioGroup>
          <Form {...paymentForm}>
            <form
              onSubmit={paymentForm.handleSubmit(onSubmitPaymentDetails)}
              className="flex flex-col gap-4 mt-3"
            >
              <div>
                <FormField
                  control={paymentForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter the name" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={paymentForm.control}
                  name="card_number"
                  render={({ field }) => {
                    const cardType = getCardType(field.value)
                    return (
                      <FormItem>
                        <FormLabel>Card Number</FormLabel>
                        <div className="flex gap-2 items-center">
                          <FormControl>
                            <Input {...field} placeholder="Card number" />
                          </FormControl>
                          {cardType === 'visa' && (
                            <Icons.visa className="w-10 h-10" />
                          )}
                          {cardType === 'mastercard' && (
                            <Icons.mastercard className="w-10 h-10" />
                          )}
                          {cardType === 'rupay' && (
                            <Icons.rupay className="w-10 h-10" />
                          )}
                        </div>
                      </FormItem>
                    )
                  }}
                />
              </div>
              <div>
                <FormField
                  control={paymentForm.control}
                  name="expiry_month"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expiry Month</FormLabel>
                      <FormControl>
                        <Select
                          {...field}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Month" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 12 }, (_, i) => (
                              <SelectItem key={i} value={`${i + 1}`}>
                                {new Date(0, i).toLocaleString('default', {
                                  month: 'long',
                                })}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={paymentForm.control}
                  name="expiry_year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expiry Year</FormLabel>
                      <FormControl>
                        <Select
                          {...field}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Year" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 10 }, (_, i) => (
                              <SelectItem
                                key={i}
                                value={`${new Date().getFullYear() + i}`}
                              >
                                {new Date().getFullYear() + i}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={paymentForm.control}
                  name="cvv"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CVV</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="CVC" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <Button className=""> Pay</Button>
              </div>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  )
}

export default MakePayment
