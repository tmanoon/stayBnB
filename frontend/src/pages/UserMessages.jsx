import { useEffect, useState } from "react"

import { chatService } from "../services/chat.service"
import { userService } from '../services/user.service'
import { orderService } from "../services/order.service"
import { utilService } from "../services/util.service"

import { Loading } from '../cmps/Loading'
import { ReservationInfoModal } from "../cmps/UserMessageCmps/ReservationInfoModal"

export function UserMessages() {
    const [user, setUser] = useState(userService.getLoggedInUser())
    const [chats, setChats] = useState(null)
    const [currChat, setCurrChat] = useState(null)
    const [currOrder, setCurrOrder] = useState(null)

    const [filter, setFilter] = useState({ type: 'all', unread: false })
    const [isReserveInfoModal, setReserveInfoModal] = useState(false)

    useEffect(() => {
        async function getChats() {
            try {
                const fetchedChats = await chatService.query(filter)
                console.log('chats from back: ', fetchedChats)

                if (fetchedChats) {
                    setChats(fetchedChats)
                    setCurrChat(fetchedChats[0])
                }
            } catch (err) { console.log(err) }
        }

        getChats()
    }, [filter])


    useEffect(() => {
        console.log('chats from state: ', chats)
    }, [chats])

    useEffect(() => {
        async function fetchOrder() {
            if (currChat) {
                console.log('currChat: ', currChat)

                try {
                    const fetchedOrder = await orderService.getById(currChat.orderId)
                    setCurrOrder(fetchedOrder)
                } catch (err) { console.log(err) }
            }
        }

        fetchOrder()
    }, [currChat])

    function handleFilterChange(val) {
        if (val === 'unread') setFilter({ ...filter, unread: !filter.unread })
        else setFilter({ ...filter, type: val.target.value })
    }

    function handleMsgChange(chat) {
        setCurrChat(chat)
    }

    function handleKeyDown(ev) {
        if (ev.key === 'Enter') console.log(ev)
    }

    function sendMsg({ target }) {
        const { value, name } = target
        console.log(value, name)
    }

    function onReserveInfoModal() {
        setReserveInfoModal(!isReserveInfoModal)
    }

    if (!chats || !chats.length) return <Loading />
    return <section className="user-messages grid">
        <section className="chat-list">
            <header>
                <h1>Messages</h1>
                <div className="action-btns flex">
                    <select className="filter" name="filter" onChange={handleFilterChange}>
                        <option value="all">All</option>
                        <option value="host">Hosting</option>
                        <option value="buyer">Traveling</option>
                    </select>
                    <button onClick={() => handleFilterChange('unread')} className={`unread-btn ${(filter.unread) ? 'selected' : ''}`}>Unread</button>
                </div>
            </header>

            {chats && chats.length && currChat && currOrder &&
                <ul>{chats.map(chat =>
                    <li key={chat._id} onClick={() => handleMsgChange(chat)} className={`flex ${(chat._id === currChat._id) ? 'selected' : ''}`}>
                        <img src={`${currOrder.stay.imgUrl}`} />
                        <div className="msg-info flex column">
                            <div className="flex space-between align-center">
                                <h5 className="name">{chatService.getUserPosition(user._id, chat) === 'host' ? chat.host.fullname : chat.buyer.fullname}</h5>
                                <p className="date">{utilService.timestampToFullSlashedDate(chat.createdAt)}</p>
                            </div>
                            <p className="msg-intro">{(chat.msgs && chat.msgs.length) ?chat.msgs[-1].slice(0, 10) : ''}</p>
                            <p className="stay-info">{utilService.timestampsToShortDates(currOrder.entryDate, currOrder.exitDate)} · {currOrder.stay.location.city}</p>
                        </div>
                    </li>)}
                </ul>}
        </section>

        <section className="read-chat">
            <header className="flex align-center">
                <button className="back-list-btn flex center"></button>
                {currChat && currOrder && <>
                    <img src={`${currOrder.stay.imgUrl}`} />
                    <h5 className="name">{chatService.getUserPosition(user._id, currChat) === 'host' ? currChat.host.fullname : currChat.buyer.fullname}</h5>
                </>}
                <button className="reserve-btn-tablet" onClick={onReserveInfoModal}>Show reservation</button>
                <button className="reserve-btn-mobile" onClick={onReserveInfoModal}>Details</button>
            </header>

            {currChat.msgs && currChat.msgs.length &&
                <ul className="flex column">{currChat.map((msg, idx) =>
                    <li key={idx} className={msg.by}>
                        <div>{msg.by} {msg.at}</div>
                        <pre>{msg.txt}</pre>
                    </li>)}
                </ul>}

            <footer>
                <form onSubmit={sendMsg}>
                    <input type="text" name='msg' placeholder="Type a message" onKeyDown={handleKeyDown} />
                </form>
            </footer>
        </section>

        <section className="reservation-details reservation-details-not-modal">
            <header>
                <h1>Reservation</h1>
            </header>

            {currOrder && <main>
                <h2 className="title">{currOrder.stay.name}</h2>
                <img src={currOrder.stay.imgUrl} />

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

        {isReserveInfoModal && <ReservationInfoModal order={currOrder} onReserveInfoModal={onReserveInfoModal} />}
    </section>
}