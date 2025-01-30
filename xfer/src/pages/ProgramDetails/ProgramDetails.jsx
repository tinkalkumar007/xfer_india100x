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
import {
  useFrappeAuth,
  useFrappeGetDoc,
  useFrappeGetDocCount,
} from 'frappe-react-sdk'
import { useNavigate, useParams } from 'react-router-dom'

const ProgramDetails = () => {
  const { id } = useParams()

  const { currentUser } = useFrappeAuth()

  const { data: programDetails, isLoading: programDetailsLoading } =
    useFrappeGetDoc('Program', id)

  const { data: cardsCount, isLoading: cardsCountLoading } =
    useFrappeGetDocCount('Cards', [['program_name', '=', id]])

  const { data: customersCount, isLoading: customersCountLoading } =
    useFrappeGetDocCount('Customers', [['owner', '=', currentUser]])

  const tags =
    !programDetailsLoading && programDetails?._user_tags?.slice(1).split(',')

  console.log(tags)

  return (
    <div className="relative w-full flex flex-col xl:flex-row xl:gap-2 gap-2">
      <div className="w-full xl:min-w-[65%] space-y-2">
        <div className="flex flex-col rounded-md bg-muted/50 gap-0 border w-full">
          <div className="h-16 flex items-center justify-between px-4 py-2 text-md font-medium">
            <div className="flex gap-2 items-center">
              <h2 className="text-lg font-medium">
                {programDetails?.program_name}
              </h2>
            </div>

            <div className="flex gap-6 items-center">
              <div className="flex items-center relative mr-2">
                <Switch
                  id="status"
                  checked={programDetails?.status === 'Active'}
                />
                <HoverCard className="border">
                  <HoverCardTrigger asChild>
                    <Info className="absolute h-3 w-3 bottom-1 -right-[0.92rem] cursor-pointer" />
                  </HoverCardTrigger>
                  <HoverCardContent className="w-full h-4 flex justify-center items-center">
                    <span className="text-xs font-semibold">
                      {programDetails?.status === 'Active'
                        ? 'Activated'
                        : 'Deactivated'}
                    </span>
                  </HoverCardContent>
                </HoverCard>
              </div>
              {/* <div>
                <Button variant="outline">Submit</Button>
              </div> */}
            </div>
          </div>
          <Separator className="mt-[-8px]" />
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-2 px-4 py-2 w-full">
            <div className="flex flex-col gap-1 xl:border-r-2 ">
              <p className="font-medium text-xs text-muted-foreground">
                Category
              </p>
              <p className="font-medium text-sm">{programDetails?.category}</p>
            </div>

            <div className="flex flex-col gap-1 xl:border-r-2">
              <p className="font-medium text-xs text-muted-foreground">
                Created By
              </p>
              <p className="font-medium text-sm">
                {programDetails?.modified_by}
              </p>
            </div>

            <div className="flex flex-col gap-1 xl:border-r-2 ">
              <p className="font-medium text-xs text-muted-foreground">
                Created On
              </p>
              <p className="font-medium text-sm">
                {' '}
                {programDetails?.creation
                  .split(' ')[0]
                  .split('-')
                  .reverse()
                  .join('-')}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <p className="font-medium text-xs text-muted-foreground">
                Card Type
              </p>
              <p className="font-medium text-sm">{programDetails?.card_type}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col rounded-md bg-muted/50 gap-6 border w-full">
          <div className="flex gap-4 px-4 py-2 items-center flex-nowrap">
            <p className="text-md font-medium max-sm:text-sm flex justify-between items-center">
              Tags:
            </p>
            <div className="flex gap-2">
              {tags?.length > 0 &&
                tags?.map((tag) => {
                  switch (tag) {
                    case 'KYC':
                      return (
                        <Badge
                          key="KYC"
                          className="bg-[#E4F5E9] text-[#16794C] cursor-pointer tracking-widest max-sm:tracking-normal"
                        >
                          KYC
                        </Badge>
                      )
                    case 'Contactless':
                      return (
                        <Badge
                          key="Contactless"
                          className="bg-[#F9F0FF] text-[#6E399D] cursor-pointer tracking-widest max-sm:tracking-normal"
                        >
                          Contactless
                        </Badge>
                      )
                    case 'Physical':
                      return (
                        <Badge
                          key="Physical"
                          className="bg-[#F5FBFC] text-[#267A94] cursor-pointer tracking-widest max-sm:tracking-normal"
                        >
                          Physical
                        </Badge>
                      )
                    case 'Reward':
                      return (
                        <Badge
                          key="Reward"
                          className="bg-[#FFF1E7] text-[#BD3E0C] cursor-pointer tracking-widest max-sm:tracking-normal"
                        >
                          Reward
                        </Badge>
                      )
                  }
                })}
            </div>
          </div>
        </div>

        <div className="flex flex-col rounded-md bg-muted/50 gap-6 px-4 py-2 border w-full">
          <div className="flex flex-col gap-1">
            <h2 className="text-md font-medium">Description :</h2>
            <p className="text-sm font-normal text-muted-foreground">
              {programDetails?.description}
            </p>
          </div>
        </div>

        <div className="flex flex-col rounded-md bg-muted/50 gap-0 border w-full">
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-2 px-4 py-2 w-full">
            <div className="flex flex-col gap-1 xl:border-r-2">
              <p className="font-medium text-xs text-muted-foreground">
                No. of Cards
              </p>
              <p className="font-medium text-sm">
                {!cardsCountLoading && cardsCount}
              </p>
            </div>
            <div className="flex flex-col gap-1 xl:border-r-2 ">
              <p className="font-medium text-xs text-muted-foreground">
                Issued Cards
              </p>
              <p className="font-medium text-sm">-</p>
            </div>

            <div className="flex flex-col gap-1 xl:border-r-2 ">
              <p className="font-medium text-xs text-muted-foreground">
                Available Stock
              </p>
              <p className="font-medium text-sm">-</p>
            </div>

            <div className="flex flex-col gap-1">
              <p className="font-medium text-xs text-muted-foreground">
                Total Transactions
              </p>
              <p className="font-medium text-sm">-</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2  gap-2">
          <div>
            <WhitelistMCC
              mccCodes={programDetails?.mcc_code}
              programDetailsLoading={programDetailsLoading}
            />
          </div>
          <div>
            <WhitelistBIN
              bins={programDetails?.bins}
              programDetailsLoading={programDetailsLoading}
            />
          </div>
          <div>
            <WhitelistTID
              tidCodes={programDetails?.tids}
              programDetailsLoading={programDetailsLoading}
            />
          </div>
          <div>
            <WhitelistMID
              midCodes={programDetails?.mids}
              programDetailsLoading={programDetailsLoading}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <RewardBenefitsSheet
              insurance_card={programDetails?.insurance_card}
              insurance_travel={programDetails?.insurance__travel}
              lounge_access={programDetails?.lounge_access}
              reward_points={programDetails?.reward_points}
            />
          </div>
          <div>
            <FeeCodeSheet feeCodes={programDetails?.table_ujtz} />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2">
          <ProgramTransactionLimitationsSheet
            transactionLimitations={programDetails?.table_eosn}
            programDetailsLoading={programDetailsLoading}
          />
        </div>
      </div>
      <div className="w-full xl:min-w-[35%] flex flex-col gap-2">
        <ProgramControls
          programDetails={programDetails}
          programDetailsLoading={programDetailsLoading}
        />
      </div>
    </div>
  )
}

export default ProgramDetails
