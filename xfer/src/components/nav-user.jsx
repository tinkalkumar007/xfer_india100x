import {
  SettingsIcon,
  ArrowRight,
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
  LockKeyhole,
  CodeXml,
  FileSliders,
  CircleUser,
  Users,
} from 'lucide-react'

import { Link, Navigate, useNavigate } from 'react-router-dom'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { useFrappeAuth, useFrappeGetDoc } from 'frappe-react-sdk'

export function NavUser({ user }) {
  const { data, isLoading } = useFrappeGetDoc('User', 'administrator')

  console.log(!isLoading && data)
  const navigate = useNavigate()
  const { logout } = useFrappeAuth()

  const { isMobile } = useSidebar()
  const { closeSidebar } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-full">
                <AvatarImage src={data?.user_image} alt="@shadcn" />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{data?.name}</span>
                <span className="truncate text-xs">{data?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-full">
                  <AvatarImage src={data?.user_image} alt="@shadcn" />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{data?.name}</span>
                  <span className="truncate text-xs">{data?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="cursor-pointer">
              <Link
                to="/account"
                onClick={() => {
                  closeSidebar()
                }}
              >
                <DropdownMenuItem>
                  <CircleUser />
                  Account
                </DropdownMenuItem>
              </Link>
            </div>
            <div className="cursor-pointer">
              <Link
                to="/developer"
                onClick={() => {
                  closeSidebar()
                }}
              >
                <DropdownMenuItem>
                  <CodeXml />
                  Developer
                </DropdownMenuItem>
              </Link>
            </div>
            <div className="cursor-pointer">
              <Link
                to="/team"
                onClick={() => {
                  closeSidebar()
                }}
              >
                <DropdownMenuItem>
                  <Users />
                  Team
                </DropdownMenuItem>
              </Link>
            </div>

            <DropdownMenuSeparator />
            <div>
              <DropdownMenuItem
                className="text-[#b52a2a] cursor-pointer"
                onClick={() => {
                  logout()
                }}
              >
                <LogOut />
                Log out
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
