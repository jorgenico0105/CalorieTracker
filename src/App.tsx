import Form from "./components/Form";
import { useEffect, useMemo, useReducer } from "react";
import { activityReducer, initialState } from "./reducers/activity-reducer";
import ActivityList from "./components/activityList";
import CalorieTracker from "./components/CalorieTracker";
function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState);
  console.log(state)
  useEffect(()=>{
    localStorage.setItem('activities',JSON.stringify(state.activities))
  },[state.activities])
  const canRestart = useMemo(() => state.activities.length > 0, [state.activities]);

  return (
    <>
      <header className="bg-lime-600 py-3">
        <div className="max-w-4xl mx-auto flex justify-between">
          <h1 className="text-center text-lg font-bold text-white uppercase">Contador Calorias</h1>
          <button onClick={()=>dispatch({type:"restart"})} className="bg-black text-white p-2 rounded-md px-3 hover:bg-stone-600 uppercase disabled:opacity-10" disabled={!canRestart}>
            Reiniciar contenido
          </button>
        </div>
      </header>
      <section className="bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form dispatch={dispatch} 
          state={state}
          />
        </div>
      </section>
      <section className="bg-gray-800 py-10">
          <div className="max-w-4xl mx-auto" >
            <CalorieTracker
            activities={state.activities}
            >
              
            </CalorieTracker>
          </div>
        </section>
      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList
         activities={state.activities}
         dispatch={dispatch}
        >

        </ActivityList>
      </section>

    </>
  );
}

export default App;
