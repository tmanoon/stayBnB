import express from 'express'
import { requireAuth, requireAdmin } from '../../middlewares/requireAuth.middleware.js'
import { getChats, getChat, getChatByOrderId, deleteChat, updateChat } from './chat.controller.js'

const router = express.Router()

router.get('/', getChats)
router.get('/:id', getChat)
router.get('/order/:id', getChatByOrderId)
router.put('/:id', requireAuth, updateChat)
router.delete('/:id', requireAuth, requireAdmin, deleteChat)

export const chatRoutes = router
