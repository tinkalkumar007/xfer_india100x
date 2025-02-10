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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/button'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { v4 as uuidv4 } from 'uuid'
import { CirclePlus, Trash } from 'lucide-react'
import { useFrappeGetDocList } from 'frappe-react-sdk'

const formSchema = z.object({
  program_name: z.string().min(1, { message: 'Program name is required' }),
  physical_quantity: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'Physical quantity must be a positive number',
    }),
  virtual_quantity: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'Virtual quantity must be a positive number',
    }),
})

const CreateOrderForm = ({ setTableData, screen, setScreen }) => {
  const { data: programList, isLoading: programListLoading } =
    useFrappeGetDocList('Program', {
      fields: ['name', 'program_name'],
    })

  console.log('Program List: ', programList)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      program_name: '',
      virtual_quantity: '',
      physical_quantity: '',
    },
  })

  const onSubmit = (data) => {
    console.log(data)
    setScreen('order_summary')
    setTableData(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-3 space-y-4">
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-2 justify-between">
            <div className="w-full">
              <FormField
                name="program_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Program Name</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select the program name" />
                        </SelectTrigger>
                        <SelectContent>
                          {programList?.map((item) => (
                            <SelectItem key={item.name} value={item.name}>
                              {item.program_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="physical_quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Physical Quantity</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter quantity..."
                          type="number"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="virtual_quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Virtual Quantity</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter quantity..."
                          type="number"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full">
          <Button type="submit" className="w-full">
            CONTINUE
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default CreateOrderForm
