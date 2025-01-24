import { Separator } from '@/components/ui/separator'
import IpWhitelistingTable from '@/components/IpWhitelistingTable'

const IpWhitelisting = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">IP Whitelisting</h3>
        <p className="text-sm text-muted-foreground">
          It allows you to restrict access to your account by permitting only
          specific IP addresses.
        </p>
      </div>
      <Separator />
      <div className="grid grid-cols-1 gap-4">
        <IpWhitelistingTable />
      </div>
    </div>
  )
}

export default IpWhitelisting
