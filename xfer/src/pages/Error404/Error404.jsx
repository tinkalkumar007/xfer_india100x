import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

const Error404 = () => {
  const navigate = useNavigate()
  return (
    <div className="flex items-center min-h-screen px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="w-full space-y-6 text-center">
        <div className="space-y-3 select-none">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            404 Page Not Found
          </h1>
          <p className="text-gray-500">
            Sorry, we couldn&#x27;t find the page you&#x27;re looking for.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => {
            navigate(-1)
          }}
          className="select-none inline-flex h-10 items-center rounded-md shadow-sm px-8 text-sm font-medium transition-colors"
        >
          Return to website
        </Button>
      </div>
    </div>
  )
}

export default Error404
