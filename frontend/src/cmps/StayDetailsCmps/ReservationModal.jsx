
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { utilService } from '../../services/util.service'
import { getDate, getMonth, getYear } from 'date-fns'
import { store } from '../../store/store'
import { GuestCountModal } from '../Modals/GuestCountModal'
import { stayService } from '../../services/stay.local.service'
import { DatesModal } from '../Modals/DatesModal'
import { DynamicModalHeader } from './DynamicHeader/DynamicModalHeader'
import { userService } from '../../services/user.service'
import { LoginSignup } from '../Modals/LoginSignup'

export function ReservationModal({ stay, searchParams, setSearchParams }) {
    const navigate = useNavigate()
    const [numOfDays, setNumOfDays] = useState(0)
    const [fee, setFee] = useState(0)
    const [isLoginModal, setIsLoginModal] = useState(false)
    const [modalType, setModal] = useState(null)
    const [isBtnScrolled, setIsBtnScrolled] = useState(false)
    const [btnObserver, setBtnObserver] = useState(null)
    const modal = useRef(null)
    const btn = useRef()

    useEffect(() => {
        setNumOfDays(utilService.calcSumOfDays(searchParams))
        loadBtnScrolledObserver()
        if (numOfDays) setFee(parseInt((numOfDays * stay.price) * 0.14125))
    }, [searchParams, numOfDays])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modal.current && !modal.current.contains(event.target)) setModal('')
        }
        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside) 
    }, [modal])

    useEffect(() => {
        if (btnObserver) btnObserver.observe(btn.current)
        return () => btnObserver?.disconnect() 
    }, [btnObserver])

    function loadBtnScrolledObserver() {
        let observationCount = 0
        const observer = new IntersectionObserver(entries => {
            observationCount++
            if (observationCount > 2) {
                const isGalleryVisible = store.getState().stayModule.isGalleryVisible
                if (!entries[0].isIntersecting && !isGalleryVisible) setIsBtnScrolled(true)
                else setIsBtnScrolled(false)
            }
        })
        setBtnObserver(observer)
    }

    function validateAndMoveToPayment(ev) {
        ev.stopPropagation()
        if (searchParams.entryDate && searchParams.exitDate && searchParams.adults) {
            const queryParams = utilService.getFormattedParams(searchParams)
            userService.getLoggedInUser() ? navigate(`/${stay._id}/payment?${queryParams}`) : setIsLoginModal(true)
        }
    }

    return <>
        {isBtnScrolled && <DynamicModalHeader stay={stay} searchParams={searchParams} />}
        <div className="reserve-modal" ref={modal}>
            <div className='container-price-selectors'>
                <div className="price-logo flex align-center">
                    <h2>${Math.ceil(stay.price)} &nbsp;</h2><span>night</span>
                </div>
            
                <div className='selectors-container flex column'>
                    <div className="date-selectors flex">
                        <div className='check-in flex' onClick={() => setModal(modalType === 'date' ? null : 'date')}>
                            <div className='txt flex column'>
                                <label>Check-in</label>
                                <div className='txt-date'>{getDate(+searchParams.entryDate)}/{getMonth(+searchParams.entryDate) + 1}/{getYear(+searchParams.entryDate)}</div>
                            </div>
                        </div>

                        <div className='checkout flex' onClick={() => setModal(modalType === 'date' ? null : 'date')} >
                            <div className='txt flex column'>
                                <label>Checkout</label>
                                <div className='txt-date'>
                                    {searchParams.exitDate && !isNaN(+searchParams.exitDate) ?
                                        `${getDate(+searchParams.exitDate)}/${getMonth(+searchParams.exitDate) + 1}/${getYear(+searchParams.exitDate)}` :
                                        "Add date"
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div ref={modal} className='guest-selector flex column' >
                        <label onClick={() => setModal(modalType === 'guest' ? null : 'guest')} className='guests'>Guests</label>
                        <div className='guest-container flex space-between' onClick={() => setModal(modalType === 'guest' ? null : 'guest')}>
                            {stayService.guestCountStringForReservation(searchParams)}
                            <span className={`arrow-${modalType === 'guest' ? 'up' : 'down'}`}></span>
                        </div>

                        {modalType === 'guest' && <GuestCountModal stay={stay} searchParams={searchParams} setSearchParams={setSearchParams} setModal={setModal} />}
                        {modalType === 'date' && <DatesModal stay={stay} searchParams={searchParams} setSearchParams={setSearchParams} />}
                    </div>
                </div>

                <button className='reserve-btn flex center' ref={btn} onClick={(event) => validateAndMoveToPayment(event)}>Reserve</button>
                {+searchParams.entryDate && +searchParams.exitDate && <p className='charged-p'>You won't be charged yet.</p>}
            </div>

            <div className='price-calc flex space-between'>
                <span>${stay.price} X {numOfDays === 1 ? `${numOfDays} night` : `${numOfDays} nights`}</span>
                <span className='sum'>${Math.ceil(stay.price * numOfDays * (+searchParams.adults + +searchParams.children))}</span>
            </div>

            {fee && <div className='fee-calc flex space-between'>
                <span>Staybnb service fee</span>
                <span>${fee}</span>
            </div>}
            
            {fee > 0 && <div className='sum-total flex space-between'>
                <span>Total</span>
                <span>${Math.ceil(stay.price * numOfDays * (+searchParams.adults + +searchParams.children) + fee)}</span>
            </div>}
        </div>

        <div className='reserve-footer flex align-center space-between'>
            <div className='flex column'>
                <p><span>${stay.price}</span> &nbsp;night</p>
                <p>{utilService.timestampsToShortDates(+searchParams.entryDate, +searchParams.exitDate)}</p>
            </div>
            <button className='flex center' onClick={(event) => validateAndMoveToPayment(event)}><span >Reserve</span></button>
        </div>
        {isLoginModal && <LoginSignup setIsLoginModal={setIsLoginModal} />}
    </>
}         