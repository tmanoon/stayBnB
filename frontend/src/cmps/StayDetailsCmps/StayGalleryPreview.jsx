import { useState, useEffect, useRef } from 'react'
import { staySvgService } from '../../services/stay-svg.service'
import { StringToSvg } from './StringToSvg'
import { DynamicLocalHeaderNav } from './DynamicHeader/DynamicLocalHeaderNav'
import { changeGalleryVisibility } from '../../store/actions/stay.actions'

export function StayGalleryPreview({ stay }) {
    const gallery = useRef()
    const [fivePicsPreview, setFivePicsPreview] = useState([])
    const [galleryObserver, setGalleryObserver] = useState(null)
    const [isGalleryIntersecting, setIsGalleryIntersecting] = useState(true)

    useEffect(() => {
        if (stay.imgUrls.length >= 5) {
            setFivePicsPreview(stay.imgUrls.slice(0, 5))
            loadGalleryObserver()
        }
        return () => {
            galleryObserver?.disconnect()
        }
    }, [])

    useEffect(() => {
        if (galleryObserver) {
          galleryObserver.observe(gallery.current)
        }
      }, [galleryObserver])
    
      function loadGalleryObserver() {
        const observer = new IntersectionObserver(entries => {
          if (!entries[entries.length - 1].isIntersecting) {
            changeGalleryVisibility(false)
            setIsGalleryIntersecting(false)
          } else {
            changeGalleryVisibility(true)
            setIsGalleryIntersecting(true)
          }
        })
        setGalleryObserver(observer)
      }

    return (
        <>
            {!isGalleryIntersecting && <>
            <DynamicLocalHeaderNav/>
            </>}
            <section className="gallery-stay-details" id="gallery" ref={gallery}>
                {fivePicsPreview && fivePicsPreview.map((pic, idx) => <img key={idx} src={pic} className={`img${idx}`} />)}
                <button className='show-all-btn flex align-center'>{<StringToSvg svgString={staySvgService['showallphotos']} />} Show all photos</button>
            </section>
        </>
    )
}