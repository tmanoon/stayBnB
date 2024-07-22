export function GuestFilter({ filterBy }) {

    function updateGuestCounts(guestType, countChange) {
        const newGuestCounts = { ...filterBy.guestCount }

        newGuestCounts[guestType] += countChange

        setStayHeaderFilter({ ...filterBy, guestCount: newGuestCounts })
    }

    return (
        <section className="guest-filter">
            <div className="options">
                <article className="option">
                    <div className="description">
                        Adults
                        <span>Age 18 or above</span>
                    </div>
                    <div className="count">
                        <button className={filterBy.guestCount.adults === 0 ? 'disabled' : ''} onClick={() => {
                            if (filterBy.guestCount.adults > 1) {
                                updateGuestCounts('adults', -1)
                            }
                        }}>-</button>
                        {filterBy.guestCount.adults}
                        <button className={filterBy.guestCount.adults + filterBy.guestCount.children >= 16 ? 'disabled' : ''} onClick={() => {
                            if (filterBy.guestCount.adults + filterBy.guestCount.children < 16) {
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
                        <button className={filterBy.guestCount.children === 0 ? 'disabled' : ''} onClick={() => {
                            if (filterBy.guestCount.children > 0) {
                                updateGuestCounts('children', -1)
                            }
                        }}>-</button>
                        {filterBy.guestCount.children}
                        <button className={filterBy.guestCount.adults + filterBy.guestCount.children >= 16 ? 'disabled' : ''} onClick={() => {
                            if (filterBy.guestCount.adults + filterBy.guestCount.children < 16) {
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
                        <button className={filterBy.guestCount.infants === 0 ? 'disabled' : ''} onClick={() => {
                            if (filterBy.guestCount.infants > 0) {
                                updateGuestCounts('infants', -1)
                            }
                        }}>-</button>
                        {filterBy.guestCount.infants}
                        <button className={filterBy.guestCount.infants === 5 ? 'disabled' : ''} onClick={() => {
                            if (filterBy.guestCount.infants < 5) {
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
                        <button className={filterBy.guestCount.pets === 0 ? 'disabled' : ''} onClick={() => {
                            if (filterBy.guestCount.pets > 0) {
                                updateGuestCounts('pets', -1)
                            }
                        }}>-</button>
                        {filterBy.guestCount.pets}
                        <button className={filterBy.guestCount.pets === 5 ? 'disabled' : ''} onClick={() => {
                            if (filterBy.guestCount.pets < 5) {
                                updateGuestCounts('pets', +1)
                            }
                        }}>+</button>
                    </div>
                </article>
            </div>
        </section>
    )
}
