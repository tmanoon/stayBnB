import { utilService } from './util.service.js'
import { httpService } from './http.service.js'
import { SET_IS_LOADING } from '../store/reducers/stay.reducer.js'
import { store } from '../store/store.js'
const BASE_URL = 'stay/'

export const stayService = {
    query,
    getById,
    save,
    remove,
    getHostStaysById,
    getLabels,
    getNumberOfNights,
    getFilterFromParams,
    getEmptyOrder,
    getEmptyStay,
    getDefaultFilter,
    getDefaultHeaderFilter,
    getEmptyModalFilter,
    mergeFiltersSP,
    mergeFiltersStore,
    guestCountString,
    createDemoData,
    guestCountStringForReservation,
    generateRandomDate,
    generateRandomDistance
}

const amenityLabels = ['wifi', 'kitchen', 'washer', 'dryer', 'air_conditioning', 'refrigerator', 'heating', 'dedicated_workspace', 'TV', 'hair_dryer', 'iron', 'pool', 'hot_tub', 'free_parking', 'ev_charger', 'crib', 'king_bed', 'gym', 'BBQ_grill', 'breakfast', 'indoor_fireplace', 'smoking_allowed', 'pets_allowed']
const filterLabels = ['iconic_cities', 'new', 'off-the-grid', 'rooms', 'creative_spaces',
    'boats', 'grand_pianos', 'vineyards', 'historical_homes', 'mansions', 'lake', 'bed_&_breakfasts', 'treehouses', 'farms', 'skiing', 'earth_homes', 'countryside', 'amazing_views', 'beach', 'desert', 'a-frames',
    'design', 'beachfront', 'caves', 'national_parks', 'castles', 'lakefront', 'islands', 'trulli', 'tropical', 'cabins', 'campers', 'camping', 'arctic', 'tiny_homes', 'surfing', 'barns', 'cycladic_homes', 'hanoks', 'ryokans', 'domes', 'shepard_huts', 'yurts', 'minsus', 'casas_particulares']
function query(filterBy = getDefaultFilter()) {
    return httpService.get(BASE_URL, filterBy)

}

async function getHostStaysById(userId) {
    try {
        store.dispatch({ type: SET_IS_LOADING, isLoading: true })
        const stays = await httpService.get(BASE_URL)
        const userStays = stays.filter(stay => stay.host.id === userId)
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        return userStays
    } catch (err) {
        console.log(err)
        throw err
    }
}

function getById(stayId) {
    return httpService.get(BASE_URL + stayId)
}

function getLabels(stay) {
    return stay.labels
}

function remove(stayId) {
    return httpService.delete(BASE_URL + stayId)
}

function save(stay) {
    if (stay._id) return httpService.put(BASE_URL, stay)
    else return httpService.post(BASE_URL, stay)
}

function addStayMsg(stay, msg) {
    return httpService.post(BASE_URL + stay._id + '/msg', { txt: msg.txt })
}

function getNumberOfNights({ entryDate, exitDate }) {
    const difference = exitDate - entryDate

    const stayLength = Math.ceil(difference / (1000 * 60 * 60 * 24))
    return stayLength
}

function getFilterFromParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    return {
        loc: searchParams.get('loc') || defaultFilter.loc,
        entryDate: searchParams.get('entryDate') || defaultFilter.entryDate,
        exitDate: searchParams.get('exitDate') || defaultFilter.exitDate,
        guestCount: searchParams.get('guestCount') || defaultFilter.guestCount,
        label: searchParams.get('label') || defaultFilter.label,
        placeType: searchParams.get('placeType') || defaultFilter.placeType,
        priceRange: searchParams.get('priceRange') || defaultFilter.priceRange,
        bedrooms: searchParams.get('bedrooms') || defaultFilter.bedrooms,
        beds: searchParams.get('beds') || defaultFilter.beds,
        bathrooms: searchParams.get('bathrooms') || defaultFilter.bathrooms,
        propType: searchParams.get('propType') || defaultFilter.propType,
        amenities: searchParams.get('amenities') || defaultFilter.amenities,
        bookingOpts: searchParams.get('bookingOpts') || defaultFilter.bookingOpts,
        hostLngs: searchParams.get('hostLngs') || defaultFilter.hostLngs
    }
}

function getEmptyStay() {
    return {
        amenities: [],
        bathrooms: 0,
        baths: 0,
        bedrooms: [],
        bookedDates: [],
        capacity: 0,
        desc: "",
        host: {
            id: "",
            fullname: "",
            location: "",
            about: "",
            responseTime: "",
            experience: { isSuperhost: false }

        },
        imgUrls: [
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436975/hx9ravtjop3uqv4giupt.jpg",
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436294/mvhb3iazpiar6duvy9we.jpg",
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436496/ihozxprafjzuhil9qhh4.jpg",
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436952/aef9ajipinpjhkley1e3.jpg",
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436948/vgfxpvmcpd2q40qxtuv3.jpg",
        ],
        isInstantBooking: false,
        labels: [],
        likedByUsers: [],
        loc: {
            country: "",
            countryCode: "",
            city: "",
            address: "",
            lng: 0,

        },
        name: "",
        placeType: "",
        price: 0,
        propertyType: "",
        reviews: [],
        roomType: "",
        sumOfBeds: 0,
        summary: "",
        _id: ""
    }
}

function getDefaultFilter() {
    return {
        loc: {
            // region : '',
            // country: '',
            // countryCode: '',
            // city: '',
            // address: '',
            // lat: 0,
            // lng: 0
        },
        entryDate: '',
        exitDate: '',
        guestCount: { adults: 0, children: 0, infants: 0, pets: 0 },
        label: '',
        placeType: 'any',
        priceRange: {
            min: 0,
            max: 2000
        },
        bedrooms: 'any',
        beds: 'any',
        bathrooms: 'any',
        propType: [], 
        amenities: [],
        bookingOpts: {
            instant: false,
            selfCheckIn: false,
            allowsPets: false
        },
        accessibility: [],
        hostLngs: [],
        pagination: 30
    }
}

function getDefaultHeaderFilter() {
    return {
        loc: {},
        entryDate: '',
        exitDate: '', 
        guestCount: { adults: 0, children: 0, infants: 0, pets: 0 }, 
    }
}

function getEmptyOrder() {
    return { 
        hostId: '',
        buyer: {
            _id: '',
            fullName: ''
        },
        totalPrice: 0,
        entryDate: '',
        exitDate: '',
        guests: {
            adults: 0,
            children: 0,
            infants: 0,
            pets: 0
        },
        stay: {
            _id: '',
            name: '',
            price: 0
        },
        msgs: [],
        status: "pending"
    }
}

function getEmptyModalFilter() {
    return {
        placeType: 'any',
        priceRange: {
            min: 0,
            max: Infinity
        },
        bedrooms: 'any',
        beds: 'any',
        bathrooms: 'any',
        propType: [], 
        amenities: [],
        bookingOpts: {
            instant: false,
            selfCheckIn: false,
            allowsPets: false
        },
        accessibility: [],
        hostLngs: []
    }
}

function createDemoData(key, value) {
    if (utilService.loadFromStorage(key)) return utilService.loadFromStorage(key)
    else return utilService.saveToStorage(key, value)
}


function mergeFiltersSP(mainFilter, headerFilter) {
    const { label, amenities, bathrooms, beds, bookingOpts, hostLngs, bedrooms, placeType, priceRange, propType } = mainFilter
    const { loc, guestCount, entryDate, exitDate } = headerFilter
    const mergeFilter = {
        amenities, bathrooms, beds, ...bookingOpts, hostLngs, bedrooms, placeType, ...priceRange,
        propType, ...loc, label, ...guestCount, entryDate, exitDate
    }

    return mergeFilter
}

function mergeFiltersStore(mainFilter, headerFilter) {
    const { label, amenities, bathrooms, beds, bookingOpts, hostLngs, bedrooms, placeType, priceRange, propType } = mainFilter
    const { loc, guestCount, entryDate, exitDate } = headerFilter

    return { amenities, bathrooms, beds, bookingOpts, hostLngs, bedrooms, placeType, priceRange, propType, loc, label, guestCount, entryDate, exitDate }
}

function guestCountString(headerFilterBy) {
    const guestsCount = headerFilterBy.guestCount.adults + headerFilterBy.guestCount.children
    let guests = ''
    if (guestsCount > 0) {
        guests = guestsCount === 1 ? '1 guest' : `${guestsCount} guests`
    }

    const infants = headerFilterBy.guestCount.infants > 0 ? `${headerFilterBy.guestCount.infants} infants` : ''
    const pets = headerFilterBy.guestCount.pets > 0 ? `${headerFilterBy.guestCount.pets} pets` : ''

    const parts = [guests, infants, pets].filter(Boolean)

    if (parts.length === 0) {
        return "Add guests"
    }

    return parts.join(', ')
}


function guestCountStringForReservation(params) {
    const guestsCount = +params.adults + +params.children
    let guests = ''
    if (guestsCount > 0) {
        guests = guestsCount === 1 ? '1 guest' : `${guestsCount} guests`
    }

    const infants = params.infants > 0 ? `${params.infants} infants` : ''
    const pets = params.pets > 0 ? `${params.pets} pets` : ''
    const parts = [guests, infants, pets].filter(Boolean)
    if (parts.length === 0) {
        return "Add guests"
    }
    return parts.join(', ')
}



function generateRandomDate(stayPrice) {
    const demoDates = [
        "Apr 25-26",
        "Apr 27-29",
        "Apr 30-31",
        "May 1-3",
        "May 6-9",
        "Apr 23-25",
        "May 22-24",
        "May 26-29",
        "June 3-5",
        "June 10-13",
        "June 17-19",
        "June 23-26",
        "June 2-5",
        "June 9-11",
        "June 15-18",
        "June 22-24",
        "June 28-30"
    ];

    let selectedDate;

    if (stayPrice >= 0 && stayPrice <= 60) {
        selectedDate = demoDates[0];
    } else if (stayPrice > 60 && stayPrice <= 120) {
        selectedDate = demoDates[1];
    } else if (stayPrice > 120 && stayPrice <= 180) {
        selectedDate = demoDates[2];
    } else if (stayPrice > 180 && stayPrice <= 240) {
        selectedDate = demoDates[3];
    } else if (stayPrice > 240 && stayPrice <= 300) {
        selectedDate = demoDates[4];
    } else if (stayPrice > 300 && stayPrice <= 360) {
        selectedDate = demoDates[5];
    } else if (stayPrice > 360 && stayPrice <= 420) {
        selectedDate = demoDates[6];
    } else if (stayPrice > 462 && stayPrice <= 480) {
        selectedDate = "Apr 23-25";
    } else if (stayPrice > 480 && stayPrice <= 540) {
        selectedDate = demoDates[8];
    } else if (stayPrice > 540 && stayPrice <= 600) {
        selectedDate = demoDates[9];
    } else if (stayPrice > 600 && stayPrice <= 660) {
        selectedDate = demoDates[10];
    } else if (stayPrice > 660 && stayPrice <= 720) {
        selectedDate = demoDates[11];
    } else if (stayPrice > 720 && stayPrice <= 780) {
        selectedDate = demoDates[12];
    } else if (stayPrice > 780 && stayPrice <= 840) {
        selectedDate = demoDates[13];
    } else if (stayPrice > 840 && stayPrice <= 900) {
        selectedDate = demoDates[14];
    } else if (stayPrice > 900 && stayPrice <= 960) {
        selectedDate = demoDates[15];
    } else if (stayPrice > 960 && stayPrice <= 1020) {
        selectedDate = demoDates[16];
    } else if (stayPrice > 1020 && stayPrice <= 1080) {
        selectedDate = demoDates[17];
    } else if (stayPrice > 1080 && stayPrice <= 1140) {
        selectedDate = demoDates[18];
    } else {
        selectedDate = demoDates[19];
    }

    return selectedDate;
}  


function generateRandomDistance(stay) {
    const lowercaseCountry = stay.loc.country.toLowerCase()
    const baseDistances = {
        turkey: Math.floor(2050 + stay.loc.lng),
        "united states": Math.floor(9500 + stay.loc.lng),
        france: Math.floor(2900 + stay.loc.lng),
        portugal: Math.floor(3600 + stay.loc.lng),
        spain: Math.floor(2800 + stay.loc.lng),
        brazil: Math.floor(9400 + stay.loc.lng),
        canada: Math.floor(7800 + stay.loc.lng),
        "hong kong": Math.floor(5600 + stay.loc.lng),
        italy: Math.floor(2100 + stay.loc.lng),
    }

    if (lowercaseCountry in baseDistances) {
        const baseDistance = baseDistances[lowercaseCountry]
        return baseDistance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    } else {
        const unsupportedRandomDistance = Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000
        return unsupportedRandomDistance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
}
