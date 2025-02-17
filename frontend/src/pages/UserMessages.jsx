import { useEffect, useState, useRef } from "react"

import { chatService } from "../services/chat.service"
import { userService } from '../services/user.service'
import { orderService } from "../services/order.service"
import { utilService } from "../services/util.service"

import { Loading } from '../cmps/Loading'
import { ReservationInfoModal } from "../cmps/UserMessageCmps/ReservationInfoModal"
import { ImgCarousel } from "../cmps/HelperCmps/ImgCarousel"
import { SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_SERVICE_SCROLL_CHAT, socketService } from "../services/socket.service"

export function UserMessages() {
    const [user, setUser] = useState(userService.getLoggedInUser())
    const [chats, setChats] = useState(null)
    const [orders, setOrders] = useState(null)
    const [currChat, setCurrChat] = useState(null)
    const [currOrder, setCurrOrder] = useState(null)
    const [filter, setFilter] = useState({ type: 'all', unread: false })
    const [newTxt, setNewTxt] = useState('')
    const [chosenContent, setChosenContent] = useState('chat')
    const [isReserveInfoModal, setReserveInfoModal] = useState(false)
    const chatRef = useRef()

    useEffect(() => {
        socketService.on(SOCKET_EVENT_ADD_MSG, updateMsgs)
        socketService.on(SOCKET_SERVICE_SCROLL_CHAT, scrollChat)
        
        async function getOrders() {
            try {
                const fetchedOrders = await orderService.getUserOrHostOrdersById(user._id)
                if (fetchedOrders) setOrders(fetchedOrders)
            } catch (err) {
                console.log(err)
            }
        }

        getOrders()

        return () => socketService.off(SOCKET_EVENT_ADD_MSG)
    }, [])

    useEffect(() => {
        async function getChats() {
            try {
                const fetchedChats = await chatService.query(filter)
                if (fetchedChats) {
                    setChats(fetchedChats)
                    setCurrChat(fetchedChats[0])
                }
            } catch (err) {
                console.log(err)
            }
        }

        getChats()
    }, [filter])

    useEffect(() => {
        async function fetchOrder() {
            try {
                if (currChat && !currOrder) {
                    const fetchedOrder = await orderService.getById(currChat.orderId)
                    setCurrOrder(fetchedOrder)
                } else {
                    setCurrOrder(null)
                }
            } catch (err) {
                console.log(err)
            }
        }
        scrollChat()
        fetchOrder()
    }, [currChat])

    useEffect(() => {
        if (currChat) {
            const chatToUpdate = chats.find(chat => chat._id === currChat._id)
            setCurrChat(chatToUpdate)
            scrollChat()
        }
    }, [chats])

    const updateMsgs = async updatedChat => {
        const chats = await await chatService.query(filter)
        const chatsToUpdate = chats.map(chat => {
            if (chat._id === updatedChat._id) return updatedChat
            return chat
        })
        setChats(prevChats => (chatsToUpdate))
    }

    const orderDetails = chat => {
        const order = orders.find(order => order._id === chat.orderId)
        return order
    }

    function handleFilterChange(val) {
        if (val === 'unread') setFilter({ ...filter, unread: !filter.unread })
        else setFilter({ ...filter, type: val.target.value })
    }

    function handleMsgChange(chat) {
        setCurrChat(chat)
        setChosenContent('chat')
    }

    function goBackToList() {
        setChosenContent('list')
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
        socketService.emit(SOCKET_EMIT_SEND_MSG, currChat)
        setNewTxt('')
        try {
            await chatService.update(currChat)
        } catch (err) {
            console.log(err)
        }
    }

    function onReserveInfoModal() {
        setReserveInfoModal(!isReserveInfoModal)
    }

    function scrollChat() {
        chatRef.current?.scrollTo(0, chatRef.current.scrollHeight)
    }

    if (!orders || !orders.length) return <Loading />
    return (
        <section className="user-messages grid">
            <section className={`chat-list ${chosenContent === 'list' ? '' : 'hidden'}`}>
                <header>
                    <h1>Messages</h1>
                    <div className="action-btns flex">
                        <select className="filter" name="type" onChange={handleFilterChange}>
                            <option value="all">All</option>
                            <option value="host">Hosting</option>
                            <option value="buyer">Traveling</option>
                        </select>
                        {/* <button onClick={() => handleFilterChange('unread')} className={`unread-btn ${(filter.unread) ? 'selected' : ''}`}>Unread</button> */}
                    </div>
                </header>

                {chats && chats.length && currChat && orders &&
                    <ul>{chats.map(chat =>
                        <li key={chat._id} onClick={() => handleMsgChange(chat)} className={`flex ${(chat._id === currChat._id) ? 'selected' : ''}`}>
                            <img src={`${orderDetails(chat).stay.imgUrls[0]}`} />
                            <div className="msg-info flex column">
                                <div className="flex space-between align-center">
                                    <h5 className="name">{chatService.getUserPosition(user._id, chat) === 'host' ? chat.buyer.fullname.split(' ')[0] : chat.host.fullname.split(' ')[0]}</h5>
                                    <p className="date">{utilService.timestampToFullSlashedDate(chat.createdAt)}</p>
                                </div>
                                <p className="msg-intro">{(chat.msgs && chat.msgs.length) ? chat.msgs[chat.msgs.length - 1].txt.slice(0, 30) : ''}</p>
                                <p className="stay-info">{utilService.timestampsToShortDates(orderDetails(chat).entryDate, orderDetails(chat).exitDate)} · {orderDetails(chat).stay.location.city}, {orderDetails(chat).stay.location.country}</p>
                            </div>
                        </li>)}
                    </ul>}
            </section>

            <section className={`read-chat ${chosenContent === 'chat' ? '' : 'hidden'}`}>
                <header className="flex align-center">
                    <button className="back-list-btn flex center" onClick={goBackToList}></button>
                    {currChat && currOrder && <>
                        <img src={chatService.getUserPosition(user._id, currChat) === 'host' ? currChat.buyer.imgUrl : currChat.host.imgUrl} />
                        <h5 className="name">{chatService.getUserPosition(user._id, currChat) === 'host' ? currChat.buyer.fullname.split(' ')[0] : currChat.host.fullname.split(' ')[0]}</h5>
                    </>}
                    {currOrder && <button className="reserve-btn-tablet" onClick={onReserveInfoModal}>Show reservation</button>}
                    {currOrder && <button className="reserve-btn-mobile" onClick={onReserveInfoModal}>Details</button>}
                </header>

                <ul className="flex column" ref={chatRef}>
                    {currChat && currChat.msgs.length > 0 && <>
                        {currChat.msgs.map((msg, idx) =>
                            <li key={idx} className={`flex column ${(user._id === msg.by) ? 'user' : 'other'}`}>
                                {(currChat.host._id === msg.by) && <div><span>{currChat.host.fullname.split(' ')[0]}</span>  &nbsp; &nbsp; {utilService.timestampToDateAndTimeObj(msg.at).shortDate} &nbsp; {utilService.timestampToDateAndTimeObj(msg.at).time}</div>}
                                {(currChat.host._id !== msg.by) && <div><span>{currChat.buyer.fullname.split(' ')[0]}</span>  &nbsp; &nbsp; {utilService.timestampToDateAndTimeObj(msg.at).shortDate} &nbsp; {utilService.timestampToDateAndTimeObj(msg.at).time}</div>}
                                <pre>{msg.txt}</pre>
                            </li>)}
                    </>
                    }
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
                    <div className="img-container">
                        <ImgCarousel imgUrls={currOrder.stay.imgUrls} />
                    </div>

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
    )
}