import { useParams } from "react-router"
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSelector } from "react-redux"

import { userService } from "../services/user.service"
import { orderService } from '../services/order.service'
import { stayService } from "../services/stay.service"
import { utilService } from "../services/util.service"
import { loadStayById, saveStay } from "../store/actions/stay.actions"
import { addRemoveStayToUserFavorites } from "../store/actions/user.actions"

import { StayGalleryPreview } from '../cmps/StayDetailsCmps/StayGalleryPreview'
import { BedroomDetails } from '../cmps/StayDetailsCmps/BedroomDetails'
import { StayReviewsPreview } from "../cmps/StayDetailsCmps/StayReviewsPreview"
import { ReservationModal } from '../cmps/StayDetailsCmps/ReservationModal'
import { GalleryModal } from '../cmps/StayDetailsCmps/GalleryModal'
import { Loading } from "../cmps/Loading"
import { SvgPathCmp } from '../cmps/HelperCmps/SvgPathCmp'
import { Accordion } from "../cmps/HelperCmps/Accordion"

export function StayDetails() {
    const { stayId } = useParams()
    const { isLoading } = useSelector(storeState => storeState.stayModule)
    const safetyAmenities = ['Carbon monoxide alarm', 'Smoke alarm']

    const [URLSearchParams, setUrlSearchParams] = useSearchParams()
    const { adults, children, infants, pets, entryDate, exitDate } = Object.fromEntries(URLSearchParams.entries())
    const [searchParams, setSearchParams] = useState({ adults, children, infants, pets, entryDate, exitDate })

    const [stay, setStay] = useState('')
    const [longestBedsCount, setLongestBedsCount] = useState(1)
    const [isGalleryModal, setGalleryModal] = useState(false)
    const [user, setUser] = useState(null)
    const [isWishlistStay, setIsWishlistStay] = useState(false)
    const [isReviewable, setCanReview] = useState(null)
    const [addReviewModal, setAddReviewModal] = useState(false)

    useEffect(() => {
        const user = userService.getLoggedInUser()
        if (user) setUser(user)
        if (stayId) loadStay(stayId)
    }, [])

    useEffect(() => {
        if (stay) setLongestBedsCount(utilService.calcLongestBedCount(stay))
        setUrlSearchParams(searchParams)
    }, [stay, searchParams])

    useEffect(() => {
        if (stay && user) {
            isAllowedToReview()
            setIsWishlistStay(!!user.wishlist.find(wishListStay => wishListStay._id === stay._id))
        }
    }, [stay, user])

    async function loadStay(stayId) {
        try {
            const loadedStay = await loadStayById(stayId)
            setStay(loadedStay)
        } catch (error) {
            console.error("Error loading stay:", error)
        }
    }

    async function isAllowedToReview() {
        try {
            const userOrders = await orderService.getUserOrdersById(user._id)
            const userPreviousReview = stayService.getUserReview(stay, user._id)
            setCanReview(userOrders.some(order => order.stay._id === stayId) && !userPreviousReview)
        } catch (err) {
            console.log(err)
            setCanReview(false)
        }
    }

    function _findHostName() {
        const host = stay.host
        const spaceIdx = host.fullname.indexOf(' ')
        const hostName = host.fullname.slice(0, spaceIdx)
        return hostName
    }

    async function onSaveBtn() {
        try {
            const userToUpdate = await addRemoveStayToUserFavorites(stayId)
            setUser(userToUpdate)
            setIsWishlistStay(!isWishlistStay)
        } catch (err) {
            console.log('err', err)
            throw err
        }
    }

    async function copyUrlToClipboard() {
        try {
            const url = window.location.href
            await navigator.clipboard.writeText(url)
            alert('URL copied to clipboard!')
        } catch (err) {
            console.error('Failed to copy: ', err)
        }
    }

    async function addStayReview(newReview) {
        newReview.at = new Date().getTime()
        newReview.by = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl }
        try {
            const stayToSave = await stayService.save({ ...stay, reviews: [...stay.reviews, newReview] })
            saveStay(stayToSave)
            setStay(stayToSave)
            setAddReviewModal(false)
        } catch (err) {
            console.log(err)
        }
    }

    async function removeStayReview() {
        try {
            const reviewIdx = stay.reviews.findIndex(review => review.by._id === user._id)
            if (reviewIdx !== -1) {
                const reviews = [...stay.reviews]
                reviews.splice(reviewIdx, 1)
                const stayToSave = { ...stay, reviews: reviews }
                const savedStay = await stayService.save(stayToSave)
                saveStay(savedStay)
                setStay(savedStay)
            } else {
                console.log("Review not found")
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            {isLoading && <Loading currentPage={'details'} />}
            {stay && <section className="stay-details">
                <header className="flex space-between">
                    <h1>{stay.summary}</h1>
                    <div className="header-btns flex">
                        <button className="share-btn flex align-center" onClick={copyUrlToClipboard}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'currentcolor', strokeWidth: '2', overflow: 'visible' }}><g fill="none"><path d="M27 18v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-9M16 3v23V3zM6 13l9.3-9.3a1 1 0 0 1 1.4 0L26 13"></path></g></svg>
                            <span>Share</span>
                        </button>
                        <button className="save-btn flex align-center" onClick={onSaveBtn}>
                            {!isWishlistStay && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'currentcolor', strokeWidth: 2, overflow: 'visible' }}><path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"></path></svg>}
                            {isWishlistStay && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'rgb(255, 56, 92)', height: '16px', width: '16px', stroke: 'rgb(255, 56, 92)', strokeWidth: '2', overflow: 'visible' }}><path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"></path></svg>}
                            <span>Save</span>
                        </button>
                    </div>
                </header>

                <StayGalleryPreview stay={stay} setGalleryModal={setGalleryModal} />

                <main className="content-and-modal-container grid">
                    <section className="content">
                        <article className="place-info flex column">
                            <h1>Entire {stay.propertyType} in {stay.loc.city}, {stay.loc.country}</h1>
                            <p>{stay.capacity > 1 ? stay.capacity + ' guests' : '1 guest'}・ {stay.bbb.bedrooms.length > 1 ? stay.bbb.bedrooms.length + ' bedrooms' : '1 bedroom'}  ・
                                {utilService.countBedsInBedrooms(stay) > 1 ? utilService.countBedsInBedrooms(stay) + ' beds' : '1 bed'} ・
                                {stay.bbb.baths > 1 ? stay.bbb.baths + ' baths' : '1 bath'}</p>
                            <p className="reviews-preview">{'★'.repeat(Math.ceil(utilService.calcRate(stay)))} {utilService.calcRate(stay).toFixed(2)} ・ {stay.reviews.length} reviews</p>
                        </article>
                        <article className="host-info flex">
                            <img src={stay.host.imgUrl} className="host-img" />
                            <div className="flex column">
                                <h3>Hosted by {_findHostName()}</h3>
                                <p>{stay.host.about}</p>
                            </div>
                        </article>
                        <article className="room-info">
                            <h1>Where you'll sleep</h1>
                            <div className="rooms-container grid">
                                {stay.bbb.bedrooms.map(room => {
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
                                        <p>{amenity[0].toUpperCase() + amenity.slice(1)}</p>
                                    </li>)}
                                <li className={`${stay.amenities.includes(safetyAmenities[0]) ? '' : 'no-safety-amenity'} flex align-center`}>
                                    <SvgPathCmp name={safetyAmenities[0].replaceAll(' ', '').toLowerCase()} />
                                    <p>{safetyAmenities[0]}</p>
                                </li>
                                <Accordion>
                                    {stay.amenities.slice(9).map(amenity =>
                                        <li key={amenity} className="flex align-center">
                                            <SvgPathCmp name={amenity.replaceAll(' ', '').replaceAll(`'`, '').toLowerCase()} />
                                            <p>{amenity[0].toUpperCase() + amenity.slice(1)}</p>
                                        </li>)}
                                </Accordion>
                            </ul>
                        </article>
                    </section>
                    <ReservationModal stay={stay} searchParams={searchParams} setSearchParams={setSearchParams} />
                </main>

                <div id="reviews">
                    <StayReviewsPreview stay={stay} userId={(user) ? user._id : null} isReviewable={isReviewable} addStayReview={addStayReview} removeStayReview={removeStayReview} setAddReviewModal={setAddReviewModal} addReviewModal={addReviewModal} />
                </div>
            </section>
            }
            {isGalleryModal && <GalleryModal stay={stay} setGalleryModal={setGalleryModal} />}
        </>
    )
}