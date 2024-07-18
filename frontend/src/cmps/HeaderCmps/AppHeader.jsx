import { NavLink, useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'
import { useSearchParams, } from 'react-router-dom'
import { useState, useEffect, useRef } from "react"
import { HeaderFilter } from "./HeaderFilter"
import { DemoDataService } from "../../services/demoData.service"
import { stayService } from "../../services/stay.service"
import { setStayFilter, setStayHeaderFilter } from "../../store/actions/stay.actions"
import { UserNavModal } from "./UserNavModal"
import { useLocation } from 'react-router-dom';
import { LoginSignup } from "../LoginSignup"
import { userService } from "../../services/user.service"
import { utilService } from "../../services/util.service"

export function AppHeader({ scrolledPage }) {
    var filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const [searchParams, setSearchParams] = useSearchParams()
    const [modalType, setModalType] = useState('')
    const [isLoginModal, setIsLoginModal] = useState(false)

    const ref = useRef(null)
    const navigate = useNavigate()
    const location = useLocation()

    function onNavigate() {
        navigate('/')
    }

    function goHome() {
        const defaultHeaderFilter = stayService.getDefaultHeaderFilter()
        const defaultMainFilter = stayService.getDefaultFilter()

        setStayHeaderFilter(defaultHeaderFilter)
        setStayFilter(defaultMainFilter)

        navigate('/')
    }

    function onOpenUserModal(ev) {
        ev.stopPropagation()
        setModalType(modalType === 'user-nav' ? '' : 'user-nav')
    }

    const getHeaderWidth = () => {
        const { pathname } = location
        if (pathname === '/' || pathname === '/trips' || pathname === '/wishlist' || pathname === '/dashboard') {
            return 'wide' // wide header for the index/trips/dashboard/wishlist
        } else {
            return 'narrow' // narrow header for details/payment/user-info/messages
        }
    }

    const getHeaderSize = () => {
        const { pathname } = location
        if (pathname === '/' && !scrolledPage) {
            return 'expanded' // expanded header for the index
        } else {
            return 'condensed' // condensed header for details/payment/user-info/trips/dashboard/wishlist
        }
    }

    const getHeaderPosition = () => {
        const { pathname } = location
        if (pathname === '/') {
            return 'header-fixed' // fixed header for the index
        } else {
            return '' // static header for details/payment/user-info/trips/dashboard/wishlist
        }
    }

    return <section className={`app-header-container header-${getHeaderWidth()} header-${getHeaderSize()} ${getHeaderPosition()} flex column center`}>
        <section className="expanded-header flex space-between align-center">

            <div className="logo-section" onClick={goHome}>
                <div className="logo flex align-center">
                    <img src="https://res.cloudinary.com/db7t5amdv/image/upload/v1713176792/keig0zr71f8zzeqk1xub.png" alt="" />
                    Staybnb
                </div>
            </div>

            <div className="nav-section flex justify-center">
                <nav className="nav flex space-evenly">
                    <NavLink onClick={goHome} to="/">Stays</NavLink>
                    <NavLink to="/unActive" className='grayTxt'>Experiences</NavLink>
                    {/* <NavLink to="/" className='grayTxt'>Online Experiences</NavLink> */}
                </nav>

                <div className="compact-header flex align-center">
                    <div onClick={() => { setModalType(modalType === 'map' ? null : 'map'), SetDynamicPageLayOut(false) }} className="map">Anywhere</div>
                    <div onClick={() => setModalType(modalType === 'check-in' ? null : 'check-in')} className="calendar">Any week</div>
                    <div onClick={() => setModalType(modalType === 'guest' ? null : 'guest')} className="guests">Add guests</div>
                    <div>
                        <button className="search-btn"></button>
                    </div>
                </div>

            </div>

            <div className="user-section flex align-center" >

                <NavLink to="/edit">Staybnb your home</NavLink>

                <button className="flex align-center space-between" onClick={onOpenUserModal}> ☰


                    {userService.getLoggedInUser() ? (
                        <img src={userService.getLoggedInUser().imgUrl} alt="User Profile" />
                    ) : (
                        <div className="profile"></div>
                    )}
                </button>

            </div>

        </section>

        {modalType === 'user-nav' && <UserNavModal setIsLoginModal={setIsLoginModal} setModalType={setModalType} />}
        {isLoginModal && <LoginSignup setIsLoginModal={setIsLoginModal} />}

        <HeaderFilter modalType={modalType} setModalType={setModalType} />
    </section>
}