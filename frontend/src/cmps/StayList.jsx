import { Link } from 'react-router-dom'
import { StayPreview } from './StayPreview.jsx'

export function StayList({ stays, filterBy, user, setUser }) {
    
    let { guestCount, entryDate, exitDate } = filterBy
    if (!entryDate && !exitDate) {
        entryDate = +new Date()
        exitDate = entryDate + (24 * 60 * 60 * 1000)
    } else if (!exitDate) exitDate = entryDate + (24 * 60 * 60 * 1000)
    else if (entryDate === exitDate) exitDate = entryDate + (24 * 60 * 60 * 1000)
    if (!guestCount.adults) guestCount.adults = 1

    const condensedSP = objectToQueryString({ ...guestCount, entryDate, exitDate })

    function objectToQueryString(obj) {
        return Object.keys(obj).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`).join('&')
    }

    return (
        <ul className={`stay-list grid`}>
            {stays.map(stay => (
                <li key={stay._id}>
                    <Link to={{
                        pathname: `/${stay._id}`,
                        search: condensedSP,
                        // target: '_blank'
                    }}>
                        <StayPreview
                            stay={stay}
                            filterBy={filterBy}
                            user={user}
                            setUser={setUser}
                        />
                    </Link>
                </li>
            ))}
        </ul>
    )
}
