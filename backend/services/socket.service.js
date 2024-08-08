import { logger } from './logger.service.js'
import { Server } from 'socket.io'

var gIo = null

export function setupSocketAPI(server) {
    gIo = new Server(server, {
        cors: {
            origin: '*',
        }
    })
    gIo.on('connection', socket => {
        logger.info(`New connected socket [id: ${socket.id}]`)
        socket.join('self' + socket.id)
        socket.on('disconnect', socket => {
            logger.info(`Socket disconnected [id: ${socket.id}]`)
        })

        socket.on('chat-send-msg', async chat => {
            logger.info(`New chat msg from socket [id: ${socket.id}]`)
            const userId = chat.msgs[chat.msgs.length -1].by === chat.host._id ? chat.buyer._id : chat.host._id
            await emitToUser({ type: 'chat-add-msg', data: chat, userId})
        })

        socket.on('order-update', async data => {
            logger.info(`New update about order: ${data._id}, connected socket: ${socket.id}`)
            gIo.emit('order-update', data)
            await emitToUser({ type: 'prompt-notification', data: `A new update about order ${data._id.slice(-4, data._id.length - 1)}`, userId: data.buyer._id })
        })

        socket.on('set-user-socket', userId => {
            logger.info(`Setting socket.userId = ${userId} for socket [id: ${socket.id}]`)
            socket.userId = userId
        })

        socket.on('unset-user-socket', () => {
            logger.info(`Removing socket.userId for socket [id: ${socket.id}]`)
            delete socket.userId
        })

        socket.on('add-order', async orderToAdd => {
            logger.info(`Adding order for user id: ${orderToAdd.buyer._id}`)
            emitTo({ type: 'add-order', data: orderToAdd })
            await emitToUser({ type: 'prompt-notification', data: `You got a new order by ${orderToAdd.buyer.fullname}`, userId: orderToAdd.hostId })
        })
    })
}

function emitTo({ type, data, label }) {
    if (label) gIo.to(label).emit(type, data)
    else gIo.emit(type, data)
}

async function emitToUser({ type, data, userId }) {
    userId = userId.toString()
    const socket = await _getUserSocket(userId)

    if (socket) {
        logger.info(`Emiting event: ${type} to user: ${userId} socket [id: ${socket.id}]`)
        socket.emit(type, data)
    } else {
        logger.info(`No active socket for user: ${userId}`)
    }
}

async function broadcast({ type, data, room = null, userId }) {
    userId = userId.toString()

    logger.info(`Broadcasting event: ${type}`)
    const excludedSocket = await _getUserSocket(userId)
    if (room && excludedSocket) {
        logger.info(`Broadcast to room ${room} excluding user: ${userId}`)
        excludedSocket.broadcast.to(room).emit(type, data)
    } else if (excludedSocket) {
        logger.info(`Broadcast to all excluding user: ${userId}`)
        excludedSocket.broadcast.emit(type, data)
    } else if (room) {
        logger.info(`Emit to room: ${room}`)
        gIo.to(room).emit(type, data)
    } else {
        logger.info(`Emit to all`)
        gIo.emit(type, data)
    }
}

async function _getUserSocket(userId) {
    const sockets = await _getAllSockets()
    console.log('getusersockets test', userId);
    const socket = sockets.find(s => s.userId === userId)
    return socket
}

async function _getAllSockets() {
    const sockets = await gIo.fetchSockets()
    return sockets
}

async function _printSockets() {
    const sockets = await _getAllSockets()
    console.log(`Sockets: (count: ${sockets.length}):`)
    sockets.forEach(_printSocket)
}
function _printSocket(socket) {
    console.log(`Socket - socketId: ${socket.id} userId: ${socket.userId}`)
}

export const socketService = {
    // set up the sockets service and define the API
    setupSocketAPI,
    // emit to everyone / everyone in a specific room (label)
    emitTo,
    // emit to a specific user (if currently active in system)
    emitToUser,
    // Send to all sockets BUT not the current socket - if found
    // (otherwise broadcast to a room / to all)
    broadcast,
}
