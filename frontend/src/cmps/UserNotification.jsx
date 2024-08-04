import { useState, useEffect } from 'react'
import { socketService, SOCKET_SERVICE_NOTIFICATION } from '../services/socket.service'

export function UserNotification() {
    const [msg, setMsg] = useState('')

    useEffect(() => {
        socketService.on(SOCKET_SERVICE_NOTIFICATION, promptNotification)
        return () => {
            socketService.off(SOCKET_SERVICE_NOTIFICATION, promptNotification)
        }
    }, [])

    function promptNotification(data) {
        setMsg(data)
        setTimeout(() => {
            setMsg('')
        }, 3500)
    }

    if (!msg) return <span></span>
    return (
        <section className='notification-msg'>
            <h1>New notification</h1>
            <button onClick={() => setMsg('')}>x</button>
            <p>{msg}</p>
        </section>
    )
}