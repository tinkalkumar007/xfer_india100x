import * as React from 'react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

export const description = 'An interactive bar chart'

const chartData = [
  {
    date: '2024-04-01',
    transactions: 222,
    cards: 150,
    Customers: 45,
    products: 12,
  },
  {
    date: '2024-04-02',
    transactions: 97,
    cards: 180,
    Customers: 33,
    products: 8,
  },
  {
    date: '2024-04-03',
    transactions: 167,
    cards: 120,
    Customers: 56,
    products: 24,
  },
  {
    date: '2024-04-04',
    transactions: 242,
    cards: 260,
    Customers: 29,
    products: 14,
  },
  {
    date: '2024-04-05',
    transactions: 373,
    cards: 290,
    Customers: 76,
    products: 22,
  },
  {
    date: '2024-04-06',
    transactions: 301,
    cards: 340,
    Customers: 85,
    products: 31,
  },
  {
    date: '2024-04-07',
    transactions: 245,
    cards: 180,
    Customers: 47,
    products: 19,
  },
  {
    date: '2024-04-08',
    transactions: 409,
    cards: 320,
    Customers: 62,
    products: 27,
  },
  {
    date: '2024-04-09',
    transactions: 59,
    cards: 110,
    Customers: 13,
    products: 7,
  },
  {
    date: '2024-04-10',
    transactions: 261,
    cards: 190,
    Customers: 38,
    products: 16,
  },
  {
    date: '2024-04-11',
    transactions: 327,
    cards: 350,
    Customers: 91,
    products: 25,
  },
  {
    date: '2024-04-12',
    transactions: 292,
    cards: 210,
    Customers: 50,
    products: 20,
  },
  {
    date: '2024-04-13',
    transactions: 342,
    cards: 380,
    Customers: 74,
    products: 30,
  },
  {
    date: '2024-04-14',
    transactions: 137,
    cards: 220,
    Customers: 25,
    products: 11,
  },
  {
    date: '2024-04-15',
    transactions: 120,
    cards: 170,
    Customers: 19,
    products: 9,
  },
  {
    date: '2024-04-16',
    transactions: 138,
    cards: 190,
    Customers: 31,
    products: 13,
  },
  {
    date: '2024-04-17',
    transactions: 446,
    cards: 360,
    Customers: 83,
    products: 35,
  },
  {
    date: '2024-04-18',
    transactions: 364,
    cards: 410,
    Customers: 59,
    products: 28,
  },
  {
    date: '2024-04-19',
    transactions: 243,
    cards: 180,
    Customers: 44,
    products: 18,
  },
  {
    date: '2024-04-20',
    transactions: 89,
    cards: 150,
    Customers: 16,
    products: 6,
  },
  {
    date: '2024-04-21',
    transactions: 137,
    cards: 200,
    Customers: 28,
    products: 12,
  },
  {
    date: '2024-04-22',
    transactions: 224,
    cards: 170,
    Customers: 41,
    products: 15,
  },
  {
    date: '2024-04-23',
    transactions: 138,
    cards: 230,
    Customers: 34,
    products: 11,
  },
  {
    date: '2024-04-24',
    transactions: 387,
    cards: 290,
    Customers: 78,
    products: 29,
  },
  {
    date: '2024-04-25',
    transactions: 215,
    cards: 250,
    Customers: 52,
    products: 23,
  },
  {
    date: '2024-04-26',
    transactions: 75,
    cards: 130,
    Customers: 14,
    products: 9,
  },
  {
    date: '2024-04-27',
    transactions: 383,
    cards: 420,
    Customers: 88,
    products: 32,
  },
  {
    date: '2024-04-28',
    transactions: 122,
    cards: 180,
    Customers: 21,
    products: 10,
  },
  {
    date: '2024-04-29',
    transactions: 315,
    cards: 240,
    Customers: 66,
    products: 26,
  },
  {
    date: '2024-04-30',
    transactions: 454,
    cards: 380,
    Customers: 94,
    products: 38,
  },
  {
    date: '2024-05-01',
    transactions: 165,
    cards: 220,
    Customers: 42,
    products: 17,
  },
  {
    date: '2024-05-02',
    transactions: 293,
    cards: 310,
    Customers: 60,
    products: 22,
  },
  {
    date: '2024-05-03',
    transactions: 247,
    cards: 190,
    Customers: 53,
    products: 19,
  },
  {
    date: '2024-05-04',
    transactions: 385,
    cards: 420,
    Customers: 89,
    products: 33,
  },
  {
    date: '2024-05-05',
    transactions: 481,
    cards: 390,
    Customers: 97,
    products: 36,
  },
  {
    date: '2024-05-06',
    transactions: 498,
    cards: 520,
    Customers: 100,
    products: 40,
  },
  {
    date: '2024-05-07',
    transactions: 388,
    cards: 300,
    Customers: 84,
    products: 31,
  },
  {
    date: '2024-05-08',
    transactions: 149,
    cards: 210,
    Customers: 39,
    products: 14,
  },
  {
    date: '2024-05-09',
    transactions: 227,
    cards: 180,
    Customers: 48,
    products: 20,
  },
  {
    date: '2024-05-10',
    transactions: 293,
    cards: 330,
    Customers: 77,
    products: 28,
  },
  {
    date: '2024-05-11',
    transactions: 335,
    cards: 270,
    Customers: 63,
    products: 23,
  },
  {
    date: '2024-05-12',
    transactions: 197,
    cards: 240,
    Customers: 46,
    products: 18,
  },
  {
    date: '2024-05-13',
    transactions: 197,
    cards: 160,
    Customers: 35,
    products: 15,
  },
  {
    date: '2024-05-14',
    transactions: 448,
    cards: 490,
    Customers: 92,
    products: 37,
  },
  {
    date: '2024-05-15',
    transactions: 473,
    cards: 380,
    Customers: 95,
    products: 34,
  },
  {
    date: '2024-05-16',
    transactions: 338,
    cards: 400,
    Customers: 71,
    products: 29,
  },
  {
    date: '2024-05-17',
    transactions: 499,
    cards: 420,
    Customers: 99,
    products: 41,
  },
  {
    date: '2024-05-18',
    transactions: 315,
    cards: 350,
    Customers: 66,
    products: 24,
  },
  {
    date: '2024-05-19',
    transactions: 235,
    cards: 180,
    Customers: 44,
    products: 16,
  },
  {
    date: '2024-05-20',
    transactions: 177,
    cards: 230,
    Customers: 38,
    products: 13,
  },
  {
    date: '2024-05-21',
    transactions: 82,
    cards: 140,
    Customers: 22,
    products: 8,
  },
  {
    date: '2024-05-22',
    transactions: 81,
    cards: 120,
    Customers: 19,
    products: 7,
  },
  {
    date: '2024-05-23',
    transactions: 252,
    cards: 290,
    Customers: 65,
    products: 28,
  },
  {
    date: '2024-05-24',
    transactions: 294,
    cards: 220,
    Customers: 58,
    products: 21,
  },
  {
    date: '2024-05-25',
    transactions: 201,
    cards: 250,
    Customers: 51,
    products: 22,
  },
  {
    date: '2024-05-26',
    transactions: 213,
    cards: 170,
    Customers: 43,
    products: 17,
  },
  {
    date: '2024-05-27',
    transactions: 420,
    cards: 460,
    Customers: 89,
    products: 36,
  },
  {
    date: '2024-05-28',
    transactions: 233,
    cards: 190,
    Customers: 49,
    products: 19,
  },
  {
    date: '2024-05-29',
    transactions: 78,
    cards: 130,
    Customers: 15,
    products: 9,
  },
  {
    date: '2024-05-30',
    transactions: 340,
    cards: 280,
    Customers: 72,
    products: 27,
  },
  {
    date: '2024-05-31',
    transactions: 178,
    cards: 230,
    Customers: 40,
    products: 18,
  },
  {
    date: '2024-06-01',
    transactions: 178,
    cards: 200,
    Customers: 39,
    products: 15,
  },
  {
    date: '2024-06-02',
    transactions: 470,
    cards: 410,
    Customers: 93,
    products: 37,
  },
  {
    date: '2024-06-03',
    transactions: 103,
    cards: 160,
    Customers: 26,
    products: 10,
  },
  {
    date: '2024-06-04',
    transactions: 439,
    cards: 380,
    Customers: 87,
    products: 35,
  },
  {
    date: '2024-06-05',
    transactions: 88,
    cards: 140,
    Customers: 18,
    products: 8,
  },
  {
    date: '2024-06-06',
    transactions: 294,
    cards: 250,
    Customers: 56,
    products: 22,
  },
  {
    date: '2024-06-07',
    transactions: 323,
    cards: 370,
    Customers: 81,
    products: 28,
  },
  {
    date: '2024-06-08',
    transactions: 385,
    cards: 320,
    Customers: 86,
    products: 30,
  },
  {
    date: '2024-06-09',
    transactions: 438,
    cards: 480,
    Customers: 98,
    products: 39,
  },
  {
    date: '2024-06-10',
    transactions: 155,
    cards: 200,
    Customers: 36,
    products: 13,
  },
  {
    date: '2024-06-11',
    transactions: 92,
    cards: 150,
    Customers: 20,
    products: 9,
  },
  {
    date: '2024-06-12',
    transactions: 492,
    cards: 420,
    Customers: 100,
    products: 41,
  },
]

const chartConfig = {
  views: {
    label: 'Page Views',
  },
  transactions: {
    label: 'Transactions',
    color: 'hsl(var(--chart-1))',
  },
  cards: {
    label: 'Cards',
    color: 'hsl(var(--chart-2))',
  },
  Customers: {
    label: 'Customers',
    color: 'hsl(var(--chart-3))',
  },
  products: {
    label: 'Products',
    color: 'hsl(var(--chart-4))',
  },
}

export function DashboardFullChart() {
  const [activeChart, setActiveChart] = React.useState('transactions')

  const total = React.useMemo(
    () => ({
      transactions: chartData.reduce((acc, curr) => acc + curr.transactions, 0),
      cards: chartData.reduce((acc, curr) => acc + curr.cards, 0),
      Customers: chartData.reduce((acc, curr) => acc + curr.Customers, 0),
      products: chartData.reduce((acc, curr) => acc + curr.products, 0),
    }),
    []
  )

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Total Transactions & Cards</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
        <div className="flex max-lg:grid max-lg:grid-cols-2">
          {['transactions', 'cards', 'Customers', 'products'].map((key) => {
            const chart = key
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
