import { Separator } from '@/components/ui/separator'
import { ApiKeysTable } from '@/components/ApiKeysTable'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { AuditLogsTable } from '@/components/AuditLogsTable'
import { Copy, Plus } from 'lucide-react'
import {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from '@/components/ui/form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useState } from 'react'

const formSchema = z.object({
  webhook_url: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  accessor_key: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
})

function onSubmit(values) {
  // Do something with the form values.
  // ✅ This will be type-safe and validated.
  console.log(values)
}
const ApiKeys = () => {
  const [isVisibleApiForm, setIsVisibleApiForm] = useState(false)
  
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-lg font-medium">API Keys Management</h3>
        <p className="text-sm text-muted-foreground">
          API keys are unique identifiers used to authenticate and authorize
          access to APIs.
        </p>
      </div>

      <Separator />

      <Separator />
      <div className="grid grid-cols-1 gap-4">
        <ApiKeysTable
          isVisibleApiForm={isVisibleApiForm}
          setIsVisibleApiForm={setIsVisibleApiForm}
        />
      </div>
      {/* <div className="grid grid-cols-1">
        <AuditLogsTable />
      </div> */}
    </div>
  )
}

export default ApiKeys
