import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { loadStays, removeStay, saveStay, setStayFilter } from '../store/actions/stay.actions.js'
import { StayList } from '../cmps/StayList.jsx'
import { LabelsFilter } from '../cmps/LabelsFilter.jsx'
import { store } from '../store/store.js'
import { stayService } from '../services/stay.service.js'
import { socketService, SOCKET_EVENT_ORDER_UPDATE } from '../services/socket.service.js'
import { Loading } from '../cmps/Loading.jsx'


export function StayIndex({ scrolledPage }) {
    const [searchParams, setSearchParams] = useSearchParams()
    const { stays } = useSelector(storeState => storeState.stayModule)
    const { filterBy } = useSelector(storeState => storeState.stayModule)
    const { isLoading } = useSelector(storeState => storeState.stayModule)
    const { headerFilterBy } = store.getState().stayModule
    
    useEffect(() => {
        setSearchParams(stayService.mergeFiltersSP(filterBy, headerFilterBy))
        loadStays()
    
    }, [filterBy])

    useEffect(() => {
        setTimeout(() => {
            socketService.emit(SOCKET_EVENT_ORDER_UPDATE, 'order')
        }, 1000)


    }, ['hi'])

    function onIncreasePagination() {
        const newPagination = (filterBy.pagination || 0) + 30
        setStayFilter({ ...filterBy, pagination: newPagination >= 60 ? newPagination : 60 })

    }

    const scrolledHeader = () => {
        if (scrolledPage) {
            return 'index-header-condensed'
        } else {
            return 'index-header-expanded'
        }
    }

    // if (!stays || !stays.length) return <section className='index-section'>
    //     <LabelsFilter
    //         setStayFilter={setStayFilter}
    //         filterBy={filterBy}
    //         scrolledPage={scrolledPage}
    //     />
    // </section>

        return <section className={`index-section ${scrolledHeader()}`}>
            <LabelsFilter
                setStayFilter={setStayFilter}
                filterBy={filterBy}
                scrolledPage={scrolledPage}
            />
            {isLoading && <Loading />}
            {!isLoading && <><StayList
                stays={stays}
                filterBy={filterBy}
                scrolledPage={scrolledPage}
            />
            <section className='index-end-section flex column center'>
                <h1>Continue exploring homes</h1>
                <button onClick={onIncreasePagination}>Show more</button>
            </section></>}
        </section>
}