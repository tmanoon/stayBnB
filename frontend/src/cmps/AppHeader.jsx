import { NavLink, useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'
import { useState, useEffect } from "react"
import { useLocation } from 'react-router-dom'

import { stayService } from "../services/stay.service"
import { userService } from "../services/user.service"
import { setStayFilter } from "../store/actions/stay.actions"
import { utilService } from "../services/util.service"

import { LoginSignup } from "../cmps/Modals/LoginSignup"
import { HeaderFilterSearch } from "./HeaderCmps/HeaderFilterSearch"
import { UserNavModal } from "./HeaderCmps/UserNavModal"
import { LabelsFilter } from "./HeaderCmps/LabelsFilter"

export function AppHeader({ scrolledPage }) {
    const navigate = useNavigate()
    const location = useLocation()

    const { loggedInUser } = useSelector(storeState => storeState.userModule)
    const [modalType, setModalType] = useState('')
    const [isLoginModal, setIsLoginModal] = useState(false)
    const [user, setUser] = useState(null)

    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const modalTypes = [
        { modalName: 'map', desc: filterBy.txt || 'Anywhere' },
        { modalName: 'check-in', desc: filterBy.entryDate && filterBy.exitDate ? utilService.timestampsToShortDates(+filterBy.entryDate, +filterBy.exitDate) : 'Any week' },
        { modalName: 'guest', desc: checkIfFilterByGuests() ? utilService.calcGuestCountInFilterBy(filterBy) : 'Add guests' }]

    useEffect(() => {
        setUser(userService.getLoggedInUser())
    }, [loggedInUser])

    function goHome() {
        const defaultFilter = stayService.getDefaultFilter()
        setStayFilter(defaultFilter)
        navigate('/')
    }

    function checkNavigatePath(e, path) {
        e.preventDefault()
        user ? navigate(`${path}`) : onLoginModal()
    }

    const onLoginModal = () => {
        if (!user) setIsLoginModal(true)
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
        if (pathname === '/' || pathname === '/trips' || pathname === '/wishlist' || pathname === '/dashboard' || pathname === '/messages') return 'wide' // wide header for the index/trips/dashboard/wishlist
        else return 'narrow' // narrow header for details/payment/user-info
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
                <section className="logo-section flex align-center" onClick={goHome}>
                    <img src="src\assets\img\staybnb-logo.png" alt="staybnb logo" />
                    <span>Staybnb</span>
                </section>
                <section className="filter-section flex justify-center">
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
                    <HeaderFilterSearch modalType={modalType} handleModalTypeChange={handleModalTypeChange} />
                </section>
                <section className="user-section flex align-center" >
                    <NavLink to="/edit" className="edit-btn" onClick={(ev) => checkNavigatePath(ev, '/edit')}>Staybnb your home</NavLink>
                    <button className="flex align-center space-between" onClick={(e) => handleModalTypeChange(e, 'user-nav')}>
                        <span>☰</span>
                        {user && user.imgUrl && (<img src={user.imgUrl} alt="User Profile" />)}
                        {(!user || !user.imgUrl) && <div className="profile"></div>}
                    </button>

                    {modalType === 'user-nav' && <UserNavModal
                        setIsLoginModal={setIsLoginModal}
                        handleModalTypeChange={handleModalTypeChange}
                        setUser={setUser} />}
                </section>
                {location.pathname === '/' && <LabelsFilter filterBy={filterBy} setStayFilter={setStayFilter} />}
            </header>
            {isLoginModal && <LoginSignup setIsLoginModal={setIsLoginModal} />}
        </>
    )
}