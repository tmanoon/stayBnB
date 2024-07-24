export function GuestCountModal({ stay, searchParams, setSearchParams, setModal }) {

    function onCloseModal() {
        setModal()
    }

    function updateGuestCounts(guestType, countChange) {
        const newParams = { ...searchParams }
        const currentCount = parseInt(newParams[guestType])
        newParams[guestType] = Math.max(0, currentCount + countChange)

        setSearchParams(newParams)
    }

    return <section className="details-guest-count">
        <article>
            <div className="description">
                Adults
                <span>Ages 13 or above</span>
            </div>

            <div className="count">
                <button className={+searchParams.adults === 1 ? 'disabled' : ''} onClick={() => { if (searchParams.adults > 1) { updateGuestCounts('adults', -1) } }}>-</button>
                {+searchParams.adults}
                <button className={+searchParams.adults + +searchParams.children >= stay.capacity ? 'disabled' : ''} onClick={() => { if (+searchParams.adults + +searchParams.children < stay.capacity) { updateGuestCounts('adults', +1) } }}>+</button>
            </div>
        </article>

        <article>
            <div className="description">
                Children
                <span>Ages 2 - 12</span>
            </div>

            <div className="count">
                <button className={+searchParams.children === 0 ? 'disabled' : ''} onClick={() => { if (+searchParams.children > 0) { updateGuestCounts('children', -1) } }}>-</button>
                {+searchParams.children}
                <button className={+searchParams.adults + +searchParams.children >= stay.capacity ? 'disabled' : ''} onClick={() => { if (+searchParams.adults + +searchParams.children < stay.capacity) { updateGuestCounts('children', +1) } }}>+</button>
            </div>
        </article>

        <article>
            <div className="description">
                Infants
                <span>Under 2</span>
            </div>

            <div className="count">
                <button className={+searchParams.infants === 0 ? 'disabled' : ''} onClick={() => { if (+searchParams.infants > 0) { updateGuestCounts('infants', -1) } }}>-</button>
                {+searchParams.infants}
                <button className={+searchParams.infants === 5 ? 'disabled' : ''} onClick={() => { if (+searchParams.infants < 5) { updateGuestCounts('infants', +1) } }}>+</button>
            </div>
        </article>

        <article>
            <div className="description">Pets</div>

            <div className="count">
                <button className={+searchParams.pets === 0 ? 'disabled' : ''} onClick={() => { if (+searchParams.pets > 0) { updateGuestCounts('pets', -1) } }}>-</button>
                {+searchParams.pets}
                <button className={+searchParams.pets === 5 ? 'disabled' : ''} onClick={() => { if (+searchParams.pets < 5) { updateGuestCounts('pets', +1) } }}>+</button>
            </div>
        </article>

        <article className="btn-container">
            <div onClick={onCloseModal} className='close-btn'>Close</div>
        </article>
    </section>
}