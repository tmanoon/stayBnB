import { httpService } from "./http.service"
import { userService } from "./user.service"

const BASE_URL = 'chat/'

export const chatService = {
    query,
    remove,
    update,
    add,
    getById,
    getByOrderId,
    getUserPosition,
}

async function query(filterBy = { type: 'all', unread: false }) {
    try {
        const userId = (userService.getLoggedInUser())._id
        let chats = await httpService.get(BASE_URL + userId)

        if (filterBy.unread) { } // add later when there's support
        if (filterBy.type !== 'all') {
            chats = chats.filter(chat => {
                const position = getUserPosition(userId, chat)
                return position === 'both' || position === filterBy.type
            })
        }
        return chats
    }
    catch (err) {
        console.log(err)
        throw err
    }
}

async function getById(chatId) {
    try {
        const chat = await httpService.get(BASE_URL + 'user/' + chatId)
        return chat
    } catch (err) {
        console.log(err)
    }
}

async function remove(chatId) {
    try {
        await httpService.delete(BASE_URL + chatId)
    } catch (err) {
        console.log(err)
    }
}

async function getByOrderId(orderId) {
    try {
        const chat = await httpService.get(BASE_URL + 'order/' + orderId)
        return chat
    } catch (err) {
        console.log('err', err)
        throw err
    }
}

async function update(chat) {
    try {
        const updatedChat = await httpService.put(BASE_URL + chat._id, chat)
        return updatedChat
    } catch (err) {
        console.log(err)
    }
}

async function add(order) {
    try {
        const hostOfOrder = await userService.getById(order.hostId)
        const buyerOfOrder = await userService.getById(order.buyer._id)
        const emptyChat = {
            createdAt: new Date().getTime(),
            orderId: order._id,
            host: {
                _id: order.hostId,
                fullname: hostOfOrder.fullname,
                imgUrl: hostOfOrder.imgUrl
            },
            buyer: {
                _id: buyerOfOrder._id,
                fullname: buyerOfOrder.fullname,
                imgUrl: buyerOfOrder.imgUrl
            },
            msgs: []
        }
        const addedChat = await httpService.post(BASE_URL, emptyChat)
        return addedChat
    } catch (err) {
        console.log('err', err)
        throw err
    }
}

function getUserPosition(userId, chat) {
    if (userId === chat.host._id && userId === chat.buyer._id) return 'both'
    if (userId === chat.host._id) return 'host'
    if (userId === chat.buyer._id) return 'buyer'
}