import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { userService } from '../../services/user.service'
import { login, logout } from '../../store/actions/user.actions'
import { LoginSignup } from '../LoginSignup'
import { useNavigate } from 'react-router-dom'

export function UserNavModal({ setIsLoginModal, setModalType }) {
    const [isLoggedInUser, checkIsLoggedInUser] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        checkIsLoggedInUser(Boolean(userService.getLoggedInUser()))
    }, [])

    async function onGuestClick() {
        try {
            const user = login({ username: 'guest', password: 'guest' })
            if (user) checkIsLoggedInUser(true)
        } catch (err) {
            console.log(err)
            throw err
        }
    }

    function checkNavigatePath(e, path) {
        e.preventDefault()
        isLoggedInUser ? navigate(`${path}`) : onLoginModal()
    }

    async function onLogoutClick(ev) {
        ev.stopPropagation()
        try {
            await logout()
            checkIsLoggedInUser(false)
            setModalType('')
        } catch (err) {
            console.log(err)
            throw err
        }
    }

    const onLoginModal = () => {
        setIsLoginModal(true)
    }

    return <section className="user-nav-modal" >
        {!isLoggedInUser && <button onClick={onLoginModal} className="grayTxt">Login</button>}
        {!isLoggedInUser && <NavLink to="/" onClick={() => onGuestClick()}>Continue as Guest</NavLink>}
        {isLoggedInUser && <NavLink to="/" className='grayTxt' onClick={(ev) => onLogoutClick(ev)}>Log out</NavLink>}
        {/* TRY TO ADD SOCKETS OF CHAT ON SATURDAY 17.4 SHOVAL <NavLink to="/unActive" className='grayTxt'>Messages</NavLink> */} 
        <NavLink to={"/trips"}  onClick={(ev) => checkNavigatePath(ev, '/trips')} className='grayTxt'>Trips</NavLink>
        <NavLink to="/wishlist" className='grayTxt'>Wishlist</NavLink>
        <NavLink to="/edit" className='grayTxt'>Airbnb your home</NavLink>
        <NavLink to="/dashboard"  onClick={(ev) => checkNavigatePath(ev, '/dashboard')} className='grayTxt'>Dashboard</NavLink>
    </section>
}