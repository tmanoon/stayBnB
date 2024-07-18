
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { httpService } from './http.service.js'
const STAY_DB = 'stay_db'
const zBASE_URL = 'stay/'

// createDemoStay(stays)
export const stayService = {
    query,
    getById,
    save,
    remove,
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
    guestCountStringForReservation
}

// async function query(filterBy) {

//     try {
//         let stays = await storageService.query(STAY_DB)
//         console.log(stays[0]);
//         //     console.log(stays);
//         // if (filterBy.loc.region) {
//         //     stays = stays.filter(stay => stay.loc.region === filterBy.loc.region)
//         // }
//         // if (filterBy.loc.country) {
//         //     stays = stays.filter(stay => stay.loc.country === filterBy.loc.country)
//         // }
//         // if (filterBy.loc.countryCode) {
//         //     stays = stays.filter(stay => stay.loc.countryCode === filterBy.loc.countryCode)
//         // }
//         // if (filterBy.loc.city) {
//         //     stays = stays.filter(stay => stay.loc.city === filterBy.loc.city)
//         // }
//         // if (filterBy.loc.address) {
//         //     stays = stays.filter(stay => stay.loc.address === filterBy.loc.address)
//         // }
//         if (filterBy.entryDate) {
//             stays = stays.filter(stay => {
//                 return !stay.bookedDates.some(booking => {
//                     return (
//                         (booking.entryDate >= filterBy.entryDate && booking.entryDate <= filterBy.exitDate) ||
//                         (booking.exitDate >= filterBy.entryDate && booking.exitDate <= filterBy.exitDate) ||
//                         (booking.entryDate <= filterBy.entryDate && booking.exitDate >= filterBy.exitDate)
//                     )
//                 })
//             })
//         }
//         if (filterBy.guestCount) {
//             if (filterBy.guestCount.adults || filterBy.guestCount.children) {
//                 const filterCapacity = filterBy.guestCount.adults + filterBy.guestCount.children
//                 stays = stays.filter(stay => stay.capacity >= filterCapacity)
//             }
//             if (filterBy.guestCount.infants) {
//                 stays = stays.filter(stay => stay.amenities.includes('Crib'))
//             }
//             if (filterBy.guestCount.pets) {
//                 stays = stays.filter(stay =>
//                     stay.amenities.includes('pets allowed') ||
//                     stay.amenities.includes('Pets are welcome') ||
//                     stay.amenities.includes('Allows pets on property') ||
//                     stay.amenities.includes('Allows pets as host')
//                 )
//             }
//         }

//         // // if (filterBy.label) {
//         // //     stays = stays.filter(stay => stay.labels.includes(filterBy.label))
//         // // }
//         // if (filterBy.amenities.length) {
//         //     stays = stays.filter(stay => filterBy.amenities.every(amenity => stay.amenities.includes(amenity)))
//         // }
//         // // if (filterBy.placeType !== 'any') {
//         // //     console.log(stays[0].type);
//         // //     console.log(filterBy.placeType);
//         // //     stays = stays.filter(stay => stay.type === filterBy.placeType)
//         // // }



//         // // if (filterBy.priceRange) {
//         // //     stays = stays.filter(stay => stay.price >= filterBy.priceRange.min && stay.price <= filterBy.priceRange.max)
//         // // }
//         // if (filterBy.bedrooms !== 'any') {
//         //     stays = stays.filter(stay => stay.bedrooms.length >= filterBy.bedrooms)
//         // }
//         // if (filterBy.beds !== 'any') {
//         //     stays = stays.filter(stay => stay.bedrooms.reduce((acc, room) => acc + room.beds.length, 0) >= filterBy.beds)
//         // }
//         // if (filterBy.bathrooms !== 'any') {
//         //     stays = stays.filter(stay => stay.baths >= filterBy.bathrooms)
//         // }
//         // if (filterBy.propType.length) {
//         //     stays = stays.filter(stay => filterBy.propType.includes(stay.propType))
//         // }
//         // if (filterBy.hostLngs.length) {
//         //     // stays = stays.filter(stay => filterBy.hostLngs.includes(stay.host.lng))
//         // }
//         // // stays = stays.map({_id, title, price, imgUrl}) => ({})

//         return stays
//     } catch (err) {
//         console.log(err)
//     }
// }

// async function getById(stayId) {
//     try {
//         const stay = await storageService.get(STAY_DB, stayId)
//         return stay
//     } catch (err) {
//         console.log(err)
//     }
// }

// async function remove(stayId) {
//     try {
//         await storageService.remove(STAY_DB, stayId)
//     } catch (err) {
//         console.log(err)
//     }
// }

// async function save(stay) {
//     try {
//         if (stay._id) {
//             const updatedStay = await storageService.put(STAY_DB, stay)
//             return updatedStay
//         } else {
//             stay._id = utilService.makeId()
//             console.log( stay._id);
//             const stayToAdd = await storageService.post(STAY_DB, stay)
//             return stayToAdd
//         }
//     } catch (err) {
//         console.log(err)
//     }
// }

function query() {
    return httpService.get(BASE_URL)
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
            experience : {isSuperhost: false}
           
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
        exitDate: '',            // dates
        guestCount: { adults: 0, children: 0, infants: 0, pets: 0 },                // number of guests
        label: '',
        placeType: 'any',       // any / room / entire home
        priceRange: {
            min: 0,
            max: Infinity
        },
        bedrooms: 'any',
        beds: 'any',
        bathrooms: 'any',
        propType: [],                // house / apartment / guesthouse / hotel
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

function getDefaultHeaderFilter() {
    return {
        loc: {},
        entryDate: '',
        exitDate: '',            // dates
        guestCount: { adults: 0, children: 0, infants: 0, pets: 0 },                // number of guests
    }
}

function getEmptyOrder() {
    return {              // add _id on save
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
        status: "pending"           // approved / rejected
    }
}

function getEmptyModalFilter() {
    return {
        placeType: 'any',       // any / room / entire home
        priceRange: {
            min: 0,
            max: Infinity
        },
        bedrooms: 'any',
        beds: 'any',
        bathrooms: 'any',
        propType: [],                // house / apartment / guesthouse / hotel
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



// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))
