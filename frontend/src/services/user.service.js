import { httpService } from './http.service.js'

const BASE_URL = 'auth/'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedInUser,
    getEmptyCredentials
}

async function login({ username, password }) {
    try {
        const user = await httpService.post(BASE_URL + 'login', { username, password })
        if (user) {
            return _setLoggedinUser(user)
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
        // if (_user) return _setLoggedinUser(_user)
        // else return Promise.reject('Invalid signup')
        _setLoggedinUser(user)
        return user
    } catch (err) {
        console.log(err)
        throw error
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

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname, username: user.username, imgUrl: user.imgUrl}
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
