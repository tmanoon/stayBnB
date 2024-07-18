import { storageService } from "./async-storage.service"
import { utilService } from "./util.service"

const USER_DB = 'user_db'
const STORAGE_KEY_LOGGEDIN = 'storage_key_loggedin'

export const userService = {
    query,
    login,
    logout,
    signup,
    getById,
    getLoggedInUser,
    getEmptyCredentials
}

async function query() {
    try {
        const users = await storageService.query(USER_DB)
        return users
    } catch (err) {
        console.log(err)
        throw err
    }
}
async function login({ username, password }) {
    try {
        const users = await storageService.query(USER_DB)
        const user = users.find(user => user.username === username && user.password === password)
        _setLoggedinUser(user)
        if (user) return user
        return Promise.reject('Invalid login')
    } catch (error) {
        console.error('Error occurred during login:', error)
        throw error
    }
}

async function signup(userInfo) {
    try {
        const user = _createNewUser(userInfo)
        const _user = await storageService.post(USER_DB, user)
        if (_user) return _setLoggedinUser(_user)
        else return Promise.reject('Invalid signup')
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
    return storageService.get(USER_DB, userId)
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname, username: user.username }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}

function addStayToUserFavorites(stayId) {

}

function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: ''
    }
}

function getLoggedInUser() {
    const user = JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
    return user
}

async function _createNewUser(userInfo) {
    let userToAdd = {}
    try {
        if (userInfo.fullname && userInfo.username && userInfo.password) {
            userToAdd.username = userInfo.username,
                userToAdd.fullname = userInfo.fullname,
                userToAdd.password = userInfo.password,
                userToAdd.gender = userInfo.gender,
                userToAdd._id = utilService.makeId()
        }
        if (userInfo.about) userToAdd.about = userInfo.about
        if (userInfo.imgUrl) userToAdd.imgUrl = userInfo.imgUrl
        if (userInfo.location) userToAdd.location = userInfo.location
        return userToAdd
    } catch (err) {
        console.log(err)
        throw err
    }
}
