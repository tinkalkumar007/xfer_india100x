import { Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './components/theme-provider'
import { setAccessToken } from './api/axios'
import Layout from './components/Layout'
import BusinessDashboard from './pages/BusinessDashboard/BusinessDashboard'
import SystemDashboard from './pages/SystemDashboard/SystemDashboard'
import Error404 from './pages/Error404/Error404'
import Programs from './pages/Programs/Programs'
import ProgramManagers from './pages/ProgramManagers/ProgramManagers'
import Inventory from './pages/Inventory/Inventory'

import IssuedCards from './pages/IssuedCards/IssuedCards'
import AllCustomers from './pages/AllCustomers/AllCustomers'
import FlaggedCustomers from './pages/FlaggedCustomers/FlaggedCustomers'
import PendingKyc from './pages/PendingKyc/PendingKyc'
import PoolAccounts from './pages/PoolAccounts/PoolAccounts'
import FundingTransactions from './pages/FundingTransactions/FundingTransactions'
import SystemUsers from './pages/SystemUsers/SystemUsers'
import UserActivityLogs from './pages/UserActivityLogs/UserActivityLogs'
import CreateProgram from './pages/CreateProgram/CreateProgram'
import Profile from '@/pages/AccountProfile/Profile'
import Security from '@/pages/AccountSecurity/Security'
import Appearance from '@/pages/AccountAppearance/Appearance'
import ProgramManagerDetails from './pages/ProgramManagerDetails/ProgramManagerDetails'
import Notifications from '@/pages/AccountNotifications/Notifications'
import OrderDetails from './pages/OrderDetails/OrderDetails'
import ApiKeys from '@/pages/DeveloperApiKeys/ApiKeys'
import Webhooks from '@/pages/DeveloperWebhooks/Webhooks'
import IpWhitelisting from '@/pages/DeveloperIpWhitelisting/IpWhitelisting'
import Users from '@/pages/TeamUsers/Users'
import Logs from '@/pages/TeamLogs/Logs'
import Login from '@/pages/Login/Login'
import UserProfileLayout from './components/UserProfileLayout'
import ApiLogs from './pages/DeveloperApiLogs/ApiLogs'
import CreateOrder from './pages/CreateOrder/CreateOrder'
import ProgramDetails from '@/pages/ProgramDetails/ProgramDetails'
import IssuedCardsDetails from './pages/IssuedCardsDetails/IssuedCardsDetails'
import CustomerDetails from './pages/CustomerDetails/CustomerDetails'
import { Toaster } from '@/components/ui/toaster'
import ProtectedRoute from '@/components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
import TestDoc from './components/TestDoc'
import { FrappeProvider } from 'frappe-react-sdk'
import { ProgramTableDemo } from './components/program-table'
import { InventoryTable } from './components/inventory-table'
import { IssuedCardsTable } from './components/issued-cards-table'
import { AllCustomerTable } from './components/Allcustomer-table'
import { FlaggedCustomerTable } from './components/Flaggedcustomer-table'
import { PendingKycTable } from './components/PendingKyc-table'
import { PoolAccountsTable } from './components/PoolAccount-table'
import { FundingTransactionTable } from './components/FundingTransaction-table'
import { ActivityLogsTable } from './components/user-activity-logs-table'
function App() {
  const getSiteName = () => {
    // @ts-ignore
    if (
      window.frappe?.boot?.versions?.frappe &&
      (window.frappe.boot.versions.frappe.startsWith('15') ||
        window.frappe.boot.versions.frappe.startsWith('16'))
    ) {
      // @ts-ignore
      return window.frappe?.boot?.sitename ?? import.meta.env.VITE_SITE_NAME
    }
    return import.meta.env.VITE_SITE_NAME
  }
  return (
    <ThemeProvider storageKey="vite-ui-theme">
      <FrappeProvider
        socketPort={import.meta.env.VITE_SOCKET_PORT}
        siteName={getSiteName()}
      >
        <Toaster />
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path={`/`} element={<Login />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route
                path="/business-dashboard"
                element={<BusinessDashboard />}
              />
              <Route path="/test-doc" element={<TestDoc />} />
              <Route path="/system-dashboard" element={<SystemDashboard />} />
              <Route path="/programs" element={<ProgramTableDemo />} />
              <Route path="/programs/:id" element={<ProgramDetails />} />
              <Route path="/inventory" element={<InventoryTable />} />
              <Route path="/inventory/:id" element={<OrderDetails />} />
              <Route path="/issued-cards" element={<IssuedCardsTable />} />
              <Route
                path="/issued-cards/:id"
                element={<IssuedCardsDetails />}
              />
              <Route path="/all-customers" element={<AllCustomerTable />} />
              <Route path="/customers/:id" element={<CustomerDetails />} />

              <Route
                path="/flagged-customers"
                element={<FlaggedCustomerTable />}
              />
              <Route
                path="/pending-kyc-customers"
                element={<PendingKycTable />}
              />
              <Route path="/pool-accounts" element={<PoolAccountsTable />} />
              <Route
                path="/funding-transactions"
                element={<FundingTransactionTable />}
              />
              {/* <Route path="/system-users" element={<SystemUsers />} /> */}
              <Route
                path="/user-activity-logs"
                element={<ActivityLogsTable />}
              />
              {/* Nested Routes */}
              <Route element={<UserProfileLayout />}>
                {/* Account Routes */}
                <Route path="/account">
                  <Route index element={<Navigate to="profile" />} />{' '}
                  {/* Default redirect */}
                  <Route path="profile" element={<Profile />} />
                  <Route path="security" element={<Security />} />
                  <Route path="appearance" element={<Appearance />} />
                  <Route path="notifications" element={<Notifications />} />
                </Route>
                {/* Developer Routes */}
                <Route path="/developer">
                  <Route index element={<Navigate to="api-keys" />} />{' '}
                  {/* Default redirect */}
                  <Route path="api-keys" element={<ApiKeys />} />
                  <Route path="api-logs" element={<ApiLogs />} />
                  <Route path="webhooks" element={<Webhooks />} />
                  <Route path="ip-whitelisting" element={<IpWhitelisting />} />
                </Route>
                {/* Team Routes */}
                <Route path="/team">
                  <Route index element={<Navigate to="users" />} />{' '}
                  {/* Default redirect */}
                  <Route path="users" element={<Users />} />
                  <Route path="logs" element={<Logs />} />
                </Route>
              </Route>
            </Route>
          </Route>
          {/* Fallback Route */}
          <Route path="*" element={<Error404 />} />
        </Routes>
      </FrappeProvider>
    </ThemeProvider>
  )
}
export default App
