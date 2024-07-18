import { useState, useEffect } from 'react'
export function BedroomDetails({ beds }) {
    const [bedsCount, setBedsCount] = useState({})
    useEffect(() => {
        calcBedsCount()
    }, [])

    function calcBedsCount() {
        const count = beds.reduce((acc, currBed) => {
            if (!acc[currBed]) acc[currBed] = 1
            else acc[currBed]++
            return acc
        }, {})
        setBedsCount(count)
    }

    function getDescFromBedsCount() {
        let str = ''
        beds.forEach((bed, idx) => {
            if (bedsCount[bed] > 1) str += `${bedsCount[bed]} ${bed}s`
            else str += `${bedsCount[bed]} ${bed}`
            str += idx < beds.length - 1 ? ', ' : ''
        })
        return str
    }

    return (
        bedsCount && (
            <p className="bedroom-details">
                {getDescFromBedsCount()}
            </p>
        )
    )
}