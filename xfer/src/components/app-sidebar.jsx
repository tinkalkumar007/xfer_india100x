import { Link, NavLink, useLocation } from 'react-router-dom'
import { Layers } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

import { NavUser } from '@/components/nav-user'
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
  ChevronRight,
  LayoutDashboard,
  Monitor,
  ClipboardList,
  Users,
  Box,
  CreditCard,
  UserCheck,
  Flag,
  FileText,
  Landmark,
  DollarSign,
  UserCog,
  Activity,
  ShieldAlert,
  Settings,
  Key,
} from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { useFrappeGetDocList, useFrappeGetDocCount } from 'frappe-react-sdk'
import { useMemo } from 'react'

export function AppSidebar({ ...props }) {
  const location = useLocation()
  const { toggle } = useSidebar()

  const handleItemClick = () => {
    if (window.innerWidth <= 768) {
      // Only toggle on mobile screen
      toggle()
    }
  }

  const { data: programCount, isLoading: programCountLoading } =
    useFrappeGetDocCount('Program')

  const { data: inventoryCount, isLoading: inventoryCountLoading } =
    useFrappeGetDocCount('Inventory')

  const { data: cardCount, isLoading: cardCountLoading } =
    useFrappeGetDocCount('Cards')

  const { data: customerCount, isLoading: customerCountLoading } =
    useFrappeGetDocCount('Customers')

  const { data: poolAccountCount, isLoading: poolAccountCountLoading } =
    useFrappeGetDocCount('Pool Account')

  const {
    data: fundingTransactionCount,
    isLoading: fundingTransactionCountLoading,
  } = useFrappeGetDocCount('Funding Transactions')

  const { data: activityLogCount, isLoading: activityLogCountLoading } =
    useFrappeGetDocCount('Activity Log')

  const sidebarData = {
    overview: [
      {
        title: 'BUSINESS DASHBOARD',
        url: '/business-dashboard',
        icon: LayoutDashboard,
        count: null,
      },
      {
        title: 'SYSTEM DASHBOARD',
        url: '/system-dashboard',
        icon: Monitor,
        count: null,
      },
    ],
    program_management: [
      {
        title: 'PROGRAMS',
        url: '/programs',
        icon: ClipboardList,
        count: programCountLoading ? null : programCount || 0,
      },
    ],
    card_management: [
      {
        title: 'INVENTORY',
        url: '/inventory',
        icon: Box,
        count: inventoryCountLoading ? null : inventoryCount || 0,
      },
      {
        title: 'ISSUED CARDS',
        url: '/issued-cards',
        icon: CreditCard,
        count: cardCountLoading ? null : cardCount || 0,
      },
    ],
    customers: [
      {
        title: 'ALL CUSTOMERS',
        url: '/all-customers',
        icon: UserCheck,
        count: customerCount,
      },
      {
        title: 'FLAGGED CUSTOMERS',
        url: '/flagged-customers',
        icon: Flag,
        count: customerCount,
      },
      {
        title: 'PENDING KYC CUSTOMERS',
        url: '/pending-kyc-customers',
        icon: FileText,
        count: customerCount,
      },
    ],
    fund_management: [
      {
        title: 'POOL ACCOUNTS',
        url: '/pool-accounts',
        icon: Landmark,
        count: poolAccountCountLoading ? null : poolAccountCount || 0,
      },
      {
        title: 'FUNDING TRANSACTIONS',
        url: '/funding-transactions',
        icon: DollarSign,
        count: fundingTransactionCountLoading
          ? null
          : fundingTransactionCount || 0,
      },
    ],
    user_management: [
      {
        title: 'User Activity Logs',
        url: '/user-activity-logs',
        icon: Activity,
        count: activityLogCountLoading ? null : activityLogCount || 0,
      },
    ],
  }

  return (
    <Sidebar collapsible="icon" variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild onClick={handleItemClick}>
              <Link to="/business-dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Layers className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">XFER</span>
                  <span className="truncate text-xs">ISSUANCE SWITCH</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarMenu>
            {sidebarData?.overview?.map((item) => (
              <Collapsible key={item.title} asChild>
                <SidebarMenuItem>
                  <div className="relative">
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      isActive={location.pathname === item.url}
                      onClick={handleItemClick}
                    >
                      <NavLink to={item.url}>
                        <item.icon />
                        <div className="relative">
                          <span>{item.title}</span>
                          {item.count && (
                            <Badge
                              className="absolute -top-0 -right-7 bg-muted/50 rounded-full px-2 py-0.5 text-xs font-medium"
                              variant="primary"
                            >
                              {item.count}
                            </Badge>
                          )}
                        </div>
                      </NavLink>
                    </SidebarMenuButton>
                  </div>

                  {item.items?.length ? (
                    <>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuAction className="data-[state=open]:rotate-90">
                          <ChevronRight />
                          <span className="sr-only">Toggle</span>
                        </SidebarMenuAction>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items?.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <NavLink to={subItem.url}>
                                  <span>{subItem.title}</span>
                                </NavLink>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Program Management</SidebarGroupLabel>
          <SidebarMenu>
            {sidebarData?.program_management
              // Filter logic
              ?.map((item) => (
                <Collapsible key={item.title} asChild>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      isActive={location.pathname === item.url}
                      onClick={handleItemClick}
                    >
                      <NavLink to={item.url}>
                        <div className="relative">
                          <span>{item.title}</span>
                          {item.count ? (
                            <Badge
                              className="absolute -top-0 -right-7 bg-muted/50 rounded-full px-2 py-0.5 text-xs font-medium"
                              variant="primary"
                            >
                              {item.count}
                            </Badge>
                          ) : null}
                        </div>
                      </NavLink>
                    </SidebarMenuButton>
                    {item.items?.length ? (
                      <>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuAction className="data-[state=open]:rotate-90">
                            <ChevronRight />
                            <span className="sr-only">Toggle</span>
                          </SidebarMenuAction>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items?.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton asChild>
                                  <NavLink to={subItem.url}>
                                    <span>{subItem.title}</span>
                                  </NavLink>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </>
                    ) : null}
                  </SidebarMenuItem>
                </Collapsible>
              ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Card Management</SidebarGroupLabel>
          <SidebarMenu>
            {sidebarData?.card_management?.map((item) => (
              <Collapsible key={item.title} asChild>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={location.pathname === item.url}
                    onClick={handleItemClick}
                  >
                    <NavLink to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                  {item.items?.length ? (
                    <>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuAction className="data-[state=open]:rotate-90">
                          <ChevronRight />
                          <span className="sr-only">Toggle</span>
                        </SidebarMenuAction>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items?.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <NavLink to={subItem.url}>
                                  <span>{subItem.title}</span>
                                </NavLink>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Customers</SidebarGroupLabel>
          <SidebarMenu>
            {sidebarData?.customers?.map((item) => (
              <Collapsible key={item.title} asChild>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={location.pathname === item.url}
                    onClick={handleItemClick}
                  >
                    <NavLink to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                  {item.items?.length ? (
                    <>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuAction className="data-[state=open]:rotate-90">
                          <ChevronRight />
                          <span className="sr-only">Toggle</span>
                        </SidebarMenuAction>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items?.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <NavLink to={subItem.url}>
                                  <span>{subItem.title}</span>
                                </NavLink>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Fund Management</SidebarGroupLabel>
          <SidebarMenu>
            {sidebarData?.fund_management?.map((item) => (
              <Collapsible key={item.title} asChild>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={location.pathname === item.url}
                    onClick={handleItemClick}
                  >
                    <NavLink to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                  {item.items?.length ? (
                    <>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuAction className="data-[state=open]:rotate-90">
                          <ChevronRight />
                          <span className="sr-only">Toggle</span>
                        </SidebarMenuAction>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items?.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <NavLink to={subItem.url}>
                                  <span>{subItem.title}</span>
                                </NavLink>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>User Management</SidebarGroupLabel>
          <SidebarMenu>
            {sidebarData?.user_management?.map((item) => (
              <Collapsible key={item.title} asChild>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={location.pathname === item.url}
                    onClick={handleItemClick}
                  >
                    <NavLink to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                  {item.items?.length ? (
                    <>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuAction className="data-[state=open]:rotate-90">
                          <ChevronRight />
                          <span className="sr-only">Toggle</span>
                        </SidebarMenuAction>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items?.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <NavLink to={subItem.url}>
                                  <span>{subItem.title}</span>
                                </NavLink>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
