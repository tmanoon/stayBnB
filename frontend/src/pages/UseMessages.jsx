import { useState } from "react"

export function UserMessages() {
    const [filter, setFilter] = useState({ type: '', unread: false })

    function handleChange(val) {
        if (val === 'unread') setFilter({ ...filter, unread: !filter.unread })
        else setFilter({ ...filter, type: val.target.value })
    }

    return <section className="user-messages grid">

        <section className="message-list">
            <header>
                <h1>Messages</h1>
                <div className="action-btns">
                    <select className="filter" name="filter" onChange={handleChange}>
                        <option value="all">All</option>
                        <option value="hosting">Hosting</option>
                        <option value="traveling">Traveling</option>
                        <option value="support">Support</option>
                    </select>
                    <button onChange={() => handleChange('unread')} className="unread-btn">Unread</button>
                </div>
            </header>

            <ul>
                <li>
                </li>
            </ul>
        </section>

        <section className="read-messages">

        </section>

        <section className="reservation">
            <h1>Reservation</h1>

        </section>
    </section>
}