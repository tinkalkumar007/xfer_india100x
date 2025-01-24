import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

const mobileNumberSchema = z
  .string()
  .regex(/^\d{10}$/, 'Mobile number must be exactly 10 digits.')
  .refine((value) => value.endsWith('9867'), {
    message: 'Mobile number must end with ***9867.',
  })

const otpSchema = z.string().length(6, 'OTP must be exactly 6 digits.')

export function ChangePasswordSection() {
  const form = useForm({
    resolver: zodResolver(mobileNumberSchema),
    defaultValues: {
      mobileNumber: '',
      otp: '',
    },
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form

  const [isMobileVerified, setIsMobileVerified] = useState(false)
  const [isOtpDialogOpen, setIsOtpDialogOpen] = useState(false)

  const onMobileSubmit = (data) => {
    console.log('Mobile number submitted:', data.mobileNumber)
    setIsMobileVerified(true)
    setIsOtpDialogOpen(true)
  }

  const onOtpSubmit = (data) => {
    console.log('OTP submitted:', data.otp)
    // Add OTP verification logic here
  }

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Change Password</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Please enter the mobile number that ends with ***9867 for
              verification.
            </AlertDialogTitle>
          </AlertDialogHeader>
          <Form {...form}>
            <form onSubmit={handleSubmit(onMobileSubmit)} className="space-y-8">
              <FormField
                control={control}
                name="mobileNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your mobile number"
                        {...field}
                        type="text"
                      />
                    </FormControl>

                    <FormMessage>{errors.mobileNumber?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction type="submit">Verify</AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>

      {/* OTP Dialog (appears after mobile number is verified) */}
      {isOtpDialogOpen && (
        <AlertDialog open={isOtpDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Enter OTP</AlertDialogTitle>
              <AlertDialogDescription>
                A One-Time Password (OTP) has been sent to your mobile number.
                Please enter it below to verify.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <Form {...form}>
              <form onSubmit={handleSubmit(onOtpSubmit)} className="space-y-8">
                <FormField
                  control={control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>OTP</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter OTP" {...field} type="text" />
                      </FormControl>
                      <FormMessage>{errors.otp?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setIsOtpDialogOpen(false)}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction type="submit">
                    Verify OTP
                  </AlertDialogAction>
                </AlertDialogFooter>
              </form>
            </Form>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  )
}
