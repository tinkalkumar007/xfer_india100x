import { ActivityLogsTable } from '@/components/user-activity-logs-table'

const UserActivityLogs = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1">
        <ActivityLogsTable />
      </div>
    </div>
  )
}

export default UserActivityLogs
