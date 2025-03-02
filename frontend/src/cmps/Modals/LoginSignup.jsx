import { useState, useEffect } from "react"

import { login, signup } from "../../store/actions/user.actions"
import { userService } from "../../services/user.service"
import { socketService } from "../../services/socket.service"

import { SignupImgUploader } from "../SignupImgUploader"

export function LoginSignup({ setIsLoginModal }) {

    const [isSignup, setIsSignup] = useState(false)
    const [credentials, setCredentials] = useState(userService.getEmptyCredentials())

    useEffect(() => {
        if (credentials.username === 'guest' && credentials.password === 'guest') {
          onSubmitLoginSignup()
        }
      }, [credentials])

    async function onSubmitLoginSignup(ev) {
        try {
            if (ev) ev.preventDefault()
            const user = isSignup ? await signup(credentials) : await login(credentials)
            if (user) {
                onClose()
            }
        } catch (err) {
            console.log(err)
            throw err
        }
    }

    function onGuest() {
        setCredentials(prevCredentials => ({ ...prevCredentials, username: 'guest', password: 'guest' }))
    }

    function onChangeLoginSignup() {
        setIsSignup(!isSignup)
    }

    function onChangeField(ev) {
        const { value, id } = ev.target
        setCredentials(prevCredentials => ({ ...prevCredentials, [id]: value }))
    }

    function onAddImg(imgUrl) {
        setCredentials(prevCredentials => ({ ...prevCredentials, imgUrl }))
    }

    function onClose() {
        setIsSignup(false)
        setIsLoginModal(false)
    }

    return <>
        <div className="overlay" onClick={onClose}></div>

        <section className="login-signup">
            <header className="flex column center">
                <button className="back-btn flex center" onClick={onClose}></button>
                <h1>Welcome to Staybnb</h1>
                {!isSignup && <p>Don't have an account? <span onClick={onChangeLoginSignup}>Click here to sign up</span></p>}
                {isSignup && <p>Have have an account? <span onClick={onChangeLoginSignup}>Click here to log in</span></p>}
                {!isSignup && <button className="guest-btn" onClick={onGuest}>Log-in as guest</button>}
            </header>

            <form className="grid" onSubmit={onSubmitLoginSignup}>

                <label htmlFor="username" className={`${isSignup ? 'username' : ''} flex column space-between`}>Username&nbsp;
                    <input id="username" type="text" value={credentials.username} onChange={onChangeField} required />
                </label>

                <label htmlFor="password" className={`${isSignup ? 'username' : ''} flex column space-between`}>Password&nbsp;
                    <input id="password" type="password" value={credentials.password} onChange={onChangeField} required />
                </label>

                {isSignup && <>
                    <label htmlFor="img-uploader" className="img-upload flex column space-between"><span>Image</span>
                        <SignupImgUploader onAddImg={onAddImg} />
                    </label>

                    <label htmlFor="fullname" className="flex column space-between">Fullname&nbsp;
                        <input id="fullname" type="text" value={credentials.fullname} onChange={onChangeField} required />
                    </label>

                    <label htmlFor="about" className="flex column space-between">About&nbsp;
                        <input id="about" type="text" value={credentials.about} onChange={onChangeField} required />
                    </label>

                    <label htmlFor="location" className="flex column space-between">Location&nbsp;
                        <input id="location" type="text" value={credentials.location} onChange={onChangeField} required />
                    </label>

                    <label htmlFor="gender" className="flex column space-between">Gender&nbsp;
                        <select id="gender" value={credentials.gender} onChange={onChangeField}>
                            <option id="default" value="" disabled>Choose gender</option>
                            <option id="female" value="female">Female</option>
                            <option id="male" value="male">Male</option>
                            <option id="other" value="other">Other</option>
                        </select>
                    </label>
                </>}
                <button>{!isSignup ? 'Login' : 'Signup'}</button>
            </form>
        </section>
    </>
}