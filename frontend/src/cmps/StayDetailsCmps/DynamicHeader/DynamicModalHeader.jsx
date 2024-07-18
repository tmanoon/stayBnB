import { utilService } from "../../../services/util.service"
import { useNavigate } from "react-router"

export function DynamicModalHeader({ stay, params }) {
    const navigate = useNavigate()
    
    function validateAndMoveToPayment() {
        if (params.entryDate && params.exitDate &&
            (params.adults || params.children || params.infants)) {
            const queryParams = new URLSearchParams({
                entryDate: params.entryDate,
                exitDate: params.exitDate,
                adults: params.adults || '',
                children: params.children || '',
                infants: params.infants || ''
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