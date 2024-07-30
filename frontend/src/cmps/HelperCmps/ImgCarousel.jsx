import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"

export function ImgCarousel({ imgUrls }) {

    const CustomLeftArrow = ({ onClick, ...rest }) => {
        const { onMove, carouselState: { currentSlide, deviceType, totalItems } } = rest
        const isDisabled = currentSlide === 0;

        const handleClick = (ev) => {
            ev.preventDefault()
            onClick()
        }

        return <button className="carousel-prev-btn" onClick={handleClick} disabled={isDisabled} > </button>
    }

    const CustomRightArrow = ({ onClick, ...rest }) => {
        const { onMove, carouselState: { currentSlide, deviceType, totalItems } } = rest;
        const isDisabled = currentSlide === totalItems - 1;

        const handleClick = (ev) => {
            ev.preventDefault()
            onClick()
        }

        return <button className="carousel-next-btn" onClick={handleClick} disabled={isDisabled} > </button>
    }

    const CustomDot = ({ onClick, ...rest }) => {
        const { index, active, carouselState: { currentSlide, deviceType, totalItems } } = rest

        return <button className={active ? "active" : "inactive"} />
    }

    return <Carousel
        arrows
        draggable
        keyBoardControl
        pauseOnHover
        shouldResetAutoplay
        showDots
        swipeable
        className=""
        containerClass="container"
        dotListClass=""
        sliderClass=""
        itemClass=""
        slidesToSlide={1}
        additionalTransfrom={0}
        minimumTouchDrag={80}
        infinite={false}
        centerMode={false}
        focusOnSelect={false}
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
        customDot={<CustomDot />}
        responsive={{
            mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
            tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
            desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
        }}
    >
        {imgUrls.map((imgUrl, idx) => <img src={imgUrl} key={idx} />)}
    </Carousel>
}