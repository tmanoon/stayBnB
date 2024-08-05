import React, { useEffect, useRef, useState } from 'react'

import { utilService } from '../../services/util.service'
import { filterLists } from '../../services/filterLists.service'

import { ButtonGroup } from '../HelperCmps/ButtonGroup'
import { ButtonGroupWithTxt } from '../HelperCmps/ButtonGroupWithTxt'
import { SwitchCmp } from '../HelperCmps/SwitchCmp'
import { StayImgsUploader } from '../StayEditCmps/StayImgsUploader'

export const StageComponents = {
    0: Stage0, 1: Stage1, 2: Stage2, 3: Stage3, 4: Stage4, 5: Stage5,
    6: Stage6, 7: Stage7, 8: Stage8, 9: Stage9, 10: Stage10,
    11: Stage11, 12: Stage12, 13: Stage13, 14: Stage14, 15: Stage15
}

function Stage0() {
    const videoRef = useRef(null)

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play()
        }
    }, [])

    return (
        <section className="stage-0 grid">
            <h1>It’s easy to get started on Staybnb</h1>
            <ol className='grid'>
                <li>
                    <h2>1</h2>
                    <h2>Tell us about your place</h2>
                    <p>Share some basic info, like where it is and how many guests can stay.</p>
                    <img src="https://a0.muscache.com/4ea/air/v2/pictures/da2e1a40-a92b-449e-8575-d8208cc5d409.jpg" />
                </li>

                <li>
                    <h2>2</h2>
                    <h2>Make it stand out</h2>
                    <p>Add 5 or more photos plus a title and description—we’ll help you out.</p>
                    <img src="https://a0.muscache.com/4ea/air/v2/pictures/bfc0bc89-58cb-4525-a26e-7b23b750ee00.jpg" />
                </li>

                <li>
                    <h2>3</h2>
                    <h2>Finish up and publish</h2>
                    <p>Choose a starting price, verify a few details, then publish your listing.</p>
                    <img src="https://a0.muscache.com/4ea/air/v2/pictures/c0634c73-9109-4710-8968-3e927df1191c.jpg" />
                </li>
            </ol>
        </section>
    )
}

function Stage1() {
    const videoRef = useRef(null)

    useEffect(() => {
        if (videoRef.current) { videoRef.current.play() }
    }, [])

    return (
        <section className="stage-1">
            <p className="step">Step 1</p>
            <h1 className="title">Tell us about your place</h1>
            <p className="description">In this step, we'll ask you which type of property you have and if guests will book the entire place or just a room. Then let us know the location and how many guests can stay.</p>
            <video ref={videoRef} src="https://res.cloudinary.com/db7t5amdv/video/upload/v1713520620/BuildHouseVidIntro_tbrwcf.mp4" autoPlay muted></video>
        </section>
    )
}

function Stage2({ stay, editStay }) {

    function handleChange(field, value) {
        editStay(prevStay => { return { ...prevStay, propertyType: value } })
    }

    return (
        <section className="stage-2">
            <h1>Which of these best describes your place?</h1>

            <ButtonGroup
                type={'propertyType'}
                items={filterLists.propTypeItems}
                selectedValue={stay.propertyType}
                handleChange={handleChange}
            />
        </section>
    )
}

function Stage3({ stay, editStay }) {

    function handleChange(field, value) {
        editStay(prevStay => { return { ...prevStay, placeType: value } })
    }

    return <section className="stage-3">
        <h1>What type of place will guests have?</h1>

        <ButtonGroupWithTxt
            type={'placeType'}
            items={filterLists.placeTypeItemsEdit}
            selectedValue={stay.placeType}
            handleChange={handleChange}
        />
    </section>
}

function Stage4({ stay, editStay }) {

    function handleInputChange(ev) {
        const { id, value } = ev.target
        const updatedLoc = { ...stay.loc, [id]: value }
        const updatedStay = { ...stay, loc: updatedLoc }
        editStay(updatedStay)
    }

    return (
        <section className="stage-4">
            <h1>Where's your place located?</h1>
            <h2>Your address is only shared with guests after they’ve made a reservation.</h2>

            <form className='grid'>
                <div className='country'>
                    <label htmlFor="country">Country:</label>
                    <input type="text" id="country" value={stay.loc.country} onChange={handleInputChange} />
                </div>

                <div className='countryCode'>
                    <label htmlFor="countryCode">Country Code:</label>
                    <input type="text" id="countryCode" value={stay.loc.countryCode} onChange={handleInputChange} />
                </div>

                <div className='city'>
                    <label htmlFor="city">City:</label>
                    <input type="text" id="city" value={stay.loc.city} onChange={handleInputChange} />
                </div>

                <div className='address'>
                    <label htmlFor="address">Street & address</label>
                    <input type="text" id="address" value={stay.loc.address} onChange={handleInputChange} />
                </div>

                <div className='coordinates'></div> {/*add info when map api is added*/}

            </form>
        </section>
    )
}

function Stage5({ stay, editStay }) {
    const isCapacityZero = stay.capacity === 0
    const isCapacityMax = stay.capacity === 16

    const isBedroomsZero = stay.bbb.beds === 0
    const isBedroomsMax = stay.bbb.beds === 16

    const isBathroomsZero = stay.bbb.bathrooms === 0
    const isBathroomsMax = stay.bbb.bathrooms === 16

    const isBathsZero = stay.bbb.baths === 0
    const isBathsMax = stay.bbb.baths === 16

    return (
        <section className="stage-5">
            <h1>Share some basics about your place</h1>
            <h2>You'll add more details later, like bed types.</h2>

            <form className='grid' onSubmit={(ev) => { ev.preventDefault() }}>
                <div>
                    <h3>Guests</h3>
                    <div>
                        <button onClick={() => editStay({ ...stay, capacity: Math.max(stay.capacity - 1, 0) })} className={isCapacityZero ? 'disabled' : ''}>-</button>
                        <span>{stay.capacity}</span>
                        <button onClick={() => editStay({ ...stay, capacity: Math.min(stay.capacity + 1, 16) })} className={isCapacityMax ? 'disabled' : ''}>+</button>
                    </div>
                </div>

                <div>
                    <h3>Bedrooms</h3>
                    <div>
                        <button onClick={() => editStay((prevStay) => ({ ...prevStay, bbb: { ...prevStay.bbb, beds: Math.max(prevStay.bbb.beds - 1, 0) } }))} className={isBedroomsZero ? 'disabled' : ''}>-</button>
                        <span>{stay.bbb.beds}</span>
                        <button onClick={() => editStay((prevStay) => ({ ...prevStay, bbb: { ...prevStay.bbb, beds: Math.min(prevStay.bbb.beds + 1, 16) } }))} className={isBedroomsMax ? 'disabled' : ''}>+</button>
                    </div>
                </div>

                <div>
                    <h3>Bathrooms</h3>
                    <div>
                        <button onClick={() => editStay((prevStay) => ({ ...prevStay, bbb: { ...prevStay.bbb, bathrooms: Math.max(prevStay.bbb.bathrooms - 1, 0) }, }))} className={isBathroomsZero ? 'disabled' : ''} > - </button>
                        <span>{stay.bbb.bathrooms}</span>
                        <button onClick={() => editStay((prevStay) => ({ ...prevStay, bbb: { ...prevStay.bbb, bathrooms: Math.min(prevStay.bbb.bathrooms + 1, 16) }, }))} className={isBathroomsMax ? 'disabled' : ''} > + </button>
                    </div>
                </div>

                <div>
                    <h3>Baths</h3>
                    <div>
                        <button onClick={() => editStay((prevStay) => ({ ...prevStay, bbb: { ...prevStay.bbb, baths: Math.max(prevStay.bbb.baths - 1, 0) }, }))} className={isBathsZero ? 'disabled' : ''} > - </button>
                        <span>{stay.bbb.baths}</span>
                        <button onClick={() => editStay((prevStay) => ({ ...prevStay, bbb: { ...prevStay.bbb, baths: Math.min(prevStay.bbb.baths + 1, 16) }, }))} className={isBathsMax ? 'disabled' : ''}>+</button>
                    </div>
                </div>
            </form>
        </section>
    )
}

function Stage6() {
    const videoRef = useRef(null)

    useEffect(() => {
        if (videoRef.current) { videoRef.current.play() }
    }, [])

    return <section className="stage-6">
        <p className="step">Step 2</p>
        <h1 className="title">Make your place stand out</h1>
        <p className="description">In this step, you’ll add some of the amenities your place offers, plus 5 or more photos. Then, you’ll create a title and description.</p>
        <video ref={videoRef} src="https://res.cloudinary.com/db7t5amdv/video/upload/v1713520618/BuildHouseVidMiddle_u6k0ep.mp4" autoPlay muted></video>
    </section>
}

function Stage7({ stay, editStay }) {

    function handleChange(field, value) {
        const updatedAmenities = stay.amenities.includes(value) ? stay.amenities.filter(item => item !== value) : [...stay.amenities, value]
        editStay({ ...stay, amenities: updatedAmenities })
    }

    return (
        <section className="stage-7">
            <h1>Tell guests what your place has to offer</h1>
            <h2>You can add more amenities after you publish your listing.</h2>

            <h3>What about these guest favorites?</h3>
            <ButtonGroup
                type={'editAmenities'}
                items={[...filterLists.amenityEssentialsShown, ...filterLists.amenityEssentialsHidden]}
                selectedValue={stay.amenities}
                handleChange={handleChange}
            />

            <h3>Do you have any standout amenities?</h3>
            <ButtonGroup
                type={'editAmenities'}
                items={[...filterLists.amenityFeatures, ...filterLists.amenityLocation]}
                selectedValue={stay.amenities}
                handleChange={handleChange}
            />

            <h3>Do you have any of these safety items?</h3>
            <ButtonGroup
                type={'editAmenities'}
                items={filterLists.amenitySafety}
                selectedValue={stay.amenities}
                handleChange={handleChange}
            />
        </section>
    )
}

function Stage8({ stay, editStay }) {

    return (
        <section className="stage-8">
            <h1>Add photos of your place</h1>
            <h2>You'll need 5 photos to get started. You can add more or make changes later.</h2>
            <StayImgsUploader editStay={editStay} stay={stay} />
        </section>
    )
}

function Stage9({ stay, editStay }) {
    const [inputValue, setInputValue] = useState(stay.name)

    const handleInputChange = (event) => {
        const newValue = event.target.value

        if (newValue.length <= 32) {
            setInputValue(newValue)
            editStay({ ...stay, name: newValue })
        } else {
            setInputValue(newValue.slice(0, 32))
        }
    }

    return (
        <section className="stage-9">
            <h1>Now, let's give your place a title</h1>
            <h2>Short titles work best. Have fun with it—you can always change it later</h2>
            <input type="text" value={inputValue} onChange={handleInputChange} />
            <span className='counter'>{inputValue.length}/32</span>
        </section>
    )
}

function Stage10({ stay, editStay }) {

    function handleChange(field, value) {
        const updatedLabels = stay.labels.includes(value) ? stay.labels.filter(item => item !== value) : [...stay.labels, value]
        editStay({ ...stay, labels: updatedLabels })
    }

    return (
        <section className="stage-10">
            <h1>Next, let's describe your place</h1>
            <h2>Choose highlights. We'll use these to get your description started.</h2>

            <ButtonGroup
                type={'editLabels'}
                items={filterLists.filterLabels}
                selectedValue={stay.labels}
                handleChange={handleChange}
            />
        </section>
    )
}


function Stage11({ stay, editStay }) {
    const [inputValue, setInputValue] = useState(stay.summary)

    const handleInputChange = (event) => {
        const newValue = event.target.value

        if (newValue.length <= 500) {
            setInputValue(newValue)
            editStay({ ...stay, summary: newValue })
        } else {
            setInputValue(newValue.slice(0, 500))
        }
    }

    return (
        <section className="stage-11">
            <h1>Create your description</h1>
            <h2>Share what makes your place special.</h2>

            <pre><textarea value={inputValue} onChange={handleInputChange} rows={8} cols={50} /></pre>
            <span className='counter'>{inputValue.length}/500</span>
        </section>
    )
}

function Stage12() {
    const videoRef = useRef(null)

    useEffect(() => {
        if (videoRef.current) { videoRef.current.play() }
    }, [])

    return <section className="stage-12">
        <p className="step">Step 3</p>
        <h1 className="title">Finish up and publish</h1>
        <p className="description">Finally, you’ll choose if you'd like to start with an experienced guest, then you'll set your nightly price. Answer a few quick questions and publish when you're ready.</p>
        <video ref={videoRef} src="https://res.cloudinary.com/db7t5amdv/video/upload/v1713520620/BuildHouseVidOutro_qiv9vd.mp4" autoPlay muted></video>
    </section>
}

function Stage13({ stay, editStay }) {

    function handleChange(field, value) {
        editStay(prevStay => ({ ...prevStay, bookingOpts: { ...prevStay.bookingOpts, [field]: value } }))
    }

    return <section className='stage-13 grid'>
        <h1>Decide your reservation options</h1>

        <div className="flex align-center space-between">
            <div>
                <h3>Instant Book</h3>
                <p>Require approval before guest can book</p>
            </div>

            <SwitchCmp
                type={'instant'}
                value={stay.bookingOpts.instant}
                handleChange={handleChange}
            />
        </div>

        <div className="flex align-center space-between">
            <div>
                <h3>Self check-in</h3>
                <p>Easy access to the property once guest arrives</p>
            </div>
            <SwitchCmp
                type={'selfCheckIn'}
                value={stay.bookingOpts.selfCheckIn}
                handleChange={handleChange}
            />
        </div>

        <div className="flex align-center space-between">
            <div>
                <h3>Allow pets</h3>
                <p>Allows pets and service animals.</p>
            </div>
            <SwitchCmp
                type={'allowsPets'}
                value={stay.bookingOpts.allowsPets}
                handleChange={handleChange}
            />
        </div>
    </section>
}

function Stage14({ stay, editStay }) {
    const [price, setPrice] = useState(stay.price || '')

    const handleChange = (event) => {
        const newPrice = event.target.value
        setPrice(newPrice)
        editStay({ ...stay, price: +newPrice })
    }

    return (
        <section className="stage-14">
            <h1 >Now, set your price</h1>
            <h2 >You can change it anytime.</h2>

            <div className='flex align-center'>
                <span>$</span>
                <input type="number" value={price} onChange={handleChange} />
            </div>
            <p>per night</p>
        </section>
    )
}

function Stage15({ stay }) {

    function formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    return <section className="stage-15">
        <h1>Review your listing</h1>
        <h2>Here's what we'll show to guests. Make sure everything looks good.</h2>

        <div className='preview-edit-page grid'>

            <article className='edit-preview'>
                <img src={stay.imgUrls[0]} />

                <div className='preview-text'>
                    <div className='info'>
                        <h4>{stay.name}</h4>
                        <p>${formatPrice(stay.price)}<span className="per-night">night</span></p>
                    </div>

                    <div className='new'><span>New</span>★</div>
                </div>
            </article>

            <article className='next-article'>
                <h3>What's next?</h3>
                <div>
                    <h4>Confirm a few details and publish</h4>
                    <p>We’ll let you know if you need to verify your identity or register with the local government.</p>
                </div>

                <div>
                    <h4>Set up your calendar</h4>
                    <p>Choose which dates your listing is available. It will be visible 24 hours after you publish.</p>
                </div>

                <div>
                    <h4>Adjust your settings</h4>
                    <p>Set house rules, select a cancellation policy, choose how guests book, and more.</p>
                </div>
            </article>
        </div>
    </section>
}