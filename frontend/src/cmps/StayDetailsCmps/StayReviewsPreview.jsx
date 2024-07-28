import { useState, useEffect } from "react"

import { utilService } from "../../services/util.service"
import { StayReviewsModal } from "./StayReviewsModal"
import { StayAddReviewModal } from "./StayAddReviewModal"
import { stayService } from "../../services/stay.service"

export function StayReviewsPreview({ stay, userId, isReviewable, addStayReview, removeStayReview, addReviewModal, setAddReviewModal }) {
    const [firstReviews, setFirstReviews] = useState([])
    const [showAllReviews, setShowAllReviews] = useState(false)
    const [userReview, setUserReview] = useState(null)

    function shortenReviewLength(txt) {
        let shortenedTxt = ''
        for (let i = 0; i < 130; i++) {
            shortenedTxt += txt[i]
        }
        shortenedTxt += '...'
        return shortenedTxt
    }

    useEffect(() => {
        const userReview = stayService.getUserReview(stay, userId)
        setUserReview(userReview)
    }, [stay])

    useEffect(() => {
        setFirstReviews(stay.reviews.sort((a, b) => b.rate - a.rate).slice(0, 6))
    }, [stay.reviews])

    function onReviewsModal() {
        setShowAllReviews(!showAllReviews)
    }

    function onAddReviewModal() {
        setAddReviewModal(!addReviewModal)
    }

    return <>
        {firstReviews.length > 0 && <section className="stay-reviews-section grid">
            {firstReviews.map((review, idx) => {
                return <article key={`${review.by._id}${idx}`} className="review flex column">

                    <div className="user flex align-center">
                        <img src={review.by.imgUrl} />
                        <div className="user-details-txt flex column">
                            <h3>{review.by.fullname}</h3>
                            <p>{review.by._id}</p> {/*should be where their from or how long they've been on the site*/}
                        </div>
                    </div>

                    <div className="not-flip-div flex column">

                        <div className="review-score flex align-center">
                            <p>{'★'.repeat(Math.floor(review.rate))}<span>{'★'.repeat(5 - Math.floor(review.rate))}</span></p>
                            •
                            <h4>{utilService.timestampToMonthYear(review.at)}</h4>
                        </div>

                        <div className="review-content">
                            <p>{review.txt.length > 130 ? shortenReviewLength(review.txt) : review.txt}</p>
                            {review.txt.length > 130 && <button onClick={onReviewsModal}>Read more</button>}
                        </div>
                    </div>

                    {(userReview && userReview.by._id === review.by._id) && <button className="delete-btn" onClick={() => removeStayReview(review.by._id)}></button>}
                </article>
            })}
            <div className="actions-btns flex space-between">
                <button className="show-all-btn" onClick={onReviewsModal}>Show all reviews</button>
                {isReviewable && <button onClick={onAddReviewModal} className="leave-review-btn">Leave Review</button>}
            </div>
        </section>}

        {showAllReviews && <StayReviewsModal stay={stay} userReview={userReview} onReviewsModal={onReviewsModal} onAddReviewModal={onAddReviewModal} addStayReview={addStayReview} isReviewable={isReviewable} removeStayReview={removeStayReview} />}
        {addReviewModal && <StayAddReviewModal stay={stay} userId={userId} onAddReviewModal={onAddReviewModal} addStayReview={addStayReview} />}
    </>
}