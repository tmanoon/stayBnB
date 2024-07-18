import { SET_ORDERS, ADD_ORDER, REMOVE_ORDER, UPDATE_ORDER } from '../reducers/order.reducer'
import { orderService } from '../../services/order.service'
import { store } from '../store'
import { userService } from '../../services/user.service'

export async function addOrder(params, stay) {
    try {
        const user = userService.getLoggedInUser()
        const order = await orderService.getOrder(stay, user, params)
        const orderToAdd = await orderService.save(order)
        store.dispatch({ type: ADD_ORDER, order: orderToAdd })
        console.log(orderToAdd)
        return orderToAdd
    } catch (err) {
        console.log(err)
    }
}

export async function loadOrders() {
    try {
        store.dispatch({ type: SET_IS_LOADING, isLoading: true })
        const orders = await orderService.query()
        store.dispatch({ type: SET_ORDERS, orders })
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    } catch (err) {
        console.log(err)
    }
}

export async function removeOrder(orderId) {
    try {
        await orderService.remove(orderId)
        store.dispatch({ type: REMOVE_ORDER, orderId })
    } catch (err) {
        console.log('order action -> Cannot remove order', err)
        throw err
    }
}

export async function updateOrder(order) {
    try {
        await orderService.save(order)
        store.dispatch({ type: UPDATE_ORDER, order })
    } catch (err) {
        console.log(err)
    }
}