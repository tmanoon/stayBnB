import { useParams, useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'

import { stayService } from '../services/stay.service'
import { utilService } from '../services/util.service'
import { addOrder } from '../store/actions/order.actions'

import { PaymentModal } from '../cmps/StayReservationCmps/PaymentModal'
import { PaymentForm } from '../cmps/StayReservationCmps/PaymentForm'
import { AddPhoneModal } from '../cmps/StayReservationCmps/AddPhoneModal'
import { Loading } from '../cmps/Loading'
import { GuestCountModal } from '../cmps/Modals/GuestCountModal'
import { DatesModal } from '../cmps/Modals/DatesModal'
import { OrderConfirmation } from '../cmps/StayReservationCmps/OrderConfirmation'

export function StayPayment() {
    const { stayId } = useParams()

    const location = useLocation()
    const navigate = useNavigate()

    const [URLSearchParams, setUrlSearchParams] = useSearchParams()
    const { adults, children, infants, pets, entryDate, exitDate } = Object.fromEntries(URLSearchParams.entries())
    const [searchParams, setSearchParams] = useState({ adults, children, infants, pets, entryDate, exitDate })

    const [stay, setStay] = useState('')
    const [order, setOrder] = useState(null)
    const [userOrderDetails, setUserOrderDetails] = useState({ card: { cardNum: '', expDate: '', cvv: '', zip: '' }, phone: '' })
    const [isOrder, setIsOrder] = useState(false)
    const [modalType, setModal] = useState(null)

    useEffect(() => {
        if (stayId) loadStay()
    }, [])

    useEffect(() => {
        setUrlSearchParams(searchParams)
    }, [searchParams])

    async function loadStay() {
        try {
            const stay = await stayService.getById(stayId)
            setStay(stay)
        } catch (err) { console.log(err) }
    }

    async function checkAndValidateOrder() {
        try {
            const orderToAdd = await addOrder(searchParams, stay)
            setOrder(orderToAdd)
            setIsOrder(true)
        } catch (err) {
            console.log('err', err)
            throw err
        }
    }

    function onUserOrderDetails(ev) {
        ev.stopPropagation()
        const { value, name } = ev.target
        if (name in userOrderDetails.card) {
            setUserOrderDetails((prevUserOrderDetails) => ({ ...prevUserOrderDetails, card: { ...prevUserOrderDetails.card, [name]: value } }))
        }
        if (name === 'phone') setUserOrderDetails((prevUserOrderDetails) => ({ ...prevUserOrderDetails, phone: value }))
    }

    function onModal(type = null) {
        setModal(type)
    }

    function onClose() {
        navigate(`/${stay._id}?${utilService.getFormattedParams(searchParams)}`)
    }

    if (!stay) return <Loading currentPage={"payment"} />
    return (
        <section className="stay-payment grid">
            <section className="payment-details">

                <header className="flex">
                    <button className='back-btn' onClick={onClose}></button>
                    <h1>{stay.isInstantBooking ? 'Confirm to pay' : 'Request to book'}</h1>
                </header>

                <article className="reservation-details">
                    <h2>Your trip</h2>

                    <div className='dates flex space-between'>
                        <div className="flex column">
                            <h4>Dates</h4>
                            <p>{utilService.timestampsToShortDates(+searchParams.entryDate, +searchParams.exitDate)}</p>
                        </div>
                        <button onClick={() => onModal('dates')}>Edit</button>
                    </div>

                    <div className='guests flex space-between'>
                        <div className='flex column'>
                            <h4>Guests</h4>
                            <p>{stayService.guestCountStringForReservation(searchParams)}</p>
                        </div>
                        <button onClick={() => onModal('guests')}>Edit</button>
                    </div>

                    {modalType === 'guests' && <><div className='clearOverlay' onClick={() => onModal(null)}></div> <GuestCountModal stay={stay} searchParams={searchParams} setSearchParams={setSearchParams} onModal={onModal} /></>}
                    {modalType === 'dates' && <><div className='clearOverlay' onClick={() => onModal(null)}></div> <DatesModal stay={stay} searchParams={searchParams} setSearchParams={setSearchParams} /></>}
                </article>

                {stay && <>
                    <PaymentForm userOrderDetails={userOrderDetails} onUserOrderDetails={onUserOrderDetails} />
                    <article className='required-info'>
                        <h2>Required for your trip</h2>
                        <div className='flex space-between'>
                            <div className='text flex column'>
                                <h4>Phone number</h4>
                                <p>Add and confirm your phone number to get trip updates.</p>
                            </div>

                            <button onClick={() => onModal('phone')}>Add</button>
                        </div>
                        {modalType === 'phone' && <AddPhoneModal onModal={onModal} userOrderDetails={userOrderDetails} onUserOrderDetails={onUserOrderDetails} />}
                    </article>
                    <article className='cancellation-policy flex column'>
                        <h2>Cancellation policy</h2>
                        <p>This reservation is non-refundable. <span className='learn-policy'>Learn more</span></p>
                    </article>
                    <article className='ground-rules'>
                        <h2>Ground rules</h2>
                        <p>We ask every guest to remember a few simple things about what makes a great guest.</p>
                        <ul className='rules'>
                            <li>Follow the house rules</li>
                            <li>Treat your Host’s home like your own</li>
                        </ul>
                    </article>
                    <article className='confirmation flex column'>
                        <p>By selecting the button below, I agree to the <span>Host's House Rules</span>, <span>Ground rules for guests</span>, <span>Airbnb's Rebooking and Refund Policy</span>, and that Airbnb can <span>charge my payment method</span> if I’m responsible for damage.</p>
                        <button className='confirm-btn' onClick={checkAndValidateOrder}>Confirm and pay</button>
                    </article>

                    {isOrder && <OrderConfirmation stay={stay} order={order} />}
                </>}

            </section>
            <PaymentModal stay={stay} searchParams={searchParams} />
        </section>
    )
}
