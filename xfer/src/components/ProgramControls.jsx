import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Minus, Plus } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from '@/components/ui/dialog'

const ProgramControls = () => {
  const [data, setData] = useState({
    add_on: false,
    kit_to_kit: false,
    reload_applicable: false,
    jit_applicable: false,
  })
  const [addOn, setAddOn] = useState(10)
  const [showAddOn, setShowAddOn] = useState(null)

  return (
    <div className="flex flex-col rounded-md bg-muted/50 gap-2 border w-full">
      <div className=" flex flex-col items-start px-4 py-2 text-md font-medium gap-2">
        <h2 className="text-lg font-medium">Controls</h2>
        <p className="text-xs font-normal text-muted-foreground">
          The admin controls provide powerful tools to manage platform
          functionality, ensuring smooth operations and effective oversight.
        </p>
      </div>
      <Separator className="" />
      <div className="flex flex-col gap-4 px-4 py-2 pb-4">
        <div className="flex px-4 py-2 gap-8 items-center justify-between border rounded-md">
          <div className="space-y-2">
            <h2 className="font-medium text-md">Reload Applicable</h2>
            <p className="text-xs font-normal text-muted-foreground">
              The Reload Applicable is for the program reload amount.
            </p>
          </div>
          <div>
            {data.reload_applicable === false && (
              <Switch
                checked={data.reload_applicable}
                onClick={() => {
                  setData({ ...data, reload_applicable: true })
                }}
              />
            )}
            {data.reload_applicable && (
              <Dialog>
                <DialogTrigger asChild>
                  <div>
                    <Switch checked={data.reload_applicable} />
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </DialogDescription>
                  </DialogHeader>

                  <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Close
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button
                        type="button"
                        onClick={() => {
                          setData({ ...data, reload_applicable: false })
                        }}
                      >
                        Proceed
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
        <div className="flex px-4 py-2 gap-8 items-center justify-between border rounded-md">
          <div className="space-y-2">
            <h2 className="font-medium text-md">JIT Applicable</h2>
            <p className="text-xs font-normal text-muted-foreground">
              Enables just-in-time funding for program managers and cardholders.
            </p>
          </div>
          <div>
            {data.jit_applicable === false && (
              <Switch
                checked={data.jit_applicable}
                onClick={() => {
                  setData({ ...data, jit_applicable: true })
                }}
              />
            )}
            {data.jit_applicable && (
              <Dialog>
                <DialogTrigger asChild>
                  <div>
                    <Switch checked={data.jit_applicable} />
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </DialogDescription>
                  </DialogHeader>

                  <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Close
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button
                        type="button"
                        onClick={() => {
                          setData({ ...data, jit_applicable: false })
                        }}
                      >
                        Proceed
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
        <div className="flex px-4 py-2 gap-8 items-center justify-between border rounded-md">
          <div className="space-y-2">
            <h2 className="font-medium text-md">Kit To Kit Transfer</h2>
            <p className="text-xs font-normal text-muted-foreground">
              A kit-to-kit transfer involves moving an entire pre-assembled kit
              of items.
            </p>
          </div>
          <div>
            {data.kit_to_kit === false && (
              <Switch
                checked={data.kit_to_kit}
                onClick={() => {
                  setData({ ...data, kit_to_kit: true })
                }}
              />
            )}
            {data.kit_to_kit && (
              <Dialog>
                <DialogTrigger asChild>
                  <div>
                    <Switch checked={data.kit_to_kit} />
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </DialogDescription>
                  </DialogHeader>

                  <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Close
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button
                        type="button"
                        onClick={() => {
                          setData({ ...data, kit_to_kit: false })
                        }}
                      >
                        Proceed
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
        <div className="flex px-4 py-2 gap-8 items-center justify-between border rounded-md">
          <div className="space-y-2">
            <div className="flex gap-2 items-center">
              <h2 className="font-medium text-md">Add On Allowed</h2>
              {data.add_on && (
                <Badge
                  variant="primary"
                  className="bg-[#FFF1E7] text-[#BD3E0C]"
                >
                  {showAddOn}
                </Badge>
              )}
            </div>
            <p className="text-xs font-normal text-muted-foreground">
              Defines additional features for program managers and cardholders,
              enhancing the functionality.
            </p>
          </div>
          <div>
            {data.add_on && (
              <Dialog>
                <DialogTrigger asChild>
                  <div>
                    <Switch checked={data.add_on} />
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </DialogDescription>
                  </DialogHeader>

                  <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Close
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button
                        type="button"
                        onClick={() => {
                          setData({ ...data, add_on: false })
                        }}
                      >
                        Proceed
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
            {data.add_on === false && (
              <Drawer>
                <DrawerTrigger asChild>
                  <div>
                    <Switch checked={data.add_on} />
                  </div>
                </DrawerTrigger>
                <DrawerContent>
                  <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                      <DrawerTitle>Max Add On</DrawerTitle>
                      <DrawerDescription>
                        Set your max add on per customer.
                      </DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                      <div className="flex items-center justify-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 shrink-0 rounded-full"
                          onClick={() => {
                            setAddOn((prev) => (prev -= 1))
                          }}
                          disabled={addOn < 1}
                        >
                          <Minus />
                          <span className="sr-only">Decrease</span>
                        </Button>
                        <div className="flex-1 text-center">
                          <div className="text-7xl font-bold tracking-tighter">
                            {addOn}
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 shrink-0 rounded-full"
                          onClick={() => {
                            setAddOn((prev) => (prev += 1))
                          }}
                        >
                          <Plus />
                          <span className="sr-only">Increase</span>
                        </Button>
                      </div>
                    </div>

                    <DrawerFooter>
                      <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DrawerClose>
                      <DialogClose asChild>
                        <Button
                          onClick={() => {
                            setShowAddOn(addOn)
                            setData({ ...data, add_on: true })
                          }}
                        >
                          Submit
                        </Button>
                      </DialogClose>
                    </DrawerFooter>
                  </div>
                </DrawerContent>
              </Drawer>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgramControls
