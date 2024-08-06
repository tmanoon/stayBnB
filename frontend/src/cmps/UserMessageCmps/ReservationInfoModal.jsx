import { utilService } from "../../services/util.service"

export function ReservationInfoModal({ order, onReserveInfoModal }) {

    return <>
        <div className="overlay" onClick={onReserveInfoModal}></div>

        <section className="reservation-details-modal reservation-details">
            <header className="flex center">
                <h1>Reservation</h1>
                <button className="exit-btn" onClick={onReserveInfoModal}></button>
            </header>

            <main>
                <h2 className="title">{order.stay.name}</h2>
                <img src={order.stay.imgUrls[0]} />

                <div className="dates flex space-between">
                    <div className="start flex column">
                        <h4>Starts</h4>
                        <p>{utilService.timestampToDateAndTimeObj(+order.entryDate).date}</p>
                        <p>{utilService.timestampToDateAndTimeObj(+order.entryDate).time}</p>
                    </div>

                    <div className="end flex column">
                        <h4>Ends</h4>
                        <p>{utilService.timestampToDateAndTimeObj(+order.exitDate).date}</p>
                        <p>{utilService.timestampToDateAndTimeObj(+order.exitDate).time}</p>
                    </div>
                </div>

                <div className="confirmation">
                    <h4>Confirmation code</h4>
                    <p>{order._id.slice(18)}</p>
                </div>

                <div className="directions">
                    <h3>Getting there</h3>
                    <h4>Address</h4>
                    <p>{order.stay.location.address}, {order.stay.location.city}, {order.stay.location.country}</p>
                </div>

                <div className="payment-info">
                    <h3>Payment info</h3>
                    <h4>Total cost</h4>
                    <p>$ {order.stay.price} USD</p>
                </div>
            </main>
        </section>

    </>
}