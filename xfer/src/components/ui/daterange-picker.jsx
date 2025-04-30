import * as React from 'react'
import { addDays, format, getYear, getMonth, setMonth, setYear } from 'date-fns'
import { Calendar as CalendarIcon, Check, CrossIcon, X } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar } from '@/components/ui/calendar'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useSearchParams } from 'react-router-dom'
import { update } from 'lodash'

export function DatePickerWithRange({
  startYear = getYear(new Date()) - 100,
  endYear = getYear(new Date()),
  className,
}) {
  const [searchParams, setSearchParams] = useSearchParams()

  const [date, setDate] = React.useState(() => {
    const start = searchParams.get('start')
    const end = searchParams.get('end')

    if (start && end) {
      return {
        from: new Date(start),
        to: new Date(end),
      }
    }

    return {
      from: undefined,
      to: undefined,
    }
  })

  const [open, setOpen] = React.useState(false)

  const [currentMonth, setCurrentMonth] = React.useState(new Date())

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i
  ).reverse()

  const handleMonthChange = (month) => {
    const newDate = setMonth(currentMonth, months.indexOf(month))
    setCurrentMonth(newDate)
  }

  const handleYearChange = (year) => {
    const newDate = setYear(currentMonth, parseInt(year))
    setCurrentMonth(newDate)
  }

  const resetDate = () => {
    setDate({
      from: undefined,
      to: undefined,
    })
    const updatedParams = new URLSearchParams(searchParams)
    updatedParams.delete('start')
    updatedParams.delete('end')
    setSearchParams(updatedParams)
    setCurrentMonth(new Date())
  }

  const applyFilters = () => {
    // Create new URLSearchParams object from current params
    const updatedParams = new URLSearchParams(searchParams)

    // Update date parameters
    if (date.from && date.to) {
      updatedParams.set('start', format(date.from, 'yyyy-MM-dd'))
      updatedParams.set('end', format(date.to, 'yyyy-MM-dd'))
      updatedParams.delete('page')
      setSearchParams(updatedParams)
      setOpen(false)
    }

    // Update URL with new parameters

    // Close the popover

    // Call the callback if provided
  }

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              'w-full justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <div className="flex items-center gap-3">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, 'LLL dd, y')} -{' '}
                    {format(date.to, 'LLL dd, y')}
                  </>
                ) : (
                  format(date.from, 'LLL dd, y')
                )
              ) : (
                <span>Pick a date range</span>
              )}
              {date?.from && (
                <Button
                  variant="ghost"
                  className="ml-auto h-6 w-6 p-0"
                  onClick={(e) => {
                    e.stopPropagation()
                    resetDate()
                  }}
                >
                  <X className="h-5 w-5" strokeWidth={3} />
                </Button>
              )}
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex justify-between p-2">
            <Select
              onValueChange={handleMonthChange}
              value={months[getMonth(currentMonth)]}
            >
              <SelectTrigger className="w-[110px]">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                {months.map((month) => (
                  <SelectItem key={month} value={month}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              onValueChange={handleYearChange}
              value={getYear(currentMonth).toString()}
            >
              <SelectTrigger className="w-[110px]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Calendar
            mode="range"
            selected={date}
            onSelect={setDate}
            month={currentMonth}
            onMonthChange={setCurrentMonth}
            initialFocus
          />
          <div className="flex items-center justify-between gap-4 p-2 border-t">
            <Button
              variant="outline"
              className="h-8"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button className="h-8" onClick={applyFilters}>
              <Check className="mr-2 h-4 w-4" />
              Apply Filters
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
