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
const otpSchema = z.object({
  otp: z
    .string()
    .length(4, 'OTP must be exactly 6 digits.')
    .regex(/^\d+$/, 'OTP must contain only digits.'),
})

const UserSecurityForm = () => {
  const [twoOnDialogBox, setTwoOnDialogBox] = useState(false)
  const [twoOffDialogBox, setTwoOffDialogBox] = useState(false)
  const [activateMethod, setActivateMethod] = useState(null) // Track selected method
  const [sendOtp, setSendOtp] = useState(false)
  const [cookieValue, setCookieValue] = useState('')

  useEffect(() => {
    const getCookie = (cookieName) => {
      const cookie = document.cookie
        .split('; ')
        .find((row) => row.startsWith(`${cookieName}=`))
      return cookie ? cookie.split('=')[1] : ''
    }
    setCookieValue(getCookie('twoState'))
    if (sendOtp) {
      const fetchData = async () => {
        try {
          const response = await axios.get('/user/sendOtp', {
            withCredentials: true,
          });
          console.log(response);
        } catch (err) {
          console.log(err.message);
        }
      };
      fetchData();
    }
  }, [sendOtp, activateMethod]) // Re-run effect when OTP or activation method changes

  const toggleDialogBox = (setter) => {
    setter((prevState) => !prevState)
  }

  const form = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: '' },
  })

  const onSubmit = (data) => {
    document.cookie = 'twoState=true'
    console.log(data.otp);

    const fetchData = async () => {
      try {
        const response = await axios.post('/user/validateOtp',
          {
            code:data.otp
          },
          {
            withCredentials: true,
          }
        );
        console.log(response.data.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();

    setCookieValue('true')
    setSendOtp(false)
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
            <ChangePasswordSection />
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

        <div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                onClick={() =>
                  cookieValue === 'true'
                    ? toggleDialogBox(setTwoOffDialogBox)
                    : toggleDialogBox(setTwoOnDialogBox)
                }
              >
                {cookieValue === 'true'
                  ? 'Turn off Two-Factor Authentication'
                  : 'Turn on Two-Factor Authentication'}
              </Button>
            </AlertDialogTrigger>

            {twoOffDialogBox && (
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Turn off 2-Step Verification
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Turning off 2-Step Verification will remove the extra
                    security on your account.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      document.cookie = 'twoState=false'
                      setCookieValue('false')
                      setTwoOffDialogBox(false)
                    }}
                  >
                    Turn off
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            )}

            {twoOnDialogBox && (
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Select Two-Factor Authentication Method
                  </AlertDialogTitle>
                  <AlertDialogDescription className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setActivateMethod('email')
                        setTwoOnDialogBox(false)
                        setSendOtp(true)
                      }}
                    >
                      Email Based Authentication
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setActivateMethod('sms')
                        setTwoOnDialogBox(false)
                        setSendOtp(true)
                      }}
                    >
                      SMS Based Authentication
                    </Button>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            )}

            {sendOtp && (
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    {activateMethod === 'email'
                      ? 'Enter the otp sent on your email address'
                      : 'Enter the otp sent on your mobile number'}
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      name="otp"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>OTP</FormLabel>
                          <FormControl>
                            <InputOTP
                              {...field}
                              onChange={(value) => field.onChange(value)}
                              value={field.value}
                              length={6}
                              maxLength={6}
                            >
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
                      <Button type="submit">Verify OTP</Button>
                    </AlertDialogFooter>
                  </form>
                </Form>
              </AlertDialogContent>
            )}
          </AlertDialog>
        </div>
      </div>
      {/* <Separator />
      <div className="flex flex-col gap-4">
        <h3 className="font-bold">IP Whitelisting</h3>
        <div className="grid grid-cols-1">
          <IpWhitelistingTable />
        </div>
      </div> */}
    </div>
  )
}

export default UserSecurityForm
