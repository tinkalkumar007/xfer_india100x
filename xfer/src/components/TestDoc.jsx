import { useFrappeGetDocList, useFrappeGetDoc } from 'frappe-react-sdk'
import React from 'react'

const TestDoc = () => {
const { data } = useFrappeGetDocList('Program', {
    fields: ["*"]
})

console.log(data)

   return (
    <div className='flex justify-center items-center'>
        <ul>
            {data && data.map( (item, index) =>
             
                <li key={index}>{item.name}</li>
            )}
        </ul>
    </div>
  )
}

export default TestDoc