import { useEffect, useState } from "react"

import { chatService } from "../services/chat.service"
import { userService } from '../services/user.service'
import { orderService } from "../services/order.service"
import { utilService } from "../services/util.service"

import { Loading } from '../cmps/Loading'
import { ReservationInfoModal } from "../cmps/UserMessageCmps/ReservationInfoModal"
import { ImgCarousel } from "../cmps/HelperCmps/ImgCarousel"

export function UserMessages() {
    const [user, setUser] = useState(userService.getLoggedInUser())
    const [chats, setChats] = useState(null)
    const [orders, setOrders] = useState(null)
    const [currChat, setCurrChat] = useState(null)
    const [currOrder, setCurrOrder] = useState(null)
    const [filter, setFilter] = useState({ type: 'all', unread: false })

    const [newTxt, setNewTxt] = useState('')

    const [isReserveInfoModal, setReserveInfoModal] = useState(false)

    useEffect(() => {
        async function getOrders() {
            try {
                const fetchedOrders = await orderService.getUserOrHostOrdersById(user._id)
                if (fetchedOrders) {
                    setOrders(fetchedOrders)
                }
            } catch (err) { console.log(err) }
        }

        getOrders()
    }, [])

    useEffect(() => {
        async function getChats() {
            try {
                const fetchedChats = await chatService.query(filter)

                if (fetchedChats) {
                    setChats(fetchedChats)
                    setCurrChat(fetchedChats[0])
                }
            } catch (err) { console.log(err) }
        }

        getChats()
    }, [filter])

    useEffect(() => {
        async function fetchOrder() {
            if (currChat) {
                try {
                    const fetchedOrder = await orderService.getById(currChat.orderId)
                    setCurrOrder(fetchedOrder)
                } catch (err) { console.log(err) }
            } else {
                setCurrOrder(null)
            }
        }

        fetchOrder()
    }, [currChat])

    const orderDetails = (chat) => {
        const order = orders.find(order => order._id === chat.orderId)
        return order
    }

    function handleFilterChange(val) {
        if (val === 'unread') setFilter({ ...filter, unread: !filter.unread })
        else setFilter({ ...filter, type: val.target.value })
    }

    function handleMsgChange(chat) {
        setCurrChat(chat)
    }

    function onMsgInput(ev) {
        const val = ev.target.value
        setNewTxt(val)
    }

    async function onSendMsg(ev) {
        ev.preventDefault()
        const newMsg = chatService.getEmptyMsg()
        newMsg.txt = newTxt
        currChat.msgs.push(newMsg)
        setNewTxt('')
        try {
            await chatService.update(currChat)
        } catch (err) { console.log(err) }
        console.log(newMsg)
    }

    function onReserveInfoModal() {
        setReserveInfoModal(!isReserveInfoModal)
    }

    if (!orders || !orders.length) return <Loading />
    return <section className="user-messages grid">
        <section className="chat-list">
            <header>
                <h1>Messages</h1>
                <div className="action-btns flex">
                    <select className="filter" name="type" onChange={handleFilterChange}>
                        <option value="all">All</option>
                        <option value="host">Hosting</option>
                        <option value="buyer">Traveling</option>
                    </select>
                    <button onClick={() => handleFilterChange('unread')} className={`unread-btn ${(filter.unread) ? 'selected' : ''}`}>Unread</button>
                </div>
            </header>

            {chats && chats.length && currChat && orders &&
                <ul>{chats.map(chat =>
                    <li key={chat._id} onClick={() => handleMsgChange(chat)} className={`flex ${(chat._id === currChat._id) ? 'selected' : ''}`}>
                        <img src={`${orderDetails(chat).stay.imgUrls[0]}`} />
                        <div className="msg-info flex column">
                            <div className="flex space-between align-center">
                                <h5 className="name">{chatService.getUserPosition(user._id, chat) === 'host' ? chat.buyer.fullname : chat.host.fullname}</h5>
                                <p className="date">{utilService.timestampToFullSlashedDate(chat.createdAt)}</p>
                            </div>
                            <p className="msg-intro">{(chat.msgs && chat.msgs.length) ? chat.msgs[chat.msgs.length - 1].txt.slice(0, 30) : ''}</p>
                            <p className="stay-info">{utilService.timestampsToShortDates(orderDetails(chat).entryDate, orderDetails(chat).exitDate)} · {orderDetails(chat).stay.location.city}, {orderDetails(chat).stay.location.country}</p>
                        </div>
                    </li>)}
                </ul>}
        </section>

        <section className="read-chat">
            <header className="flex align-center">
                <button className="back-list-btn flex center"></button>
                {currChat && currOrder && <>
                    <img src={chatService.getUserPosition(user._id, currChat) === 'host' ? currChat.buyer.imgUrl : currChat.host.imgUrl} />
                    <h5 className="name">{chatService.getUserPosition(user._id, currChat) === 'host' ? currChat.buyer.fullname.split(' ')[0] : currChat.host.fullname.split(' ')[0]}</h5>
                </>}
                {currOrder && <button className="reserve-btn-tablet" onClick={onReserveInfoModal}>Show reservation</button>}
                {currOrder && <button className="reserve-btn-mobile" onClick={onReserveInfoModal}>Details</button>}
            </header>

            <ul className="flex column">
                {currChat && currChat.msgs.length && <>
                    {currChat.msgs.map((msg, idx) =>
                        <li key={idx}  className={`flex column ${(user._id === msg.by)? 'user' : 'other'}`}>
                            {(currChat.host._id === msg.by) && <div><span>{currChat.host.fullname.split(' ')[0]}</span>  &nbsp; &nbsp; {utilService.timestampToDateAndTimeObj(msg.at).shortDate} {utilService.timestampToDateAndTimeObj(msg.at).time}</div>}
                            {(currChat.host._id !== msg.by) && <div><span>{currChat.buyer.fullname.split(' ')[0]}</span>  &nbsp; &nbsp; {utilService.timestampToDateAndTimeObj(msg.at).shortDate} {utilService.timestampToDateAndTimeObj(msg.at).time}</div>}
                            <pre>{msg.txt}</pre>
                        </li>)}
                </>}
            </ul>

            <footer>
                <form onSubmit={onSendMsg}>
                    <input type="text" placeholder="Type a message" name='msg' value={newTxt} onChange={onMsgInput} />
                </form>
            </footer>
        </section>

        <section className="reservation-details reservation-details-not-modal">
            <header>
                <h1>Reservation</h1>
            </header>

            {currOrder && <main>
                <h2 className="title">{currOrder.stay.name}</h2>
                <ImgCarousel imgUrls={currOrder.stay.imgUrls} />

                <div className="dates flex space-between">
                    <div className="start flex column">
                        <h4>Starts</h4>
                        <p>{utilService.timestampToDateAndTimeObj(+currOrder.entryDate).date}</p>
                        <p>{utilService.timestampToDateAndTimeObj(+currOrder.entryDate).time}</p>
                    </div>

                    <div className="end flex column">
                        <h4>Ends</h4>
                        <p>{utilService.timestampToDateAndTimeObj(+currOrder.exitDate).date}</p>
                        <p>{utilService.timestampToDateAndTimeObj(+currOrder.exitDate).time}</p>
                    </div>
                </div>

                <div className="confirmation">
                    <h4>Confirmation code</h4>
                    <p>{currOrder._id.slice(18)}</p>
                </div>

                <div className="directions">
                    <h3>Getting there</h3>
                    <h4>Address</h4>
                    <p>{currOrder.stay.location.address}, {currOrder.stay.location.city}, {currOrder.stay.location.country}</p>
                </div>

                <div className="payment-info">
                    <h3>Payment info</h3>
                    <h4>Total cost</h4>
                    <p>$ {currOrder.stay.price} USD</p>
                </div>
            </main>}
        </section>

        {isReserveInfoModal && currOrder && <ReservationInfoModal order={currOrder} onReserveInfoModal={onReserveInfoModal} />}
    </section>
}