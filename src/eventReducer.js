import { objectsPath } from './GameEvents';

export const getEvent = (data) =>{
    return async dispatch => {
        dispatch({
            type: "GET_EVENT",
            data: data
        })
    }
}

const eventReducer = (state=objectsPath.filter(i => i.type === 0)[0], action) => {
    switch(action.type) {
        case 'GET_EVENT':
            return action.data
        default:
            return state
    }

}

export default eventReducer