import { useState, useCallback, useEffect } from "react"
import { stayService } from "../../services/stay.service"
import { utilService } from '../../services/util.service'

export function StayAddReviewModal({ stay, userId, onAddReviewModal, addStayReview }) {
    const [newReview, setNewReview] = useState({ rate: 0, txt: '' })

    useEffect(() => {
        if (stayService.getUserReview(stay, userId)) setNewReview(stayService.getUserReview(stay, userId))
    }, [])


    function setRate(rating) {
        setNewReview({ ...newReview, rate: rating })
    }

    function starColor(num) {
        if (num <= newReview.rate) return 'yellow-star'
        else return 'gray-star'
    }

    function setReviewTxt(ev) {
        const newTxt = ev.target.value
        setNewReview((prevReview) => ({ ...prevReview, txt: newTxt }))
    }

    const debouncedSetReviewTxt = useCallback(utilService.debounce(setReviewTxt, 300), [])

    function onSave() {
        setTimeout(() => {
            addStayReview(newReview)
        }, 300)
    }

    return <>
        <div className="overlay" onClick={onAddReviewModal}></div>

        <div className="add-review-modal">
            <header className="flex center">
                <h1>Add review</h1>
                <button className="exit-btn" onClick={onAddReviewModal}></button>
            </header>

            <div className="modal-content flex column center">

                <div className="review-rate flex center">
                    <h2>Rating:</h2>
                    <button onClick={() => setRate(1)} className={`rate-1 ${starColor(1)}`}>★</button>
                    <button onClick={() => setRate(2)} className={`rate-2 ${starColor(2)}`}>★</button>
                    <button onClick={() => setRate(3)} className={`rate-3 ${starColor(3)}`}>★</button>
                    <button onClick={() => setRate(4)} className={`rate-4 ${starColor(4)}`}>★</button>
                    <button onClick={() => setRate(5)} className={`rate-5 ${starColor(5)}`}>★</button>
                </div>

                <div className="review-content flex column center">
                    <h2>Write a review</h2>
                    <textarea rows="10" cols="55" onChange={debouncedSetReviewTxt}></textarea>
                </div>

            </div>

            <footer className="flex center">
                <button onClick={onSave}>Save</button>
            </footer>
        </div>
    </>
}
