import { login, signup } from "../store/actions/user.actions"
import { userService } from "../services/user.service"
import { useNavigate } from "react-router"
import { useState } from "react"

export function LoginSignup({ setIsLoginModal }) {
    const navigate = useNavigate()
    const [isSignup, setIsSignup] = useState(false)
    const [credentials, setCredentials] = useState(userService.getEmptyCredentials())

    async function onSubmitLoginSignup(ev) {
        ev.preventDefault()
        try {
            const user = isSignup ? await signup(credentials) : await login(credentials)
            if (user) onClose()
        } catch (err) {
            console.log(err)
            throw err
        }
    }

    function onChangeLoginSignup() {
        setIsSignup(!isSignup)
    }

    function onChangeField(ev) {
        ev.stopPropagation()
        const { value, id } = ev.target
        setCredentials(prevCredentials => ({ ...prevCredentials, [id]: value }))
    }

    function onClose() {
        setIsLoginModal(false)
        // navigate('/')
    }

    return <>
        <div className="overlay"></div>

        <section className="login-signup">
            <header className="flex column center">
                <button className="back-btn flex center" onClick={onClose}></button>
                <h1>Welcome to Staybnb</h1>
                {isSignup && <p>Already signed up? <span onClick={onChangeLoginSignup}>Click here to login</span></p>}
                {!isSignup && <p>Don't Have an account? <span onClick={onChangeLoginSignup}>Click here to sign up</span></p>}
            </header>

            <form className="flex column" onSubmit={(ev) => onSubmitLoginSignup(ev)}>

                <label htmlFor="username" className="flex column space-between">Username:&nbsp;
                    <input id="username" type="text" value={credentials.username} onChange={(ev) => onChangeField(ev)} required />
                </label>

                <label htmlFor="password" className="flex column space-between">Password:&nbsp;
                    <input id="password" type="password" value={credentials.password} onChange={(ev) => onChangeField(ev)} required />
                </label>

                {isSignup && <>
                    <label htmlFor="fullname" className="flex column space-between">Full name:&nbsp;
                        <input id="fullname" type="text" value={credentials.fullname} onChange={(ev) => onChangeField(ev)} required />
                    </label>

                    <label htmlFor="about" className="flex column space-between">About:&nbsp;
                        <input id="about" type="text" value={credentials.about} onChange={(ev) => onChangeField(ev)} required />
                    </label>

                    <label htmlFor="location" className="flex column space-between">Location:&nbsp;
                        <input id="location" type="text" value={credentials.location} onChange={(ev) => onChangeField(ev)} required />
                    </label>

                    <label htmlFor="gender" className="flex column space-between">Gender:&nbsp;
                        <select id="gender" value={credentials.gender} onChange={(ev) => onChangeField(ev)}>
                            <option id="female" value="female">Female</option>
                            <option id="male" value="male">Male</option>
                            <option id="other" value="other">Other</option>
                        </select>
                    </label>
                </>}
                <button>Continue</button>
            </form>
        </section>
    </>
}