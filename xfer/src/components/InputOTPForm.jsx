import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { toast } from '@/hooks/use-toast'
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from '@/components/ui/input-otp'
import { Link } from 'react-router-dom'

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: 'Your one-time password must be 6 characters.',
  }),
})

export default function InputOTPForm({ setScreen, inputType }) {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: '',
    },
  })

  function onSubmit(data) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <div className="w-full flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-center">
                        <FormLabel className="text-2xl font-semibold">
                          One-Time Password
                        </FormLabel>
                      </div>
                      <div className="flex justify-center">
                        <FormDescription>
                          Please enter the one-time password sent to your{' '}
                          {inputType === 'email' ? 'email' : 'phone'}.
                        </FormDescription>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                    </div>

                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>

          <div className="w-full flex justify-center">
            <Button
              type="submit"
              className="w-[50%]"
              onClick={() => {
                setScreen('reset-password')
              }}
            >
              Submit
            </Button>
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
      </form>
    </Form>
  )
}
