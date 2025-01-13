import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const formSchema = z.object({
  newPassword: z
    .string()
    .min(6, { message: 'New password must be at least 6 characters.' }),
  confirmPassword: z
    .string()
    .min(6, { message: 'Please confirm your new password.' })
    .refine((val, ctx) => val === ctx.parent.newPassword, {
      message: 'Passwords do not match.',
    }),
})

export default function ResetPasswordForm({ setScreen }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  })
  const onSubmit = (data) => {
    console.log('Form Submitted:', data)
  }

  const [isLoading, setIsLoading] = useState(false)
  return (
    <div className="'grid gap-6'">
      <div className="mx-auto w-full max-w-md space-y-4">
        <div>
          <h2 className="mt-6 text-center text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-50">
            Reset Your Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Enter your new password below to regain access to your account.
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col gap-4 relative">
              <div className="grid grid-cols-1 gap-4">
                <FormField
                  control={form.control}
                  type="password"
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your new password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  type="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Re-enter your new password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-center items-center w-full">
                <Button
                  onClick={() => {
                    setScreen('login')
                  }}
                  disabled={isLoading}
                  className="w-full"
                  type="submit"
                >
                  Reset
                </Button>
              </div>
            </div>
          </form>
        </Form>

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
