import { NavLink, useNavigate } from "react-router-dom"


export function StayEditHeader(){
    const navigate = useNavigate()

    function onNavigateHome(){
        navigate('/')
    }

    return <section className="stay-edit-header flex align-center space-between">
        <img onClick={onNavigateHome} src="../../assets/img/staybnb-logo.png" alt="staybnb logo" />
        <button onClick={onNavigateHome} className="exit-btn flex center"><span className="small">Exit</span><span className="wide">Exit without saving</span></button>
    </section>
}