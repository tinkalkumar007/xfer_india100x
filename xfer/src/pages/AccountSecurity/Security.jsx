import { Separator } from '@/components/ui/separator'
import UserSecurityForm from '@/components/UserSecurityForm'

const Security = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Security</h3>
        <p className="text-sm text-muted-foreground">
          Account security is crucial to protect personal information and
          prevent unauthorized access.
        </p>
      </div>
      <Separator />
      <UserSecurityForm />
    </div>
  )
}

export default Security
