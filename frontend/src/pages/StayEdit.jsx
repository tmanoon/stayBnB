import { useEffect, useState } from "react"
import { NavLink, useNavigate, useParams } from "react-router-dom"

import { stayService } from "../services/stay.service.js"
import { loadStays, removeStay, saveStay, setStayFilter } from '../store/actions/stay.actions.js'

import { Stage0, Stage1, Stage2, Stage3, Stage4, Stage5, Stage6, Stage7, Stage8, Stage9, Stage10, Stage11, Stage12, Stage13, Stage14, Stage15 } from "../cmps/StayEditCmps/Stages.jsx"
import { ProgressFooter } from "../cmps/StayEditCmps/ProgressFooter"
import { StayEditHeader } from "../cmps/StayEditCmps/StayEditHeader"
import { userService } from "../services/user.service.js"

export function StayEdit() {
    const params = useParams()
    const navigate = useNavigate()

    const [stay, editStay] = useState(stayService.getEmptyStay())
    const [editStage, setEditStage] = useState(0)

    useEffect(() => {
        if (params.stayId) loadStay()
    }, [])

    async function loadStay() {
        try {
            const stayToLoad = await stayService.getById(params.stayId)
            editStay(stayToLoad)
        } catch (err) { console.log(err) }
    }

    async function onSaveStay() {
        try {
            const host = await userService.getLoggedInUser()
            const updatedStay = { ...stay, host: { ...stay.host, username: host.username, fullname: host.fullname, imgUrl: host.imgUrl } }
            const stayToSave = await saveStay(updatedStay)
            navigate(`/${stayToSave._id}`)
        } catch (err) {
            console.log(err)
        }
    }

    return <section className="stay-edit">

        <StayEditHeader />

        <main>
            {editStage === 0 && <Stage0 stay={stay} editStay={editStay} />}
            {editStage === 1 && <Stage1 stay={stay} editStay={editStay} />}
            {editStage === 2 && <Stage2 stay={stay} editStay={editStay} />}
            {editStage === 3 && <Stage3 stay={stay} editStay={editStay} />}
            {editStage === 4 && <Stage4 stay={stay} editStay={editStay} />}
            {editStage === 5 && <Stage5 stay={stay} editStay={editStay} />}
            {editStage === 6 && <Stage6 stay={stay} editStay={editStay} />}
            {editStage === 7 && <Stage7 stay={stay} editStay={editStay} />}
            {editStage === 8 && <Stage8 stay={stay} editStay={editStay} />}
            {editStage === 9 && <Stage9 stay={stay} editStay={editStay} />}
            {editStage === 10 && <Stage10 stay={stay} editStay={editStay} />}
            {editStage === 11 && <Stage11 stay={stay} editStay={editStay} />}
            {editStage === 12 && <Stage12 stay={stay} editStay={editStay} />}
            {editStage === 13 && <Stage13 stay={stay} editStay={editStay} />}
            {editStage === 14 && <Stage14 stay={stay} editStay={editStay} />}
            {editStage === 15 && <Stage15 stay={stay} onSaveStay={onSaveStay} />}
        </main>

        <ProgressFooter onSaveStay={onSaveStay} stay={stay} editStage={editStage} setEditStage={setEditStage} />
    </section>
}