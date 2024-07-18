import { storageService } from '../../services/async-storage.service'
import { userService } from '../../services/user.service'
import { utilService } from '../../services/util.service'
import { ADD_STAY_TO_FAVORITES, SET_LOGGED_IN_USER, SET_USERS, REMOVE_STAY_FROM_FAVORITES, ADD_USER, LOGOUT } from "../reducers/user.reducer"
import { store } from "../store"

export async function loadUsers() {
    try {
        const users = await userService.query()
        store.dispatch({ type: SET_USERS, users })
    } catch (err) {
        console.log('stay action -> Cannot load stays', err)
        throw err
    }
}

export async function login(credentials) {
    try {
        const user = await userService.login(credentials)
        store.dispatch( {type: SET_LOGGED_IN_USER, user} )
        return user
    } catch (err) {
        console.log('err', err)
    }
}

export async function signup(credentials) {
    try {
        const user = await userService.signup(credentials)
            store.dispatch({ type: ADD_USER, user: user })
            store.dispatch({ type: SET_LOGGED_IN_USER, user: user })
            return user
        } catch (err) {
        console.log(err)
        throw err
    }
}

export async function logout() {
    try {
        await userService.logout()
        store.dispatch({ type: LOGOUT })
    } catch (err) {
        console.log(err)
        throw err
    }
}

export async function addStayToUserFavorites(stayId) {
    try {
        if (userService.getLoggedInUser()) {
            userService.addStayToUserFavorites(stayId)
            store.dispatch({ type: ADD_STAY_TO_FAVORITES, stayId })
        }
    } catch (err) {
        console.log('stay action -> Cannot save stay', err)
        throw err
    }
}

export async function removeStayToUserFavorites(stayId) {
    try {
        if (userService.getLoggedInUser()) store.dispatch({ type: REMOVE_STAY_FROM_FAVORITES, stayId })
    } catch (err) {
        console.log('stay action -> Cannot save stay', err)
        throw err
    }
}
