import React, { useRef } from 'react'

export function DynamicLocalHeaderNav() {

    function onMoveToSection(ev, sectionId) {
        ev.preventDefault()

        const section = document.getElementById(sectionId)
        if (section) {
            const targetPosition = section.getBoundingClientRect().top + window.scrollY
            var scrollPosition = targetPosition - 10
            if (sectionId !== 'gallery') { scrollPosition = targetPosition - 70 }
            window.scrollTo({ top: scrollPosition, behavior: 'smooth' })
        } else {
            console.log('Section not found:', sectionId)
        }
    }

    return (
        <div className="dynamic-header-nav flex align-center">
            <a href="#gallery" onClick={(ev) => onMoveToSection(ev, 'gallery')}>Photos</a>
            <a href="#amenities" onClick={(ev) => onMoveToSection(ev, 'amenities')}>Amenities</a>
            <a href="#reviews" onClick={(ev) => onMoveToSection(ev, 'reviews')}>Reviews</a>
            {/* <a href="#location" onClick={(ev) => onMoveToSection(ev, 'location')}>Location</a> */}
            <a href="#location" onClick={(ev) => { ev.preventDefault() }}>Location</a>
        </div>
    )
}