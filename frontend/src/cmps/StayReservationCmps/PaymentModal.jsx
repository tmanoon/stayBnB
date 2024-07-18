import { useSelector } from "react-redux"
import { utilService } from "../../services/util.service"

export function PaymentModal({ stay, params }) {

    return <div className="payment-modal flex column">
        <div className="stay-details flex">
            <img src={stay.imgUrls[0]} />
            <div className="text-details flex column">
                <h2>{stay.summary}</h2>
                <p>{stay.propertyType}</p>
                <p>★ {utilService.calcRate(stay).toFixed(2)} ({stay.reviews.length} reviews) {stay.host.experience.isSuper &&
                    <span>・
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" role="presentation" focusable="false"><path d="m8.5 7.6 3.1-1.75 1.47-.82a.83.83 0 0 0 .43-.73V1.33a.83.83 0 0 0-.83-.83H3.33a.83.83 0 0 0-.83.83V4.3c0 .3.16.59.43.73l3 1.68 1.57.88c.35.2.65.2 1 0zm-.5.9a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z"></path></svg>
                        &nbsp; Superhost</span>}
                </p>
            </div>
        </div>

        <div className="price-details">
            <h1>Price details</h1>

            <div className="accommodation flex space-between">
                <p>$ {stay.price.toLocaleString()} X {utilService.calcSumOfDays(params) === 1 ? `${utilService.calcSumOfDays(params)} night` : `${utilService.calcSumOfDays(params)} nights`}</p>
                <p className='sum'>${(stay.price * utilService.calcSumOfDays(params) * (+params.adults + +params.children)).toLocaleString()}</p>
            </div>

            <div className="fee flex space-between">
                <p>Staybnb service fee</p>
                <p>$ {(Math.round(utilService.calcSumToPay(params, stay) * 0.14125)).toLocaleString()}</p>
            </div>

            <div className="total flex space-between">
                <p>Total <span>(USD)</span></p>
                <p>$ {(Math.round((utilService.calcSumToPay(params, stay))) + Math.round((utilService.calcSumToPay(params, stay) * 0.14125))).toLocaleString()}</p>
            </div>
        </div>
    </div>
}