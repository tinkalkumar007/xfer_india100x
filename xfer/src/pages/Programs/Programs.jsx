import { ProgramChart1 } from '../../components/program-chart-1'
import { ProgramChart2 } from '../../components/program-chart-2'
import { ProgramTableDemo } from '../../components/program-table'

const Programs = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* <div className="grid auto-rows-min gap-4 md:grid-cols-2">
         <ProgramChart1 className="aspect-video rounded-xl bg-muted/50"/>
         <ProgramChart2 className="aspect-video rounded-xl bg-muted/50"/>
      </div> */}
      <div className="grid grid-cols-1">
        <ProgramTableDemo className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      </div>
    </div>
  )
}

export default Programs
