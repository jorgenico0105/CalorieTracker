import { Activity } from "../types"
import { categories } from "../data/categories"
import { useMemo, Dispatch} from "react"

import {PencilSquareIcon,XCircleIcon} from '@heroicons/react/24/outline'
import { ActivityActions } from "../reducers/activity-reducer"
type ActivityListProps={
    activities: Activity[]
    dispatch: Dispatch<ActivityActions>
}

export default function ActivityList({activities,dispatch}:ActivityListProps) {
    const cateName=useMemo(()=> 
        (category : Activity['category'])=> categories.map(cat=>cat.id===category?cat.name:'')
        ,[activities])
  return (
    <>
        <h2 className='text-4xl font-bold text-slate-600 text-center'>Comida y Ejercicio</h2>
        {activities.length===0 ?<p className="text-center text-4xl mt-7">No hay comidas ni ejercicio registrado</p> : 
        activities.map(act => (
            <div key={act.id} className="px-5 py-10 bg-white mt-5 flex justify-between">
                    <div className="space-y-2 relative">
                        <p className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold ${act.category===1 ? 'bg-lime-500' : 'bg-orange-500'}`}>
                          {cateName(+act.category)}  
                        </p>
                        <p className="text-2xl font-bold pt-5">{act.name}</p>

                        <p className="font-black text-4xl text-lime-500">{act.calories}{' '} <span>Calorias</span></p>
                    </div>
                    <div className="flex gap-5 items-center">
                        <button onClick={()=>dispatch({type:"edit-activity",payload:{id: act.id}})}>
                            <PencilSquareIcon className="h-8 w-8 text-gray-800">
                            </PencilSquareIcon>
                        </button>
                        <button onClick={()=>dispatch({type:"delet-activity",payload:{id: act.id}})}>
                            <XCircleIcon className="h-8 w-8 text-red-500">
                            </XCircleIcon>
                        </button>
                    </div>
            </div>
        
        ))}
    </>
  )
}
