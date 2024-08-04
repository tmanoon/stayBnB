import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { userService } from '../../services/user.service'
import { login, logout } from '../../store/actions/user.actions'
import { LoginSignup } from '../Modals/LoginSignup'
import { useNavigate } from 'react-router-dom'
import { socketService } from '../../services/socket.service'

export function UserNavModal({ setIsLoginModal, handleModalTypeChange, setLoggedInUser }) {
    const [isLoggedInUser, checkIsLoggedInUser] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        checkIsLoggedInUser(Boolean(userService.getLoggedInUser()))
    }, [])

    async function onGuestClick() {
        try {
            const user = await login({ username: 'guest', password: 'guest' })
            if (user) {
                setLoggedInUser(user)
                checkIsLoggedInUser(true)
            }

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
            setLoggedInUser(null)
            // socketService.logout(userService.getLoggedInUser()._id)
            handleModalTypeChange('', 'user-nav')
        } catch (err) {
            console.log(err)
            throw err
        }
    }

    const onLoginModal = () => {
        setIsLoginModal(true)
    }

    return (
        <section className="user-nav-modal" >
            {!isLoggedInUser && <div onClick={onLoginModal}>Log-in / Sign-up</div>}
            {!isLoggedInUser && <NavLink to="/" onClick={() => onGuestClick()} className='bordered'>Continue as Guest</NavLink>}
            <NavLink to="/trips" onClick={(ev) => checkNavigatePath(ev, '/trips')} className="bold">Trips</NavLink>
            <NavLink to="/messages" onClick={(ev) => checkNavigatePath(ev, '/messages')} className="bold">Messages</NavLink>
            <NavLink to="/wishlist" onClick={(ev) => checkNavigatePath(ev, '/wishlist')} className='bordered bold'>Wishlist</NavLink>
            <NavLink to="/edit" onClick={(ev) => checkNavigatePath(ev, '/edit')}>Staybnb your home</NavLink>
            <NavLink to="/dashboard" onClick={(ev) => checkNavigatePath(ev, '/dashboard')} className={isLoggedInUser ? 'bordered' : ''}>Manage listings</NavLink>
            {isLoggedInUser && <NavLink to="/" onClick={(ev) => onLogoutClick(ev)}>Log out</NavLink>}
        </section>
    )
}