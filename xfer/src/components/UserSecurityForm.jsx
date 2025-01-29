import { Button } from '@/components/ui/button'
import { ChangePasswordSection } from './ChangePasswordSection'
import { Separator } from '@/components/ui/separator'
import { useState, useEffect } from 'react'
import axios from '@/api/axios'
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
import IpWhitelistingTable from '@/components/IpWhitelistingTable'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  useFrappeAuth,
  useFrappeCreateDoc,
  useFrappeGetDoc,
  useFrappeUpdateDoc,
} from 'frappe-react-sdk'
import { CircleX } from 'lucide-react'
const otpSchema = z.object({
  otp: z
    .string()
    .length(4, 'OTP must be exactly 6 digits.')
    .regex(/^\d+$/, 'OTP must contain only digits.'),
})

const UserSecurityForm = () => {
  const [screen, setScreen] = useState('select-screen')

  const handleScreen = (value) => {
    setScreen(value)
  }

  const { currentUser, isLoading: isCurrentUserLoading } = useFrappeAuth()

  const { updateDoc, loading } = useFrappeUpdateDoc()

  const { data: currentUserData, isLoading: currentUserDataLoading } =
    useFrappeGetDoc('User', currentUser)

  if (!currentUserDataLoading) {
    console.log(currentUserData)
  }

  const disableMFA = () => {
    updateDoc('User', currentUser, {
      mfa: 0,
    })
  }

  const enableMFA = () => {
    updateDoc('User', currentUser, {
      mfa: 1,
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-6">
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-md font-medium">Password Management</h3>
            <p className="text-md font-light">
              You can change your password for security reasons or reset it if
              you forget it.
            </p>
          </div>
          <div>
            <ChangePasswordSection
              currentUserData={currentUserData}
              currentUserDataLoading={currentUserDataLoading}
              currentUser={currentUser}
            />
          </div>
        </div>
      </div>

      <Separator />

      <div className="flex flex-col gap-4">
        <h3 className="text-md font-medium">Two-Factor Authentication (2FA)</h3>
        <p className="text-md font-light">
          Prevent hackers from accessing your account with an additional layer
          of security.
        </p>

        {currentUserData?.mfa ? (
          <div>
            <AlertDialog>
              <AlertDialogTrigger>
                <Button variant="outline">Turn off 2 Step verification</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will disable two-step
                    verification from your account, making it vulnerable to
                    attackers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={disableMFA}>
                    Disable
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ) : null}
        {!currentUserData?.mfa ? (
          <div>
            <AlertDialog>
              <AlertDialogTrigger>
                <Button>Turn on 2 Step verification</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                {screen === 'select-screen' && (
                  <>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Select Authentication Method
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        You will receive an OTP on your selected method.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="justify-between flex w-full">
                      <Button
                        onClick={() => {
                          setScreen('email-based')
                        }}
                      >
                        Email Based Authentication
                      </Button>

                      <Button
                        onClick={() => {
                          setScreen('mobile-based')
                        }}
                      >
                        Mobile Based Authentication
                      </Button>
                    </div>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                    </AlertDialogFooter>
                  </>
                )}
                {screen === 'email-based' && (
                  <>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Enter the OTP sent on your email address.
                      </AlertDialogTitle>
                    </AlertDialogHeader>

                    <div className="w-full">
                      <InputOTP maxLength={4}>
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
                    </div>
                    <AlertDialogFooter>
                      <div className="flex justify-end gap-2 w-full">
                        <AlertDialogCancel
                          onClick={() => {
                            setScreen('select-screen')
                          }}
                        >
                          Cancel
                        </AlertDialogCancel>
                        <Button onClick={enableMFA}>Submit</Button>
                      </div>
                    </AlertDialogFooter>
                  </>
                )}
                {screen === 'mobile-based' && (
                  <>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Enter the OTP sent on your mobile number.
                      </AlertDialogTitle>
                    </AlertDialogHeader>

                    <div className="w-full">
                      <InputOTP maxLength={4}>
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
                    </div>
                    <AlertDialogFooter>
                      <div className="flex justify-end gap-2 w-full">
                        <AlertDialogCancel
                          onClick={() => {
                            setScreen('select-screen')
                          }}
                        >
                          Cancel
                        </AlertDialogCancel>
                        <Button onClick={enableMFA}>Submit</Button>
                      </div>
                    </AlertDialogFooter>
                  </>
                )}
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default UserSecurityForm
