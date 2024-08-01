import { useEffect, useState } from "react"

import { stayService } from "../services/stay.service"
import { addRemoveStayToUserFavorites } from "../store/actions/user.actions"

import { ImgCarousel } from "./HelperCmps/ImgCarousel"
import { LoginSignup } from "../cmps/Modals/LoginSignup"

export function StayPreview({ stay, filterBy, user, setUser }) {
    const [isWishlistStay, setIsWishlistStay] = useState(false)
    // const [isLoginModal, setIsLoginModal] = useState(false)

    useEffect(() => {
        if (stay && user) {
            setIsWishlistStay(!!user.wishlist.find(wishListStay => wishListStay._id === stay._id))
        }
    }, [stay, user])

    async function onFavorite(ev) {
        ev.preventDefault()
        try {
            if (user) {
                const userToUpdate = await addRemoveStayToUserFavorites(stay._id)
                setUser(userToUpdate)
                setIsWishlistStay(!isWishlistStay)
            } else {
                console.log('user notification to log-in or open modal but that didnt work well')
                // setIsLoginModal(true)
            }
        } catch (err) {
            console.log('err', err)
            throw err
        }
    }

    return <>
        <article className="stay-preview">
            <div className="img-container">
                <ImgCarousel imgUrls={stay.imgUrls} />
                <button className={`favorite-btn ${isWishlistStay? 'wished' : 'not-wished'} flex align-center`} onClick={onFavorite}>
                    {!isWishlistStay && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'rgba(0, 0, 0, 0.5)', height: '16px', width: '16px', stroke: 'white', strokeWidth: 2, overflow: 'visible' }}><path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"></path></svg>}
                    {isWishlistStay && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'rgb(255, 56, 92)', height: '16px', width: '16px', stroke: 'white', strokeWidth: '2', overflow: 'visible' }}><path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"></path></svg>}
                </button>
            </div>
            {!filterBy.txt && <h1>{stay.loc.city}, {stay.loc.country}</h1>}
            {filterBy.txt && <h1>{stay.loc.address.split(', ')[0]}</h1>}
            {!filterBy.txt && <p className="grayTxt">{stayService.generateRandomDistance(stay) + " kilometers away"}</p>}
            {filterBy.txt && <p className="grayTxt">{stay.summary.length > 34 ? stay.summary.substring(0, 35) + '...' : stay.summary}</p>}
            {!filterBy.entryDate && <p className="grayTxt">{stayService.generateRandomDate(+stay.price)}</p>}
            {!filterBy.entryDate && <p><span className="boldTxt"><span className="moneySgn">$</span>{stay.price.toLocaleString()}</span> night</p>}
            {filterBy.entryDate && <p><span className="boldTxt"><span className="moneySgn">$</span>{stay.price.toLocaleString()}</span> night · <span className="grayTxt underline"><span className="moneySgn">$</span>{(stayService.getNumberOfNights(filterBy) * stay.price).toLocaleString()} total</span></p>}
        </article>

        {/* {isLoginModal && <LoginSignup setIsLoginModal={setIsLoginModal} />} */}
    </>
}