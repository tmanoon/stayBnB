import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import MiniSearch from 'minisearch'

import { utilService } from '../../services/util.service'
import { stayService } from '../../services/stay.service'
import { loadStays, setStayFilter } from '../../store/actions/stay.actions'

import { HeaderDateFilter } from './HeaderDateFilter'
import { HeaderMapFilter } from './HeaderMapFilter'
import { HeaderGuestFilter } from './HeaderGuestFilter'

export function HeaderFilterSearch({ modalType, handleModalTypeChange }) {
    const header = useRef(null)
    const navigate = useNavigate()
    let filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const { txt, entryDate, exitDate, guestCount } = filterBy
    const [filterByToEdit, setFilterByToEdit] = useState({ txt, entryDate, exitDate, guestCount })

    useEffect(() => {
        const handleClickOutside = ev => {
            if (header.current && !header.current.contains(ev.target)) handleModalTypeChange(ev)
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [header, handleModalTypeChange])

    // useEffect(() => {
    //     setMiniSearch()
    // }, [])

    function onLoadStays(ev) {
        ev.stopPropagation()
        navigate('/')
        handleModalTypeChange(ev)
        setStayFilter({ ...filterBy, ...filterByToEdit })
        loadStays()
    }

    // let miniSearch = new MiniSearch({
    //     fields: ['name', 'loc.country', 'loc.city', 'loc.address'], // fields to index for full-text search
    //     storeFields: ['name', 'loc.country', 'loc.city', 'loc.address'] // fields to return with search results
    // })

    // async function setMiniSearch() {
    //     try {
    //         const allStays = await stayService.query()
    //         const allStaysWithId = allStays.map((stay, idx) => ({ ...stay, id: idx }))
    //         miniSearch.addAll(allStaysWithId)
    //     }
    //     catch (err) { console.log(err) }
    // }

    function handleSearch(input) {
        const txt = (typeof input === 'string') ? input : input.target.value
        // let results = miniSearch.search(txt)
        setFilterByToEdit({ ...filterByToEdit, txt })
    }

    return (
        <section ref={header} className={`header-filter grid align-center ${modalType && modalType !== 'user-nav' ? 'grey' : ''}`}>
            <div className={`destination ${modalType === 'map' ? 'selected' : ''} flex column justify-center`} onClick={(e) => handleModalTypeChange(e, 'map')}>
                Where
                <input className=' grayTxt' placeholder={filterByToEdit.txt ? filterByToEdit.txt : "Search destinations"} onChange={handleSearch} value={filterByToEdit.txt}></input>
            </div>

            <span className='splitter-1'></span>

            <div className={`dates check-in ${modalType === 'check-in' ? 'selected' : ''} flex column justify-center`} onClick={(e) => handleModalTypeChange(e, 'check-in')}>
                Check in
                <span>{filterByToEdit.entryDate ? utilService.timestampToMonthDay(filterByToEdit.entryDate) : 'Add dates'}</span>
            </div>

            <span className='splitter-2'></span>

            <div className={`dates check-out ${modalType === 'check-out' ? 'selected' : ''} flex column justify-center`} onClick={(e) => handleModalTypeChange(e, 'check-out')}>
                Check out
                <span>{filterByToEdit.exitDate ? utilService.timestampToMonthDay(filterByToEdit.exitDate) : 'Add dates'}</span>
            </div>

            <span className='splitter-3'></span>

            <div className={`guests ${modalType === 'guest' ? 'selected' : ''} flex space-between`} onClick={(e) => handleModalTypeChange(e, 'guest')}>
                <div className="flex column justify-center">
                    Who
                    <span className='guest-count'>{stayService.guestCountString(filterByToEdit)}</span>
                </div>
                <button onClick={onLoadStays} className={`search-btn ${modalType !== '' && modalType !== 'user-nav' ? 'compact' : ''}`} ><span>Search</span></button>
            </div>

            {modalType === 'map' && <HeaderMapFilter handleModalTypeChange={handleModalTypeChange} handleSearch={handleSearch} />}
            {(modalType === 'check-in' || modalType === 'check-out') && <HeaderDateFilter handleModalTypeChange={handleModalTypeChange} filterByToEdit={filterByToEdit} setFilterByToEdit={setFilterByToEdit} />}
            {modalType === 'guest' && <HeaderGuestFilter filterByToEdit={filterByToEdit} setFilterByToEdit={setFilterByToEdit} />}
        </section>
    )
}