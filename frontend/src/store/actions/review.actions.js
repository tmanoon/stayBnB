import { SET_REVIEWS } from "../reducers/review.reducer"

export function setStayReviews(stay) {
    const reviews = stay.reviews
    store.dispatch(SET_REVIEWS, reviews)
}