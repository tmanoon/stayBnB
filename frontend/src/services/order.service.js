
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
// import { orders } from '../data/orders.js'
import { store } from '../store/store.js'
import { httpService } from './http.service.js'
import { SET_IS_LOADING } from '../store/reducers/stay.reducer.js'

const BASE_URL = 'order/'

export const orderService = {
    query,
    getById,
    getHostOrdersById,
    getUserOrdersById,
    filterUserOrders,
    save,
    remove,
    getOrder,
    createDemoOrder
}

async function query() {
    try {
        let orders = await httpService.get(BASE_URL)
        return orders
    }
    catch (err) {
        console.log(err)
        throw err
    }
}

async function getById(orderId) {
    try {
        const order = await httpService.get(BASE_URL + orderId)
        return order
    } catch (err) {
        console.log(err)
    }
}

async function getHostOrdersById(userId, sortBy) {
    try {
        store.dispatch({type: SET_IS_LOADING, isLoading: true})
        let orders = await query()
        orders = orders.filter(order => order.hostId === userId).filter(order => order.entryDate > new Date())
        if (sortBy === 'date') return orders.sort((a,b) => a.entryDate - b.entryDate)
        if (sortBy === 'name') return orders.sort((a,b) => a.stay._id.localeCompare(b.stay._id))
        store.dispatch({type: SET_IS_LOADING, isLoading: false})
        return orders
    } catch (err) {
        console.log(err)
    }
}

async function getUserOrdersById(userId) {
    try {
        let orders = await query()
        orders = orders.filter(order => order.buyer._id === userId)
        return orders
    } catch (err) {
        console.log(err)
    }
}

function filterUserOrders(userOrders, filter) {
    if (filter.tense !== 'all') {
        const today = new Date().getTime()
        if (filter.tense === 'future') userOrders = userOrders.filter(order => order.exitDate >= today)
        else if (filter.tense === 'current') userOrders = userOrders.filter(order => order.entryDate <= today && order.exitDate >= today)
        else if (filter.tense === 'past') userOrders = userOrders.filter(order => order.exitDate <= today)
    }
    if (filter.status !== 'all') {
        userOrders = userOrders.filter(order => order.status === filter.status)
    }
    return userOrders.sort((a, b) => a.entryDate - b.entryDate)
}

async function remove(orderId) {
    try {
        await httpService.delete(BASE_URL + orderId)
    } catch (err) {
        console.log(err)
    }
}

async function save(order) {
    try {
        if (order._id) {
            const updatedOrder = await httpService.put(BASE_URL + order._id, order)
            return updatedOrder
        } else {
            const orderToAdd = await await httpService.post(BASE_URL, order)
            return orderToAdd
        }
    } catch (err) {
        console.log(err)
    }
}

async function getOrder(stay, loggedInUser, params) {
    try {
        return {
            hostId: stay.host.id,
            buyer: {
                _id: loggedInUser._id || '0000000',
                fullname: loggedInUser.fullname || 'Guest'
            },
            totalPrice: utilService.calcSumToPay(params, stay),
            entryDate: params.entryDate,
            exitDate: params.exitDate,
            guests: {
                adults: +params.adults || 0,
                children: +params.children || 0,
                infants: +params.infants || 0,
                pets: +params.pets || 0
            },
            stay: {
                _id: stay._id,
                name: stay.name,
                price: stay.price,
                location: {
                    address: stay.loc.address,
                    city : stay.loc.city,
                    country:stay.loc.country
                },
                img: stay.imgUrls[0]
            },
            msgs: [],
            status: "pending"
        }
    } catch (err) {
        console.log('err', err)
        throw err
    }
}

function createDemoOrder() {
    if (utilService.loadFromStorage(ORDER_DB)) return utilService.loadFromStorage(ORDER_DB)
    return utilService.saveToStorage(ORDER_DB, orders)
}
