import { Activity } from "../types";

export type ActivityActions = 
  | { type: 'save-activity', payload: { newActivity: Activity } }
  | { type: 'edit-activity', payload: { id: Activity['id'] } } |
  { type: 'delet-activity', payload: { id: Activity['id'] } } |
  { type: 'restart' } ;

export type ActivityState = {
  activities: Activity[];
  activeId: Activity['id'];

};
const localStorageActi=() : Activity[] =>{
    const acti=localStorage.getItem('activities')
    return acti ? JSON.parse(acti) : []
}

export const initialState: ActivityState = {
  activities: localStorageActi(),
  activeId: '', // Iniciamos con una cadena vacía
};

export const activityReducer = (
  state: ActivityState = initialState,
  action: ActivityActions
) => {
  switch (action.type) {
    case 'save-activity':
      let updatedActivities: Activity[];
      if (state.activeId) {
        // Actualiza la actividad existente
        updatedActivities = state.activities.map(acti =>
          acti.id === state.activeId ? action.payload.newActivity : acti
        );
      } else {
        // Agrega una nueva actividad
        updatedActivities = [...state.activities, action.payload.newActivity];
      }
      return {
        ...state,
        activities: updatedActivities,
        activeId: '' // Resetea activeId después de guardar
      };

    case 'edit-activity':
      return {
        ...state,
        activeId: action.payload.id
      };

    default:
        if (action.type ==='delet-activity'){
            return{
                ...state,
                activities:state.activities.filter(act=>act.id!==action.payload.id)
            }
        }
        if (action.type==='restart'){
            return {
                activities: [],
                activeId: ''
            }
        }
      return state;
  }
};
