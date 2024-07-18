import { staysDemoData } from "../data/NewDemoData"
import { utilService } from "./util.service"
import { stayService } from "./stay.service"

const STAY_DB = 'stay_db'
const USER_DB = 'user_db'
const ORDER_DB = 'order_db'

const labels = ['new', 'off-the-grid', 'iconic_cities', 'rooms', 'creative_spaces', 'boats', 'grand_pianos', 'vineyards',
    'historical_homes', 'mansions', 'lake', 'bed_&_breakfasts', 'farms', 'treehouses', 'skiing', 'earth_homes',
    'beach', 'amazing_views', 'countryside', 'a-frames', 'desert', 'design', 'beachfront', 'caves', 'national_parks',
    'castles', 'lakefront', 'islands', 'trulli', 'tropical', 'cabins', 'campers', 'camping', 'arctic', 'tiny_homes', 'surfing',
    'barns', 'cycladic_homes', 'hanoks', 'ryokans', 'domes', 'shepard_huts', 'yurts', 'minsus', 'casas_particulares']
const propertyTypes = ['House', 'Apartment', 'Guesthouse', 'Hotel']
const placeTypes = ['An entire home', 'Shared room', 'Room']
const amenities = ['Wifi', 'Internet', 'Washer', 'Air conditioning', 'Portable air conditioning unit', 'Dedicated workspace', 'Smoke alarm', 'Tv', 'Cable tv', 'Kitchen',
    'Full kitchen', 'Refrigerator', 'Hair dryer', 'Dryer', 'Heating', 'Iron', 'Pool', 'Hottub', 'Free parking', 'Free parking on premises',
    'Free street parking', 'Crib', 'Bbq', 'Gym', 'Indoor fireplace', 'Ev charger', 'Smoking allowed', 'Pets are welcome', 'Breakfast',
    'Carbon monoxide alarm', 'Hot water', 'Essentials', 'Extra pillows and blankets', 'Bed linens', 'Room darkening shades',
    'Long term stays allowed', 'Smoke detector', 'Host greets you', 'Single level home', 'Private hottub', 'Backyard', 'Patio or balcony',
    'Outdoor furniture', 'Coffee', 'Dining table', 'Toaster', 'Wineglasses', 'Coffeemaker', 'Stove', 'Dishes and silverware', 'Cooking basics', 'Microwave',
    'First aid kit', 'Fire extinguisher', 'Exterior security cameras on property', 'Ceiling fan', 'Board games', 'Closet', 'Outdoor shower', 'Cleaning products',
    'Body soap', 'High chair', 'Travel crib', `Children's books and toys`, 'Baby bath', 'Waterfront', 'Private entrance', 'Self check in', 'Lockbox',
    'Smart lock', 'Oven', 'Luggage drop off allowed', 'Babysitter recommendations', 'Ethernet connection']
const stayCollection = staysDemoData.slice()
const userCollection = []
const orderCollection = []
const aboutDescs = ['A friendly person', 'I love pets!']
const responseTimes = ['within an hour', 'within 5 minutes', 'within a day', 'within 2 hours']

createNewDemoData()

export function createNewDemoData() {
    removeTypeProperty()
    getRandomNumOfBeds()
    addRandomBedrooms()
    addBathsNumber()
    createStayDesc()
    limitSummaryLength()
    addIsInstantBooking()
    addTenBookedDates()
    addAmenities()
    floorRates()
    modifyReviewersPics()
    modifyPropertyType()
    modifyPlaceType()
    generateUsers()
    AddHostToStay()
    stayService.createDemoData(STAY_DB, stayCollection)
    stayService.createDemoData(USER_DB, userCollection)
    for (let i = 0; i < 5; i++) {
    }
}

function addRandomBedrooms() {
    const possibleBeds = ['double bed', 'couch', 'sofa bed', 'king size bed', 'queen size bed', 'bunk bed']
    stayCollection.forEach(stay => {
        stay.capacity = 0
        stay.bedrooms = []
        let countOfPossibleBeds = stay.sumOfBeds
        for (let i = 0; i < stay.sumOfBeds; i++) {
            if (countOfPossibleBeds === 0) return
            const currRoom = {}
            if (i === 0) {
                currRoom.name = 'Living Room'
                Math.random > 0.5 ? currRoom.beds = ['couch'] : currRoom.beds = ['sofa bed']
                stay.capacity++
                countOfPossibleBeds--
            } else {
                currRoom.name = `Bedroom ${i}`,
                    currRoom.beds = []
                const randNumOfBeds = utilService.getRandomIntInclusive(1, countOfPossibleBeds)
                countOfPossibleBeds -= randNumOfBeds
                for (let j = 0; j < randNumOfBeds; j++) {
                    const chosenBedIdx = utilService.getRandomIntInclusive(0, possibleBeds.length - 1)
                    currRoom.beds.push(possibleBeds[chosenBedIdx])
                    if (possibleBeds[chosenBedIdx] === 'king size bed' || 'queen size bed' || 'bunk bed') stay.capacity += 2
                    else stay.capacity++
                }
            }
            stay.bedrooms.push(currRoom)
        }
    })
}

function floorRates() {
    stayCollection.forEach(stay => {
        stay.reviews.forEach(review => Math.floor(review.rate))
    })
}

function addIsInstantBooking() {
    stayCollection.forEach(stay => stay.isInstantBooking = Math.random > 0.5 ? true : false)
}


function getRandomNumOfBeds() {
    stayCollection.forEach(stay => {
        stay.sumOfBeds = utilService.getRandomIntInclusive(2, 7)
        if (stay.beds) delete stay.beds
    })
}

function addAmenities() {
    stayCollection.forEach(stay => delete stay.amenities)
    stayCollection.forEach(stay => {
        stay.amenities = []
        const possibleAmenities = amenities.slice()
        for (let i = 0; i < 28; i++) {
            const randIdxAmenity = utilService.getRandomIntInclusive(0, possibleAmenities.length - 1)
            stay.amenities.push(possibleAmenities[randIdxAmenity])
            possibleAmenities.splice(randIdxAmenity, 1)
        }
    })
}

// USERS

function generateRandomNameAndGender(i) {
    const firstNamesBoys = ["John", "Bob", "Charlie", "David", "Frank", "Mathew"]
    const firstNamesGirls = ["Jane", "Emma", "Ella", "Grace", "Alice", "Emily"]
    const lastNames = ["Smith", "Doe", "Johnson", "Brown", "Wilson", "Taylor", "Anderson", "Thomas", "Walker", "Hill"]
    const randomFirstName = i % 2 === 0 ? firstNamesBoys[Math.floor(Math.random() * firstNamesBoys.length)] : firstNamesGirls[Math.floor(Math.random() * firstNamesGirls.length)]
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)]
    const gender = firstNamesBoys.includes(randomFirstName) ? 'male' : 'female'
    return { firstName: randomFirstName, lastName: randomLastName, gender }
}

function generateUsers() {
    for (let i = 0; i < 15; i++) {
        const nameAndGender = generateRandomNameAndGender(i)
        const gender = nameAndGender.gender
        const imgUrl = `https://xsgames.co/randomusers/assets/avatars/${gender}/${i}.jpg`
        const fullname = `${nameAndGender.firstName} ${nameAndGender.lastName}`
        const username = fullname.replace(/\s+/g, '').toLowerCase() // username without spaces, all lowercase
        const user = {
            _id: utilService.makeId(),
            fullname,
            gender,
            about: aboutDescs[utilService.getRandomIntInclusive(0, aboutDescs.length - 1)],
            imgUrl,
            username,
            password: "manoon"
        }
        userCollection.push(user)
    }
}

// CHANGE HOST AND UPDATE STAYS

function AddHostToStay() {
    const namesOfPreviousHosts = stayCollection.map(stay => {
        const idxOfSpace = stay.host.fullname.indexOf(' ')
        if (idxOfSpace === -1) return stay.host.fullname
        const name = stay.host.fullname.substring(0, idxOfSpace)
        return name
    })
    stayCollection.forEach(stay => delete stay.host)
    stayCollection.forEach((stay, idx) => {
        const host = userCollection[utilService.getRandomIntInclusive(0, userCollection.length - 1)]
        stay.host = {
            id: host._id, //afterwards synchronize with mongodb!!!!!!!!!!
            fullname: host.fullname,
            location: host.location || `${stay.loc.city}, ${stay.loc.country}`,
            about: host.about,
            responseTime: host.responseTime || responseTimes[utilService.getRandomIntInclusive(0, responseTimes.length - 1)],
            hostImg: host.imgUrl,
            experience: host.experience || {
                isSuperhost: Math.random > 0.5 ? false : true,
                hostingTime: utilService.getRandomIntInclusive(1, 6)
            }
        }
        checkAndConvertUserToHost(stay.host.id, stay.host.location, stay.host.responseTime, stay.host.experience, stay._id)
        const idxOfSpace = stay.host.fullname.indexOf(' ')
        const newHostName = stay.host.fullname.substring(0, idxOfSpace)
        checkAndUpdateReviews(namesOfPreviousHosts[idx], stay, newHostName)
        return stay.host
    })

}

function checkAndConvertUserToHost(id, loc, responseTime, experience, stayId) {
    const userToUpdate = userCollection.find(user => user._id === id)
    if (!userToUpdate.location) {
        userToUpdate.location = loc
        userToUpdate.responseTime = responseTime
        userToUpdate.experience = experience
    }
    if (!userToUpdate.stays) userToUpdate.stays = [stayId]
    else userToUpdate.stays.push(stayId)
}

function checkAndUpdateReviews(nameOfPreviousHost, stay, newHostName) {
    stay.reviews.forEach(review => {
        if (review.txt.includes(nameOfPreviousHost)) review.txt.replaceAll(nameOfPreviousHost, newHostName)
    })
}

function modifyPropertyType() {
    stayCollection.forEach(stay => stay.propertyType = propertyTypes[utilService.getRandomIntInclusive(0, propertyTypes.length - 1)])
}

function modifyPlaceType() {
    stayCollection.forEach(stay => stay.placeType = placeTypes[utilService.getRandomIntInclusive(0, placeTypes.length - 1)])
}

function generateBookedDates() {
    let currentDate = new Date()
    let minDate = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000)
    let maxDate = new Date(currentDate.getTime() + 365 * 24 * 60 * 60 * 1000) // Adjusted to one year from current date
    let rangeInDays = (maxDate.getTime() - minDate.getTime()) / (24 * 60 * 60 * 1000)
    let randomDays = Math.floor(Math.random() * (rangeInDays + 1))
    let entryDate = new Date(minDate.getTime() + randomDays * 24 * 60 * 60 * 1000)
    let exitDate = new Date(entryDate.getTime() + 7 * 24 * 60 * 60 * 1000)
    entryDate.setUTCHours(0, 0, 0, 0)
    exitDate.setUTCHours(0, 0, 0, 0)
    return { entryDate: entryDate.getTime(), exitDate: exitDate.getTime() }
}

function addTenBookedDates() {
    stayCollection.forEach(stay => {
        const randBookedDates = []
        for (let i = 0; i < 10; i++) {
            randBookedDates.push(generateBookedDates())
        }
        stay.bookedDates = randBookedDates
        return stay.bookedDates
    })
}

function removeTypeProperty() {
    stayCollection.forEach(stay => delete stay.type)
}

function addBathsNumber() {
    stayCollection.forEach(stay => stay.baths = utilService.getRandomIntInclusive(1, 2))
}

function modifyReviewersPics() {
    stayCollection.forEach(stay => {
        stay.reviews.forEach((review, idx) => review.by.imgUrl = `https://xsgames.co/randomusers/assets/avatars/${Math.random > 0.5 ? 'female' : 'male'}/${idx}.jpg`)
    })
}

function limitSummaryLength() {
    stayCollection.forEach(stay => {
        for(let i = 0; i < 120; i++) {
            if(stay.summary[i] === '.') {
                const firstSentenceIdentifier = i // the index 
                return stay.summary = stay.summary.substring(0, firstSentenceIdentifier)
            }
        }
        return stay.summary = stay.summary.substring(0, 120)
    })
}

function createStayDesc() {
    stayCollection.forEach(stay => stay.desc = stay.summary)
}

export function getAmenities(){
    return amenities
}
