import { useState, useEffect } from "react"

import { utilService } from "../../services/util.service"

export function StayReviewsModal({ stay, onCloseAll }) {

    return <>
        <div className="overlay" onClick={onCloseAll}></div>

        <div className="reviews-modal">
            <div className="action-div">
                <button className="exit-btn" onClick={onCloseAll}></button>
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
                        </article>
                    })
                    }
                </section>
            </div>

        </div>
    </>
}
