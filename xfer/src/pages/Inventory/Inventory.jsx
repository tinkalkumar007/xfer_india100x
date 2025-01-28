import { InventoryTable } from '@/components/inventory-table'

const Inventory = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1">
        <InventoryTable />
      </div>
    </div>
  )
}

export default Inventory
