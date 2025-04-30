import React from 'react'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

import { useFrappeGetDoc } from 'frappe-react-sdk'

const phoneFormSchema = z.object({
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .transform((val) => val.replace(/[\s()-]/g, '')) // Remove spaces, parentheses, and hyphens
    .refine((val) => /^\+?\d{10,14}$/.test(val), {
      message:
        "Please enter a valid phone number (10-14 digits, optionally starting with '+')",
    }),
})

const PasswordReset = ({ setScreen, inputType, setInputType }) => {
  const phoneForm = useForm({
    resolver: zodResolver(phoneFormSchema),
    defaultValues: {
      phone: '',
    },
  })

  console.log('User Data:', userData)

  const onPhoneSubmit = (data) => {
    console.log('✅ Form Submitted:', data)
    setScreen('otp')
  }
  return (
    <div className="grid gap-6">
      <div className="mx-auto w-full max-w-md space-y-4 relative">
        <div className="flex flex-col gap-2">
          <h2 className="mt-6 text-center text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-50">
            Forgot your password?
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Enter the mobile number associated with your account, and we&apos;ll
            send you a link to reset your password.
          </p>
        </div>

        <Form {...phoneForm}>
          <form
            onSubmit={phoneForm.handleSubmit(onPhoneSubmit)}
            className="space-y-8"
          >
            <div className="flex flex-col gap-10">
              <div className="grid grid-cols-1 gap-4">
                <FormField
                  name="phone"
                  control={phoneForm.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile Number</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="tel"
                          placeholder="Enter your phone number"
                          aria-label="Phone number"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <span
                className="absolute right-0 bottom-[9.4rem] text-[0.830rem] hover:underline cursor-pointer"
                onClick={() => setInputType('email')}
              >
                Use email address instead?
              </span>

              <div className="flex justify-center items-center w-full">
                <Button className="w-full" type="submit">
                  Reset
                </Button>
              </div>
            </div>
          </form>
        </Form>

        <div className="flex justify-center">
          <span
            className="hover:underline cursor-pointer"
            onClick={() => setScreen('login')}
          >
            Back to login
          </span>
        </div>

        <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{' '}
          <Link
            to="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link
            to="/privacy"
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

export default PasswordReset
