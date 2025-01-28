import { TeamUsersTable } from '@/components/ui/team-user-table'
import { Separator } from '@/components/ui/separator'
const Users = () => {
  return (
    <div>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Team Members</h3>
          <p className="text-sm text-muted-foreground">
            Manage your team effectively by keeping track of members, roles, and
            activities. This table provides a detailed overview of all team
            members associated with your programs, ensuring seamless
            collaboration and accountability.
          </p>
        </div>
        <Separator />
        <TeamUsersTable />
      </div>
    </div>
  )
}
export default Users
