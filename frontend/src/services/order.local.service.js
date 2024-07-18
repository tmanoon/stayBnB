
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { orders } from '../data/orders.js'

const ORDER_DB = 'order_db'

export const orderService = {
    query,
    getById,
    getUserOrdersById,
    filterUserOrders,
    save,
    remove,
    getOrder,
    createDemoOrder
}

async function query() {
    try {
        let orders = await storageService.query(ORDER_DB)
        return orders
    }
    catch (err) {
        console.log(err)
    }
}

async function getById(orderId) {
    try {
        const order = await storageService.get(ORDER_DB, orderId)
        return order
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
        await storageService.remove(ORDER_DB, orderId)
    } catch (err) {
        console.log(err)
    }
}

async function save(order) {
    try {
        if (order._id) {
            const updatedOrder = await storageService.put(ORDER_DB, order)
            return updatedOrder
        } else {
            order._id = utilService.makeId()
            const orderToAdd = await storageService.post(ORDER_DB, order)
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
                _id: loggedInUser._id || '0000000', // 000000 for guest ID
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
                location: stay.loc,
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
