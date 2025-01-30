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

const ProgramControls = ({ programDetails, programDetailsLoading }) => {
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
            <Switch checked={programDetails?.allow_reload} />
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
            <Switch checked={programDetails?.allow_jit} />
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
            <Switch checked={programDetails?.allow_kit_to_kit} />
          </div>
        </div>
        <div className="flex px-4 py-2 gap-8 items-center justify-between border rounded-md">
          <div className="space-y-2">
            <div className="flex gap-2 items-center">
              <h2 className="font-medium text-md">Add On Allowed</h2>
              {programDetails?.allow_add_on ? (
                <Badge
                  variant="primary"
                  className="bg-[#FFF1E7] text-[#BD3E0C]"
                >
                  {programDetails?.add_on_value}
                </Badge>
              ) : null}
            </div>
            <p className="text-xs font-normal text-muted-foreground">
              Defines additional features for program managers and cardholders,
              enhancing the functionality.
            </p>
          </div>
          <div>
            <div>
              <Switch checked={programDetails?.allow_add_on} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgramControls
