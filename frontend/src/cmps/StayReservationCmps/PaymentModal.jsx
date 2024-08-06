import { useSelector } from "react-redux"
import { utilService } from "../../services/util.service"

export function PaymentModal({ stay, searchParams }) {

    return <div className="payment-modal flex column">
        <div className="stay-details flex">
            <img src={stay.imgUrls[0]} />
            <div className="text-details flex column">
                <h2>{stay.summary}</h2>
                <p>{stay.propertyType}</p>
                <p>★ {utilService.calcRate(stay).toFixed(2)} ({stay.reviews.length} reviews)</p>
            </div>
        </div>

        <div className="price-details">
            <h1>Price details</h1>

            <div className="accommodation flex space-between">
                <p>${stay.price} X {utilService.calcSumOfDays(searchParams) === 1 ? `${utilService.calcSumOfDays(searchParams)} night` : `${utilService.calcSumOfDays(searchParams)} nights`}</p>
                <p className='sum'>${(stay.price * utilService.calcSumOfDays(searchParams) * (+searchParams.adults + +searchParams.children))}</p>
            </div>

            <div className="fee flex space-between">
                <p>Staybnb service fee</p>
                <p>${Math.ceil(utilService.calcSumToPay(searchParams, stay) * 0.14125)}</p>
            </div>

            <div className="total flex space-between">
                <p>Total <span>(USD)</span></p>
                <p>${Math.ceil((utilService.calcSumToPay(searchParams, stay))) + Math.ceil((utilService.calcSumToPay(searchParams, stay) * 0.14125))}</p>
            </div>
        </div>
    </div>
}