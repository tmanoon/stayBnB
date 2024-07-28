import { useEffect, useState } from "react"
import { userService } from "../services/user.service"
import { useNavigate } from "react-router"
import { loadStayById } from "../store/actions/stay.actions"
import { addRemoveStayToUserFavorites } from "../store/actions/user.actions"

export function UserWishlist() {
    const user = userService.getLoggedInUser()
    const [userWishlist, setUserWishlist] = useState(user.wishlist.length > 0 ? user.wishlist : null)
    const navigate = useNavigate()

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
                            <article className="wishlist-item grid" key={stay._id} onClick={() => navigate(`/${stay._id}`)}>
                            
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