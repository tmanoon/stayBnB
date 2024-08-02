import { httpService } from './http.service.js'
import { stayService } from './stay.service.js'

const BASE_URL = 'auth/'
const USER_URL = 'user/'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedInUser,
    getEmptyCredentials,
    addRemoveStayToUserFavorites,
    getAllUsers,
    updateUser,
    removeUser
}

async function login({ username, password }) {
    try {
        const user = await httpService.post(BASE_URL + 'login', { username, password })
        if (user) {
            return _setLoggedInUser(user)
        } else {
            return Promise.reject('Invalid login')
        }
    } catch (error) {
        console.error('Error occurred during login:', error)
        throw error
    }
}

async function signup({ username, password, fullname, about, imgUrl, location, gender, isAdmin = false }) {
    try {
        const user = { username, password, fullname, isAdmin, about, imgUrl, location, gender }
        await httpService.post(BASE_URL + 'signup', user)
        _setLoggedInUser(user)
        return user
    } catch (err) {
        console.log(err)
        throw err
    }
}

async function logout() {
    try {
        await httpService.post(BASE_URL + 'logout')
        sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    } catch (err) {
        console.log(err)
    }
}

function getById(userId) {
    return httpService.get('user/' + userId)
}

function _setLoggedInUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname, username: user.username, imgUrl: user.imgUrl, wishlist: user.wishlist }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}

function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: '',
        about: '',
        location: '',
        gender: '',
        imgUrl: 'https://thispersondoesnotexist.com/'
    }
}

function getLoggedInUser() {
    const user = JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
    return user
}

async function addRemoveStayToUserFavorites(stayId, action) {
    try {
        const stayToEdit = await stayService.getById(stayId)
        const userToUpdate = getLoggedInUser()
        if (action === 'add') userToUpdate.wishlist.unshift(stayToEdit)
        else {
            const idxOfStayToRemove = userToUpdate.wishlist.findIndex(stay => stay._id === stayId)
            userToUpdate.wishlist.splice(idxOfStayToRemove, 1)
        }
        await httpService.put(USER_URL + userToUpdate._id, userToUpdate)
        _setLoggedInUser(userToUpdate)
        return userToUpdate
    } catch (err) {
        console.log('err', err)
        throw err
    }
}

function getAllUsers() {
    return httpService.get(USER_URL)
}

function updateUser(id, userToUpdate) {
    return httpService.put(USER_URL + id, userToUpdate)
}

function removeUser(id) {
    return httpService.delete(USER_URL + id)
}