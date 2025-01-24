import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
  inputType: z.enum(['email', 'phone']),
  email: z.string().email({ message: 'Invalid email address.' }).optional(),
  phone: z
    .string()
    .regex(/^\d{10}$/, { message: 'Phone number must be 10 digits.' })
    .optional(),
})

export default function ForgotPasswordForm({
  setScreen,
  inputType,
  setInputType,
}) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      inputType: inputType,
      email: '',
      phone: '',
    },
  })
  const onSubmit = (data) => {
    console.log('Form Submitted:', data)
  }

  const [mode, setMode] = useState('email')
  const [isLoading, setIsLoading] = useState(false)
  return (
    <div className="'grid gap-6'">
      <div className="mx-auto w-full max-w-md space-y-4 relative">
        <div className="flex flex-col gap-2">
          <h2 className="mt-6 text-center text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-50">
            Forgot your password?
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Enter the email address associated with your account and we&apos;ll
            send you a link to reset your password.
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col gap-10">
              {inputType === 'email' && (
                <div className="grid grid-cols-1 gap-4">
                  <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="Enter your email"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            aria-label="Email Address"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
              {inputType === 'phone' && (
                <div className="grid grid-cols-1 gap-4">
                  <FormField
                    name="phone"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mobile Number</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="Enter your phone number "
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            aria-label="Phone numbers"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              <span
                className="absolute right-0 bottom-[9.4rem] text-[0.830rem] hover:underline cursor-pointer"
                onClick={() => {
                  inputType === 'email'
                    ? setInputType('phone')
                    : setInputType('email')
                }}
              >
                Use {inputType === 'phone' ? 'email' : 'mobile number'}
                {` `}
                instead?
              </span>
              <div className="flex justify-center items-center w-full">
                <Button
                  disabled={isLoading}
                  className="w-full"
                  type="submit"
                  onClick={() => {
                    setScreen('otp')
                  }}
                >
                  Reset
                </Button>
              </div>
            </div>
          </form>
        </Form>

        <div className="flex justify-center">
          <span
            className="hover:underline cursor-pointer"
            onClick={() => {
              setScreen('login')
            }}
          >
            Back to login
          </span>
        </div>
        <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{' '}
          <Link
            href="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link
            href="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
