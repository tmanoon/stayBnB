import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { utilService } from '../../services/util.service'

export function OrderConfirmation({ stay, order }) {
    const [isShownModal, setIsShownModal] = useState(true)
    const sumToPay = Math.round(utilService.calcSumToPay({
        entryDate: +order.entryDate,
        exitDate: +order.exitDate,
        adults: order.guests.adults,
        children: order.guests.children,
    }, stay))
    const navigate = useNavigate()

    function onCloseModal(e) {
        e.stopPropagation()
        setIsShownModal(false)
        navigate('/trips')
    }

    return (
        isShownModal &&
        <>
            <div className='overlay' onClick={onCloseModal}></div>

            <section className="order-confirmation">
                <header className="order-header flex center">
                    <button onClick={onCloseModal} className='exit-btn flex center'></button>
                    <h1 className="order-reserved">Reservation confirmed</h1>
                </header>

                <div className='order-details grid'>
                    <img src={stay.imgUrls[0]} title={stay.name} />

                    <h1>Reservation details</h1>

                    <div className='user flex column'>
                        <p>Guest name:</p>
                        <h5>{order.buyer.fullname}</h5>
                    </div>

                    <div className='stay-name flex column'>
                        <p>Property name:</p>
                        {/* <h5>{stay.name}</h5> */}
                        <h5>{stay.propertyType} in {stay.loc.city}, {stay.loc.country}</h5>
                    </div>

                    <div className='booking-number flex column'>
                        <p>Booking number:</p>
                        <h5>{order._id.slice(18)}</h5>
                    </div>

                    <div className='dates grid'>
                        <div className='flex column'>
                            <p>Check-in:</p>
                            <h5>{utilService.timestampToDate(+order.entryDate)}</h5>
                        </div>

                        <div className='flex column'>
                            <p>Check-out:</p>
                            <h5>{utilService.timestampToDate(+order.exitDate)}</h5>
                        </div>
                    </div>

                    <div className='guests-rooms grid'>
                        <div className='guests-container flex column'>
                            <div className='guests flex'>
                                <p>Total guests:</p>
                                <h5>{utilService.calcGuestCount(order)}</h5>
                            </div>
                            <ul>
                                {+order.guests.adults > 0 && <li>{+order.guests.adults === 1 ? `${order.guests.adults} adult` : `${order.guests.adults} adults`}</li>}
                                {+order.guests.children > 0 && <li>{+order.guests.children === 1 ? `${order.guests.children} child` : `${order.guests.children} children`}</li>}
                                {+order.guests.infants > 0 && <li>{+order.guests.infants === 1 ? `${order.guests.infants} infant` : `${order.guests.infants} infants`}</li>}
                                {+order.guests.pets > 0 && <li>{+order.guests.pets === 1 ? `${order.guests.pets} pet` : `${order.guests.pets} pets`}</li>}
                            </ul>
                        </div>

                        <div className='rooms flex column'>
                            <p>Total Rooms:</p>
                            <h5>{stay.bedrooms.length}</h5>
                        </div>
                    </div>

                    <div className='price flex column'>
                        <div className='flex space-between'>
                            <p>Price:</p>
                            <p className='flex align-center'>$ {stay.price.toLocaleString()} X {utilService.calcSumOfDays({entryDate: order.entryDate, exitDate: order.exitDate})} nights
                                <span>$ {(Math.round(sumToPay)).toLocaleString()}</span></p>
                        </div>
                        <div className='flex space-between'>
                            <p>Service fee:</p>
                            <p>$ {(Math.round(sumToPay * 0.14125)).toLocaleString()}</p>
                        </div>
                        <div className='flex space-between'>
                            <h4>Total:</h4>
                            <p><span>$ {(Math.round(sumToPay) + Math.round(sumToPay * 0.14125)).toLocaleString()}</span></p>
                        </div>
                    </div>
                </div>

                <footer className='flex center'>
                    <button className="close-btn flex center" onClick={onCloseModal}>Close</button>
                </footer>
            </section>

        </>
    )
}
