
import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { utilService } from '../../services/util.service'
import { getDate, getMonth, getYear } from 'date-fns'
import { GuestFilter } from '../HeaderCmps/GuestFilter'
import { store } from '../../store/store'
import { GuestCount } from './DetailsGuestCount'
import { stayService } from '../../services/stay.local.service'
import { StayDetailsDateModal } from './StayDetailsDateModal'
import { DynamicModalHeader } from './DynamicHeader/DynamicModalHeader'
import { userService } from '../../services/user.service'
import { LoginSignup } from '../LoginSignup'

export function ReservationModal({ stay, params, updateParams }) {
    const navigate = useNavigate()
    const headerFilterBy = useSelector(storeState => storeState.stayModule.headerFilterBy)
    const [numOfDays, setNumOfDays] = useState(0)
    const [fee, setFee] = useState(0)
    const [isLoginModal, setIsLoginModal] = useState(false)
    const [currArrow, setCurrArrow] = useState('down')
    const [modalType, openModalType] = useState()
    const [isBtnScrolled, setIsBtnScrolled] = useState(false)
    const [btnObserver, setBtnObserver] = useState(null)
    const ref = useRef(null)
    const btn = useRef()

    useEffect(() => {
        setNumOfDays(utilService.calcSumOfDays(params))
        loadBtnScrolledObserver()
    }, [params])

    useEffect(() => {
        setFee(parseInt((numOfDays * stay.price) * 0.14125))
    }, [numOfDays])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                openModalType('')
            }
        }
        document.addEventListener('click', handleClickOutside)
        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [ref])

    useEffect(() => {
        if (btnObserver) btnObserver.observe(btn.current)
        return () => {
            btnObserver?.disconnect()
        }
    }, [btnObserver])

    function loadBtnScrolledObserver() {
        let observationCount = 0
        const observer = new IntersectionObserver(entries => {
            observationCount++
            if (observationCount > 2) {
                const isGalleryVisible = store.getState().stayModule.isGalleryVisible
                if (!entries[0].isIntersecting && !isGalleryVisible) {
                    setIsBtnScrolled(true)
                }
                else {
                    setIsBtnScrolled(false)
                }
            }
        })
        setBtnObserver(observer)
    }

    function validateAndMoveToPayment() {
        if (params.entryDate && params.exitDate && params.adults) {
            const queryParams = new URLSearchParams({
                entryDate: params.entryDate,
                exitDate: params.exitDate,
                adults: params.adults || '',
                children: params.children || '',
                infants: params.infants || '',
                pets: params.pets || ''
            }).toString()
            userService.getLoggedInUser() ? navigate(`/${stay._id}/payment?${queryParams}`) : setIsLoginModal(true)
        }
    }

    return <>
        {isBtnScrolled && <DynamicModalHeader stay={stay} params={params} />}
        <div className="reserve-modal" ref={ref}>
            <div className='container-price-selectors'>
                <div className="price-logo flex align-center">
                    <h2>$ {stay.price.toLocaleString()} &nbsp;</h2><span>night</span>
                </div>
                <div className='selectors-container flex column'>
                    <div className="date-selectors flex">
                        <div className='check-in flex' onClick={() => openModalType(modalType === 'date' ? null : 'date')}>
                            <div className='txt flex column'>
                                <label>Check-in</label>
                                <div className='txt-date'>{getDate(+params.entryDate)}/{getMonth(+params.entryDate) + 1}/{getYear(+params.entryDate)}</div>
                            </div>
                        </div>
                        <div className='checkout flex' onClick={() => openModalType(modalType === 'date' ? null : 'date')} >
                            <div className='txt flex column'>
                                <label>Checkout</label>
                                <div className='txt-date'>
                                    {params.exitDate && !isNaN(+params.exitDate) ?
                                        `${getDate(+params.exitDate)}/${getMonth(+params.exitDate) + 1}/${getYear(+params.exitDate)}` :
                                        "Add date"
                                    }
                                </div>

                            </div>
                        </div>
                    </div>
                    <div ref={ref} className='guest-selector flex column' >
                        <label onClick={() => openModalType(modalType === 'guest' ? null : 'guest')} className='guests'>Guests</label>
                        <div className='guest-container flex space-between' onClick={() => openModalType(modalType === 'guest' ? null : 'guest')}>
                            {stayService.guestCountStringForReservation(params)}
                             <span className={`arrow-${modalType === 'guest' ? 'up' : 'down'}`}></span>
                        </div>

                        {modalType === 'guest' && <GuestCount stay={stay} params={params} updateParams={updateParams} headerFilterBy={headerFilterBy} openModalType={openModalType} />}
                        {modalType === 'date' && <StayDetailsDateModal stay={stay} params={params} updateParams={updateParams} headerFilterBy={headerFilterBy} openModalType={openModalType} />}

                    </div>
                </div>
                <div className='reserve-btn flex center' ref={btn} onClick={() => validateAndMoveToPayment()}><span >Reserve</span></div>
                {+params.entryDate && +params.exitDate && <p className='charged-p'>You won't be charged yet.</p>}
            </div>
            <div className='price-calc flex space-between'>
                <span>$ {stay.price.toLocaleString()} X {numOfDays === 1 ? `${numOfDays} night` : `${numOfDays} nights`}</span>
                <span className='sum'>$ {(stay.price * numOfDays * (+params.adults + +params.children)).toLocaleString()}</span>
            </div>
            {fee && <div className='fee-calc flex space-between'>
                <span>Staybnb service fee</span>
                <span>$ {fee}</span>
            </div>}
            {fee > 0 && <div className='sum-total flex space-between'>
                <span>Total</span>
                <span>$ {(stay.price * numOfDays * (+params.adults + +params.children) + fee).toLocaleString()}</span>
            </div>}
        </div>

        <div className='reserve-footer flex align-center space-between'>
            <div className='flex column'>
                <p><span>${stay.price.toLocaleString()}</span> &nbsp;night</p>
                <p>{utilService.timestampsToShortDates(+params.entryDate, +params.exitDate)}</p>
            </div>

            <button className='flex center' onClick={() => validateAndMoveToPayment()}><span >Reserve</span></button>
        </div>
        {isLoginModal && <LoginSignup setIsLoginModal={setIsLoginModal} />}
    </>
}         