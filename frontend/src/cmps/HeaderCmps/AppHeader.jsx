import { NavLink, useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'
import { useState, useEffect } from "react"
import { useLocation } from 'react-router-dom'

import { stayService } from "../../services/stay.service"
import { userService } from "../../services/user.service"
import { setStayFilter } from "../../store/actions/stay.actions"

import { LoginSignup } from "../LoginSignup"
import { HeaderFilter } from "./HeaderFilter"
import { UserNavModal } from "./UserNavModal"
import { LabelsFilter } from "./LabelsFilter"
import { utilService } from "../../services/util.service"

export function AppHeader({ scrolledPage }) {
    const navigate = useNavigate()
    const location = useLocation()

    const [modalType, setModalType] = useState('')
    const [isLoginModal, setIsLoginModal] = useState(false)
    const [isLoggedInUser, checkIsLoggedInUser] = useState(false)

    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const modalTypes = [{ modalName: 'map', desc: filterBy.txt || 'Anywhere' }, { modalName: 'check-in', desc: filterBy.entryDate && filterBy.exitDate ? utilService.timestampsToShortDates(+filterBy.entryDate, +filterBy.exitDate) : 'Any week' }, { modalName: 'guest', desc: checkIfFilterByGuests() ? utilService.calcGuestCountInFilterBy(filterBy) : 'Add guests' }]

    useEffect(() => {
        checkIsLoggedInUser(Boolean(userService.getLoggedInUser()))
    }, [])

    function goHome() {
        const defaultFilter = stayService.getDefaultFilter()
        setStayFilter(defaultFilter)
        navigate('/')
    }

    function checkNavigatePath(e, path) {
        e.preventDefault()
        isLoggedInUser ? navigate(`${path}`) : onLoginModal()
    }

    const onLoginModal = () => {
        setIsLoginModal(true)
    }

    function checkIfFilterByGuests() {
        return filterBy.guestCount.adults > 1 || filterBy.guestCount.children || filterBy.guestCount.infants
    }

    function handleModalTypeChange(ev = '', modalName = modalType) {
        if (ev) ev.stopPropagation()
        setModalType(prevModalType => (prevModalType === modalName ? '' : modalName))
    }

    const getHeaderWidth = () => {
        const { pathname } = location
        if (pathname === '/' ||
            pathname === '/trips' ||
            pathname === '/wishlist' ||
            pathname === '/dashboard') return 'wide' // wide header for the index/trips/dashboard/wishlist
        else return 'narrow' // narrow header for details/payment/user-info/messages
    }

    const getHeaderSize = () => {
        const { pathname } = location
        if (pathname === '/' && !scrolledPage) return 'expanded' // expanded header for the scrolled index
        else return 'condensed' // condensed header for details/payment/user-info/trips/dashboard/wishlist
    }

    const getHeaderPosition = () => {
        const { pathname } = location
        if (pathname === '/') return 'header-fixed' // fixed header for the index
        else return '' // static header for details/payment/user-info/trips/dashboard/wishlist
    }

    return (
        <>
            <header className={`full-app-header header-${getHeaderWidth()} header-${getHeaderSize()} ${getHeaderPosition()} grid`}>
                <section className="logo-section flex align-center">
                    <img src="https://res.cloudinary.com/db7t5amdv/image/upload/v1713176792/keig0zr71f8zzeqk1xub.png" alt="app-logo" onClick={goHome} />
                    <span onClick={goHome}>Staybnb</span>
                </section>
                <section className="filter-section flex justify-center">
                    {/* <nav className="nav flex space-evenly">
                    <NavLink onClick={goHome} to="/">Stays</NavLink>
                    <NavLink to="/unActive" className='grayTxt'>Experiences</NavLink>
                </nav> */}
                    <div className="compact-filter grid">
                        {
                            modalTypes.map(modal => {
                                return (
                                    <div onClick={(e) => handleModalTypeChange(e, modal.modalName)}
                                        className={modal.modalName}
                                        key={modal.modalName}>
                                        {modal.desc}
                                    </div>
                                )
                            })
                        }
                        <button className="search-btn flex center"></button>
                    </div>
                    <HeaderFilter modalType={modalType} handleModalTypeChange={handleModalTypeChange} />
                </section>
                <section className="user-section flex align-center" >
                    <NavLink to="/edit" onClick={(ev) => checkNavigatePath(ev, '/edit')}>Staybnb your home</NavLink>
                    <button className="flex align-center space-between" onClick={(e) => handleModalTypeChange(e, 'user-nav')}>
                        <span>☰</span>
                        {userService.getLoggedInUser() ? (<img src={userService.getLoggedInUser().imgUrl} alt="User Profile" />) : (<div className="profile"></div>)}
                    </button>
                </section>

                {location.pathname === '/' && <LabelsFilter filterBy={filterBy} setStayFilter={setStayFilter} />}

            </header>

            {modalType === 'user-nav' && <UserNavModal setIsLoginModal={setIsLoginModal} handleModalTypeChange={handleModalTypeChange} />}
            {isLoginModal && <LoginSignup setIsLoginModal={setIsLoginModal} />}
        </>
    )
}