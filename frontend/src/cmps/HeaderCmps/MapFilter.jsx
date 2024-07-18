
import { useEffect } from 'react'
import { loadStays, removeStay, saveStay, setStayHeaderFilter } from '../../store/actions/stay.actions'





export function MapFilter({ setModalType, headerFilterBy }) {



    function switchToDatesFilter(ev) {
        ev.stopPropagation()
        setModalType('check-in')
    }


    function onSelectRegion(region) {
        setStayHeaderFilter({ ...headerFilterBy, loc: { ...headerFilterBy.loc, region } })
    }

    return <section className="map-filter">
        <h1>Search by region</h1>

        <section className="regions">

            <article className="region" onClick={(event) => { switchToDatesFilter(event), onSelectRegion('') }}>
                <img src="https://res.cloudinary.com/db7t5amdv/image/upload/v1713173021/kmhnayfz9phpmfecbkqe.jpg" alt="" />
                <div>
                    I'm flexible
                </div>
            </article>

            <article className="region" onClick={(event) => { switchToDatesFilter(event), onSelectRegion('Middle East') }}>
                <img src="https://res.cloudinary.com/db7t5amdv/image/upload/v1713173527/gliel69vriiymwbvkirv.webp" alt="" />
                <div>
                    Middle East
                </div>
            </article>

            <article className="region" onClick={(event) => { switchToDatesFilter(event), onSelectRegion('Italy') }}>
                <img src="https://res.cloudinary.com/db7t5amdv/image/upload/v1713173841/c5s5qu58b3fxbers5gjl.webp" alt="" />
                <div>
                    Italy
                </div>
            </article>

            <article className="region" onClick={(event) => { switchToDatesFilter(event), onSelectRegion('United States') }}>
                <img src="https://res.cloudinary.com/db7t5amdv/image/upload/v1713174560/u6o8qrtlbnayttfcesv8.webp" alt="" />
                <div>
                    United States
                </div>
            </article>
            <article className="region" onClick={(event) => { switchToDatesFilter(event), onSelectRegion('Greece') }}>
                <img src="https://res.cloudinary.com/db7t5amdv/image/upload/v1713174600/zzsbcrswmkepkexjrfv6.webp" alt="" />
                <div>
                    Greece
                </div>
            </article>

            <article className="region" onClick={(event) => { switchToDatesFilter(event), onSelectRegion('South America') }}>
                <img src="https://res.cloudinary.com/db7t5amdv/image/upload/v1713173843/sjlt9cdcawpaj9m8wkby.webp" alt="" />
                <div>
                    South America
                </div>
            </article>
        </section>



    </section>
}