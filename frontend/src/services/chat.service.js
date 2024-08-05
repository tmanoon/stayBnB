import { httpService } from "./http.service"
import { userService } from "./user.service"

const BASE_URL = 'chat/'

export const chatService = {
    query,
    save,
    remove,
    getById,
    getByOrderId,
    createEmptyChat
}

async function query(userId) {
    try {
        const chats = await httpService.get(BASE_URL + userId)
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

async function save(chat) {
    try {
        if (chat._id) {
            const updatedChat = await httpService.put(BASE_URL + chat._id)
            return updatedChat
        } else {
            const addedChat = await await httpService.post(BASE_URL, chat)
            return addedChat
        }
    } catch (err) {
        console.log(err)
    }
}

async function createEmptyChat(order) {
    try {
        const hostOfOrder = await userService.getById(order.hostId)
        const buyerOfOrder = await userService.getById(order.buyer._id)
        const emptyChat = {
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
        return emptyChat
    } catch (err) {
        console.log('err', err)
        throw err
    }
}