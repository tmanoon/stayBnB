
import { loadStays, removeStay, saveStay, setStayHeaderFilter } from '../../store/actions/stay.actions'
import { store } from '../../store/store.js'


export function GuestFilter({headerFilterBy}) {


    function updateGuestCounts(guestType, countChange) {
        const newGuestCounts = { ...headerFilterBy.guestCount }

        newGuestCounts[guestType] += countChange

        setStayHeaderFilter({ ...headerFilterBy, guestCount: newGuestCounts })
    }


    return <section className="guest-filter">

        <div className="options">

            <article className="option">
                <div className="description">
                    Adults
                    <span>Ages 13 or above</span>
                </div>

                <div className="count">
                    <button className={headerFilterBy.guestCount.adults === 0 ? 'disabled' : ''} onClick={() => {
                        if (headerFilterBy.guestCount.adults > 0) {
                            updateGuestCounts('adults', -1)
                        }
                    }}>-</button>
                    {headerFilterBy.guestCount.adults}
                    <button className={headerFilterBy.guestCount.adults + headerFilterBy.guestCount.children >= 16 ? 'disabled' : ''} onClick={() => {
                        if (headerFilterBy.guestCount.adults + headerFilterBy.guestCount.children < 16) {
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
                    <button className={headerFilterBy.guestCount.children === 0 ? 'disabled' : ''} onClick={() => {
                        if (headerFilterBy.guestCount.children > 0) {
                            updateGuestCounts('children', -1)
                        }
                    }}>-</button>
                    {headerFilterBy.guestCount.children}
                    <button className={headerFilterBy.guestCount.adults + headerFilterBy.guestCount.children >= 16 ? 'disabled' : ''} onClick={() => {
                        if (headerFilterBy.guestCount.adults + headerFilterBy.guestCount.children < 16) {
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
                    <button className={headerFilterBy.guestCount.infants === 0 ? 'disabled' : ''} onClick={() => {
                        if (headerFilterBy.guestCount.infants > 0) {
                            updateGuestCounts('infants', -1)
                        }
                    }}>-</button>
                    {headerFilterBy.guestCount.infants}
                    <button className={headerFilterBy.guestCount.infants === 5 ? 'disabled' : ''} onClick={() => {
                        if (headerFilterBy.guestCount.infants < 5) {
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
                    <button className={headerFilterBy.guestCount.pets === 0 ? 'disabled' : ''} onClick={() => {
                        if (headerFilterBy.guestCount.pets > 0) {
                            updateGuestCounts('pets', -1)
                        }
                    }}>-</button>
                    {headerFilterBy.guestCount.pets}
                    <button className={headerFilterBy.guestCount.pets === 5 ? 'disabled' : ''}  onClick={() => {
                        if (headerFilterBy.guestCount.pets < 5) {
                            updateGuestCounts('pets', +1)
                        }
                    }}>+</button>
                </div>

            </article>

        </div>


    </section>
}