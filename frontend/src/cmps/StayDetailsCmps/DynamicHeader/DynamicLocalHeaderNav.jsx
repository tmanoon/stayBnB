import { useRef } from 'react'
export function DynamicLocalHeaderNav() {
    // const gallery = useRef()
    // const amenities = useRef()
    // const reviews = useRef()
    // const location = useRef()
    function onMoveToSection(e) {
        e.stopPropagation()
        const targetElement = e.target
        const targetPosition = targetElement.getBoundingClientRect().top
        const scrollPosition = targetPosition + 30 // Adjust the scroll position to stop 80px before the target
        window.scrollTo({ top: scrollPosition, behavior: 'smooth' })
    }

    return <div className="dynamic-header-nav flex align-center">
        <a href="#gallery">Photos</a>
        <a href="#amenities">Amenities</a>
        <a href="#reviews">Reviews</a>
        <a href="#location">Location</a>
    </div>
}