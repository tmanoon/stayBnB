import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { DateFilter } from './DateFilter'
import { MapFilter } from './MapFilter'
import { GuestFilter } from './GuestFilter'
import { loadStays, setStayFilter } from '../../store/actions/stay.actions'
import { stayService } from '../../services/stay.service'
import { store } from '../../store/store'
import { utilService } from '../../services/util.service'

export function HeaderFilter({ modalType, setModalType }) {
    const header = useRef(null)
    const navigate = useNavigate()
    let filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const { txt, entryDate, exitDate, guestCount } = filterBy
    const [filterByToEdit, setFilterByToEdit] = useState({ txt, entryDate, exitDate, guestCount })

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (header.current && !header.current.contains(event.target)) {
                setModalType('')
            }
        }
        document.addEventListener('click', handleClickOutside)
        return () => {
            document.removeEventListener('click', handleClickOutside)
        }

    }, [header])

    function onLoadStays(ev) {
        ev.stopPropagation()

        navigate('/')
        setModalType('')

        setStayFilter({ ...filterBy, ...filterByToEdit })
        loadStays()
    }

    return <section ref={header} className={`header-filter grid align-center ${modalType && modalType !== 'user-nav' ? 'grey' : ''}`}>
        <div className={`destination ${modalType === 'map' ? 'selected' : ''} flex column justify-center`} onClick={() => setModalType(modalType === 'map' ? null : 'map')}>
            Where
            <span className=' grayTxt'>{filterByToEdit.txt ? filterByToEdit.txt : "Search destinations"}</span>
        </div>

        <span className='splitter-1'></span>

        <div className={`dates check-in ${modalType === 'check-in' ? 'selected' : ''} flex column justify-center`} onClick={() => setModalType(modalType === 'check-in' ? null : 'check-in')}>
            Check in
            <span>{filterByToEdit.entryDate ? utilService.timestampToMonthDay(filterByToEdit.entryDate) : 'Add dates'}</span>
        </div>

        <span className='splitter-2'></span>

        <div className={`dates check-out ${modalType === 'check-out' ? 'selected' : ''} flex column justify-center`} onClick={() => setModalType(modalType === 'check-out' ? null : 'check-out')}>
            Check out
            <span>{filterByToEdit.exitDate ? utilService.timestampToMonthDay(filterByToEdit.exitDate) : 'Add dates'}</span>
        </div>

        <span className='splitter-3'></span>

        <div className={`guests ${modalType === 'guest' ? 'selected' : ''} flex space-between`} onClick={() => setModalType(modalType === 'guest' ? null : 'guest')}>
            <div className="flex column justify-center">
                Who
                <span className='guest-count'>{stayService.guestCountString(filterByToEdit)}</span>
            </div>
            <button onClick={onLoadStays} className={`search-btn ${modalType !== '' && modalType !== 'user-nav' ? 'compact' : ''}`} ><span>Search</span></button>
        </div>

        {modalType === 'map' && <MapFilter setModalType={setModalType} filterByToEdit={filterByToEdit} setFilterByToEdit={setFilterByToEdit} />}
        {(modalType === 'check-in' || modalType === 'check-out') && <DateFilter setModalType={setModalType} filterByToEdit={filterByToEdit} setFilterByToEdit={setFilterByToEdit} />}
        {modalType === 'guest' && <GuestFilter filterByToEdit={filterByToEdit} setFilterByToEdit={setFilterByToEdit} />}

    </section>
}