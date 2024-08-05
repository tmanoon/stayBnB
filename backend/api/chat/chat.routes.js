import express from 'express'
import { requireAuth, requireAdmin } from '../../middlewares/requireAuth.middleware.js'
import { getChats, getChat, getChatByOrderId, deleteChat, updateChat } from './chat.controller.js'

const router = express.Router()

router.get('/:userId', getChats)
router.get('/:userId/:id', getChat)
router.get('/order/:orderId', getChatByOrderId)
router.put('/:id', requireAuth, updateChat)
router.delete('/:id', requireAuth, requireAdmin, deleteChat)

export const chatRoutes = router
