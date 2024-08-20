import { categories } from "../data/categories";
import { v4 as uuidev4 } from "uuid";
import { Dispatch, useState, useEffect} from "react";
import { ChangeEvent, FormEvent } from "react";
import { Activity } from "../types";
import { ActivityActions, ActivityState } from "../reducers/activity-reducer";

type FormProps = {
  dispatch: Dispatch<ActivityActions>;
  state:ActivityState
};

export default function Form({ dispatch,state }: FormProps) {
  const [activity, setActivity] = useState<Activity>({
    id:uuidev4(),
    category: 1,
    name: '',
    calories: 0,
  });
useEffect(()=>{
  if(state.activeId){
    const selectAct=state.activities.filter(acti=>acti.id===state.activeId)[0]//FIltro de activies el que tenga el id igual 
    setActivity(selectAct)
  }
},[state.activeId])
  const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
    const isNumberField = ['category', 'calories'].includes(e.target.id);
    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value
    });
  };

  const isValid = () => {
    const { name, calories } = activity;
    return name.trim() !== '' && calories > 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: 'save-activity', payload: { newActivity: activity } });
    setActivity({
      id:uuidev4(),
      category: 1,
      name: '',
      calories: 0,
    })
  };

  return (
    <form className="space-y-5 bg-white rounded-lg p-10 shadow-md" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">Categoría:</label>
        <select
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          id="category"
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">{activity.category===1 ? 'Comida' : 'Ejercicio'}</label>
        <input
          id="name"
          type="text"
          className="w-full shadow-md rounded-lg border-slate-300 border p-2 bg-white"
          placeholder={activity.category===1 ? 'Ej.Manzana Pizza Pollo' : "Ej. Caminar Saltar Correr"}
          value={activity.name}
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">Calorías:</label>
        <input
          id="calories"
          type="number"
          className="w-full shadow-md rounded-lg border-slate-300 border p-2 bg-white"
          placeholder={activity.category===1 ? 'Ej.Manzana: 50 cal' : "Ej. Correr: 250 cal"}
          value={activity.calories === 0 ? '' : activity.calories}
          onChange={handleChange}
        />
      </div>
      <input
        type="submit"
        className="bg-gray-800 hover:bg-gray-600 w-full font-bold uppercase text-white p-2 cursor-pointer disabled:opacity-10"
        value={activity.category === 1 ? "Guardar Comida" : "Guardar Ejercicio"}
        disabled={!isValid()}
      />
    </form>
  );
}
