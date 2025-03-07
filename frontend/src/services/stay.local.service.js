
import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
const STAY_DB = 'stay_db'
const BASE_URL = 'stay/'

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
    getEmptyModalFilter,
    getUserReview,
    guestCountString,
    createDemoData,
    guestCountStringForReservation,
    generateRandomDate,
    generateRandomDistance
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
//         //     stays = stays.filter(stay => stay.bbb.bedrooms.length >= filterBy.bedrooms)
//         // }
//         // if (filterBy.beds !== 'any') {
//         //     stays = stays.filter(stay => stay.bbb.bedrooms.reduce((acc, room) => acc + room.beds.length, 0) >= filterBy.beds)
//         // }
//         // if (filterBy.bathrooms !== 'any') {
//         //     stays = stays.filter(stay => stay.bbb.baths >= filterBy.bathrooms)
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
        txt: searchParams.get('txt') || defaultFilter.txt,
        entryDate: searchParams.get('entryDate') || defaultFilter.entryDate,
        exitDate: searchParams.get('exitDate') || defaultFilter.exitDate,
        guestCount: searchParams.get('guestCount') || defaultFilter.guestCount,
        label: searchParams.get('label') || defaultFilter.label,
        placeType: searchParams.get('placeType') || defaultFilter.placeType,
        priceRange: {
            min: searchParams.get('priceRangeMin') || defaultFilter.priceRange.min,
            max: searchParams.get('priceRangeMax') || defaultFilter.priceRange.max,
        },
        bbb: {
            bedrooms: searchParams.get('bedrooms') || defaultFilter.bbb.bedrooms,
            beds: searchParams.get('beds') || defaultFilter.bbb.beds,
            bathrooms: searchParams.get('bathrooms') || defaultFilter.bbb.bathrooms,
        },
        propType: searchParams.get('propType') || defaultFilter.propType,
        amenities: searchParams.getAll('amenities') || defaultFilter.amenities,
        bookingOpts: {
            instant: searchParams.get('instant') === 'true' || defaultFilter.bookingOpts.instant,
            selfCheckIn: searchParams.get('selfCheckIn') === 'true' || defaultFilter.bookingOpts.selfCheckIn,
            allowsPets: searchParams.get('allowsPets') === 'true' || defaultFilter.bookingOpts.allowsPets,
        },
        accessibility: searchParams.getAll('accessibility') || defaultFilter.accessibility,
        hostLngs: searchParams.getAll('hostLngs') || defaultFilter.hostLngs
    }
}

function getEmptyStay() {
    return {
        placeType: "",
        propertyType: "",
        name: "",
        summary: "",
        price: 0,
        capacity: 0,
        amenities: [],
        labels: [],
        reviews: [],
        imgUrls: [],
        bookingOpts: {
            instant: false,
            selfCheckIn: false,
            allowsPets: false
        },
        bbb: {
            bathrooms: 0,
            baths: 0,
            bedrooms: [],
            beds: 0,
        },
        loc: {
            country: "",
            countryCode: "",
            city: "",
            address: "",
            lng: 0,
            lat: 0,
        },
        host: {
            _id: "",
            fullname: "",
            location: "",
            about: "",
            responseTime: "",
            experience: { isSuperhost: false }
        },
        bookedDates: [],
        likedByUsers: [],
    }
}

function getDefaultFilter() {
    return {
        txt: '',
        entryDate: '',
        exitDate: '',
        guestCount: { adults: 0, children: 0, infants: 0, pets: 0 },
        label: '',
        placeType: 'any',
        priceRange: {
            min: 0,
            max: 2000
        },
        bbb: {
            bedrooms: 'any',
            beds: 'any',
            bathrooms: 'any',
        },
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

function getEmptyModalFilter() {
    return {
        placeType: 'any',
        priceRange: {
            min: 0,
            max: 2000
        },
        bbb: {
            bedrooms: 'any',
            beds: 'any',
            bathrooms: 'any',
        },
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

function getUserReview(stay, userId) {
    return stay.reviews.find(review => review.by._id === userId)
}

function createDemoData(key, value) {
    if (utilService.loadFromStorage(key)) return utilService.loadFromStorage(key)
    else return utilService.saveToStorage(key, value)
}

function guestCountString(filterBy) {
    const guestsCount = filterBy.guestCount.adults + filterBy.guestCount.children
    let guests = ''
    if (guestsCount > 0) guests = guestsCount === 1 ? '1 guest' : `${guestsCount} guests`
    const infants = filterBy.guestCount.infants > 0 ? `${filterBy.guestCount.infants} infants` : ''
    const pets = filterBy.guestCount.pets > 0 ? `${filterBy.guestCount.pets} pets` : ''
    const parts = [guests, infants, pets].filter(Boolean)
    if (parts.length === 0) return "Add guests"
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
