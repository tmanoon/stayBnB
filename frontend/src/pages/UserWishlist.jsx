import { useEffect, useState } from "react"
import { userService } from "../services/user.service"
import { useNavigate } from "react-router"

export function UserWishlist() {
    const user = userService.getLoggedInUser()
    const [userWishlist, setUserWishlist] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            setUserWishlist(user.wishlist)
            console.log(userWishlist)
        }
    }, [])

    if (user.wishlist) return (
        <section className="user-wishlist">
            <button className="back-btn" onClick={() => navigate('/')}></button>
            <header>
                <h1>Wishlist</h1>
            </header>
            <div>
                <h2>No trips added to wishlist...yet!</h2>
                <p>Feel free to explore our locations and find the ones for you!</p>
                <button onClick={() => navigate('/')}>Start searching</button>
            </div>
        </section>
    )

    return (
        <div className="wishlist-items">
            {userWishlist.map(stay => {
                <article className="wishlist-item" key={stay._id} onClick={() => navigate(`/${stay._id}`)}>
                    <img src={stay.imgUrls[0]} alt={stay.name} />
                    <div className="text">
                        <h2>{stay.name}</h2>
                        <p>{stay.loc.address}, {stay.loc.city}, {stay.loc.country}</p>
                        <h3>{stay.price}</h3>
                    </div>
                </article>
            })}
        </div>
    )

}