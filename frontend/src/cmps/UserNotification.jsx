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

    // socketService.emit(SOCKET_SERVICE_NOTIFICATION, ['Please login first', 0])
    function promptNotification(data) {
        setMsg(data[0])
        setTimeout(() => {
            setMsg('')
        }, 3500)
    }

    if (!msg) return <span></span>
    return (
        <section className='notification-msg'>
            <button onClick={() => setMsg('')}>x</button>
            <p>{msg}</p>
        </section>
    )
}