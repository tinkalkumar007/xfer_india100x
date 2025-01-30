import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar'

import { Button } from '@/components/ui/button'

import { Separator } from '@/components/ui/separator'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Outlet, useLocation } from 'react-router-dom'

import { AppSidebar } from './app-sidebar'
import { ModeToggle } from './mode-toggle'

const sidebarData = [
  {
    items: [{ url: '/business-dashboard' }, { url: '/system-dashboard' }],
  },
  {
    items: [{ url: '/programs' }, { url: '/program-managers' }],
  },
  {
    items: [{ url: '/inventory' }, { url: '/issued-cards' }],
  },
  {
    items: [
      { url: '/all-customers' },
      { url: '/flagged-customers' },
      { url: '/pending-for-kyc' },
    ],
  },
  {
    items: [{ url: '/pool-accounts' }, { url: '/funding-transactions' }],
  },
  {
    items: [{ url: '/system-users' }, { url: '/user-activity-logs' }],
  },
  {
    items: [
      { url: '/security-settings' },
      { url: '/api-settings' },
      { url: '/default-configs' },
    ],
  },
  {
    items: [
      { url: '/account/profile' },
      { url: '/account/appearance' },
      { url: '/account/notifications' },
      { url: '/account/security' },
      { url: '/developer/api-keys' },
      { url: '/developer/webhooks' },
      { url: '/developer/ip-whitelisting' },
      { url: '/team/users' },
      { url: '/team/logs' },
    ],
  },
]
const flattenSidebarData = (data) => {
  const flattened = []
  data.forEach((group) => {
    group.items.forEach((item) => {
      flattened.push(item)
    })
  })
  return flattened
}

const toPascalCaseWithSpaces = (str) => {
  return str
    .replace(/([^\w-])/g, ' ') // Replace non-alphanumeric characters with spaces
    .split('-') // Split by dash
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
    .join(' ') // Join words with spaces
}

// Generate breadcrumbs

const Layout = () => {
  const location = useLocation()
  const flattenedSidebarData = flattenSidebarData(sidebarData)

  // Generate breadcrumbs
  const breadcrumbs = location.pathname
    .split('/')
    .filter(Boolean) // Remove empty strings
    .map((segment, index, arr) => {
      const url = '/' + arr.slice(0, index + 1).join('/')
      const matchedItem = flattenedSidebarData.find((item) => item.url === url)
      if (matchedItem) {
        return {
          title: toPascalCaseWithSpaces(matchedItem.url.split('/').pop()),
        } // Convert to Pascal case with spaces
      }
      return { title: toPascalCaseWithSpaces(segment) } // Convert to Pascal case with spaces
    })

  const [isVisible, setIsVisible] = useState(false)

  // Function to handle scroll behavior
  const handleScroll = () => {
    setIsVisible(window.scrollY > 0)
  }

  // Scroll to top functionality
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex sticky top-0 left-0 z-[20] bg-background rounded-t-lg right-0 h-16 shrink-0 items-center gap-2 justify-between">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            {/* <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((crumb, index) => (
                  <BreadcrumbItem key={index}>
                    {crumb.title}
                    {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                  </BreadcrumbItem>
                ))}
              </BreadcrumbList>
            </Breadcrumb> */}
          </div>
          <div className="mr-4">
            <ModeToggle />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 relative z-[1]">
          <Outlet />
        </div>
        <footer className="relative">
          {isVisible && (
            <div
              onClick={scrollToTop}
              className="rounded-full z-[999] fixed bottom-6 right-6 border p-2 cursor-po"
            >
              <ArrowUp />
            </div>
          )}
        </footer>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default Layout
