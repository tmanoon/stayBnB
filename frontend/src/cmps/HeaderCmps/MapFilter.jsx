import { useEffect } from 'react'

export function MapFilter({ setModalType, filterByToEdit, setFilterByToEdit }) {

    function switchToDatesFilter(ev) {
        ev.stopPropagation()
        setModalType('check-in')
    }

    function onSelectRegion(str) {
        setFilterByToEdit({ ...filterByToEdit, txt: str })
    }

    return <section className="map-filter">
        <h1>Search by region</h1>

        <section className="regions">

            <article className="region" onClick={(event) => { switchToDatesFilter(event), onSelectRegion('') }}>
                <img src="https://res.cloudinary.com/db7t5amdv/image/upload/v1713173021/kmhnayfz9phpmfecbkqe.jpg" alt="" />
                <p>I'm flexible</p>
            </article>

            <article className="region" onClick={(event) => { switchToDatesFilter(event), onSelectRegion('Middle East') }}>
                <img src="https://res.cloudinary.com/db7t5amdv/image/upload/v1713173527/gliel69vriiymwbvkirv.webp" alt="" />
                <p>Middle East</p>
            </article>

            <article className="region" onClick={(event) => { switchToDatesFilter(event), onSelectRegion('Italy') }}>
                <img src="https://res.cloudinary.com/db7t5amdv/image/upload/v1713173841/c5s5qu58b3fxbers5gjl.webp" alt="" />
                <p>Italy</p>
            </article>

            <article className="region" onClick={(event) => { switchToDatesFilter(event), onSelectRegion('United States') }}>
                <img src="https://res.cloudinary.com/db7t5amdv/image/upload/v1713174560/u6o8qrtlbnayttfcesv8.webp" alt="" />
                <p>United States</p>
            </article>
            <article className="region" onClick={(event) => { switchToDatesFilter(event), onSelectRegion('Greece') }}>
                <img src="https://res.cloudinary.com/db7t5amdv/image/upload/v1713174600/zzsbcrswmkepkexjrfv6.webp" alt="" />
                <p>Greece</p>
            </article>

            <article className="region" onClick={(event) => { switchToDatesFilter(event), onSelectRegion('South America') }}>
                <img src="https://res.cloudinary.com/db7t5amdv/image/upload/v1713173843/sjlt9cdcawpaj9m8wkby.webp" alt="" />
                <p>South America</p>
            </article>
        </section>
    </section>
}