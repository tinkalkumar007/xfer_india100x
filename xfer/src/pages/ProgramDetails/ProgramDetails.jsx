import { useState } from 'react'
import FrontImg from '@/assets/front-img.png'

import BackImg from '@/assets/back-img.png'
import { Switch } from '@/components/ui/switch'
import ProgramTransactionLimitationsSheet from '@/components/ProgramTransactionLimitationsSheet'

import { Info } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'

import Autoplay from 'embla-carousel-autoplay'

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { Separator } from '@/components/ui/separator'

import { Badge } from '@/components/ui/badge'
import React from 'react'

import { Button } from '@/components/ui/button'

import WhitelistMCC from '../../components/WhitelistMCC'
import WhitelistBIN from '../../components/WhitelistBIN'
import WhitelistTID from '../../components/WhitelistTID'
import WhitelistMID from '../../components/WhitelistMID'
import RewardBenefitsSheet from '../../components/RewardBenefitsSheet'
import FeeCodeSheet from '../../components/FeeCodeSheet'
import ProgramControls from '../../components/ProgramControls'

const program = {
  created_on: '17-12-2024',
  created_by: 'ONO',
  category: 'Entertainment',
  status: false,
  limit: '10000',
  is_kyc: true,
  is_contactless: true,
  is_reward: true,
  is_physical: true,
}

const ProgramDetails = () => {
  const [data, setData] = useState({
    status: false,
  })
  const [mccInputValue, setMCCInputValue] = useState('')
  const [savedMCCValues, setMCCSavedValues] = useState([])
  const [showMCCValues, setShowMCCValues] = useState([])

  return (
    <div className="relative w-full flex flex-col xl:flex-row xl:gap-2 gap-2">
      <div className="w-full xl:min-w-[65%] space-y-2">
        <div className="flex flex-col rounded-md bg-muted/50 gap-0 border w-full">
          <div className="h-16 flex items-center justify-between px-4 py-2 text-md font-medium">
            <div className="flex gap-2 items-center">
              <h2 className="text-lg font-medium">ONO</h2>
            </div>

            <div className="flex gap-6 items-center">
              <div className="flex items-center relative">
                {data.status === false && (
                  <Switch
                    id="status"
                    checked={data.status}
                    onClick={() => {
                      setData({ ...data, status: true })
                    }}
                  />
                )}
                {data.status && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="flex items-center relative">
                        <Switch checked={data.status} />
                      </div>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently
                          delete your account and remove your data from our
                          servers.
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
                              setData({ ...data, status: false })
                            }}
                          >
                            Proceed
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}

                <HoverCard className="border">
                  <HoverCardTrigger asChild>
                    <Info className="absolute h-3 w-3 bottom-1 -right-[0.92rem] cursor-pointer" />
                  </HoverCardTrigger>
                  <HoverCardContent className="w-full h-4 flex justify-center items-center">
                    <span className="text-xs font-semibold">
                      Toggle to {program.status ? 'Deactivate' : 'Activate'}
                    </span>
                  </HoverCardContent>
                </HoverCard>
              </div>
              <Button variant="outline">Submit</Button>
            </div>
          </div>
          <Separator className="mt-[-8px]" />
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-2 px-4 py-2 w-full">
            <div className="flex flex-col gap-1 xl:border-r-2 ">
              <p className="font-medium text-xs text-muted-foreground">
                Category
              </p>
              <p className="font-medium text-sm">Entertainment</p>
            </div>

            <div className="flex flex-col gap-1 xl:border-r-2">
              <p className="font-medium text-xs text-muted-foreground">
                Created By
              </p>
              <p className="font-medium text-sm">ONO</p>
            </div>

            <div className="flex flex-col gap-1 xl:border-r-2 ">
              <p className="font-medium text-xs text-muted-foreground">
                Created On
              </p>
              <p className="font-medium text-sm">24/12/2024</p>
            </div>

            <div className="flex flex-col gap-1">
              <p className="font-medium text-xs text-muted-foreground">
                Card Type
              </p>
              <p className="font-medium text-sm">Virtual & Physical</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col rounded-md bg-muted/50 gap-6 border w-full">
          <div className="flex gap-4 px-4 py-2 items-center flex-nowrap">
            <p className="text-md font-medium max-sm:text-sm flex justify-between items-center">
              Tags:
            </p>
            <div className="flex gap-2">
              {program.is_kyc && (
                <Badge className="bg-[#E4F5E9] text-[#16794C] cursor-pointer tracking-widest max-sm:tracking-normal">
                  KYC
                </Badge>
              )}
              {program.is_contactless && (
                <Badge className="bg-[#F9F0FF] text-[#6E399D] cursor-pointer tracking-widest max-sm:tracking-normal">
                  Contactless
                </Badge>
              )}
              {program.is_physical && (
                <Badge className="bg-[#F5FBFC] text-[#267A94] cursor-pointer tracking-widest max-sm:tracking-normal">
                  Physical
                </Badge>
              )}
              {program.is_reward && (
                <Badge className="bg-[#FFF1E7] text-[#BD3E0C] cursor-pointer tracking-widest max-sm:tracking-normal">
                  Reward
                </Badge>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col rounded-md bg-muted/50 gap-6 px-4 py-2 border w-full">
          <div className="flex flex-col gap-1">
            <h2 className="text-md font-medium">Description :</h2>
            <p className="text-sm font-normal text-muted-foreground">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatum, sunt? Modi sint labore quod accusamus dolorem expedita
              fugit, alias optio culpa obcaecati fugiat eum.
            </p>
          </div>
        </div>

        <div className="flex flex-col rounded-md bg-muted/50 gap-0 border w-full">
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-2 px-4 py-2 w-full">
            <div className="flex flex-col gap-1 xl:border-r-2 ">
              <p className="font-medium text-xs text-muted-foreground">
                Total Customers
              </p>
              <p className="font-medium text-sm">10000</p>
            </div>

            <div className="flex flex-col gap-1 xl:border-r-2">
              <p className="font-medium text-xs text-muted-foreground">
                No. of Cards
              </p>
              <p className="font-medium text-sm">100</p>
            </div>

            <div className="flex flex-col gap-1 xl:border-r-2 ">
              <p className="font-medium text-xs text-muted-foreground">
                Available Stock
              </p>
              <p className="font-medium text-sm">500</p>
            </div>

            <div className="flex flex-col gap-1">
              <p className="font-medium text-xs text-muted-foreground">
                Transaction Limit
              </p>
              <p className="font-medium text-sm">&#8377; {program.limit}</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2  gap-2">
          <WhitelistMCC />

          <WhitelistBIN />

          <WhitelistTID />

          <WhitelistMID />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <RewardBenefitsSheet />
          <FeeCodeSheet />
        </div>
        <div className="grid grid-cols-1 gap-2">
          <ProgramTransactionLimitationsSheet />
        </div>
      </div>
      <div className="w-full xl:min-w-[35%] flex flex-col gap-2">
        <ProgramControls />
      </div>
    </div>
  )
}

export default ProgramDetails
