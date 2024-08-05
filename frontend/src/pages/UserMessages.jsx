import { useEffect, useState } from "react"

import { userService } from '../services/user.service'
import { orderService } from "../services/order.service"

import { Loading } from '../cmps/Loading'
import { utilService } from "../services/util.service"

import { ReservationInfoModal } from "../cmps/UserMessageCmps/ReservationInfoModal"

export function UserMessages() {
    const [orders, setOrders] = useState(null)
    const [filter, setFilter] = useState({ type: '', unread: false })

    const [chosenOrderIdx, setChosenOrderIdx] = useState(0)
    const [order, setOrder] = useState(null)
    const [isReserveInfoModal, setReserveInfoModal] = useState(false)

    useEffect(() => {
        setupOrders()
    }, [])

    async function setupOrders() {
        try {
            const user = userService.getLoggedInUser()
            const orders = await orderService.getUserOrdersById(user._id)
            setOrders(orders)
            setOrder(orders[0])
        } catch (err) { console.log(err) }
    }

    function handleFilterChange(val) {
        if (val === 'unread') setFilter({ ...filter, unread: !filter.unread })
        else setFilter({ ...filter, type: val.target.value })
    }

    function handleMsgChange(idx, order) {
        setChosenOrderIdx(idx)
        setOrder(order)
    }

    function handleKeyDown(ev) {
        if (ev.key === 'Enter') console.log(ev)
    }

    async function getHostName(order) {
        try {
            const host = await userService.getById(order.hostId)
            return host.fullname
        } catch (err) { console.log(err) }
    }

    function onReserveInfoModal() {
        setReserveInfoModal(!isReserveInfoModal)
    }


    if (!orders || !orders.length) return <Loading />
    return <section className="user-messages grid">

        <section className="message-list">
            <header>
                <h1>Messages</h1>
                <div className="action-btns flex">
                    <select className="filter" name="filter" onChange={handleFilterChange}>
                        <option value="all">All</option>
                        <option value="hosting">Hosting</option>
                        <option value="traveling">Traveling</option>
                        <option value="support">Support</option>
                    </select>
                    <button onClick={() => handleFilterChange('unread')} className={`unread-btn ${(filter.unread) ? 'selected' : ''}`}>Unread</button>
                </div>
            </header>

            <ul>{orders.map((order, idx) =>
                <li key={order._id} onClick={() => handleMsgChange(idx, order)} className={`flex ${(chosenOrderIdx === idx) ? 'selected' : ''}`}>
                    <img src={`${order.stay.img}`} />
                    <div className="msg-info flex column">
                        <div className="flex space-between align-center">
                            <h5 className="name">Host name</h5> {/* <h5>{getHostName(order)}</h5> */}
                            <p className="date">DD/MM/YY</p> {/*date of last msg*/}
                        </div>
                        <p className="msg-intro">last message intro</p>
                        <p className="stay-info">{utilService.timestampsToShortDates(order.entryDate, order.exitDate)} · {order.stay.location.city}</p>
                    </div>
                </li>)}
            </ul>
        </section>

        <section className="read-messages">
            <header className="flex align-center">
                <button className="back-list-btn flex center"></button>
                <img src={`${order.stay.img}`} />
                <h5 className="name">Host name</h5> {/* <h5>{getHostName(order)}</h5> */}
                <button className="reserve-btn-tablet" onClick={onReserveInfoModal}>Show reservation</button>
                <button className="reserve-btn-mobile" onClick={onReserveInfoModal}>Details</button>
            </header>

            <ul className="flex column">
                {/* {map((msg, idx) =>
                    <li key={idx} className={msg.by}>
                        <div>{msg.by} {msg.at}</div>
                        <pre>{msg.txt}</pre>
                    </li>)} */}
            </ul>

            <footer>
                <input type="text" placeholder="Type a message" onKeyDown={handleKeyDown} />
            </footer>
        </section>

        <section className="reservation-details reservation-details-not-modal">
            <header>
                <h1>Reservation</h1>
            </header>

            <main>
                <h2 className="title">{order.stay.name}</h2>
                <img src={order.stay.img} />

                <div className="dates flex space-between">
                    <div className="start flex column">
                        <h4>Starts</h4>
                        <p>{utilService.timestampToDateAndTimeObj(+order.entryDate).date}</p>
                        <p>{utilService.timestampToDateAndTimeObj(+order.entryDate).time}</p>
                    </div>

                    <div className="end flex column">
                        <h4>Ends</h4>
                        <p>{utilService.timestampToDateAndTimeObj(+order.exitDate).date}</p>
                        <p>{utilService.timestampToDateAndTimeObj(+order.exitDate).time}</p>
                    </div>
                </div>

                <div className="confirmation">
                    <h4>Confirmation code</h4>
                    <p>{order._id.slice(18)}</p>
                </div>

                <div className="directions">
                    <h3>Getting there</h3>
                    <h4>Address</h4>
                    <p>{order.stay.location.address}, {order.stay.location.city}, {order.stay.location.country}</p>
                </div>

                <div className="payment-info">
                    <h3>Payment info</h3>
                    <h4>Total cost</h4>
                <p>$ {order.stay.price} USD</p>
                </div>
            </main>
        </section>

        {isReserveInfoModal && <ReservationInfoModal order={order} onReserveInfoModal={onReserveInfoModal} />}
    </section>
}