export const ADD_USER = 'ADD_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const SET_USERS = 'SET_USERS'
export const SET_SCORE = 'SET_SCORE'
export const SET_LOGGED_IN_USER = 'SET_LOGGED_IN_USER'
export const ADD_STAY_TO_FAVORITES = 'ADD_STAY_TO_FAVORITES'
export const REMOVE_STAY_FROM_FAVORITES = 'REMOVE_STAY_FROM_FAVORITES'
export const LOGOUT = 'LOGOUT'


const initialState = {
    users: [],
    loggedInUser: '',
    loggedInUserUserStays: [],
    userFavoriteStays: []
}

export function userReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_LOGGED_IN_USER:
            return {...state, user: action.user}

        case ADD_USER:
            return {...state, users: [...state.users, action.user]}

        case REMOVE_USER:
            return {...state, users: state.users.filter(user => user._id !== action.userId)}

        case SET_USERS:
            return { ...state, users: action.users }

        case ADD_STAY_TO_FAVORITES: 
        return { ...state, userFavoriteStays: [...state.userFavoriteStays, action.stayId] } 

        case REMOVE_STAY_FROM_FAVORITES: 
        return { ...state, favoriteStays: state.userFavoriteStays.filter(stay => stay._id !== action.stayToRemoveId)}

        case LOGOUT: 
        return { ...state, loggedInUser: ''}

        default:
            return state
    }
}