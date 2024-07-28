import { useState } from "react"
import { userService } from "../services/user.service"
import { useNavigate } from "react-router"
import { addRemoveStayToUserFavorites } from "../store/actions/user.actions"
import { store } from "../store/store"
import { utilService } from "../services/util.service"

export function UserWishlist() {
    const user = userService.getLoggedInUser()
    const [userWishlist, setUserWishlist] = useState(user.wishlist.length > 0 ? user.wishlist : null)
    const navigate = useNavigate()
    const filterBy = store.getState().stayModule.filterBy

    async function onRemoveFromWishlist(ev, id) {
        ev.stopPropagation()
        try {
            const userToUpdate = await addRemoveStayToUserFavorites(id)
            setUserWishlist(userToUpdate.wishlist.length > 0 ? userToUpdate.wishlist : null)
        } catch (err) {
            console.log('err', err)
            throw err
        }
    }

    function navigateToStay(id) {
        const today = new Date()
        today.setDate(today.getDate() + 1)
        const tomorrow = today.getTime()
        let filterByParams = {
            ...filterBy.guestCount,
            entryDate: Date.now(),
            exitDate: tomorrow
        }
        filterByParams.adults = 1
        const paramsForUrl = utilService.getFormattedParams(filterByParams)
        navigate(`/${id}?${paramsForUrl}`)
    }

    return (
        <section className="user-wishlist">
            <button className="back-btn" onClick={() => navigate('/')}></button>
            <header>
                <h1>Wishlist</h1>
            </header>
            {!userWishlist &&
                <div className="no-items">
                    <h2>No locations added to wishlist...yet!</h2>
                    <p>Feel free to explore our locations and find the ones for you!</p>
                    <button className="search-btn" onClick={() => navigate('/')}>Start searching</button>
                </div>
            }
            {userWishlist &&
                <div className="wishlist-items grid">
                    {userWishlist.map(stay => {
                        return (
                            <article className="wishlist-item grid" key={stay._id} onClick={() => navigateToStay(stay._id)}>
                                <img src={stay.imgUrls[0]} alt={stay.name} />
                                <div className="text grid align-center">
                                    <h2>{stay.name}</h2>
                                    <p>{stay.loc.address}, {stay.loc.city}, {stay.loc.country}</p>
                                    <h3>${stay.price}</h3>
                                    <p>Host: {stay.host.fullname}</p>
                                    <button className="remove-btn flex center" onClick={(ev) => onRemoveFromWishlist(ev, stay._id)}>Remove</button>
                                </div>
                            </article>
                        )
                    })}
                </div>
            }
        </section>
    )
}