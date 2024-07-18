import { useState } from "react"
import { Stage1, Stage10, Stage11, Stage12, Stage13, Stage2, Stage3, Stage4, Stage5, Stage6, Stage7, Stage8, Stage9 } from "../cmps/StayEditCmps/Stages.jsx"
import { ProgressFooter } from "../cmps/StayEditCmps/ProgressFooter"
import { StayEditHeader } from "../cmps/StayEditCmps/StayEditHeader"
import { stayService } from "../services/stay.service.js"
import { loadStays, removeStay, saveStay, setStayFilter } from '../store/actions/stay.actions.js'
import { NavLink, useNavigate } from "react-router-dom"




export function StayEdit() {
    const [stay, editStay] = useState(stayService.getEmptyStay)
    const navigate = useNavigate()

    const [editStage, setEditStage] = useState(1)

    function onSaveStay(){
        saveStay(stay)
          navigate('/')
    }



    return <section className="add-stay">

        <StayEditHeader />

        {editStage === 1 && <Stage1 stay={stay} editStay={editStay}/>}
        {editStage === 2 && <Stage2 stay={stay} editStay={editStay}/>}
        {editStage === 3 && <Stage3 stay={stay} editStay={editStay} />}
        {editStage === 4 && <Stage4 stay={stay} editStay={editStay} />}
        {editStage === 5 && <Stage5 stay={stay} editStay={editStay}/>}
        {editStage === 6 && <Stage6 stay={stay} editStay={editStay}/>}
        {editStage === 7 && <Stage7 stay={stay} editStay={editStay} />}
        {editStage === 8 && <Stage8 stay={stay} editStay={editStay} />}
        {editStage === 9 && <Stage9 stay={stay} editStay={editStay} />}
        {editStage === 10 && <Stage10 stay={stay} editStay={editStay} />}
        {editStage === 11 && <Stage11 stay={stay} editStay={editStay} />}
        {editStage === 12 && <Stage12 stay={stay} editStay={editStay} />}
        {editStage === 13 && <Stage13 stay={stay} onSaveStay={onSaveStay} />}

        <ProgressFooter onSaveStay={onSaveStay} stay={stay} editStage={editStage} setEditStage={setEditStage} />



    </section>
}