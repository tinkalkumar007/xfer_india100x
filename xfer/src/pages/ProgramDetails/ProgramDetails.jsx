import { useState } from 'react'
import FrontImg from '@/assets/front-img.png'

import BackImg from '@/assets/back-img.png'
import { Switch } from '@/components/ui/switch'
import ProgramTransactionLimitationsSheet from '@/components/ProgramTransactionLimitationsSheet'

import { Info, SquareArrowOutUpRight } from 'lucide-react'

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
  useFrappeGetDocList,
} from 'frappe-react-sdk'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import Error404 from '../Error404/Error404'

const ProgramDetails = () => {
  const { id } = useParams()

  const navigate = useNavigate()

  const { currentUser } = useFrappeAuth()

  const {
    data: programDetails,
    isLoading: programDetailsLoading,
    error: errorFetchingPrograms,
  } = useFrappeGetDoc('Program', id)

  if (errorFetchingPrograms) {
    navigate('/error404')
  }

  console.log('Program Details:', programDetails)

  const { data: cardsCount, isLoading: cardsCountLoading } =
    useFrappeGetDocCount('Cards', [['program_name', '=', id]])

  const { data: activeCards, isLoading: activeCardsLoading } =
    useFrappeGetDocCount('Cards', [
      ['program_name', '=', id],
      ['card_status', '=', 'Active'],
    ])

  // const { data: sampleData, isLoading: sampleDataLoading } = useFrappeGetDoc(
  //   'Workspace',
  //   'Programs'
  // )
  // const { data: sampleList, isLoading: sampleListLoading } =
  //   useFrappeGetDocList('Workspace', {
  //     fields: ['*'],
  //     filters: [['name', '=', 'Programs']],
  //   })
  // const { data: orderedCards, isLoading: orderedCardsLoading } =
  //   useFrappeGetDocCount('Inventory', [
  //     ['.program_name', '=', id],
  //     ['status', '=', 'Ordered'],
  //   ])
  // console.log(orderedCards)

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
              <div className="flex items-center relative">
                {programDetails?.status
                  ? (() => {
                      switch (programDetails?.status) {
                        case 'Active':
                          return (
                            <Badge
                              variant="outline"
                              className="bg-[#E4F5E9] text-[#16794C] cursor-pointer (KYC)"
                            >
                              {programDetails?.status}
                            </Badge>
                          )
                        case 'Inactive':
                          return (
                            <Badge
                              variant="outline"
                              className="bg-[#FFF0F0] text-[#B52A2A]"
                            >
                              {programDetails?.status}
                            </Badge>
                          )
                        default:
                          return (
                            <Badge variant="outline">
                              {programDetails?.status}
                            </Badge>
                          )
                      }
                    })()
                  : null}
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
          <div className="flex gap-4 px-4 py-2 items-start flex-nowrap">
            <p className="text-md font-medium max-sm:text-sm flex justify-between items-center">
              Tags:
            </p>
            <div className="flex gap-2 flex-wrap">
              {tags?.length > 0 &&
                tags?.map((tag, index) => {
                  // if (index <= 3) {
                  switch (tag) {
                    case 'KYC':
                      return (
                        <Badge
                          key={tag}
                          className="bg-[#E4F5E9] text-[#16794C] cursor-pointer tracking-widest max-sm:tracking-normal"
                        >
                          KYC
                        </Badge>
                      )
                    case 'Contactless':
                      return (
                        <Badge
                          key={tag}
                          className="bg-[#F9F0FF] text-[#6E399D] cursor-pointer tracking-widest max-sm:tracking-normal"
                        >
                          Contactless
                        </Badge>
                      )
                    case 'Physical':
                      return (
                        <Badge
                          key={tag}
                          className="bg-[#F5FBFC] text-[#267A94] cursor-pointer tracking-widest max-sm:tracking-normal"
                        >
                          Physical
                        </Badge>
                      )
                    case 'Reward':
                      return (
                        <Badge
                          key={tag}
                          className="bg-[#FFF1E7] text-[#BD3E0C] cursor-pointer tracking-widest max-sm:tracking-normal"
                        >
                          Reward
                        </Badge>
                      )
                    default:
                      return (
                        <Badge variant="primary" key={tag}>
                          {tag}
                        </Badge>
                      )
                    // }
                  }
                })}
              {/* {tags?.length > 4 && (
                  <div className="flex flex-wrap">
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <Button
                          variant=""
                          className="cursor-pointer tracking-wider h-6"
                        >
                          +{tags.length - 4} more
                        </Button>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-full">
                        <div className="flex gap-4">
                          {tags?.map((tag, _i) => {
                            if (_i > 3) {
                              return (
                                <Badge
                                  variant="primary"
                                  className="cursor-pointer tracking-widest"
                                  key={tag}
                                >
                                  {tag}
                                </Badge>
                              )
                            }
                          })}
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                )} */}
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
            <div
              className="flex flex-col gap-1 xl:border-r-2"
              onClick={() => {
                navigate(`/issued-cards?program_name=${id}&card_status=Active`)
              }}
            >
              <div className="flex justify-between items-center gap-2 pr-4">
                <p className="font-medium text-sm text-muted-foreground">
                  Active Cards
                </p>
                <SquareArrowOutUpRight className="w-3 h-3" />
              </div>
              <p className="font-medium text-sm">
                {activeCards ? activeCards : '-'}
              </p>
            </div>
            <div
              className="flex flex-col gap-1 xl:border-r-2 cursor-pointer"
              onClick={() => {
                navigate(`/issued-cards?program_name=${id}`)
              }}
            >
              <div className="flex gap-2 items-center justify-between w-full pr-4">
                <p className="font-medium text-sm text-muted-foreground">
                  Issued Cards
                </p>

                <SquareArrowOutUpRight className="w-3 h-3" />
              </div>

              <p className="font-medium text-sm">
                {cardsCount ? cardsCount : '-'}
              </p>
            </div>

            <div className="flex flex-col gap-1 xl:border-r-2 ">
              <p className="font-medium text-sm text-muted-foreground">
                Available Stock
              </p>
              <p className="font-medium text-sm">
                {programDetails?.available_stock
                  ? programDetails?.available_stock
                  : '-'}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <p className="font-medium text-sm text-muted-foreground">
                In Order
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
        <div className="grid grid-cols-1 gap-2">
          {/* <div>
              <RewardBenefitsSheet
                insurance_card={programDetails?.insurance_card}
                insurance_travel={programDetails?.insurance__travel}
                lounge_access={programDetails?.lounge_access}
                reward_points={programDetails?.reward_points}
              />
            </div> */}
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
