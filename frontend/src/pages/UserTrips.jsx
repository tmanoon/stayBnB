import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react'
import { orderService } from '../services/order.service.js'
import { utilService } from '../services/util.service.js'
import { socketService, SOCKET_EVENT_ORDER_UPDATE } from '../services/socket.service.js'
import { TripModal } from '../cmps/UserTripsCmps/TripModal.jsx'
import { userService } from '../services/user.service.js'
// import { UserNotification } from '../cmps/UserNotification.jsx'

export function UserTrips() {
    const [userTrips, setUserTrips] = useState([])
    const [trips, setTrips] = useState([])
    const [tripFilter, setTripFilter] = useState({ tense: 'future', status: 'all' })
    const [onModal, setOnModal] = useState(false)
    const [chosenTrip, setChosenTrip] = useState(null)
    const [layoutType, setLayout] = useState('cards')
    const navigate = useNavigate()
    const { isLoading } = useSelector(storeState => storeState.stayModule)

    useEffect(() => {
        socketService.on(SOCKET_EVENT_ORDER_UPDATE, onUpdateOrderStatus)

        const fetchData = async () => {
            try {
                const user = userService.getLoggedInUser()
                const trips = await orderService.getUserOrdersById(user._id)
                setUserTrips(trips)
            }
            catch (err) { console.log(err) }
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (userTrips.length > 0) {
            const filteredTrips = orderService.filterUserOrders(userTrips, tripFilter)
            setTrips(filteredTrips)
        }
    }, [userTrips, tripFilter])


    function handleFilter({ target }) {
        const { name: field, value } = target
        setTripFilter(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onChoose(trip) {
        setChosenTrip(trip)
        setOnModal(true)
    }

    function onLayout(type) {
        setLayout(type)
    }

    function onUpdateOrderStatus(order) {
        setTrips(prevTrips => prevTrips.map(trip => {
            if(trip._id === order._id) return order
            return trip
        }))
    }

    if (!userTrips || !userTrips.length) return <section className='user-trips no-user-trips'>
        <header>
            <h1>Trips</h1>
        </header>

        <div>
            <h2>No trips booked...yet!</h2>
            <p>Time to dust off your bags and start planning your next adventure</p>
            <button onClick={() => navigate('/')}>Start searching</button>
        </div>

        <p>Can't find your reservation here? <span>Visit the Help Center</span></p>
    </section>

    if (!trips || !trips.length) return <section className='user-trips no-user-trips'>
        <header className='flex align-center space-between'>
            <h1>Trips</h1>

            <div className='filters flex'>
                <select name="tense" value={tripFilter.tense} onChange={handleFilter}>
                    <option value="all">All</option>
                    <option value="future">Future</option>
                    <option value="current">Current</option>
                    <option value="past">Past</option>
                </select>

                <select name="status" value={tripFilter.status} onChange={handleFilter}>
                    <option value="all">All</option>
                    <option value="approved">Approved</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>
        </header>

        {tripFilter.tense === 'all' && <h2>All reservations</h2>}
            {tripFilter.tense === 'future' && <h2>Upcoming reservations</h2>}
            {tripFilter.tense === 'current' && <h2>Current reservations</h2>}
            {tripFilter.tense === 'past' && <h2>Past reservations</h2>}

        <div>
            <h2>No trips to Show</h2>
        </div>

        <p>Can't find your reservation here? <span>Visit the Help Center</span></p>
    </section>

    return <>
        <section className='user-trips'>
            <header className='flex align-center space-between'>
                <h1>Trips</h1>

                <div className='filters flex'>
                    <div className='layout-btns flex align-center'>
                        <button onClick={() => onLayout('lines')} className={`lines flex center ${(layoutType === 'lines' ? 'selected' : '')}`}></button>
                        <button onClick={() => onLayout('cards')} className={`cards flex center ${(layoutType === 'cards' ? 'selected' : '')}`}></button>
                    </div>

                    <select name="tense" value={tripFilter.tense} onChange={handleFilter}>
                        <option value="all">All</option>
                        <option value="future">Future</option>
                        <option value="current">Current</option>
                        <option value="past">Past</option>
                    </select>

                    <select name="status" value={tripFilter.status} onChange={handleFilter}>
                        <option value="all">All</option>
                        <option value="approved">Approved</option>
                        <option value="pending">Pending</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>
            </header>

            {tripFilter.tense === 'all' && <h2>All reservations</h2>}
            {tripFilter.tense === 'future' && <h2>Upcoming reservations</h2>}
            {tripFilter.tense === 'current' && <h2>Current reservations</h2>}
            {tripFilter.tense === 'past' && <h2>Past reservations</h2>}

            <ul className={`grid ${layoutType}`}>
                {trips.map(trip => (
                    <li key={trip._orderId} className={`trip-card grid ${trip.status}`} onClick={() => onChoose(trip)} >

                        <div className='title flex column'>
                            <h3>{trip.stay.name}</h3>
                            <p><span>Booking number:</span>&nbsp;&nbsp;{trip._id.slice(18)}</p>
                        </div>

                        <div className='dates'>
                            <h4>{utilService.timestampsToShortDates(+trip.entryDate, +trip.exitDate)}</h4>
                        </div>

                        <div className='address flex column'>
                            <p>{trip.stay.location.address}</p>
                            <p>{trip.stay.location.city}</p>
                            <p>{trip.stay.location.country}</p>
                        </div>

                        <div className='image'>
                            <img src={trip.stay.img} alt={trip.stay.name} />
                            <p>{utilService.timestampDaysAway(+trip.entryDate, +trip.exitDate)} |
                                <span className={`status ${trip.status}`}> {trip.status}</span>
                            </p>
                        </div>
                    </li>
                ))}
            </ul>

            <p>Can't find your reservation here? <span>Visit the Help Center</span></p>
        </section>

        {onModal && chosenTrip && <TripModal trip={chosenTrip} setOnModal={setOnModal} />}
        {/* <UserNotification /> */}
    </>
}