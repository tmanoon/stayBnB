export function HeaderGuestFilter({ filterByToEdit, setFilterByToEdit }) {

    function updateGuestCounts(guestType, countChange) {
        const newGuestCount = { ...filterByToEdit.guestCount }
        newGuestCount[guestType] += countChange
        setFilterByToEdit({ ...filterByToEdit, guestCount: newGuestCount })
    }

    return (
        <section className="guest-filter modal">
            <div className="options">
                <article className="option">
                    <div className="description">
                        Adults
                        <span>Age 18 or above</span>
                    </div>
                    <div className="count">
                        <button className={filterByToEdit.guestCount.adults === 0 ? 'disabled' : ''} onClick={() => {
                            if (filterByToEdit.guestCount.adults > 1) {
                                updateGuestCounts('adults', -1)
                            }
                        }}>-</button>
                        {filterByToEdit.guestCount.adults}
                        <button className={filterByToEdit.guestCount.adults + filterByToEdit.guestCount.children >= 16 ? 'disabled' : ''} onClick={() => {
                            if (filterByToEdit.guestCount.adults + filterByToEdit.guestCount.children < 16) {
                                updateGuestCounts('adults', 1)
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
                        <button className={filterByToEdit.guestCount.children === 0 ? 'disabled' : ''} onClick={() => {
                            if (filterByToEdit.guestCount.children > 0) {
                                updateGuestCounts('children', -1)
                            }
                        }}>-</button>
                        {filterByToEdit.guestCount.children}
                        <button className={filterByToEdit.guestCount.adults + filterByToEdit.guestCount.children >= 16 ? 'disabled' : ''} onClick={() => {
                            if (filterByToEdit.guestCount.adults + filterByToEdit.guestCount.children < 16) {
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
                        <button className={filterByToEdit.guestCount.infants === 0 ? 'disabled' : ''} onClick={() => {
                            if (filterByToEdit.guestCount.infants > 0) {
                                updateGuestCounts('infants', -1)
                            }
                        }}>-</button>
                        {filterByToEdit.guestCount.infants}
                        <button className={filterByToEdit.guestCount.infants === 5 ? 'disabled' : ''} onClick={() => {
                            if (filterByToEdit.guestCount.infants < 5) {
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
                        <button className={filterByToEdit.guestCount.pets === 0 ? 'disabled' : ''} onClick={() => {
                            if (filterByToEdit.guestCount.pets > 0) {
                                updateGuestCounts('pets', -1)
                            }
                        }}>-</button>
                        {filterByToEdit.guestCount.pets}
                        <button className={filterByToEdit.guestCount.pets === 5 ? 'disabled' : ''} onClick={() => {
                            if (filterByToEdit.guestCount.pets < 5) {
                                updateGuestCounts('pets', +1)
                            }
                        }}>+</button>
                    </div>
                </article>
            </div>
        </section>
    )
}
