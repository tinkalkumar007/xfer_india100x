import { IssuedCardsTable } from '../../components/issued-cards-table'

const IssuedCards = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1">
        <IssuedCardsTable />
      </div>
    </div>
  )
}

export default IssuedCards
