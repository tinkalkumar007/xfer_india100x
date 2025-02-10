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
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

const emailFormSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
})

const EmailReset = ({ setScreen, inputType, setInputType }) => {
  const emailForm = useForm({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      email: '',
    },
  })
  const onEmailSubmit = (data) => {
    console.log('✅ Form Submitted:', data) // Debugging: Check if this logs in console
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
            Enter the email address associated with your account, and we&apos;ll
            send you a link to reset your password.
          </p>
        </div>

        <Form {...emailForm}>
          <form
            onSubmit={emailForm.handleSubmit(onEmailSubmit)}
            className="space-y-8"
          >
            <div className="flex flex-col gap-10">
              <div className="grid grid-cols-1 gap-4">
                <FormField
                  name="email"
                  control={emailForm.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="Enter your email"
                          aria-label="Email Address"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <span
                className="absolute right-0 bottom-[9.4rem] text-[0.830rem] hover:underline cursor-pointer"
                onClick={() => setInputType('phone')}
              >
                Use mobile number instead?
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

export default EmailReset
