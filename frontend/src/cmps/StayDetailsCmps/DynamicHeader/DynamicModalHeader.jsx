import { utilService } from "../../../services/util.service"
import { useNavigate } from "react-router"

export function DynamicModalHeader({ stay, searchParams }) {
    const navigate = useNavigate()
    
    function validateAndMoveToPayment() {
        if (searchParams.entryDate && searchParams.exitDate &&
            (searchParams.adults || searchParams.children || searchParams.infants)) {
            const queryParams = new URLSearchParams({
                entryDate: searchParams.entryDate,
                exitDate: searchParams.exitDate,
                adults: searchParams.adults || '',
                children: searchParams.children || '',
                infants: searchParams.infants || ''
            }).toString()

            navigate(`/${stay._id}/payment?${queryParams}`)
        }
    }

    return <div className="dynamic-modal-header flex align-center">
        <div className="txt-container flex column">
            <h3>${stay.price} <span>night</span></h3>
            <p className="txt-reviews">★ {utilService.calcRate(stay).toFixed(2)} ・ {stay.reviews.length} reviews </p>
        </div>
        <button className='flex center' onClick={() => validateAndMoveToPayment()}><span >Reserve</span></button>
    </div>
}