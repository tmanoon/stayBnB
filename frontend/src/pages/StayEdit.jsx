import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { stayService } from "../services/stay.service.js"
import { saveStay } from '../store/actions/stay.actions.js'

import { StageComponents } from "../cmps/StayEditCmps/StayEditStages.jsx"
import { ProgressFooter } from "../cmps/StayEditCmps/ProgressFooter"
import { StayEditHeader } from "../cmps/StayEditCmps/StayEditHeader"
import { userService } from "../services/user.service.js"
import { utilService } from "../services/util.service.js"

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
        } catch (err) {
            console.log(err)
        }
    }

    async function onSaveStay() {
        try {
            const host = await userService.getLoggedInUser()
            const updatedStay = { ...stay, host: { ...stay.host, username: host.username, fullname: host.fullname, imgUrl: host.imgUrl, responseTime: utilService.getRandomIntInclusive(0, 24) } }
            const stayToSave = await saveStay(updatedStay)
            navigate(`/${stayToSave._id}`)
        } catch (err) {
            console.log(err)
        }
    }

    const CurrentStageComponent = StageComponents[editStage]

    return (
        <section className="stay-edit">
            <StayEditHeader />
            <main>
                {CurrentStageComponent && <CurrentStageComponent stay={stay} editStay={editStay} />}
            </main>
            <ProgressFooter onSaveStay={onSaveStay} stay={stay} editStage={editStage} setEditStage={setEditStage} />
        </section>
    )
}