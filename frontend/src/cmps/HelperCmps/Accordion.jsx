import { useState } from "react"

export function Accordion({ children }) {
    const [isOpen, setIsOpen] = useState(false)
    const arrow = isOpen ? 'Show less' : 'Show more'

    return <>
        {isOpen && <>{children}</>}
        <span className="accordion-arrow" onClick={() => setIsOpen(isOpen => !isOpen)}>{arrow}</span>
    </>
} 
