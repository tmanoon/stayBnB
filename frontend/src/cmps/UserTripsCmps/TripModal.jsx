import { utilService } from "../../services/util.service"

export function TripModal({ trip, setOnModal }) {

    function onCloseModal(e) {
        e.stopPropagation()
        setOnModal(false)
    }

    function guestSum() {
        return Object.values(trip.guests).reduce((acc, count) => acc + count, 0)
    }

    return <>
        <div className='overlay' onClick={onCloseModal}></div>

        <section className={`order-confirmation trip-modal ${trip.status}`}>
            <header className="order-header flex center">
                <button onClick={onCloseModal} className='exit-btn'></button>
                {trip.status === 'approved' && <h1 className="order-reserved">Reservation confirmed</h1>}
                {trip.status === 'pending' && <h1 className="order-reserved">Reservation pending</h1>}
                {trip.status === 'rejected' && <h1 className="order-reserved">Reservation rejected</h1>}
            </header>

            <div className='order-details grid'>
                <img src={trip.stay.img} alt={trip.stay.name} />

                <h1>Trip details</h1>

                <div className='booking-number flex column'>
                    <p>Booking number:</p>
                    <h5>{trip._id.slice(18)}</h5>
                </div>

                <div className='stay-name flex column'>
                    <p>Property name:</p>
                    <h5>{trip.stay.name}</h5>
                </div>

                <div className='stay-name flex column'>
                    <p>Location:</p>
                    <h5>{trip.stay.location.address}</h5>
                </div>

                <div className='dates grid'>
                    <div className='flex column'>
                        <p>Check-in:</p>
                        <h5>{utilService.timestampToDate(+trip.entryDate)}</h5>
                    </div>

                    <div className='flex column'>
                        <p>Check-out:</p>
                        <h5>{utilService.timestampToDate(+trip.exitDate)}</h5>
                    </div>
                </div>

                <div className='guests-rooms grid'>
                    <div className='guests-container flex column'>
                        <div className='guests flex align-center'>
                            <p>Total guests:</p>
                            <h5>&nbsp;&nbsp;{guestSum()}</h5>
                        </div>
                        <ul>
                            {+trip.guests.adults > 0 && <li> {trip.guests.adults} adult{trip.guests.adults === 1 ? '' : 's'}</li>}
                            {+trip.guests.children > 0 && <li>{trip.guests.children} child{trip.guests.children === 1 ? '' : 'ren'}</li>}
                            {+trip.guests.infants > 0 && <li>{trip.guests.infants} infant{trip.guests.infants === 1 ? '' : 's'}</li>}
                            {+trip.guests.pets > 0 && <li>{trip.guests.pets} pet{trip.guests.pets === 1 ? '' : 's'}</li>}
                        </ul>
                    </div>

                    <div className='rooms flex column'>
                        <p>Total Rooms:</p>
                        {<h5>3</h5> }{/* //FIXXXXXXX */}
                        
                    </div>
                </div>

                <div className='price flex column'>
                    <div className='flex space-between'>
                        <p>Price:</p>
                        <p className="flex align-center">$ {trip.stay.price} X {utilService.calcSumOfDays(trip)} nights &nbsp;&nbsp;&nbsp;&nbsp;
                            <span>$ {(utilService.calcSumToPayAtTrips(trip, trip.stay))}</span></p>
                    </div>

                    <div className='flex space-between'>
                        <p>Service fee:</p>
                        <p>$ {(utilService.calcSumToPayAtTrips(trip, trip.stay) * 0.14125).toFixed(2)}</p>
                    </div>
                    
                    <div className='flex space-between'>
                        <h4>Total:</h4>
                        <p><span>$ {((utilService.calcSumToPayAtTrips(trip, trip.stay) + (utilService.calcSumToPayAtTrips(trip, trip.stay) * 0.14125))).toLocaleString()}</span></p>
                    </div>
                </div>
            </div>

            <footer className='order-details-footer flex center'>
                <button className="close-btn flex center" onClick={onCloseModal}>Close</button>
                <button className="msg-btn flex center" >Message host</button>
            </footer>
        </section>
    </>
}