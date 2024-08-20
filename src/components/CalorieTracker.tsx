import { useMemo } from "react"
import { Activity } from "../types"

type calorieProps={
    activities:Activity[]
}
export default function CalorieTracker({activities}:calorieProps) {
  const caloriesConsume=useMemo(()=> activities.reduce((total,activity)=>activity.category===1 ? total + activity.calories : total,0),[activities])
  const caloriesBurn=useMemo(()=> activities.reduce((total,activity)=>activity.category===2 ? total + activity.calories : total,0),[activities])
  const totalCal=useMemo(()=>caloriesConsume-caloriesBurn,[activities])
  return (
    <>
         <h2 className="text-4xl text-center text-white">Resumen de Calorias</h2>
      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
            <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center text-xl mt-10">
                    <span className="font-black text-6xl text-orange">{caloriesConsume}</span>
                Consumidas 
                </p>
                <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center text-xl mt-10">
                    <span className="font-black text-6xl text-orange">{caloriesBurn}</span>
                Quemadas
                </p>
                <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center text-xl mt-10">
                    <span className={`font-black text-6xl text-orange ${totalCal < 0 ? 'text-red-600' : 'text-orange' }   `}>{totalCal}</span>
                Total
                </p>    
     </div>   
       
    </>
  )
}
