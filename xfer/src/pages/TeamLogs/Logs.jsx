import { Separator } from "../../components/ui/separator"
import { TeamLogsTable } from "../../components/ui/team-logs-table"

const Logs = () => {
  return <div>
    <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Activity Logs</h3>
          <p className="text-sm text-muted-foreground">
          Stay informed with a comprehensive record of all actions and changes made by team members. 
          Activity logs provide transparency and accountability, helping you track updates, 
          monitor user activity, and ensure compliance.
          </p>
        </div>
        <Separator />
        <TeamLogsTable/>
      </div>
  </div>
}

export default Logs
