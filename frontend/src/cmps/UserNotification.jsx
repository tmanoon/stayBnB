import { useState, useEffect } from 'react'
import { socketService, SOCKET_SERVICE_NOTIFICATION } from '../services/socket.service'
export function UserNotification() {
    // const [isNotification, setIsNotification] = useState(false)
    const [msg, SetMsg] = useState('')
    
    // useEffect(() => {
    //     socketService.on(SOCKET_SERVICE_NOTIFICATION, promptNotification)
    // }, [])

    // function promptNotification(data) {
    //     // setIsNotification(true)
    //     console.log(data)
    //     SetMsg(`The order status of your Staybnb place: ${data.stay.name} has been updated.`)
    //     setTimeout(() => { SetMsg('')},1000)
    // }

    if(!msg) return <span></span>
    return <div className='notification-msg'>
    {msg}
    </div>
}