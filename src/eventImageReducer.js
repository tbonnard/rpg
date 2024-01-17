import { objectsPath } from './GameEvents';

export const getEventImage = (data) =>{
    return async dispatch => {
        dispatch({
            type: "GET_EVENT_IMAGE",
            data: data
        })
    }
}

const eventImageReducer = (state=[objectsPath.filter(i => i.type === 0)[0].options[0].image], action) => {
    switch(action.type) {
        case 'GET_EVENT_IMAGE':
            return action.data
        default:
            return state
    }

}

export default eventImageReducer