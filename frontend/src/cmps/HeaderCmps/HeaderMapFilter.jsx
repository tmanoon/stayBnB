export function HeaderMapFilter({ handleModalTypeChange, handleSearch }) {

    const regionsAndPics = [
        { region: '', imgSrc: 'https://res.cloudinary.com/db7t5amdv/image/upload/v1713173021/kmhnayfz9phpmfecbkqe.jpg', desc: 'I\'m flexible' },
        { region: 'Middle East', imgSrc: 'https://res.cloudinary.com/db7t5amdv/image/upload/v1713173527/gliel69vriiymwbvkirv.webp' },
        { region: 'Italy', imgSrc: 'https://res.cloudinary.com/db7t5amdv/image/upload/v1713173841/c5s5qu58b3fxbers5gjl.webp' },
        { region: 'United States', imgSrc: 'https://res.cloudinary.com/db7t5amdv/image/upload/v1713173841/c5s5qu58b3fxbers5gjl.webp' },
        { region: 'Greece', imgSrc: 'https://res.cloudinary.com/db7t5amdv/image/upload/v1713174600/zzsbcrswmkepkexjrfv6.webp' },
        { region: 'South America', imgSrc: 'https://res.cloudinary.com/db7t5amdv/image/upload/v1713173843/sjlt9cdcawpaj9m8wkby.webp' },
    ]
    
    function onSelectRegion(e, region) {
        handleModalTypeChange(e, 'check-in')
        e.stopPropagation()
        handleSearch(region.region)
    }

    return <section className="map-filter modal">
        <h1>Search by region</h1>
        <section className="regions">
            {
                regionsAndPics.map(region => {
                    return (
                        <article className="region" onClick={(e) => {onSelectRegion(e, region) }} key={region.region}>
                            <img src={region.imgSrc} alt={region.region} />
                            <p>{region.desc || region.region}</p>
                        </article>
                    )
                })
            }
        </section>
    </section>
}