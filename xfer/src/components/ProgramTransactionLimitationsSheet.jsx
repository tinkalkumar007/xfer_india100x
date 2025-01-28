import { Separator } from '@/components/ui/separator'
import {
  ArrowDown,
  ArrowUp,
  IndianRupee,
  Power,
  Send,
  ShoppingBag,
  ShoppingCart,
  Wifi,
} from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useEffect, useState } from 'react'

const formSchema = z.object({
  atm: z.object({
    status: z.boolean(),
    max_limit: z
      .union([z.string(), z.number()])
      .optional()
      .transform((val) => (typeof val === 'string' ? parseFloat(val) : val)),
  }),
  pos: z.object({
    status: z.boolean(),
    max_limit: z
      .union([z.string(), z.number()])
      .optional()
      .transform((val) => (typeof val === 'string' ? parseFloat(val) : val)),
  }),
  imps: z.object({
    status: z.boolean(),
    max_limit: z
      .union([z.string(), z.number()])
      .optional()
      .transform((val) => (typeof val === 'string' ? parseFloat(val) : val)),
  }),
  ecommerce: z.object({
    status: z.boolean(),
    max_limit: z
      .union([z.string(), z.number()])
      .optional()
      .transform((val) => (typeof val === 'string' ? parseFloat(val) : val)),
  }),
  contactless: z.object({
    status: z.boolean(),
    max_limit: z
      .union([z.string(), z.number()])
      .optional()
      .transform((val) => (typeof val === 'string' ? parseFloat(val) : val)),
  }),
  offline: z.object({
    status: z.boolean(),
    max_limit: z
      .union([z.string(), z.number()])
      .optional()
      .transform((val) => (typeof val === 'string' ? parseFloat(val) : val)),
  }),
  load_max_limit: z.object({
    status: z.boolean(),
    max_limit: z
      .union([z.string(), z.number()])
      .optional()
      .transform((val) => (typeof val === 'string' ? parseFloat(val) : val)),
  }),
})

const ProgramTransactionLimitationsSheet = () => {
  const [data, setData] = useState({
    atm: {
      status: true,
      max_limit: 10000,
    },
    pos: {
      status: false,
      max_limit: 50000,
    },
    imps: {
      status: true,
      max_limit: 60000,
    },
    ecommerce: {
      status: false,
      max_limit: 40000,
    },
    contactless: {
      status: true,
      max_limit: 40000,
    },
    offline: {
      status: true,
      max_limit: 50000,
    },
    load_max_limit: {
      status: false,
      max_limit: 100000,
    },
  })

  const [editable, setEditable] = useState(false)
  const [editFields, setEditFields] = useState(data)

  const onSubmit = (values) => {
    console.log(values)
    setData(values)
    setEditable(false)
  }

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: data,
    mode: 'onSubmit',
  })

  return (
    <div className=" rounded-md bg-muted/50 border w-full space-y-2">
      {editable ? (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex justify-between gap-2 items-center py-2 px-4">
                <h2 className="text-md font-medium ">
                  Transaction Limitations
                </h2>

                <Button className="h-6" type="submit">
                  Save
                </Button>
              </div>
              <div className="w-full flex justify-center">
                <Separator className="w-[96%] text-center" />
              </div>

              <div className="grid grid-cols-2 gap-2 px-4 py-2">
                <div className="flex flex-col gap-8 border rounded-md px-4 py-4">
                  <div className="flex items-center justify-between space-x-4">
                    <div className="flex items-center space-x-4">
                      <div>
                        <p className="text-sm font-medium">ATM</p>
                        <p className="text-sm text-muted-foreground">
                          {data.atm.status === true ? 'Enabled' : 'Disabled'}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-6 items-center">
                      <FormField
                        control={form.control}
                        name="atm.max_limit"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input className="bg-muted/50" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="atm.status"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between space-x-4">
                    <div className="flex items-center space-x-4">
                      <div>
                        <p className="text-sm font-medium ">POS</p>
                        <p className="text-sm text-muted-foreground">
                          {data.pos.status === true ? 'Enabled' : 'Disabled'}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-6 items-center">
                      <FormField
                        control={form.control}
                        name="pos.max_limit"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input className="bg-muted/50" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="pos.status"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between space-x-4">
                    <div className="flex items-center space-x-4">
                      <div>
                        <p className="text-sm font-medium">IMPS</p>
                        <p className="text-sm text-muted-foreground">
                          {data.imps.status === true ? 'Enabled' : 'Disabled'}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-6 items-center">
                      <FormField
                        control={form.control}
                        name="imps.max_limit"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input className="bg-muted/50" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="imps.status"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between space-x-4">
                    <div className="flex items-center space-x-4">
                      <div>
                        <p className="text-sm font-medium leading-none">
                          E-Commerce
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {data.ecommerce.status === true
                            ? 'Enabled'
                            : 'Disabled'}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-6 items-center">
                      <FormField
                        control={form.control}
                        name="ecommerce.max_limit"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input className="bg-muted/50" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="ecommerce.status"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-8 border rounded-md px-4 py-4">
                  <div className="flex items-center justify-between space-x-4">
                    <div className="flex items-center space-x-4">
                      <div>
                        <p className="text-sm font-medium">Contactless</p>
                        <p className="text-sm text-muted-foreground">
                          {data.contactless.status === true
                            ? 'Enabled'
                            : 'Disabled'}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-6 items-center">
                      <FormField
                        control={form.control}
                        name="contactless.max_limit"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input className="bg-muted/50" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="contactless.status"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between space-x-4">
                    <div className="flex items-center space-x-4">
                      <div>
                        <p className="text-sm font-medium">Offline</p>
                        <p className="text-sm text-muted-foreground">
                          {data.contactless.status === true
                            ? 'Enabled'
                            : 'Disabled'}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-6 items-center">
                      <FormField
                        control={form.control}
                        name="offline.max_limit"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input className="bg-muted/50" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="offline.status"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between space-x-4">
                    <div className="flex items-center space-x-4">
                      <div>
                        <p className="text-sm font-medium">Max Load Limit</p>
                        <p className="text-sm text-muted-foreground">
                          {data.load_max_limit.status === true
                            ? 'Enabled'
                            : 'Disabled'}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-6 items-center">
                      <FormField
                        control={form.control}
                        name="load_max_limit.max_limit"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input className="bg-muted/50" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="load_max_limit.status"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </Form>
        </>
      ) : (
        <>
          <div className="flex justify-between gap-2 items-center py-2 px-4">
            <h2 className="text-md font-medium ">Transaction Limitations</h2>

            <Button
              className="h-6"
              type="submit"
              onClick={() => setEditable(true)}
            >
              Edit
            </Button>
          </div>
          <div className="w-full flex justify-center">
            <Separator className="w-[96%] text-center" />
          </div>
          <div className="grid grid-cols-2 gap-2 px-4 py-2">
            <div className="flex flex-col gap-8 border rounded-md px-4 py-4">
              <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="text-sm font-medium">ATM</p>
                    <p className="text-sm text-muted-foreground">
                      {data.atm.status === true ? 'Enabled' : 'Disabled'}
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 items-center">
                  <p
                    className={`${
                      data.atm.status ? '' : 'blur-sm'
                    } text-sm font-medium tracking-wide`}
                  >
                    &#8377; {data.atm.max_limit}
                  </p>
                  <Switch disabled checked={data.atm.status} />
                </div>
              </div>
              <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="text-sm font-medium ">POS</p>
                    <p className="text-sm text-muted-foreground">
                      {data.pos.status === true ? 'Enabled' : 'Disabled'}
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 items-center">
                  <p
                    className={`${
                      data.pos.status ? '' : 'blur-sm'
                    } text-sm font-medium tracking-wide`}
                  >
                    &#8377; {data.pos.max_limit}
                  </p>
                  <Switch disabled checked={data.pos.status === true} />
                </div>
              </div>
              <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="text-sm font-medium">IMPS</p>
                    <p className="text-sm text-muted-foreground">
                      {data.imps.status === true ? 'Enabled' : 'Disabled'}
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 items-center">
                  <p
                    className={`${
                      data.imps.status ? '' : 'blur-sm'
                    } text-sm font-medium tracking-wide`}
                  >
                    &#8377; {data.imps.max_limit}
                  </p>
                  <Switch disabled checked={data.imps.status === true} />
                </div>
              </div>
              <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="text-sm font-medium leading-none">
                      E-Commerce
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {data.ecommerce.status === true ? 'Enabled' : 'Disabled'}
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 items-center">
                  <p
                    className={`${
                      data.ecommerce.status ? '' : 'blur-sm'
                    } text-sm font-medium tracking-wide`}
                  >
                    &#8377; {data.ecommerce.max_limit}
                  </p>
                  <Switch disabled checked={data.ecommerce.status === true} />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-8 border rounded-md px-4 py-4">
              <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="text-sm font-medium">Contactless</p>
                    <p className="text-sm text-muted-foreground">
                      {data.contactless.status === true
                        ? 'Enabled'
                        : 'Disabled'}
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 items-center">
                  <p
                    className={`${
                      data.contactless.status ? '' : 'blur-sm'
                    } text-sm font-medium tracking-wide`}
                  >
                    &#8377; {data.contactless.max_limit}
                  </p>
                  <Switch disabled checked={data.contactless.status === true} />
                </div>
              </div>
              <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="text-sm font-medium">Offline</p>
                    <p className="text-sm text-muted-foreground">
                      {data.contactless.status === true
                        ? 'Enabled'
                        : 'Disabled'}
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 items-center">
                  <p
                    className={`${
                      data.offline.status ? '' : 'blur-sm'
                    } text-sm font-medium tracking-wide`}
                  >
                    &#8377; {data.offline.max_limit}
                  </p>
                  <Switch disabled checked={data.offline.status === true} />
                </div>
              </div>
              <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="text-sm font-medium">Max Load Limit</p>
                    <p className="text-sm text-muted-foreground">
                      {data.load_max_limit.status === true
                        ? 'Enabled'
                        : 'Disabled'}
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 items-center">
                  <p
                    className={`${
                      data.load_max_limit.status ? '' : 'blur-sm'
                    } text-sm font-medium tracking-wide`}
                  >
                    &#8377; {data.load_max_limit.max_limit}
                  </p>
                  <Switch
                    disabled
                    checked={data.load_max_limit.status === true}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ProgramTransactionLimitationsSheet
