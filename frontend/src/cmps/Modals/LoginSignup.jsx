import { login, signup } from "../../store/actions/user.actions"
import { userService } from "../../services/user.service"
import { useState } from "react"
import { socketService } from "../../services/socket.service"

export function LoginSignup({ setIsLoginModal }) {

    const [isSignup, setIsSignup] = useState(false)
    const [credentials, setCredentials] = useState(userService.getEmptyCredentials())

    async function onSubmitLoginSignup(ev) {
        try {
            ev.preventDefault()
            const user = isSignup ? await signup(credentials) : await login(credentials)
            if (user) {
                onClose()
            }
        } catch (err) {
            console.log(err)
            throw err
        }
    }

    function onChangeLoginSignup() {
        setIsSignup(!isSignup)
    }
    
    function onChangeField(ev) {
        const { value, id } = ev.target
        setCredentials(prevCredentials => ({ ...prevCredentials, [id]: value }))
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
            </header>

            <form className="flex column" onSubmit={onSubmitLoginSignup}>

                <label htmlFor="username" className="flex column space-between">Username&nbsp;
                    <input id="username" type="text" value={credentials.username} onChange={onChangeField} required />
                </label>

                <label htmlFor="password" className="flex column space-between">Password&nbsp;
                    <input id="password" type="password" value={credentials.password} onChange={onChangeField} required />
                </label>

                {isSignup && <>
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
                        <select id="gender" value={credentials.gender || 'female'} onChange={onChangeField}>
                            <option id="female" value="female">Female</option>
                            <option id="male" value="male">Male</option>
                            <option id="other" value="other">Other</option>
                        </select>
                    </label>
                </>}
                <button>{!isSignup? 'Login' : 'Signup'}</button>
            </form>
        </section>
    </>
}