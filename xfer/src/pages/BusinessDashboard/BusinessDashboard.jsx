import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'

import { Users, CreditCard, Layers, Activity } from 'lucide-react'
import { ProgramIssuedChart } from '../../components/dashboard-programs-issued-chart'
import { ProgramsDistributionChart } from '../../components/dashboard-programs-distribution-chart'
import { DashboardFullChart } from '@/components/DashboardFullChart.jsx'

const cardsData = [
  {
    title: '3',
    description: 'Programs Manager',
    icon: <Layers className="h-5 w-5 text-muted-foreground" />,
  },
  {
    title: '213',
    description: 'Cards',
    icon: <CreditCard className="h-5 w-5 text-muted-foreground" />,
  },
  {
    title: '215',
    description: 'Customers',
    icon: <Users className="h-5 w-5 text-muted-foreground" />,
  },
  {
    title: '3000',
    description: 'Transactions',
    icon: <Activity className="h-5 w-5 text-muted-foreground" />,
  },
  // {
  //   title: '3000',
  //   description: 'Transactions',
  //   icon: <Activity className="h-5 w-5 text-muted-foreground" />,
  // },
]

const BusinessDashboard = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 xl:grid-cols-1 gap-4">
        <DashboardFullChart />
      </div>
      <div className="grid auto-rows-min gap-4 grid-cols-2 xl:grid-cols-4">
        {cardsData.map((card, index) => (
          <div key={index}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center gap-2">
                  {card.icon}
                  <CardTitle className="text-sm font-medium">
                    {card.description}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.title}</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <ProgramIssuedChart className="aspect-video rounded-xl bg-muted/50" />
        <ProgramsDistributionChart className="aspect-video rounded-xl bg-muted/50" />
      </div>
    </div>
  )
}

export default BusinessDashboard
