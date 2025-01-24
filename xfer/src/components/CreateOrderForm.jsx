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
import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/button'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { CirclePlus, Trash } from 'lucide-react'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_FILE_TYPES = ['image/png', 'image/jpeg', 'application/pdf']

const formSchema = z.object({
  products: z.array(
    z.object({
      product_name: z.string().min(1),
      quantity: z
        .string()
        .refine((val) => !isNaN(Number(val)) && Number(val) > 0),
      upload_customer_details: z
        .instanceof(File, { message: 'Please upload a file' })
        .refine((file) => file.size <= MAX_FILE_SIZE, {
          message: 'File size must be less than 5MB',
        })
        .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), {
          message: 'File must be a PNG, JPEG, or PDF',
        }),
    })
  ),
})

// eslint-disable-next-line react/prop-types
const CreateOrderForm = ({ setTableData, screen, setScreen }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      products: [
        {
          id: uuidv4(),
          product_name: '',
          quantity: '',
          upload_customer_details: null,
        },
      ],
    },
  })
  const products = form.watch('products')

  useEffect(() => {
    console.log('Current Form Data:', products)
  }, [products])

  const addProduct = () => {
    const updatedProducts = [
      ...products,
      { id: uuidv4(), product_name: '', quantity: '' },
    ]
    form.setValue('products', updatedProducts)
  }

  const removeProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id)
    form.setValue('products', updatedProducts)
  }

  const onSubmit = (data) => {
    console.log('Form Data:', data)
    setTableData(data.products)
    console.log('Table data:', data)
    const isValid = form.trigger()
    console.log(isValid)
    if (isValid) {
      setScreen('order_summary')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-3 space-y-4">
        {products.length > 0 &&
          products?.map((product, index) => {
            console.log(products)
            return (
              <div key={product.id} className="flex flex-col gap-4 w-full">
                <div className="flex gap-4 justify-between">
                  <div className="w-[90%]">
                    <FormField
                      control={form.control}
                      name={`products[${index}].product_name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter the product name..."
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name={`products[${index}].quantity`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quantity</FormLabel>
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
                <div className="flex gap-2">
                  <div className="w-[90%]">
                    <FormField
                      control={form.control}
                      name={`products[${index}].upload_customer_details`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Upload File</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              accept=".png, .jpeg, .jpg, .pdf"
                              onChange={(e) =>
                                field.onChange(e.target.files?.[0])
                              } // Set the selected file
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-[10%] flex justify-center items-end">
                    {products.length > 1 && (
                      <span
                        className="rounded-full border p-2 cursor-pointer text-muted-foreground"
                        onClick={() => {
                          removeProduct(product.id)
                        }}
                      >
                        <Trash className="w-5 h-5" />
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}

        <div className="flex gap-4 justify-end items-center">
          <Button
            type="button"
            className="flex items-center gap-2"
            onClick={addProduct}
            variant="outline"
          >
            <CirclePlus />
            Add More
          </Button>
        </div>

        <div className="w-full">
          <Button type="submit" className="w-full">
            Place Your Order
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default CreateOrderForm
