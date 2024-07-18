import { useState, useEffect } from 'react'
import { loadStays, removeStay, saveStay, setStayHeaderFilter } from '../../store/actions/stay.actions.js'
import { store } from '../../store/store.js'

export function GuestCount({ openModalType, params, updateParams, stay}) {

    function onCloseModal(ev) {
        ev.stopPropagation()

        openModalType('')
    }
    
    function updateGuestCounts(guestType, countChange) {
        const newParams = { ...params }

        const currentCount = parseInt(newParams[guestType])

        newParams[guestType] = Math.max(0, currentCount + countChange)

        updateParams(newParams)
    }

    return <section className="details-guest-count">

        <div className="options">

            <article className="option">
                <div className="description">
                    Adults
                    <span>Ages 13 or above</span>
                </div>

                <div className="count">
                    <button className={+params.adults === 1 ? 'disabled' : ''} onClick={() => {
                        if (params.adults > 1) {
                            updateGuestCounts('adults', -1)
                        }
                    }}>-</button>
                    {+params.adults}
                    <button className={+params.adults + +params.children >= stay.capacity ? 'disabled' : ''} onClick={() => {
                        if (+params.adults + +params.children < stay.capacity) {
                            updateGuestCounts('adults', +1)
                        }
                    }}>+</button>
                </div>

            </article>

            <article className="option">
                <div className="description">
                    Children
                    <span>Ages 2 - 12</span>
                </div>

                <div className="count">
                    <button className={+params.children === 0 ? 'disabled' : ''} onClick={() => {
                        if (+params.children > 0) {
                            updateGuestCounts('children', -1)
                        }
                    }}>-</button>
                    {+params.children}
                    <button className={+params.adults + +params.children >= stay.capacity ? 'disabled' : ''} onClick={() => {
                        if (+params.adults + +params.children < stay.capacity) {
                            updateGuestCounts('children', +1)
                        }
                    }}>+</button>
                </div>


            </article>

            <article className="option">
                <div className="description">
                    Infants
                    <span>Under 2</span>
                </div>

                <div className="count">
                    <button className={+params.infants === 0 ? 'disabled' : ''} onClick={() => {
                        if (+params.infants > 0) {
                            updateGuestCounts('infants', -1)
                        }
                    }}>-</button>
                    {+params.infants}
                    <button className={+params.infants === 5 ? 'disabled' : ''} onClick={() => {
                        if (+params.infants < 5) {
                            updateGuestCounts('infants', +1)
                        }
                    }}>+</button>
                </div>

            </article>

            <article className="option">
                <div className="description">
                    Pets
                </div>

                <div className="count">
                    <button className={+params.pets === 0 ? 'disabled' : ''} onClick={() => {
                        if (+params.pets > 0) {
                            updateGuestCounts('pets', -1)
                        }
                    }}>-</button>
                    {+params.pets}
                    <button className={+params.pets === 5 ? 'disabled' : ''} onClick={() => {
                        if (+params.pets < 5) {
                            updateGuestCounts('pets', +1)
                        }
                    }}>+</button>
                </div>

            </article>

            <article className="btn-container">
                <div onClick={onCloseModal} className='close-btn'>Close</div>
            </article>

        </div>

    </section>
}