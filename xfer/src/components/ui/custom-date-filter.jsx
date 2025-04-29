import { CalendarIcon, X } from 'lucide-react'

import { Button } from '@/components/ui/custom-button'
import {
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  CalendarHeading,
  RangeCalendar,
} from '@/components/ui/custom-calendar'
import {
  DatePickerContent,
  DateRangePicker,
} from '@/components/ui/custom-date-range-picker'
import { DateInput } from '@/components/ui/custom-datefield'
import { FieldGroup, Label } from '@/components/ui/custom-field'
import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'

export function DateRangePickerDemo() {
  const [searchParams, setSearchParams] = useSearchParams()

  // Helper function to parse date string from URL
  const parseDate = (dateString) => {
    if (!dateString) return null
    const date = new Date(dateString)
    return date
  }
  // Helper function to format date for URL
  const formatDate = (date) => {
    if (!date) return null
    return date.toString()
  }

  // Initialize date range from URL parameters
  const [dateRange, setDateRange] = useState({
    start: parseDate(searchParams.get('start')) || null,
    end: parseDate(searchParams.get('end')) || null,
  })

  // Handle date range change
  const handleDateRangeChange = (newRange) => {
    setDateRange(newRange)

    // Update URL parameters when both dates are selected
    if (newRange?.start && newRange?.end) {
      const updatedParams = new URLSearchParams(searchParams)
      updatedParams.set('start', formatDate(newRange?.start))
      updatedParams.set('end', formatDate(newRange?.end))
      updatedParams.set('page', '0') // Reset to first page when filter changes
      setSearchParams(updatedParams)
    }
  }

  // Handle reset
  const handleReset = () => {
    setDateRange({ start: null, end: null })
    const updatedParams = new URLSearchParams(searchParams)
    updatedParams.delete('start')
    updatedParams.delete('end')
    updatedParams.set('page', '0')
    setSearchParams(updatedParams)
  }
  return (
    <div className="flex gap-2 items-center">
      <DateRangePicker
        className="min-w-[320px] space-y-1 "
        value={dateRange}
        onChange={handleDateRangeChange}
        id="date-range"
      >
        <FieldGroup>
          <DateInput
            variant="ghost"
            slot="start"
            value={dateRange?.start}
            onChange={(date) =>
              handleDateRangeChange({ ...dateRange, start: date })
            }
          />
          <span aria-hidden className="px-2 text-sm text-muted-foreground">
            -
          </span>
          <DateInput
            className="flex-1"
            variant="ghost"
            slot="end"
            value={dateRange?.end}
            onChange={(date) =>
              handleDateRangeChange({ ...dateRange, end: date })
            }
          />

          <Button
            variant="ghost"
            size="icon"
            className="mr-1 size-4 data-[focus-visible]:ring-offset-0"
          >
            <CalendarIcon aria-hidden className="size-4" />
          </Button>
        </FieldGroup>
        <DatePickerContent>
          <RangeCalendar value={dateRange} onChange={handleDateRangeChange}>
            <CalendarHeading />
            <CalendarGrid>
              <CalendarGridHeader>
                {(day) => <CalendarHeaderCell>{day}</CalendarHeaderCell>}
              </CalendarGridHeader>
              <CalendarGridBody>
                {(date) => <CalendarCell date={date} />}
              </CalendarGridBody>
            </CalendarGrid>
          </RangeCalendar>
        </DatePickerContent>
      </DateRangePicker>
      {(dateRange?.start || dateRange?.end) && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleReset}
          className="h-8 w-8 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
