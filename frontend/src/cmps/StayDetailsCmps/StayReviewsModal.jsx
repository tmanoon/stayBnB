import { useState, useEffect } from "react"

import { utilService } from "../../services/util.service"

export function StayReviewsModal({ stay, userReview, onAddReviewModal, onReviewsModal, isReviewable, removeStayReview }) {
    

    return <>
        <div className="overlay" onClick={onReviewsModal}></div>

        <div className="reviews-modal">
            <div className="action-div">
                <button className="exit-btn" onClick={onReviewsModal}></button>
            </div>

            <div className="modal-content">
                <section className="stay-reviews grid">
                    {stay.reviews.sort((a, b) => b.rate - a.rate).map((review, idx) => {
                        return <article key={`${review.by.id}${idx}`} className="review flex column">
                            <div className="user flex align-center">
                                <img src={review.by.imgUrl} />
                                <div className="user-details-txt flex column">
                                    <h3>{review.by.fullname}</h3>
                                    <p>{review.by.id}</p> {/*should be where their from or how long they've been on the site*/}
                                </div>
                            </div>
                            <div className="not-flip-div flex column">
                                <div className="review-score flex align-center">
                                    <p>{'★'.repeat(Math.floor(review.rate))}<span>{'★'.repeat(5 - Math.floor(review.rate))}</span></p>
                                    •
                                    <h4>{utilService.timestampToMonthYear(review.at)}</h4>
                                </div>
                                <div className="review-content">
                                    <p>{review.txt}</p>
                                </div>
                            </div>
                            {(userReview && userReview.by._id === review.by._id) && <button className="delete-btn" onClick={() => removeStayReview(review.by._id)}></button>}
                        </article>
                    })}
                    <div className="actions-btns">
                        {isReviewable && <button onClick={onAddReviewModal} className="leave-review-btn">Leave Review</button>}
                    </div>
                </section>
            </div>

        </div>
    </>
}
