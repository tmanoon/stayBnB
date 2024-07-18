import { useParams } from "react-router"
import { useState, useEffect, useRef } from 'react'
import { stayService } from "../services/stay.service"
import { useLocation } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'

import { StayGalleryPreview } from '../cmps/StayDetailsCmps/StayGalleryPreview'
import { ReservationModal } from '../cmps/StayDetailsCmps/ReservationModal'
import { SvgPathCmp } from '../cmps/HelperCmps/SvgPathCmp'
import { BedroomDetails } from '../cmps/StayDetailsCmps/BedroomDetails'
import { StayReviewsPreview } from "../cmps/StayDetailsCmps/StayReviewsPreview"
import { utilService } from "../services/util.service"
import { Accordion } from "../cmps/HelperCmps/Accordion"
import { loadStayById } from "../store/actions/stay.actions"
import { useSelector } from "react-redux"
import { Loading } from "../cmps/Loading"


export function StayDetails() {
    const [searchParams, setSearchParams] = useSearchParams()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const safetyAmenities = ['Carbon monoxide alarm', 'Smoke alarm']
    const { isLoading } = useSelector(storeState => storeState.stayModule)
    const { stayId } = useParams()
    const [stay, setStay] = useState('')
    const [longestBedsCount, setLongestBedsCount] = useState(1)
    const {
        region,
        adults,
        children,
        infants,
        pets,
        entryDate,
        exitDate
    } = Object.fromEntries(queryParams.entries())

    const paramsFromFilter = {
        region,
        adults,
        children,
        infants,
        pets,
        entryDate,
        exitDate
    }
    const [params, updateParams] = useState(paramsFromFilter)
    // is guest favorite - if truthy - show a cmp of guest fav
    useEffect(() => {
        if (stayId) {
            loadStay(stayId)
        }
    }, [])

    useEffect(() => {
        if (stay) {
            setLongestBedsCount(utilService.calcLongestBedCount(stay))
        }
    }, [stay])

    useEffect(() => {
        setSearchParams(params)
    }, [params])


    async function loadStay(stayId) {
        try {
            const loadedStay = await loadStayById(stayId)
            setStay(loadedStay)
        } catch (error) {
            console.error("Error loading stay:", error)
        }
    }

    function _findHostName() {
        const host = stay.host
        const spaceIdx = host.fullname.indexOf(' ')
        const hostName = host.fullname.slice(0, spaceIdx)
        return hostName
    }

  

    return <>
      {isLoading && <Loading currentPage={'details'} />}
        {stay && <section className="stay-details">
            <header className="flex space-between">
                <h1>{stay.summary}</h1>
                <div className="header-btns flex">
                    <button className="share-btn flex align-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'currentcolor', strokeWidth: '2', overflow: 'visible' }}><g fill="none"><path d="M27 18v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-9M16 3v23V3zM6 13l9.3-9.3a1 1 0 0 1 1.4 0L26 13"></path></g></svg>
                        <span>Share</span>
                    </button>
                    <button className="save-btn flex align-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'currentcolor', strokeWidth: 2, overflow: 'visible' }}><path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"></path></svg>
                        <span>Save</span>
                    </button>
                </div>
            </header>

            <StayGalleryPreview stay={stay} />

            <main className="content-and-modal-container grid">
                <section className="content">
                    <article className="place-info flex column">
                        <h1>Entire {stay.propertyType} in {stay.loc.city}, {stay.loc.country}</h1>
                        <p>{stay.capacity > 1 ? stay.capacity + ' guests' : '1 guest'}・ {stay.bedrooms.length > 1 ? stay.bedrooms.length + ' bedrooms' : '1 bedroom'}  ・
                            {utilService.countBedsInBedrooms(stay) > 1 ? utilService.countBedsInBedrooms(stay) + ' beds' : '1 bed'} ・
                            {stay.baths > 1 ? stay.baths + ' baths' : '1 bath'}</p>
                        <p className="reviews-preview">{'★'.repeat(Math.ceil(utilService.calcRate(stay)))} {utilService.calcRate(stay).toFixed(2)} ・ {stay.reviews.length} reviews</p>
                    </article>

                    <article className="host-info flex">
                        <img src={stay.host.hostImg} className="host-img" />
                        <div className="flex column">
                            <h3>Hosted by {_findHostName()}</h3>
                            <p>{stay.host.experience.isSuper ? 'Superhost ・' : ''}  {stay.host.experience.hostingTime > 1 ? `${stay.host.experience.hostingTime} years` : 'year'} hosting</p>
                        </div>
                    </article>

                    <article className="room-info">
                        <h1>Where you'll sleep</h1>
                        <div className="rooms-container grid">
                            {stay.bedrooms.map(room => {
                                const bedsLength = room.beds.length
                                return (
                                    <div className="bedroom" key={room.name}
                                        style={{ paddingBlockEnd: bedsLength < longestBedsCount ? ((longestBedsCount - bedsLength) * .875) + 1.5 + 'rem' : '1.5rem' }}
                                    >
                                        <div className="icons flex align-center">
                                            {room.beds.map((bed, idx) => <SvgPathCmp name={bed.replaceAll(' ', '').toLowerCase()} key={room + idx} />)}
                                        </div>
                                        <h4>{room.name}</h4>
                                        <BedroomDetails beds={room.beds} />
                                    </div>)
                            })}
                        </div>
                    </article>
                    <article className="amenity-info" id="amenities">
                        <h1>What this place offers </h1>
                        <ul className="amenities-ul grid">

                            {stay.amenities.slice(0, 9).map(amenity =>
                                <li key={amenity} className="flex align-center">
                                    <SvgPathCmp name={amenity.replaceAll(' ', '').toLowerCase()} />
                                    <p>{amenity}</p>
                                </li>)}

                            <li className={`${stay.amenities.includes(safetyAmenities[0]) ? '' : 'no-safety-amenity'} flex align-center`}>
                                <SvgPathCmp name={safetyAmenities[0].replaceAll(' ', '').toLowerCase()} />
                                <p>{safetyAmenities[0]}</p>
                            </li>

                            <Accordion>
                                {stay.amenities.slice(9).map(amenity =>
                                    <li key={amenity} className="flex align-center">
                                        <SvgPathCmp name={amenity.replaceAll(' ', '').toLowerCase()} />
                                        <p>{amenity}</p>
                                    </li>)}
                            </Accordion>
                        </ul>
                    </article>
                </section>
                <ReservationModal stay={stay} params={params} updateParams={updateParams} />
            </main>
            <StayReviewsPreview stay={stay} />
        </section>
        }
    </>
}