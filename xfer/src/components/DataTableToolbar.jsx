import { X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { tags, priorities } from './programData'

import DataTableFacetedFilter from '@/components/DataTableFacetedFilter'
import DataTableViewOptions from '@/components/DataTableViewOptions'

const DataTableToolbar = ({ table, inputFilter, ...filtersObject }) => {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex flex-1 items-center gap-2 w-full max-md:flex-col max-md:items-start">
        {inputFilter && (
          <div className="w-[50%] max-md:w-[100%]">
            <Input
              placeholder="Search by Name..."
              value={table.getColumn(inputFilter)?.getFilterValue() ?? ''}
              onChange={(event) =>
                table.getColumn(inputFilter)?.setFilterValue(event.target.value)
              }
              className="h-8 flex-1"
            />
          </div>
        )}

        <div className="flex items-center gap-2">
          {Object.entries(filtersObject).map(([key, options]) => {
            const updatedKey = key
              .split('_') // Split the string by underscore
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each part
              .join(' ')

            return (
              <DataTableFacetedFilter
                key={key} // Unique key for React
                column={table.getColumn(key)} // Get the column based on the key
                title={updatedKey} // Set the title to the key (e.g., "status", "card_nature")
                options={options} // Pass the options (array of objects)
              />
            )
          })}
        </div>

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
    </div>
  )
}

export default DataTableToolbar
