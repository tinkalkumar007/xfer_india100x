import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { CirclePlus } from 'lucide-react'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const MAX_FILE_SIZE = 5 * 1024 * 1024
const ACCEPTED_FILE_TYPES = ['image/png', 'image/jpeg', 'application/pdf']

const formSchema = z.object({
  product_name: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  product_category: z.string().min(3, {
    message: 'Username must be at least 3 characters.',
  }),
  product_description: z.string().min(10, {
    message: 'Username must be at least 10 characters.',
  }),
  upload_terms_conditions: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: 'Max file size is 5MB',
    })
    .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), {
      message: 'Only .jpg, .jpeg, .png, and .pdf formats are supported',
    }),
})

const ProgramManagerSheet = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product_name: '',
      product_category: '',
      product_description: '',
      upload_terms_conditions: null,
    },
  })

  // 2. Define a submit handler.
  function onSubmit(data) {
    console.log(data)
    
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="flex justify-center items-center">
          <Button variant="" className="h-8 flex justify-center items-center">
            <CirclePlus />
            Add Manager
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent className="">
        <SheetHeader>
          <SheetTitle>Add Manager</SheetTitle>
          <SheetDescription>
            A versatile program for efficient management, real-time analytics,
            and seamless user control.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            className="space-y-4 mt-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {/* Program Name Field */}
            <FormField
              name="product_name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product name" {...field} />
                  </FormControl>
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
                    <Input placeholder="Enter product category" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Description Field */}
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
                </FormItem>
              )}
            />
            <FormField
              name="upload_terms_conditions"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload T&C Document</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept={ACCEPTED_FILE_TYPES.join(',')}
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        field.onChange(file || null) // Ensure null if no file is selected
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <SheetFooter>
              <Button type="submit">Submit</Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}

export default ProgramManagerSheet
