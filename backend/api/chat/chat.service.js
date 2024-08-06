import { dbService } from '../../services/db.service.js'
import { logger } from '../../services/logger.service.js'
import mongodb from 'mongodb'
const { ObjectId } = mongodb

export const chatService = {
    add,          
    getById,  
    getByOrderId,  
    update,       
    remove,         
    query,          
}

async function query(userId) {
    try {
        const collection = await dbService.getCollection('chat')
        const chats = await collection.find({ $or: [
            {"host._id": userId},
            {"buyer._id": userId}
         ]}).toArray()
        return chats
    } catch (err) {
        logger.error('cannot find chats', err)
        throw err
    }
}

async function getById(chatId) {
    try {
        const collection = await dbService.getCollection('chat')
        const chat = await collection.findOne({ _id: new ObjectId(chatId) })
        return chat
    } catch (err) {
        logger.error(`while finding chat by id: ${chatId}`, err)
        throw err
    }
}

async function getByOrderId(orderId) {
    try {
        const collection = await dbService.getCollection('chat')
        const chat = await collection.findOne({ orderId: new ObjectId(orderId) })
        return chat
    } catch (err) {
        logger.error(`while finding chat by order id: ${orderId}`, err)
        throw err
    }
}

async function remove(chatId) {
    try {
        const collection = await dbService.getCollection('chat')
        await collection.deleteOne({ _id: new ObjectId(chatId) })
    } catch (err) {
        logger.error(`cannot remove chat ${chatId}`, err)
        throw err
    }
}

async function update(updatedChat) {
    try {
        logger.info('got a new chat to update', updatedChat)
        const collection = await dbService.getCollection('chat')
        await collection.updateOne({ _id: new ObjectId(updatedChat._id) }, { $set: updatedChat })
        return updatedChat
    } catch (err) {
        logger.error(`cannot update chat ${chat._id}`, err)
        throw err
    }
}

async function add(chatToAdd) {
    try {
        const collection = await dbService.getCollection('chat')
        await collection.insertOne(chatToAdd)
        return chatToAdd
    } catch (err) {
        logger.error('cannot add chat', err)
        throw err
    }
}
