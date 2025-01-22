import * as React from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { saveAs } from "file-saver";
import * as Papa from "papaparse";
import { DataTablePagination } from "@/components/DataTablePagination";
import {
  ArrowUpDown,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  MoreHorizontal,
  Check,
  CirclePlus,
  Pencil,
  Trash2,
  CircleX,
  FileDown,
  ChevronLeft,
  ChevronsLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMemo } from "react";
import { useFrappeAuth, useFrappeGetDocList } from "frappe-react-sdk";
import { Badge } from "@/components/ui/badge";
import { status } from "@/data/issued-cards-data";
import DataTableToolbar from "./DataTableToolbar";
import DataTableViewOptions from "./DataTableViewOptions";
import { tags } from "./programData";

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
    id: 1,
    card_ref_id: "32XY32",
    status: "active",
    AddOnCard: true,
    Physical: true,
    last_four_digit: "4444",
    product_category: "Shopping",
    add_on_card: "true",
    is_physical: "true",
    issued_date: "02-12-2024",
  },
  {
    id: 2,
    card_ref_id: "32XY33",
    status: "inactive",
    Physical: true,
    last_four_digit: "4445",
    product_category: "Entertainment",
    add_on_card: "true",
    is_physical: "true",
    issued_date: "02-12-2024",
  },
  {
    id: 3,
    card_ref_id: "32XY34",
    status: "active",
    Physical: true,
    last_four_digit: "4446",
    product_category: "Grocery",
    add_on_card: "true",
    is_physical: "true",
    issued_date: "02-12-2024",
  },
  {
    id: 4,
    card_ref_id: "32XY35",
    status: "inactive",
    AddOnCard: true,
    last_four_digit: "4447",
    product_category: "Business",
    add_on_card: "true",
    is_physical: "true",
    issued_date: "02-12-2024",
  },
  {
    id: 5,
    card_ref_id: "32XY36",
    status: "active",
    AddOnCard: true,
    last_four_digit: "4448",
    product_category: "Loans",
    add_on_card: "true",
    is_physical: "true",
    issued_date: "02-12-2024",
  },
  {
    id: 6,
    card_ref_id: "32XY37",
    status: "inactive",
    AddOnCard: true,
    Physical: true,
    last_four_digit: "4449",
    product_category: "Travel",
    add_on_card: "true",
    is_physical: "true",
    issued_date: "02-12-2024",
  },
  {
    id: 7,
    card_ref_id: "32XY38",
    status: "active",
    Physical: true,
    last_four_digit: "4450",
    product_category: "Tickets",
    add_on_card: "true",
    is_physical: "true",
    issued_date: "02-12-2024",
  },
  {
    id: 8,
    card_ref_id: "32XY39",
    status: "inactive",
    AddOnCard: true,
    last_four_digit: "4451",
    product_category: "Food",
    add_on_card: "true",
    is_physical: "true",
    issued_date: "02-12-2024",
  },
  {
    id: 9,
    card_ref_id: "32XY40",
    status: "active",
    AddOnCard: true,
    Physical: true,
    last_four_digit: "4452",
    product_category: "Drinks",
    add_on_card: "true",
    is_physical: "true",
    issued_date: "02-12-2024",
  },
  {
    id: 10,
    card_ref_id: "32XY41",
    status: "active",
    AddOnCard: true,
    Physical: true,
    last_four_digit: "4452",
    product_category: "Books",
    add_on_card: "true",
    is_physical: "true",
    issued_date: "02-12-2024",
  },
];

export function IssuedCardsTable() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  // const [data, setData] = React.useState([]);
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const { currentUser }  = useFrappeAuth()

  const { data: issuedCardsData, isLoading: issuedCardsLoading} = useFrappeGetDocList('Cards', {
    fields: ["card_reference_id", "card_number", "program_category", "issue_date", "kyc_status", "_user_tags"],
    filters: [
      ["owner", "in", [currentUser, ""]]
    ]
  })

  if(!issuedCardsLoading) {
    console.log("Issued cards data:", issuedCardsData)
  }

  const tableData = React.useMemo( () => {
    if(!issuedCardsData) return []
    return (
      issuedCardsData.map( (card) => ({
        card_ref_id: card.card_reference_id,
        last_four_digits: card.card_number.slice(-4),
        category: card.program_category,
        issued_date: card.issue_date,
        status: card.kyc_status,
        tags: card._user_tags
      }))
    )
  }, [issuedCardsData])

  const columns = [
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
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "card_ref_id",
      header: "Card Ref ID",
      cell: ({ row }) => {
        const id = row.original.card_ref_id;
        return (
          <Link to={`/issued-cards/issuedcards-details/${id}`}>
            <div className="capitalize text-center hover:underline">
              {row.original?.card_ref_id}
            </div>
          </Link>
        );
      },
    },
    {
      accessorKey: "last_four_digit",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Card Last Four Digits
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.original.last_four_digits}</div>
      ),
    },
    {
      accessorKey: "Product",
      header: "Product Category",
      cell: ({ row }) => {
        const category = row.original.category;
        //console.log(product);
        return (
          <div className="capitalize">{category || "-"}</div>
        );
      },
    },
    {
      // accessorKey: "createdAt",
      accessorKey: "issued_date",
      header: "Issued Date",
      cell: ({ row }) => {
        // const date = row.original.createdAt.split(" ")[0];
        // const time1 = row.original.createdAt.split("")[1];
        // const time2 = time1.split(".")[0];
        //const

        return (
          <div className="flex flex-col items-center text-center">
            <span>{row.original.issued_date || "-"}</span>
            {/* <span className="text-slate-400">{time2}</span> */}
          </div>
        );
      },
    },

    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original?.status;
        return (
          <> 
            {status === "Active" && (
              <Badge className="bg-[#e4f5e9] text-[#16794c]">Active</Badge>
            )} 
            { status === "Inactive" && (
              <Badge className="bg-[#fff0f0] text-[#b52a2a]">Inactive</Badge>
            )}
            {
              status === null && (
                <div>-</div>
              )
            }
          </>
        )
      },
    },
    {
      header: "Tags",
      cell: ({ row }) => {
        const slicedTags = row.original.tags.slice(1)
        const tagsArray = slicedTags.split(',')
        console.log(tagsArray)
        return (
        <div className="flex items-center justify-center gap-2">
          {
            tagsArray.map( (tag) => {
              return (
                <Badge variant="primary">{tag}</Badge>
              )
            })
          }
        </div>
      )},
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
                Activate
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
  ];

  const table = useReactTable({
    data: tableData,
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
  });

  const openDialog = (rowData) => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    // Clear any row data when canceled
  };
  const downloadCSV = () => {
    // Convert table data to CSV
    const csv = Papa.unparse(data);
    // Create a Blob object for the CSV
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    // Use FileSaver to trigger a download
    saveAs(blob, "table-data.csv");
  };
  // /card/allIssuedCards
  // State for table data
  // const [loading, setLoading] = React.useState(true); // State for loading
  // const [error, setError] = React.useState(null); // State for error handling

  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('/card/allIssuedCards',{
  //         withCredentials: true,
  //       });
  //       console.log(response.data.data);
  //       setData(response.data.data);
  //     } catch (err) {
  //       console.error('Error fetching data:', err);
  //       //setError('Failed to fetch data. Please try again later.');
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Issued Cards</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <div className="w-full flex gap-2 justify-between max-md:flex-col max-md:gap-2 max-md:items-start max-md:w-[70%]">
            <div className="w-full">
              <DataTableToolbar
                table={table}
                inputFilter="card_ref_id"
                status={status}
              />
            </div>
            <div className="flex gap-2 items-center">
              <Button variant="outline" className="h-8" onClick={downloadCSV}>
                <FileDown />
              </Button>

              <DataTableViewOptions table={table} />
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
                        <TableCell className="text-center" key={cell.id}>
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
