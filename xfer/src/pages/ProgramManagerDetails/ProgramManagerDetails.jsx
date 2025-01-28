import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import ManagerProgramList from '@/components/ManagerProgramList'
import ManagerActivityLogs from '@/components/ManagerActivityLogs'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import OnoLogo from '@/assets/ono-logo.png'
import { Separator } from '@/components/ui/separator'

const ProgramManagerDetails = () => {
  return (
    <div className="relative w-full flex flex-col md:flex-row gap-2">
      <div className="w-full lg:w-[40%] flex flex-col gap-2">
        <div className="w-full bg-muted/50 rounded-md border">
          <div className="flex gap-2 px-4 py-6 items-center">
            <div className="w-[30%] flex justify-center items-center">
              <img src={OnoLogo} alt="" width={90} height={90} />
            </div>
            <div className="flex flex-col gap-1 w-[70%]">
              <h2 className="font-bold text-xl">ONO</h2>
              <p className="text-sm  text-muted-foreground">
                Status :{' '}
                <Badge variant="primary" className="font-medium">
                  Active
                </Badge>
              </p>

              <p className="text-sm text-muted-foreground">
                Created On : <span className="font-medium">14/12/2024</span>
              </p>
            </div>
          </div>
          <div className="flex justify-center bg-muted/50">
            <Separator className="w-[90%]" />
          </div>
          <div className="px-4 py-6 ">
            <div className="flex flex-col rounded-md border py-2 bg-white">
              <div className="px-4 py-2">
                <h2 className="text-lg font-semibold">Manager Details</h2>
              </div>
              <Separator />
              <div className="flex flex-col gap-2 w-full px-4 py-2">
                <div className="flex gap-2 justify-between items-start w-full">
                  <p className="text-sm text-muted-foreground w-[50%]">
                    Phone No:
                  </p>
                  <p className="text-sm text-left text-muted-foreground w-[50%]">
                    84582458897
                  </p>
                </div>
                <div className="flex gap-2 justify-between items-start w-full">
                  <p className="text-sm text-muted-foreground w-[50%]">
                    Email:
                  </p>
                  <p className="text-sm text-muted-foreground w-[50%] text-left">
                    ono.club@gmail.com
                  </p>
                </div>
                <div className="flex gap-2 justify-between items-start w-full">
                  <p className="text-sm text-muted-foreground w-[50%]">
                    Address:
                  </p>
                  <p className="text-sm text-left w-[50%] text-muted-foreground">
                    Sovereign Capital Gate, Sector 16a, Noida, Uttar Pradesh,
                    201301
                  </p>
                </div>
                <div className="flex gap-2 justify-between items-start w-full">
                  <p className="text-sm text-muted-foreground w-[50%]">
                    Last Order:
                  </p>
                  <p className="text-sm text-left text-muted-foreground w-[50%]">
                    Today at 16:04
                  </p>
                </div>
                <div className="flex gap-2 justify-between items-start w-full">
                  <p className="text-sm text-muted-foreground w-[50%]">
                    Last Active:
                  </p>
                  <p className="text-sm text-left text-muted-foreground w-[50%]">
                    Today at 13:04
                  </p>
                </div>
              </div>
              <div className="px-4 py-2 flex justify-center items-center w-full">
                <Button
                  variant="outline"
                  className="w-full shadow-sm tracking-wide"
                >
                  CONFIGURE DETAILS
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full bg-muted/50">
          <Card>
            <div className="flex flex-col gap-1 px-8 py-4 leading-none">
              <h2 className="text-lg font-semibold ">Team Members</h2>
              <p className=" text-muted-foreground">
                Invite your team members to collaborate.
              </p>
            </div>
            <div className="w-full flex justify-center">
              <Separator className=" w-[90%]" />
            </div>
            <CardContent className="grid gap-6 mt-3">
              <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/avatars/01.png" />
                    <AvatarFallback>OM</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">
                      Sofia Davis
                    </p>
                    <p className="text-sm text-muted-foreground">
                      m@example.com
                    </p>
                  </div>
                </div>
                <div>
                  <Button variant="outline">Owner</Button>
                </div>
                {/* <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="ml-auto">
                      Owner <ChevronDown className="text-muted-foreground" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0" align="end">
                    <Command>
                      <CommandInput placeholder="Select new role..." />
                      <CommandList>
                        <CommandEmpty>No roles found.</CommandEmpty>
                        <CommandGroup>
                          <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                            <p>Viewer</p>
                            <p className="text-sm text-muted-foreground">
                              Can view and comment.
                            </p>
                          </CommandItem>
                          <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                            <p>Developer</p>
                            <p className="text-sm text-muted-foreground">
                              Can view, comment and edit.
                            </p>
                          </CommandItem>
                          <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                            <p>Billing</p>
                            <p className="text-sm text-muted-foreground">
                              Can view, comment and manage billing.
                            </p>
                          </CommandItem>
                          <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                            <p>Owner</p>
                            <p className="text-sm text-muted-foreground">
                              Admin-level access to all resources.
                            </p>
                          </CommandItem>
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover> */}
              </div>
              <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/avatars/02.png" />
                    <AvatarFallback>JL</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">
                      Jackson Lee
                    </p>
                    <p className="text-sm text-muted-foreground">
                      p@example.com
                    </p>
                  </div>
                </div>
                <div>
                  <Button variant="outline">Member</Button>
                </div>
                {/* <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="ml-auto">
                      Member <ChevronDown className="text-muted-foreground" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0" align="end">
                    <Command>
                      <CommandInput placeholder="Select new role..." />
                      <CommandList>
                        <CommandEmpty>No roles found.</CommandEmpty>
                        <CommandGroup className="p-1.5">
                          <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                            <p>Viewer</p>
                            <p className="text-sm text-muted-foreground">
                              Can view and comment.
                            </p>
                          </CommandItem>
                          <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                            <p>Developer</p>
                            <p className="text-sm text-muted-foreground">
                              Can view, comment and edit.
                            </p>
                          </CommandItem>
                          <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                            <p>Billing</p>
                            <p className="text-sm text-muted-foreground">
                              Can view, comment and manage billing.
                            </p>
                          </CommandItem>
                          <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                            <p>Owner</p>
                            <p className="text-sm text-muted-foreground">
                              Admin-level access to all resources.
                            </p>
                          </CommandItem>
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover> */}
              </div>
              <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/avatars/01.png" />
                    <AvatarFallback>OM</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">
                      Sofia Davis
                    </p>
                    <p className="text-sm text-muted-foreground">
                      m@example.com
                    </p>
                  </div>
                </div>
                <div>
                  <Button variant="outline">Member</Button>
                </div>
                {/* <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="ml-auto">
                      Owner <ChevronDown className="text-muted-foreground" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0" align="end">
                    <Command>
                      <CommandInput placeholder="Select new role..." />
                      <CommandList>
                        <CommandEmpty>No roles found.</CommandEmpty>
                        <CommandGroup>
                          <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                            <p>Viewer</p>
                            <p className="text-sm text-muted-foreground">
                              Can view and comment.
                            </p>
                          </CommandItem>
                          <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                            <p>Developer</p>
                            <p className="text-sm text-muted-foreground">
                              Can view, comment and edit.
                            </p>
                          </CommandItem>
                          <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                            <p>Billing</p>
                            <p className="text-sm text-muted-foreground">
                              Can view, comment and manage billing.
                            </p>
                          </CommandItem>
                          <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                            <p>Owner</p>
                            <p className="text-sm text-muted-foreground">
                              Admin-level access to all resources.
                            </p>
                          </CommandItem>
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover> */}
              </div>
            </CardContent>
            <div className="w-full flex justify-center">
              <Separator className="w-[90%]" />
            </div>
            <CardFooter>
              <div className="px-4 py-2 flex justify-center w-full">
                <p className="font-semibold text-sm underline cursor-pointer tracking-wide">
                  View All Members
                </p>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
      <div className="w-full lg:w-[60%] flex flex-col gap-2">
        <div className="flex flex-col gap-2 rounded-md border bg-muted/50">
          <div className="flex flex-col px-4 pt-4 pb-2">
            <h2 className="font-semibold text-lg">Card Details</h2>
            <p className="text-muted-foreground">
              Invite your team members to collaborate.
            </p>
          </div>
          <div className="w-full flex justify-center">
            <Separator className="w-[96%]" />
          </div>
          <div>
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-2 px-4 py-2 w-full">
              <div className="flex flex-col gap-1 xl:border-r-2 ">
                <p className="font-medium text-sm text-muted-foreground">
                  Total Customers
                </p>
                <p className="font-medium text-md">10000</p>
              </div>

              <div className="flex flex-col gap-1 xl:border-r-2">
                <p className="font-medium text-sm text-muted-foreground">
                  No. of Cards
                </p>
                <p className="font-medium text-md">100</p>
              </div>

              <div className="flex flex-col gap-1 xl:border-r-2 ">
                <p className="font-medium text-sm text-muted-foreground">
                  Available Stock
                </p>
                <p className="font-medium text-md">500</p>
              </div>

              <div className="flex flex-col gap-1">
                <p className="font-medium text-sm text-muted-foreground">
                  Transaction Limit
                </p>
                <p className="font-medium text-md">&#8377;100000</p>
              </div>
            </div>
          </div>
        </div>
        <div className="border rounded-md flex flex-col gap-2">
          <div className="px-4 py-2 flex flex-col">
            <h2 className="text-lg font-semibold">Program List</h2>
            <p className="text-muted-foreground text-md ">
              Below are the total program list.
            </p>
          </div>
          <div className="w-full flex justify-center">
            <Separator className="w-[96%]" />
          </div>
          <div>
            <ManagerProgramList />
          </div>
        </div>
        <div className="border rounded-md flex flex-col gap-2">
          <div className="px-4 py-2 flex flex-col">
            <h2 className="text-lg font-semibold">Activity Logs</h2>
            <p className="text-muted-foreground text-md ">
              Below are the total program list.
            </p>
          </div>
          <div className="w-full flex justify-center">
            <Separator className="w-[96%]" />
          </div>
          <div>
            <ManagerActivityLogs />
          </div>
          <div className="w-full flex justify-center">
            <Separator className="w-[96%]" />
          </div>
          <div className="w-full flex justify-center pb-6">
            <p className="text-sm font-semibold underline tracking-wide cursor-pointer">
              View All Logs
            </p>
          </div>
        </div>
      </div>
      {/* <div className="w-full ">
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex gap-2 items-center">
                <div>
                  <Avatar>
                    <AvatarImage src={OnoLogo} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
                <div>ONO</div>
              </div>
            </CardTitle>
            <CardDescription>
              <div className="mt-2 flex  gap-4">
                <div>
                  <h2>
                    Status :{' '}
                    <span className="font-semibold">
                      <Badge variant="primary">Active</Badge>
                    </span>
                  </h2>
                </div>
                <div className="">
                  <h2 className="">
                    Category :{' '}
                    <span className="font-semibold">Entertainment</span>
                  </h2>
                </div>
                <div>
                  <h2>
                    Manager : <span className="font-semibold">ONO</span>
                  </h2>
                </div>
                <div>
                  <h2>
                    Launch Date :{' '}
                    <span className="font-semibold">14/12/2024</span>
                  </h2>
                </div>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Customers
                    </CardTitle>
                    <Users strokeWidth={1.5} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">200</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Amount
                    </CardTitle>
                    <IndianRupee strokeWidth={1.5} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">&#8377;5000</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Active Programs
                    </CardTitle>
                    <Activity strokeWidth={1.5} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">34</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Programs
                    </CardTitle>
                    <Grid strokeWidth={1.5} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">50</div>
                  </CardContent>
                </Card>
              </div>
              

              <div className="w-full space-y-2">
                <Card>
                  <Table>
                    <TableHeader>
                      {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                          {headerGroup.headers.map((header) => {
                            return (
                              <TableHead
                                className="text-center"
                                key={header.id}
                              >
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
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div> */}
    </div>
  )
}

export default ProgramManagerDetails
