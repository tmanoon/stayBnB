import { userService } from "../services/user.service"
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router"

import { orderService } from "../services/order.service"
import { utilService } from "../services/util.service"
import { stayService } from "../services/stay.service"
import { updateOrder } from "../store/actions/order.actions"
import { socketService, SOCKET_EVENT_ORDER_UPDATE, SOCKET_SERVICE_ADD_ORDER } from "../services/socket.service"

import { Loading } from "../cmps/Loading"
import { TripModal } from "../cmps/UserTripsCmps/TripModal"


export function UserDashboard() {
    const [loggedInUser, setLoggedInUser] = useState(userService.getLoggedInUser())
    const [userOrders, setUserOrders] = useState()
    const [userStays, setUserStays] = useState()
    const [sortBy, setSortBy] = useState('date')
    const [onModal, setOnModal] = useState(false)
    const [chosenOrder, setChosenOrder] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        getUserStays()
        socketService.on(SOCKET_SERVICE_ADD_ORDER, orderToAdd => {
            setUserOrders(prevUserOrders => [orderToAdd, ...prevUserOrders])
        })
        return () => {
            socketService.off(SOCKET_SERVICE_ADD_ORDER)
        }
    }, [])

    useEffect(() => {
        getUserOrders()
    }, [sortBy])

    async function getUserOrders() {
        try {
            const userOrders = await orderService.getHostOrdersById(loggedInUser._id, sortBy)
            setUserOrders(userOrders)
        } catch (err) {
            console.log(err)
            throw err
        }
    }

    async function getUserStays() {
        try {
            const _userStays = await stayService.getHostStaysById(loggedInUser._id)
            setUserStays(_userStays)
        } catch (err) {
            console.log(err)
            throw err
        }
    }

    function onSortBy(val) {
        setSortBy(val)
    }

    async function onChangeOrderStatus(status, order, ev) {
        ev.stopPropagation()
        try {
            const orderToUpdate = { ...order, status }
            await updateOrder(orderToUpdate)
            setUserOrders(prevUserOrders => (prevUserOrders.map(_order => {
                if (_order._id === orderToUpdate._id) return orderToUpdate
                return _order
            })))
            socketService.emit(SOCKET_EVENT_ORDER_UPDATE, orderToUpdate)
        } catch (err) {
            console.log(err)
            throw err
        }
    }

    function navToEditStay(ev, stayId) {
        ev.stopPropagation()
        navigate(`/edit/${stayId}`)
    }

    function navToDetails(ev, stayId) {
        ev.stopPropagation()
        navigate(`/${stayId}`)
    }

    function onChooseOrder(order) {
        setChosenOrder(order)
        setOnModal(true)
    }

    return <>
        {(!userStays && !userOrders) && <Loading currentPage={"dashBoard"} />}
        <section className="dashboard">
            {userStays && (
                <div className="user-stays">
                    <h2>My properties</h2>
                    <div className="user-stays-container grid">
                        {userStays.map(stay => (
                            <article key={stay._id} className="user-stay-card flex column" onClick={(ev) => navToDetails(ev, stay._id)}>
                                <img src={stay.imgUrls[0]} />
                                <h2>{stay.name}</h2>
                                <p><span>Capacity:</span> {stay.capacity}</p>
                                <p><span>Price:</span> {stay.price}</p>
                                <button onClick={(ev) => navToEditStay(ev, stay._id)}>Edit</button>
                            </article>
                        ))}
                    </div>
                </div>
            )}

            {userOrders && <div className="user-orders flex column">
                <h2>My orders</h2>
                <ul className="user-orders-container flex column">
                    <li className="grid">
                        <h3 onClick={() => onSortBy('name')} className={`title ${sortBy === 'name' ? 'selected' : ''}`}>Property name</h3>
                        <h3 onClick={() => onSortBy('date')} className={sortBy === 'date' ? 'selected' : ''}>Dates</h3>
                        <h3 className="also-tablet num">Order number</h3>
                        <h3 className="only-desktop">Guest</h3>
                        <h3 className="also-tablet num">Guests</h3>
                        <h3 className="only-desktop num">Price</h3>
                        <h3 className="actions">Actions</h3>
                    </li>

                    {userOrders && userOrders.map(order => {
                        const datesAndGuests = { entryDate: order.entryDate, exitDate: order.exitDate, adults: order.guests?.adults, children: order.guests?.children }
                        const isAnswered = (order.status !== 'pending') ? true : false

                        return <li key={order._id} className="user-order grid" onClick={() => onChooseOrder(order)}>
                            <p className="title">{order.stay.name}</p>
                            <p>{utilService.timestampsToShortDates(order.entryDate, order.exitDate)}</p>
                            <p className="also-tablet num">{order._id.slice(18)}</p>
                            <p className="only-desktop">{order.buyer.fullname}</p>
                            <p className="also-tablet num">{utilService.calcGuestCount(order)}</p>
                            <p className="only-desktop num">$ {Math.round((utilService.calcSumToPay(datesAndGuests, order.stay)) + Math.round((utilService.calcSumToPay(datesAndGuests, order.stay) * 0.14125))).toLocaleString()}</p>
                            <div className={`flex space-evenly ${isAnswered ? 'answered' : ''}`}>
                                <button onClick={(ev) => onChangeOrderStatus('approved', order, ev)} className={`approve-btn ${(order.status === 'approved') ? 'approved' : ''}`}>Approve</button>
                                <button onClick={(ev) => onChangeOrderStatus('rejected', order, ev)} className={`reject-btn ${(order.status === 'rejected') ? 'rejected' : ''}`}>Reject</button>
                            </div>
                        </li>
                    })}
                </ul>
            </div>}
        </section>
        {/* {onModal && chosenOrder && <TripModal trip={chosenOrder} setOnModal={setOnModal} />} */}
    </>
}