import * as React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
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
import { Label } from '@/components/ui/label'
import {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from '@/components/ui/form'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  ArrowUpDown,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  CirclePlus,
  MoreHorizontal,
  Copy,
  Pencil,
  Trash2,
  CircleX,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  FileDown,
} from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { Badge } from '@/components/ui/badge'
import { DataTablePagination } from '@/components/DataTablePagination'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { status } from '@/data/webhooks-data'

import { saveAs } from 'file-saver'
import * as Papa from 'papaparse'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import DataTableViewOptions from './DataTableViewOptions'
import DataTableToolbar from './DataTableToolbar'
import { useState } from 'react'

const formSchema = z.object({
  webhook_name: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  webhook_url: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  secret_key: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
})
const data = [
  {
    name: 'webhook 1',
    url: 'https://example.com/rest/webhooks/webhook1',
    secret: 'txcdefrolms345',
    status: 'Enabled',
  },
  {
    name: 'webhook 2',
    url: 'https://example.com/rest/webhooks/webhook2',
    secret: 'abcdefghijklmnop',
    status: 'Disabled',
  },
  {
    name: 'webhook 3',
    url: 'https://example.com/rest/webhooks/webhook3',
    secret: 'abcdefghijklmnopq',
    status: 'Enabled',
  },
  {
    name: 'webhook 4',
    url: 'https://example.com/rest/webhooks/webhook4',
    secret: 'abcdefghijklmnopqrs',
    status: 'Disabled',
  },
  {
    name: 'webhook 5',
    url: 'https://example.com/rest/webhooks/webhook5',
    secret: 'abcdefghijklmnopqrs',
    status: 'Enabled',
  },
]

const WebhooksTable = () => {
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [secretKey, setSecretKey] = React.useState(null)

  const { toast } = useToast()
  function generateSecretKey(e) {
    e.preventDefault()
    const array = new Uint8Array(16) // 16 bytes = 128 bits
    window.crypto.getRandomValues(array)
    const secret = Array.from(array, (byte) =>
      byte.toString(16).padStart(2, '0')
    ).join('')
    console.log(secret)
    setSecretKey(secret)
  }

  const columns = [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => (
        <div className="capitalize text-center">{row.getValue('name')}</div>
      ),
    },
    {
      accessorKey: 'url',
      header: 'URL',
      cell: ({ row }) => (
        <div className="capitalize text-center">{row.getValue('url')}</div>
      ),
    },
    {
      accessorKey: 'secret',
      header: 'Secret',
      cell: ({ row }) => (
        <div className="capitalize text-center">{row.getValue('secret')}</div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.original.status
        return (
          <div className="capitalize text-center">
            {status === 'Disabled' ? (
              <Badge className="bg-[#fff0f0] text-[#b52a2a]">Disabled</Badge>
            ) : (
              <Badge className="bg-[#e4f5e9] text-[#16794c]">Enabled</Badge>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const status = row.original.status
        switch (status) {
          case 'Enabled':
            return (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => {}}>Edit</DropdownMenuItem>

                  <DropdownMenuItem onClick={() => {}}>
                    Disable
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )
          case 'Disabled':
            return (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => {}}>Edit</DropdownMenuItem>

                  <DropdownMenuItem onClick={() => {}}>Enable</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )
        }
      },
    },
  ]

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 5, // Set page size to 5
      },
    },
  })

  const openDialog = (rowData) => {
    setIsDialogOpen(true)
  }

  const closeDialog = () => {
    setIsDialogOpen(false)
    // Clear any row data when canceled
  }
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
  })
  function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  const downloadCSV = () => {
    // Convert table data to CSV
    const csv = Papa.unparse(data)
    // Create a Blob object for the CSV
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    // Use FileSaver to trigger a download
    saveAs(blob, 'table-data.csv')
  }

  function generateSecret(e) {
    e.preventDefault()
    const array = new Uint8Array(16) // 16 bytes = 128 bits
    window.crypto.getRandomValues(array)
    const secret = Array.from(array, (byte) =>
      byte.toString(16).padStart(2, '0')
    ).join('')
    console.log(secret)
    setSecretKey(secret)
  }

  return (
    <Card>
      <CardContent>
        <div className="w-full mt-3">
          <div className="w-full flex gap-2 justify-between items-center max-md:flex-col max-md:gap-2 max-md:items-start max-md:w-[70%]">
            <div className="w-full">
              <DataTableToolbar table={table} status={status} />
            </div>
            <div className="flex gap-2 items-center">
              <Button variant="outline" className="h-8" onClick={downloadCSV}>
                <FileDown />
              </Button>

              <Sheet>
                <SheetTrigger asChild>
                  <Button className="h-8">Create a Webhook</Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Create a Webhook</SheetTitle>
                    <SheetDescription>
                      A webhook interface is a system that allows receiving,
                      processing, and responding to HTTP POST requests triggered
                      by specific events from external sources.
                    </SheetDescription>
                  </SheetHeader>

                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-4 mt-4"
                    >
                      <div className="flex flex-col gap-2 items-start w-full">
                        <div className="w-full">
                          <p className="text-sm font-medium">Webhook Name</p>
                        </div>
                        <div className="w-full">
                          <FormField
                            control={form.control}
                            name="webhook_name"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    placeholder="Enter the name"
                                    {...field}
                                  />
                                </FormControl>
                                {/* <FormDescription>
                  A webhook URL is an endpoint that allows external systems to
                  send real-time data or notifications to your application over
                  HTTP when certain events occur.
                </FormDescription> */}
                                {form.formState.errors.webhook_name && (
                                  <FormMessage className="text-red-500">
                                    {
                                      form.formState.errors.webhook_name
                                        ?.message
                                    }
                                  </FormMessage>
                                )}
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col items-start gap-2 w-full">
                        <div>
                          <p className="text-sm font-medium">URL</p>
                        </div>
                        <div className="w-full">
                          <FormField
                            control={form.control}
                            name="webhook_url"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    placeholder="Enter the url"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 items-start justify-between w-full">
                        <p className="text-sm font-medium">Secret Key</p>
                        <div className="w-full flex justify-between items-start gap-2 relative">
                          <div className="w-full">
                            <FormField
                              control={form.control}
                              name="secret_key"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      placeholder="Enter the secret key"
                                      value={secretKey || null}
                                      disabled
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="">
                            <Button variant="outline" className="relative">
                              <Copy />
                            </Button>
                          </div>
                        </div>
                        <div className="w-full flex justify-end items-start gap-2">
                          <span
                            className="flex justify-end items-start cursor-pointer text-sm font-medium border rounded-md px-4 py-2"
                            onClick={generateSecret}
                          >
                            Generate Secret
                          </span>
                        </div>
                      </div>

                      <div className="w-full flex justify-start">
                        <SheetFooter>
                          <Button type="submit">Create Webhook</Button>
                        </SheetFooter>
                      </div>
                    </form>
                  </Form>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          <div className="rounded-md border mt-3">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead className="text-center" key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                    >
                      {row.getVisibleCells().map((cell) => {
                        const clickableColumns = ['id', 'name'] // List of clickable column keys

                        return (
                          <TableCell className="text-center" key={cell.id}>
                            {clickableColumns.includes(cell.column.id) ? (
                              // If the column is in the clickable list, render a clickable element (e.g., link or button)
                              <button
                                onClick={() => handleClick(cell.row.original)}
                                style={{
                                  background: 'transparent',
                                  border: 'none',
                                  cursor: 'pointer',
                                }}
                              >
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                              </button>
                            ) : (
                              // Otherwise, render the regular cell content
                              flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )
                            )}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <DataTablePagination table={table} />
        </div>
      </CardContent>
    </Card>
  )
}

export default WebhooksTable
