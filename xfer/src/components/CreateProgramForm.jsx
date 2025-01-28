import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from '@/components/ui/select'

import { DatePicker } from '@/components/ui/date-picker'

import { Textarea } from '@/components/ui/textarea'

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif']

const velocityCodeItems = [
  {
    id: 'isDaily',
    label: 'isDaily',
  },
  {
    id: 'isWeekly',
    label: 'isWeekly',
  },
  {
    id: 'isMonthly',
    label: 'isMonthly',
  },
  {
    id: 'isQuarterly',
    label: 'isQuarterly',
  },
  {
    id: 'isYearly',
    label: 'isYearly',
  },
]

// Define Zod Schema
const formSchema = z.object({
  // location: z.object({
  //   lat: z.number().min(-90).max(90, 'Latitude must be between -90 and 90'),
  //   long: z
  //     .number()
  //     .min(-180)
  //     .max(180, 'Longitude must be between -180 and 180'),
  // }),
  // channel: z.enum(['web', 'android', 'ios']),
  product_name: z
    .string()
    .min(3, 'Program name must be at least 3 characters')
    .nonempty('Program name is required'),
  product_description: z.string().nonempty('Description is required'),
  product_category: z.string().nonempty('Description is required'),
  card_img_files: z
    .array(
      z
        .instanceof(File) // Validate that the item is a File
        .superRefine((file, ctx) => {
          // Check file size
          if (file.size > MAX_FILE_SIZE) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'File size must be less than 5MB.',
            })
          }

          // Check file type
          if (!ALLOWED_FILE_TYPES.includes(file.type)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Unsupported file type.',
            })
          }
        })
    )
    .nonempty('At least one image is required.') // Ensure at least 1 file
    .max(5, 'You can upload up to 5 images.'), // Limit number of files
  velocity_code_items: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: 'You have to select at least one item.',
    }),
  reward_applicable: z.enum(['yes', 'no']).default('no'),
  reward_activation_date: z
    .date()
    .default(new Date()) // Default to today's date
    .optional()
    .refine(
      (val, ctx) =>
        ctx.parent.reward_applicable === 'yes' ? val !== undefined : true,
      'Activation date is required if reward is applicable.'
    ),
  reward_expiry_date: z
    .date()
    .default(() => {
      const defaultExpiry = new Date()
      defaultExpiry.setMonth(defaultExpiry.getMonth() + 1) // Default to one month from today
      return defaultExpiry
    })
    .optional()
    .refine(
      (val, ctx) =>
        ctx.parent.reward_applicable === 'yes' ? val !== undefined : true,
      'Expiry date is required if reward is applicable.'
    ),

  reward_terms: z
    .array(
      z
        .instanceof(File) // Validate that the item is a File
        .superRefine((file, ctx) => {
          // Check file size
          if (file.size > MAX_FILE_SIZE) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'File size must be less than 5MB.',
            })
          }

          // Check file type
          if (!ALLOWED_FILE_TYPES.includes(file.type)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Unsupported file type.',
            })
          }
        })
    )
    .nonempty('At least one image is required.') // Ensure at least 1 file
    .max(5, 'You can upload up to 5 images.'),
  mcc_applicable: z.string().nonempty('This field is required'),
  mcc_code: z.string().optional(),
  mcc_type: z.string().optional(),
})

function CreateProgramForm() {
  // Set up React Hook Form with Zod
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // channel: 'web',
      // location: { lat: 28.6139, long: 77.209 },
      product_name: 'Raunak',
      product_description: 'A football prodigy born in Maharashtra.',
      product_category: '',
      card_design_url: '',
      card_type: '',
      card_img_files: [],

      bin_id: '',
      bin_range: '',
      mcc_code: '',
      mcc_type: '',
      mcc_applicable: 'No',
      fee_id: '',
      fee_type: '',
      fee_amount: '',
      add_on: 'No',
      tid_include: 'No',
      mid_include: 'No',
      velocity_id: '',
      velocity_limit: '',
      velocity_count: '',
      velocity_type: '',
      velocity_code_items: ['isDaily', 'isWeekly'],
      reward_applicable: 'No',
      atm_applicable: 'No',
      pos_applicable: 'No',
      imps_applicable: 'No',
      ecom_applicable: 'No',
      contactless_applicable: 'No',
      offline_applicable: 'No',
      is_self_inventory: 'No',
    },
  })

  const mccApplicable = form.watch('mcc_applicable')
  const addOn = form.watch('add_on')
  const tidInclude = form.watch('tid_include')
  const midInclude = form.watch('mid_include')
  const rewardApplicable = form.watch('reward_applicable')
  const atmApplicable = form.watch('atm_applicable')
  const posApplicable = form.watch('pos_applicable')
  const impsApplicable = form.watch('imps_applicable')
  const contactlessApplicable = form.watch('contactless_applicable')
  const offlineApplicable = form.watch('offline_applicable')
  const ecomApplicable = form.watch('ecom_applicable')
  const isSelfInventory = form.watch('is_self_inventory')

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            {/* <div>
              <Card>
                <CardContent className="flex flex-col gap-4 select-none mt-4">
                  <div className="grid grid-cols-2 gap-6">
                    <FormField
                      name="location.lat"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Latitude</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Latitude"
                              {...field}
                              type="number"
                              disabled
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      name="location.long"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Longitude</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Longitude"
                              {...field}
                              type="number"
                              disabled
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </div> */}
            <div>
              <Card>
                <CardHeader className="select-none">
                  <CardTitle>Product</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4 select-none">
                  <div className="grid grid-cols-2 gap-6">
                    <FormField
                      name="product_name"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter product name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="product_category"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Category</FormLabel>
                          <FormControl>
                            <Input
                              as="textarea"
                              placeholder="Enter product category"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Description Field */}
                  </div>
                  <div className="grid grid-cols-1">
                    <FormField
                      name="product_description"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter product description"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {/* Description Field */}
                  <div className="grid grid-cols-2 gap-6">
                    <FormField
                      name="card_design_url"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Card Design Link</FormLabel>
                          <FormControl>
                            <Input
                              as="textarea"
                              placeholder="Enter the url"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="card_type"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Card Type</FormLabel>
                          <FormControl>
                            <Select {...field} onValueChange={field.onChange}>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1">1</SelectItem>
                                <SelectItem value="2">2</SelectItem>
                                <SelectItem value="3">3</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    <FormField
                      name="card_img_files"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Upload Card Image</FormLabel>
                          <FormControl>
                            <Input
                              id="card_img_files"
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={(e) => {
                                const files = e.target.files
                                  ? Array.from(e.target.files)
                                  : []
                                field.onChange(files)
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader className="select-none">
                  <CardTitle>Velocity Code</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4 select-none">
                  <div className="grid grid-cols-2 gap-6">
                    <FormField
                      name="velocity_id"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Velocity ID</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter velocity id" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Description Field */}
                    <FormField
                      name="velocity_limit"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Velocity Limit</FormLabel>
                          <FormControl>
                            <Input
                              as="textarea"
                              placeholder="Enter velocity limit"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {/* Description Field */}
                  <div className="grid grid-cols-2 gap-6">
                    <FormField
                      name="velocity_count"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Velocity Count</FormLabel>
                          <FormControl>
                            <Input
                              as="textarea"
                              placeholder="Enter velocity count"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="velocity_type"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Velocity Type</FormLabel>
                          <FormControl>
                            <Input
                              as="textarea"
                              placeholder="Enter velocity type"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1">
                    <FormField
                      control={form.control}
                      name="velocity_code_items"
                      render={() => (
                        <FormItem>
                          <div className="mb-4">
                            <FormLabel className="text-base">
                              Velocity Code
                            </FormLabel>
                            <FormDescription>
                              Select the options
                            </FormDescription>
                          </div>
                          <div className='flex justify-between'>
                          {velocityCodeItems.map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="velocity_code_items"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={item.id}
                                    className="flex flex-row items-start space-x-2 items-center space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...field.value,
                                                item.id,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== item.id
                                                )
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">
                                      {item.label}
                                    </FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader className="select-none">
                  <CardTitle>Reward Details</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4 select-none">
                  <FormField
                    name="reward_applicable"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reward Applicable</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => field.onChange(value)}
                            value={field.value}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Options</SelectLabel>
                                <SelectItem value="Yes">Yes</SelectItem>
                                <SelectItem value="No">No</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-6">
                    <FormField
                      name="reward_type"
                      control={form.control}
                      disabled={rewardApplicable === 'No'}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Reward Type</FormLabel>
                          <FormControl>
                            <Select {...field} onValueChange={field.onChange}>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose reward type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1">1</SelectItem>
                                <SelectItem value="2">2</SelectItem>
                                <SelectItem value="3">3</SelectItem>
                                <SelectItem value="4">4</SelectItem>
                                <SelectItem value="5">5</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      name="reward_notification"
                      control={form.control}
                      disabled={rewardApplicable === 'No'}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Notification</FormLabel>
                          <FormControl>
                            <Input placeholder="notification" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {rewardApplicable === 'No' ? null : (
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                      <FormField
                        name="reward_activation_date"
                        control={form.control}
                        disabled={rewardApplicable === 'No'}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Activation Date</FormLabel>
                            <FormControl>
                              <DatePicker
                                startYear={2000} // Example, adjust as needed
                                endYear={2050} // Example, adjust as needed
                                value={field.value} // Pass the current field value
                                onChange={field.onChange} // Bind the onChange to update form state
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        name="reward_expiry_date"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Expiry Date</FormLabel>
                            <FormControl>
                              <DatePicker
                                className="w-full"
                                startYear={2000} // Example, adjust as needed
                                endYear={2050} // Example, adjust as needed
                                value={field.value} // Pass the current field value
                                onChange={field.onChange} // Bind the onChange to update form state
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                  {rewardApplicable === 'No' ? null : (
                    <div className="grid grid-cols-1 gap-6">
                      <FormField
                        name="reward_terms"
                        disabled={rewardApplicable === 'No'}
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Upload T&C document</FormLabel>
                            <FormControl>
                              <Input
                                id="reward_terms"
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={(e) => {
                                  const files = e.target.files
                                    ? Array.from(e.target.files)
                                    : []
                                  field.onChange(files)
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </CardContent>
                
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader className="select-none">
                  <CardTitle>Transaction Limitations</CardTitle>
                </CardHeader>
                
                <CardContent className="flex flex-col gap-4 select-none">
                  <div className="grid grid-cols-2 gap-6">
                    <FormField
                      name="fee_id"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Minimum Load Amount</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter load min" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Description Field */}
                    <FormField
                      name="load_max"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Maximum Load Amount</FormLabel>
                          <FormControl>
                            <Input
                              as="textarea"
                              placeholder="Enter load max"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
                <CardContent className="flex flex-col gap-4 select-none">
                  <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                    <FormField
                      name="atm_applicable"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ATM Applicable</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={(value) => field.onChange(value)}
                              value={field.value}
                            >
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select an option" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Options</SelectLabel>
                                  <SelectItem value="Yes">Yes</SelectItem>
                                  <SelectItem value="No">No</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Description Field */}
                    <FormField
                      name="atm_max"
                      control={form.control}
                      disabled={atmApplicable === 'No'}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Maximum ATM Transaction Limit</FormLabel>
                          <FormControl>
                            <Input
                              as="textarea"
                              placeholder="Enter max limit"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
                <CardContent className="flex flex-col gap-4 select-none">
                  <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                    <FormField
                      name="pos_applicable"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>POS Applicable</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={(value) => field.onChange(value)}
                              value={field.value}
                            >
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select an option" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Options</SelectLabel>
                                  <SelectItem value="Yes">Yes</SelectItem>
                                  <SelectItem value="No">No</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Description Field */}
                    <FormField
                      name="pos_max"
                      control={form.control}
                      disabled={posApplicable === 'No'}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Maximum POS Transaction Limit</FormLabel>
                          <FormControl>
                            <Input
                              as="textarea"
                              placeholder="Enter max limit"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
                <CardContent className="flex flex-col gap-4 select-none">
                  <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                    <FormField
                      name="imps_applicable"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>IMPS Applicable</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={(value) => field.onChange(value)}
                              value={field.value}
                            >
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select an option" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Options</SelectLabel>
                                  <SelectItem value="Yes">Yes</SelectItem>
                                  <SelectItem value="No">No</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Description Field */}
                    <FormField
                      name="imps_max"
                      control={form.control}
                      disabled={impsApplicable === 'No'}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Maximum IMPS Transaction Limit</FormLabel>
                          <FormControl>
                            <Input
                              as="textarea"
                              placeholder="Enter max limit"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
                <CardContent className="flex flex-col gap-4 select-none">
                  <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                    <FormField
                      name="ecom_applicable"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>E-commerce Applicable</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={(value) => field.onChange(value)}
                              value={field.value}
                            >
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select an option" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Options</SelectLabel>
                                  <SelectItem value="Yes">Yes</SelectItem>
                                  <SelectItem value="No">No</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Description Field */}
                    <FormField
                      name="ecom_max"
                      control={form.control}
                      disabled={ecomApplicable === 'No'}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Maximum E-commerce Transaction Limit</FormLabel>
                          <FormControl>
                            <Input
                              as="textarea"
                              placeholder="Enter max limit"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
                <CardContent className="flex flex-col gap-4 select-none">
                  <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                    <FormField
                      name="contactless_applicable"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contactless Applicable</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={(value) => field.onChange(value)}
                              value={field.value}
                            >
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select an option" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Options</SelectLabel>
                                  <SelectItem value="Yes">Yes</SelectItem>
                                  <SelectItem value="No">No</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Description Field */}
                    <FormField
                      name="contactless_max"
                      control={form.control}
                      disabled={contactlessApplicable === 'No'}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Maximum Contactless Transaction Limit</FormLabel>
                          <FormControl>
                            <Input
                              as="textarea"
                              placeholder="Enter max limit"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
                <CardContent className="flex flex-col gap-4 select-none">
                  <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                    <FormField
                      name="offline_applicable"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Offline Applicable</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={(value) => field.onChange(value)}
                              value={field.value}
                            >
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select an option" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Options</SelectLabel>
                                  <SelectItem value="Yes">Yes</SelectItem>
                                  <SelectItem value="No">No</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Description Field */}
                    <FormField
                      name="offline_max"
                      control={form.control}
                      disabled={offlineApplicable === 'No'}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Maximum Offline Transaction Limit</FormLabel>
                          <FormControl>
                            <Input
                              as="textarea"
                              placeholder="Enter max limit"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <Card>
                <CardHeader className="select-none">
                  <CardTitle>Bank Details</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4 select-none">
                  <FormField
                    name="bin_id"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>BIN ID</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter bin id" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Description Field */}
                  <FormField
                    name="bin_range"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>BIN Range</FormLabel>
                        <FormControl>
                          <Input
                            as="textarea"
                            placeholder="Enter bin range"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardContent className="flex flex-col gap-4 select-none">
                  <FormField
                    name="mcc_applicable"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>MCC Applicable</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => field.onChange(value)}
                            value={field.value}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Options</SelectLabel>
                                <SelectItem value="Yes">Yes</SelectItem>
                                <SelectItem value="No">No</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="mcc_code"
                    control={form.control}
                    disabled={mccApplicable === 'No'}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>MCC Code</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter MCC code" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="mcc_type"
                    control={form.control}
                    disabled={mccApplicable === 'No'}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>MCC Type</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter MCC type" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader className="select-none">
                  <CardTitle>Fee Code</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4 select-none">
                  <FormField
                    name="fee_id"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fee ID</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter fee id" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Description Field */}
                  <FormField
                    name="fee_type"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fee Type</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => field.onChange(value)}
                            value={field.value}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Options</SelectLabel>
                                <SelectItem value="Shipping Fee">Shipping Fee</SelectItem>
                                <SelectItem value="Issuing Fee">Issuing Fee</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="fee_amount"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fee Amount</FormLabel>
                        <FormControl>
                          <Input
                            as="textarea"
                            placeholder="Enter fee amount"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader className="select-none">
                  <CardTitle>Add on</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4 select-none">
                  <FormField
                    name="add_on"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Allowed or not ?</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => field.onChange(value)}
                            value={field.value}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Options</SelectLabel>
                                <SelectItem value="Yes">Yes</SelectItem>
                                <SelectItem value="No">No</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="device_id"
                    control={form.control}
                    disabled={addOn === 'No'}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Device ID</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter device id" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="max_add_on"
                    control={form.control}
                    disabled={addOn === 'No'}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Max add on per customer</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter max add on" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader className="select-none">
                  <CardTitle>Include More Details </CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4 select-none">
                  <div className="flex grid grid-cols-2 xl:grid-cols-2">
                    <FormField
                      name="reload_applicable"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Reload Applicable</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={(value) => field.onChange(value)}
                              value={field.value}
                            >
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select an option" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Options</SelectLabel>
                                  <SelectItem value="Yes">Yes</SelectItem>
                                  <SelectItem value="No">No</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Description Field */}
                  </div>
                  <FormField
                    name="jit"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>JIT Applicable</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => field.onChange(value)}
                            value={field.value}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Options</SelectLabel>
                                <SelectItem value="Yes">Yes</SelectItem>
                                <SelectItem value="No">No</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardContent className="grid md:grid-cols-2 gap-4 select-none">
                  <FormField
                    name="tid_include"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>TID Include?</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => field.onChange(value)}
                            value={field.value}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Options</SelectLabel>
                                <SelectItem value="Yes">Yes</SelectItem>
                                <SelectItem value="No">No</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="tid"
                    control={form.control}
                    disabled={tidInclude === 'No'}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>TID</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter tid" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="mid_include"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>MID Include?</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => field.onChange(value)}
                            value={field.value}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Options</SelectLabel>
                                <SelectItem value="Yes">Yes</SelectItem>
                                <SelectItem value="No">No</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="mid"
                    control={form.control}
                    disabled={midInclude === 'No'}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>MID</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter mid" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>
            <div>
              <Card>
                <CardContent className="flex flex-col gap-4 select-none mt-4">
                  <div className="grid grid-cols-1">
                    <FormField
                      name="remark"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Remark {`(Optional)`}</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Type your remark here."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        {/* Product Name Field */}

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button type="submit">Create Program</Button>
        </div>
      </form>
    </Form>
  )
}

export default CreateProgramForm
