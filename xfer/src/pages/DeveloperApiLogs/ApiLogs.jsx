import React from 'react'
import { AuditLogsTable } from '@/components/AuditLogsTable'
import { Separator } from '@/components/ui/separator'

const ApiLogs = () => {

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-lg font-medium">API Logs</h3>
        <p className="text-sm text-muted-foreground">
          API keys are unique identifiers used to authenticate and authorize
          access to APIs.
        </p>
      </div>

      <Separator />

      <div className="grid grid-cols-1">
        <AuditLogsTable />
      </div>
    </div>
  )
}

export default ApiLogs
