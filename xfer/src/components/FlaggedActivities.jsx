import React from 'react'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

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

const activities = [
  {
    id: 1,
    type: 'Large Transaction',
    description: 'Unusual transaction amount detected',
    severity: 'High',
    date: '2024-03-10',
  },
  {
    id: 2,
    type: 'Login Attempt',
    description: 'Multiple failed login attempts',
    severity: 'Medium',
    date: '2024-03-09',
  },
  {
    id: 3,
    type: 'Card Purchase',
    description: 'Card purchased with suspicious amount',
    severity: 'Low',
    date: '2024-03-08',
  },
]

const FlaggedActivities = ({ customerDetailsLoading, customerDetails }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="relative flex justify-end px-6 py-4 cursor-pointer">
          <AlertTriangle color="red" />
          <div className="rounded-full p-[0.6rem] h-[0.2rem] w-[0.2rem] text-mu bg-muted-foreground absolute right-3 top-1 text-xs text-muted/90 flex justify-center items-center">
            20
          </div>
        </div>
      </SheetTrigger>
      <SheetContent className="max-w-sm w-[24rem] md:max-w-md md:w-[28rem] lg:max-w-lg lg:w-[36rem]">
        <SheetHeader>
          <div className="flex gap-2 items-center">
            <SheetTitle>Flagged Activities</SheetTitle>
            <AlertTriangle className="text-[#B52A2A] w-6 h-6" />
          </div>
          <SheetDescription>
            Customer has 3 flagged activites, resolve them immediately!
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="w-full flex flex-col gap-2">
            <div className="bg-white rounded-lg shadow">
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div
                    key={activity.id}
                    className={`border border-gray-700 rounded-md bg-muted/50 p-4 flex justify-between items-center`}
                  >
                    <div>
                      <div className="flex gap-3">
                        <h3 className={`text-sm font-medium`}>
                          {activity.type}
                        </h3>
                        <Badge
                          className={`px-2.5 py-0.5 text-xs font-medium ${
                            activity.severity === 'High' &&
                            'bg-[#FFF0F0] text-[#B52A2A]'
                          } ${
                            activity.severity === 'Medium' &&
                            'bg-[#FFF1E7] text-[#BD3E0C]'
                          } ${
                            activity.severity === 'Low' &&
                            'bg-[#F5FBFC] text-[#267A94]'
                          }`}
                        >
                          {activity.severity}
                        </Badge>
                      </div>
                      <p className={`mt-1 text-sm`}>{activity.description}</p>
                      <p className={`mt-2 text-xs`}>{activity.date}</p>
                    </div>
                    <div>
                      <Button variant="outline" className="">
                        Resolve
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default FlaggedActivities
