const user = {
    name:"",
    credits:0,
    items:[],
    life:100,
    experience:0,
    inventory:0
  }

export const updateUserName = (data) =>{
    return async dispatch => {
        dispatch({
            type: "UPDATE_USER_NAME",
            data: data
        })
    }
}

export const updateUserCredits = (data) =>{
    return async dispatch => {
        dispatch({
            type: "UPDATE_USER_CREDITS",
            data: data
        })
    }
}


export const updateUserLife = (data) =>{
    return async dispatch => {
        dispatch({
            type: "UPDATE_USER_LIFE",
            data: data
        })
    }
}

export const updateUserExperience = (data) =>{
    return async dispatch => {
        dispatch({
            type: "UPDATE_USER_EXPERIENCE",
            data: data
        })
    }
}


export const updateUserItems = (data) =>{
    return async dispatch => {
        dispatch({
            type: "UPDATE_USER_ITEMS",
            data: data
        })
    }
}

export const updateUserInventory = (data) =>{
    return async dispatch => {
        dispatch({
            type: "UPDATE_USER_INVENTORY",
            data: data
        })
    }
}

const userReducer = (state=user, action) => {
    switch(action.type) {
        case 'UPDATE_USER_NAME':
            return {...state, name: action.data};
        case 'UPDATE_USER_CREDITS':
            return {...state, credits: action.data};
            case 'UPDATE_USER_LIFE':
        return {...state, life: action.data};
            case 'UPDATE_USER_EXPERIENCE':
            return {...state, experience: action.data};
        case 'UPDATE_USER_INVENTORY':
            return {...state, inventory: action.data};
        case 'UPDATE_USER_ITEMS':
                return { ...state, items: [...state.items, action.data] };
        default:
            return state
    }

}

export default userReducer