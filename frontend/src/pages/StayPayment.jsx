import { useParams } from 'react-router'
import { Payment } from '../cmps/StayReservationCmps/Payment'
import { PaymentModal } from '../cmps/StayReservationCmps/PaymentModal'
import { useEffect, useState } from 'react'
import { stayService } from '../services/stay.service'
import { useLocation, useSearchParams } from 'react-router-dom'
import { Loading } from '../cmps/Loading'

export function StayPayment() {
    const location = useLocation()
    const { stayId } = useParams()
    const [stay, setStay] = useState('')

    const [URLSearchParams, setUrlSearchParams] = useSearchParams()
    const { adults, children, infants, pets, entryDate, exitDate } = Object.fromEntries(URLSearchParams.entries())
    const [searchParams, setSearchParams] = useState({ adults, children, infants, pets, entryDate, exitDate })

    useEffect(() => {
        if (stayId) { loadStay() }
    }, [])

    useEffect(() => {
        setUrlSearchParams(searchParams)
    }, [searchParams])

    async function loadStay() {
        try {
            const stay = await stayService.getById(stayId)
            setStay(stay)
        } catch (err) { console.log(err) }
    }

    if (!stay) {
        return <Loading currentPage={"payment"} />
    }

    return (
        <section className="stay-payment grid">
            <Payment stay={stay} searchParams={searchParams} />
            <PaymentModal stay={stay} searchParams={searchParams} />
        </section>
    )
}
