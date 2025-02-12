import { Input } from '@/components/ui/input'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { debounce } from 'lodash'

const DataTableToolbar = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get('query') || ''

  const updateSearchParams = debounce((newQuery) => {
    const newParams = new URLSearchParams(searchParams)

    if (newQuery === '') {
      newParams.delete('query')
    }

    newParams.set('query', newQuery)
    newParams.set('page', '0') // Reset to first page

    setSearchParams(newParams)
  }, 300)

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex flex-1 items-center gap-2 w-full max-md:flex-col max-md:items-start">
        <Input
          placeholder="Search by Name..."
          defaultValue={searchQuery}
          onChange={(event) => updateSearchParams(event.target.value)}
          className="h-8 flex-1"
        />
      </div>
    </div>
  )
}

export default DataTableToolbar
