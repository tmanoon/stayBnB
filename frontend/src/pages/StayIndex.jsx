import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { userService } from '../services/user.service.js'
import { loadStays, setStayFilter } from '../store/actions/stay.actions.js'

import { StayList } from '../cmps/StayList.jsx'
import { Loading } from '../cmps/Loading.jsx'

export function StayIndex({ scrolledPage }) {
    const [searchParams, setSearchParams] = useSearchParams()
    const { loggedInUser } = useSelector(storeState => storeState.userModule)
    const { stays } = useSelector(storeState => storeState.stayModule)
    const { filterBy } = useSelector(storeState => storeState.stayModule)
    const { isLoading } = useSelector(storeState => storeState.stayModule)
    const [user, setUser] = useState(null)

    const memoizedFilterBy = useMemo(() => filterBy, [filterBy])

    useEffect(() => {
        const user = userService.getLoggedInUser()
        setUser(user)
        if (!user) loadStays()
    }, [loggedInUser])

    useEffect(() => {
        const { txt, entryDate, exitDate, label, placeType, propType, amenities, accessibility, hostLngs, pagination } = memoizedFilterBy
        const filterByParams = { txt, entryDate, exitDate, label, placeType, propType, amenities, accessibility, hostLngs, pagination, ...memoizedFilterBy.guestCount, ...memoizedFilterBy.priceRange, ...memoizedFilterBy.bbb, ...memoizedFilterBy.bookingOpts }
        setSearchParams(filterByParams)
        loadStays()
    }, [memoizedFilterBy])

    function onIncreasePagination() {
        const newPagination = (filterBy.pagination || 0) + 30
        setStayFilter({ ...filterBy, pagination: newPagination >= 60 ? newPagination : 60 })
    }

    const scrolledHeader = () => {
        if (scrolledPage) return 'index-header-condensed'
        return 'index-header-expanded'
    }

    return (
        <section className={`index-section ${scrolledHeader()}`}>
            {isLoading && <Loading />}
            {!isLoading &&
                <>
                    <StayList stays={stays} filterBy={filterBy} user={user} setUser={setUser} />
                    <section className='index-end-section flex column center'>
                        <h1>Continue exploring homes</h1>
                        <button onClick={onIncreasePagination}>Show more</button>
                    </section>
                </>}
        </section>
    )
}