import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp'

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
import { useToast } from '@/hooks/use-toast'
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
import { Navigate, useNavigate } from 'react-router-dom'
import { use } from 'react'
import { TableRowsSplit } from 'lucide-react'
import { useFrappeUpdateDoc } from 'frappe-react-sdk'

const mobileSchema = z.object({
  mobile_number: z
    .string()
    .regex(/^\d{10}$/, 'Mobile number must be exactly 10 digits')
    .nonempty('Mobile number is required'),
})

const passwordSchema = z
  .object({
    new_password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .max(20, 'Password must be at most 20 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/\d/, 'Password must contain at least one number')
      .regex(
        /[@$!%*?&#]/,
        'Password must contain at least one special character (@$!%*?&#)'
      ),

    confirm_password: z
      .string()
      .min(6, 'Password must be at least 6 characters'),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  })

const otpSchema = z.object({
  otp: z
    .string()
    .regex(/^\d{4}$/, 'OTP must be exactly 4 digits')
    .nonempty('OTP is required'),
})

export function ChangePasswordSection({
  currentUserData,
  currentUserDataLoading,
  currentUser,
}) {
  const { toast } = useToast()
  const { updateDoc } = useFrappeUpdateDoc()

  const [screen, setScreen] = useState('mobile-screen')
  const navigate = useNavigate()

  const mobileForm = useForm({
    resolver: zodResolver(mobileSchema),
    defaultValues: { mobile_number: '' },
    mode: 'onChange',
  })

  const otpForm = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: '' },
    mode: 'onChange',
  })

  const passwordForm = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: { new_password: '', confirm_password: '' },
    mode: 'onChange',
  })

  const mobileWatch = mobileForm.watch()

  // Handlers
  const handleMobileSubmit = (data) => {
    console.log('Mobile Submitted:', data)
    if (data.mobile_number === '8448954679') {
      console.log('Correct')
      setScreen('otp-screen')
    }
  }

  const handleOtpSubmit = (data) => {
    console.log(data)
    if (data.otp === '1234') {
      console.log('Correct')
      setScreen('password-screen')
    }
  }

  const handlePasswordSubmit = (data) => {
    updateDoc('User', currentUserData.owner, {
      new_password: data.new_password,
    })
      .then(() => {
        toast({
          title: 'Password Changed',
          description: 'Your password has been changed successfully.',
        })
        navigate('/account')
      })
      .catch((err) => {
        toast({
          title: 'Something went wrong',
          description: 'Uh-Oh! Something went wrong.',
        })
        console.log(err)
      })
  }

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Change Password</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          {screen === 'mobile-screen' && (
            <>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Please enter the mobile number that ends with **
                  {currentUserData?.mobile_no?.slice(-4)} for verification.
                </AlertDialogTitle>
              </AlertDialogHeader>
              <Form {...mobileForm}>
                <form
                  onSubmit={mobileForm.handleSubmit(handleMobileSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={mobileForm.control}
                    name="mobile_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mobile Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your mobile number"
                            {...field}
                            type="text"
                            autocomplete="off"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button>Verify</Button>
                  </AlertDialogFooter>
                </form>
              </Form>
            </>
          )}
          {screen === 'otp-screen' && (
            <>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Please enter the mobile number that ends with ***679 for
                  verification.
                </AlertDialogTitle>
              </AlertDialogHeader>
              <Form {...otpForm}>
                <form
                  onSubmit={otpForm.handleSubmit(handleOtpSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={otpForm.control}
                    name="otp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Please enter the OTP</FormLabel>
                        <FormControl>
                          <InputOTP maxLength={4} {...field}>
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                              <InputOTPSlot index={2} />
                              <InputOTPSlot index={3} />
                            </InputOTPGroup>
                          </InputOTP>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button>Submit</Button>
                  </AlertDialogFooter>
                </form>
              </Form>
            </>
          )}
          {screen === 'password-screen' && (
            <>
              <AlertDialogHeader>
                <AlertDialogTitle>Create your new password.</AlertDialogTitle>
              </AlertDialogHeader>
              <Form {...passwordForm}>
                <form
                  onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={passwordForm.control}
                    name="new_password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your new password"
                            {...field}
                            type="password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={passwordForm.control}
                    name="confirm_password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Re-enter the new password"
                            {...field}
                            type="password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button>Create</Button>
                  </AlertDialogFooter>
                </form>
              </Form>
            </>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
