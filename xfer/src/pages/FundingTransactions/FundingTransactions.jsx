import { FundingTransactionTable } from '../../components/FundingTransaction-table'

const FundingTransactions = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
      </div> */}
      <div className="grid grid-cols-1">
        <FundingTransactionTable className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      </div>
    </div>
  )
}

export default FundingTransactions
