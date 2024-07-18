import { NavLink, useNavigate } from "react-router-dom"


export function StayEditHeader(){
    const navigate = useNavigate()

    function onNavigateHome(){
        navigate('/')
    }

    return <section className="stay-edit-header">
        
        <img onClick={onNavigateHome} src="src\assets\img\airbnb-logo.png" alt="" />
        <button onClick={onNavigateHome} className="exit-btn">Exit without saving</button>
    </section>
}