import * as React from "react";
import { Link } from "react-router-dom";
import axios from "@/api/axios";
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { CalendarDateRangePicker } from "./CalendarDateRangePicker";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import DataTableToolbar from "@/components/DataTableToolbar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  ArrowUpDown,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  CirclePlus,
  MoreHorizontal,
  Check,
  Pencil,
  Trash2,
  CircleX,
  FileDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { saveAs } from "file-saver";
import * as Papa from "papaparse";
import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { DataTablePagination } from "@/components/DataTablePagination";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import DataTableViewOptions from "./DataTableViewOptions";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const fieldIconMap = {
  kycRequired: {
    icon: (
      <Badge className="bg-[#e4f5e9] text-[#16794c] cursor-pointer">KYC</Badge>
    ),
    label: "KYC Required",
  },
  contactlessAllowed: {
    icon: (
      <Badge className="bg-[#f9f0ff] text-[#6e399d]  cursor-pointer">
        Contactless
      </Badge>
    ),
    label: "Contactless Allowed",
  },
  isPhysical: {
    icon: (
      <Badge className="bg-[#F5FBFC] text-[#267A94]  cursor-pointer">
        Physical
      </Badge>
    ),
    label: "Physical Not Allowed",
  },
  isRewardsApplicable: {
    icon: (
      <Badge className="bg-[#fff1e7] text-[#bd3e0c] cursor-pointer">
        Reward
      </Badge>
    ),
    label: "Rewards Applicable",
  },
};

const data = [
  {
    productName: "Travel Card",
    productCategory: "Business",
    minLoadAmount: "1000.00",
    maxLoadAmount: "500000.00",
    updatedAt: "2024-12-17T04:15:22.000Z",
    kycRequired: "1",
    isPhysical: true,
    contactlessAllowed: false,
    isRewardsApplicable: true,
    user: {
      firstName: "ONO",
      lastName: "dev",
      username: "ONO90",
    },
  },
  {
    productName: "Shopping Card",
    productCategory: "Business",
    minLoadAmount: "1000.00",
    maxLoadAmount: "50000.00",
    updatedAt: "2024-12-17T05:24:40.000Z",
    kycRequired: "1",
    isPhysical: false,
    contactlessAllowed: true,
    isRewardsApplicable: true,
    user: {
      firstName: "Privacy",
      lastName: "Card",
      username: "PC9090",
    },
  },
  {
    productName: "Expense Card",
    productCategory: "Business",
    minLoadAmount: "1000.00",
    maxLoadAmount: "50000.00",
    updatedAt: "2024-12-17T05:28:19.000Z",
    kycRequired: "1",
    isPhysical: true,
    contactlessAllowed: true,
    isRewardsApplicable: true,
    user: {
      firstName: "Privacy",
      lastName: "Card",
      username: "PC9090",
    },
  },
];

const filters = [
  "Today",
  "Last 7 days",
  "Last 30 days",
  "Last 3 months",
  "Last 6 months",
];

const productSchema = z.object({
  product_name: z.string().min(1, "Program name is required"),
  description: z.string().optional(),
  product_category: z.string().optional(),
  terms_conditions: z.string().optional(),
});

export function ProgramTableDemo() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const onSubmit = (data) => {
    console.log(data);
  };

  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      product_name: "",
      description: "",
      product_category: "",
      terms_conditions: "",
    },
  });

  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [selectedFilter, setSelectedFilter] = React.useState("Today");

  // const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(true); // State for loading
  const [error, setError] = React.useState(null); // State for error handling

  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true)
  //       //const token=Cookies.get("auth_token");
  //       //console.log(token);
  //       //axios.default.withCredentials=true;
  //       const response = await axios.get('/cms/fetchall_product', {
  //         withCredentials: true,
  //       }) // Replace with your API endpoint
  //       //setData(response.data.data); // Assuming the response is an array of pool accounts
  //       console.log(response.data.data)
  //       setData(response.data.data)
  //     } catch (err) {
  //       console.error('Error fetching data:', err)
  //       setError('Failed to fetch data. Please try again later.')
  //     } finally {
  //       setLoading(false)
  //     }
  //   }
  //   fetchData()
  // }, [])

  const allColumns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className=""
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "productName",
      header: "Name",
      cell: ({ row }) => {
        const id = row.original.product_id;
        return (
          <Link to={`/programs/program/${id}`}>
            <div className="capitalize text-center cursor-pointer hover:underline">
              {row.getValue("productName")}
            </div>
          </Link>
        );
      },
    },
    {
      accessorKey: "productCategory",
      header: "Category",
      cell: ({ row }) => (
        <div className="capitalize text-center">
          {row.getValue("productCategory")}
        </div>
      ),
    },
    {
      accessorKey: "programManager",
      header: "Program Manager",
      cell: ({ row }) => {
        const user = row.original.user; // Access the 'user' field from the data
        return (
          <div className="text-center cursor-pointer hover:underline">
            {user
              ? `${user.firstName || ""} ${user.lastName || ""}`.trim() // Combine firstName and lastName
              : "N/A"}
          </div>
        );
      },
    },

    {
      accessorKey: "maxLoadAmount",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Maximum Limit
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => {
        // const minAmount = Number(row.original.minLoadAmount) // Access the raw data directly

        const maxAmount = Number(row.original.maxLoadAmount);
        const [whole2, decimal2] = maxAmount.toFixed(2).split(".");
        return (
          <div className="text-center flex items-center justify-center">
            <span>₹{whole2}</span>
            <span className="text-gray-500">.{decimal2}</span>
          </div>
        );
      },
    },

    {
      accessorKey: "createdOn",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Created On
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => {
        const date = row.original.updatedAt.split("T")[0];
        const time1 = row.original.updatedAt.split("T")[1];
        const time2 = time1.split(".")[0];

        return (
          <div className="flex flex-col items-center text-center">
            <span>{date}</span>
            <span className="text-slate-400">{time2}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "tags",
      header: "Tags",
      cell: ({ row }) => (
        <div className="flex items-center justify-left gap-2">
          {Object.keys(fieldIconMap).map((field) => {
            if (row.original[field]) {
              return (
                <span
                  key={field}
                  className={`flex items-center gap-1`}
                  title={fieldIconMap[field].label}
                >
                  {fieldIconMap[field].icon}
                </span>
              );
            }
            return null;
          })}
        </div>
      ),
    },
    {
      accessorKey: "actions",
      header: "",
      cell: ({ row }) => {
        const rowData = row.original; // Get the entire row's data for actions
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Block
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
    // {
    //   id: 'actions',
    //   enableHiding: false,
    //   cell: ({ row }) => {
    //     const payment = row.original;

    //     return (
    //       <DropdownMenu>
    //         <DropdownMenuTrigger asChild>
    //           <Button variant="ghost" className="h-8 w-8 p-0">
    //             <span className="sr-only">Open menu</span>
    //             <MoreHorizontal />
    //           </Button>
    //         </DropdownMenuTrigger>
    //         <DropdownMenuContent align="end">
    //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //           <DropdownMenuItem
    //             onClick={() => navigator.clipboard.writeText(payment.id)}
    //           >
    //             Copy payment ID
    //           </DropdownMenuItem>
    //           <DropdownMenuSeparator />
    //           <DropdownMenuItem>View customer</DropdownMenuItem>
    //           <DropdownMenuItem>View payment details</DropdownMenuItem>
    //         </DropdownMenuContent>
    //       </DropdownMenu>
    //     );
    //   },
    // },
  ];
  const hasUserData = data.some((item) => item.user); // Check if any row has the 'user' field
  const columns = hasUserData
    ? allColumns // Show all columns
    : allColumns.filter((column) => column.accessorKey !== "programManager");

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    initialState: {
      pagination: {
        pageSize: 5, // Set page size to 5
      },
    },
  });
  // const table = useReactTable({
  //   data,
  //   columns,
  //   onSortingChange: setSorting,
  //   onColumnFiltersChange: setColumnFilters,
  //   getCoreRowModel: getCoreRowModel(),
  //   getPaginationRowModel: getPaginationRowModel(),
  //   getSortedRowModel: getSortedRowModel(),
  //   getFilteredRowModel: getFilteredRowModel(),
  //   onColumnVisibilityChange: setColumnVisibility,
  //   onRowSelectionChange: setRowSelection,
  //   state: {
  //     sorting,
  //     columnFilters,
  //     columnVisibility,
  //     rowSelection,
  //   },
  //   initialState: {
  //     pagination: {
  //       pageSize: 5, // Set page size to 5
  //     },
  //   },
  // })

  const openDialog = (rowData) => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    // Clear any row data when canceled
  };
  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    // Apply your filtering logic here based on `filter`
    console.log(`Filter applied: ${filter}`);
  };
  const downloadCSV = () => {
    // Convert table data to CSV
    const csv = Papa.unparse(data);
    // Create a Blob object for the CSV
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    // Use FileSaver to trigger a download
    saveAs(blob, "table-data.csv");
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Programs List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full flex flex-col gap-4">
          <div className="w-full flex gap-2 justify-between max-md:flex-col max-md:gap-2 max-md:items-start max-md:w-[70%]">
            <div className="w-full">
              <DataTableToolbar table={table} inputFilter="productName" />
            </div>
            <div className="flex gap-2 items-center">
              <Button variant="outline" className="h-8" onClick={downloadCSV}>
                <FileDown />
              </Button>

              <DataTableViewOptions table={table} />
              <Sheet>
                <SheetTrigger asChild>
                  <div className="flex justify-center items-center">
                    <Button
                      variant=""
                      className="h-8 flex justify-center items-center"
                    >
                      <CirclePlus />
                      Create Program
                    </Button>
                  </div>
                </SheetTrigger>
                <SheetContent className="">
                  <SheetHeader>
                    <SheetTitle>Create Program</SheetTitle>
                    <SheetDescription>
                      A versatile program for efficient management, real-time
                      analytics, and seamless user control.
                    </SheetDescription>
                  </SheetHeader>
                  <Form {...form} onSubmit={form.handleSubmit(onSubmit)}>
                    <form className="space-y-4 mt-4">
                      {/* Program Name Field */}
                      <FormField
                        name="product_name"
                        control={form.control}
                        rules={{ required: "Program name is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Product Name</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Enter product name"
                                className="input"
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
                        rules={{ required: "Program name is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Product Category</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Enter product category"
                                className="input"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
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
                                className="textarea"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        name="terms_conditions"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Upload T&C Document</FormLabel>
                            <FormControl>
                              <Input
                                id="terms_conditions"
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const files = e.target.files
                                    ? Array.from(e.target.files)
                                    : [];
                                  field.onChange(files);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Submit Button */}
                      <SheetFooter>
                        <SheetClose asChild>
                          <Button type="submit" className="btn btn-success">
                            Submit
                          </Button>
                        </SheetClose>
                      </SheetFooter>
                    </form>
                  </Form>
                </SheetContent>
              </Sheet>
            </div>
          </div>
          <div className="rounded-md border">
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
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
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
  );
}
