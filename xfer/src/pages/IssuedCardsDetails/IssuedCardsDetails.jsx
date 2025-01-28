import React from 'react'
import VerticalCardFront from '@/assets/front-img.png'
import HorizontalCardBack from '@/assets/HorizontalCardBack.png'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { IndianRupee } from 'lucide-react'

// const data = {
//   is_physical: true,
//   is_addoncard: true,
// }
const IssuedCardsDetails = () => {
  return (
    <div className="relative w-full flex-col md:flex-row gap-2">
      <div className="w-full lg:w-[100%] flex flex-col gap-2">
        <div className="w-full bg-muted/50 rounded-md border">
          <div className="flex gap-2 px-6 pt-4 pb-2 items-center">
            <h2 className="font-semibold text-md">32XY32</h2>
            <div className="border-r px-4">
              <Badge
                variant="outline"
                className="bg-[#E4F5E9] text-[#16794C] cursor-pointer"
              >
                Active
              </Badge>
            </div>
            <p className="font-medium text-md border-r px-4">
              ID :{' '}
              <span className="font-medium text-muted-foreground"> 11287 </span>
            </p>
            <p className="font-medium text-md border-r px-4">
              Name :{' '}
              <span className="font-medium text-muted-foreground">Harshit</span>
            </p>
            <p className="font-medium text-md px-4">
              <Badge className="bg-[#e4f5e9] text-[#16794c] cursor-pointer">
                KYC
              </Badge>
            </p>
          </div>
          <div className="w-full flex justify-center">
            <Separator className="w-[98%]" />
          </div>
          <div className="w-full">
            <div className="flex justify-left w-full  gap-2 px-6 py-6 items-stretch">
              <div className="flex justify-left items-center">
                <img src={VerticalCardFront} className="w-[90%]" alt="" />
              </div>
              <div className=" w-full ">
                <div className="flex w-full flex-col rounded-md border bg-white ">
                  <div className="px-4 py-2">
                    <h2 className="text-lg font-semibold">Card Details</h2>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-4 gap-2 w-full px-4 py-4">
                    <div className="flex flex-col gap-1 justify-between items-start w-full">
                      <p className="font-medium text-xs text-muted-foreground">
                        CARD REF ID
                      </p>
                      <span className="font-medium text-sm"> 32XY32</span>
                    </div>
                    <div className="flex flex-col gap-1 justify-between items-start w-full">
                      <p className="font-medium text-xs text-muted-foreground">
                        CARD NUMBER
                      </p>
                      <span className="font-medium text-sm">
                        {' '}
                        3245 XXXX 1356
                      </span>
                    </div>
                    <div className="flex flex-col gap-1 justify-between items-start w-full">
                      <p className="font-medium text-xs text-muted-foreground">
                        CARD TYPE
                      </p>
                      <span className="font-medium text-sm">
                        {' '}
                        Virtual & Physical
                      </span>
                    </div>
                    <div className="flex flex-col gap-1 justify-between items-start w-full">
                      <p className="font-medium text-xs text-muted-foreground">
                        CARD NATURE
                      </p>
                      <span className="font-medium text-sm"> VISA</span>
                    </div>
                    <div className="flex flex-col mt-6 gap-1 justify-between items-start w-full">
                      <p className="font-medium text-xs text-muted-foreground">
                        PIN TYPE
                      </p>
                      <span className="font-medium text-sm"> Green Pin</span>
                    </div>
                    <div className="mt-6 flex flex-col gap-1 justify-between items-start w-full">
                      <p className="font-medium text-xs text-muted-foreground">
                        CHANNEL
                      </p>
                      <span className="font-medium text-sm"> Web & Mobile</span>
                    </div>
                    <div className="mt-6 flex flex-col gap-1 justify-between items-start w-full">
                      <p className="font-medium text-xs text-muted-foreground">
                        AMOUNT
                      </p>
                      <span className="font-medium text-sm">
                        {' '}
                        &#8377; 10,000
                      </span>
                    </div>
                    <div className="mt-6 flex flex-col gap-1 justify-between items-start w-full">
                      <p className="font-medium text-xs text-muted-foreground">
                        TAGS
                      </p>
                      <div className="flex font-medium text-sm gap-2">
                        {' '}
                        <Badge className="bg-[#eee4f5] text-[#7105ab]">
                          Add On Card
                        </Badge>
                        <Badge className="bg-[#d3e5ff] text-[#051eab]">
                          Physical
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-4 gap-2 w-full px-4 py-4">
                    <div className="flex flex-col gap-1 justify-between items-start w-full">
                      <p className="font-medium text-xs text-muted-foreground">
                        TOTAL SPENDS
                      </p>
                      <span className="font-medium text-sm">
                        {' '}
                        &#8377; 1,00,000
                      </span>
                    </div>
                    <div className="flex flex-col gap-1 justify-between items-start w-full">
                      <p className="font-medium text-xs text-muted-foreground">
                        CARD NUMBER
                      </p>
                      <span className="font-medium text-sm">
                        {' '}
                        3245 XXXX 1356
                      </span>
                    </div>
                    <div className="flex flex-col gap-1 justify-between items-start w-full">
                      <p className="font-medium text-xs text-muted-foreground">
                        CARD TYPE
                      </p>
                      <span className="font-medium text-sm">
                        {' '}
                        Virtual & Physical
                      </span>
                    </div>
                    <div className="flex flex-col gap-1 justify-between items-start w-full">
                      <p className="font-medium text-xs text-muted-foreground">
                        CARD NATURE
                      </p>
                      <span className="font-medium text-sm"> VISA</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <div className=" w-[30%] rounded-md bg-muted/50 border  space-y-2">
            <h2 className="text-md font-medium py-2 px-4">
              Transaction Limitations
            </h2>
            <div className="w-full flex justify-center">
              <Separator className="w-[96%] text-center -mt-2" />
            </div>
            <div className="flex flex-col items-center gap-4 pb-4 pt-4">
              <IndianRupee strokeWidth={1.5} />
              <h2 className="text-sm font-medium text-center">
                No transaction limitation added
              </h2>
              <p className="text-xs font-normal text-muted-foreground text-center">
                You have not added any transaction limitations. Add one below.
              </p>
            </div>
          </div>
          <div className=" w-[70%] rounded-md bg-muted/50 border  space-y-2">
            <h2 className="text-md font-medium py-2 px-4">
              Transaction Limitations
            </h2>
            <div className="w-full flex justify-center">
              <Separator className="w-[96%] text-center -mt-2" />
            </div>
            <div className="flex flex-col items-center gap-4 pb-4 pt-4">
              <IndianRupee strokeWidth={1.5} />
              <h2 className="text-sm font-medium text-center">
                No transaction limitation added
              </h2>
              <p className="text-xs font-normal text-muted-foreground text-center">
                You have not added any transaction limitations. Add one below.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IssuedCardsDetails
