import { Separator } from '@/components/ui/separator'
import WebhooksTabs from '@/components/WebhooksTabs'
import { Button } from 'react-day-picker'

const Webhooks = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-medium">Webhook Management</h3>
        <p className="text-sm text-muted-foreground">
          A webhook interface is a system that allows receiving, processing, and
          responding to HTTP POST requests triggered by specific events from
          external sources.
        </p>
      </div>

      <Separator />

      <div>
        <WebhooksTabs />
      </div>
    </div>
  )
}

export default Webhooks
