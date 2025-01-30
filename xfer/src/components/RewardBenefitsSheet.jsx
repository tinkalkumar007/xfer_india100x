import { Separator } from '@/components/ui/separator'
import { Gift } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const RewardBenefitsSheet = (props) => {
  const { insurance_card, insurance__travel, lounge_access, reward_points } =
    props
  return (
    <div className="rounded-md bg-muted/50 border w-full space-y-2 py-2">
      <h2 className="text-md font-medium py-2 px-4">Reward Benefits</h2>
      <div className="w-full flex justify-center">
        <Separator className="w-[92%] text-center -mt-2" />
      </div>

      <div className="-mt-20">
        {insurance__travel ||
        insurance_card ||
        lounge_access ||
        reward_points ? (
          <div className="w-full px-4 py-2">
            <div className="bg-muted/40 flex flex-col gap-2">
              {insurance_card ? (
                <div>
                  <Badge variant="primary">Insurance Card</Badge>
                </div>
              ) : null}

              {insurance__travel ? (
                <div>
                  <Badge variant="primary">Insurance Travel</Badge>
                </div>
              ) : null}

              {lounge_access ? (
                <div>
                  <Badge variant="primary">Lounge Access</Badge>
                </div>
              ) : null}

              {reward_points ? (
                <div>
                  <Badge variant="primary">Reward Points</Badge>
                </div>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 py-4">
            <Gift strokeWidth={1.5} />
            <h2 className="text-sm font-medium text-center">
              No Reward Benefits added.
            </h2>
            <p className="text-xs font-normal text-muted-foreground text-center">
              You have not added any Reward Details. Add one below.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default RewardBenefitsSheet
