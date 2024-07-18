import { stayService } from "./stay.service"
import { utilService } from "./util.service"
import { orderService } from "../services/order.service"

const STAY_DB = 'stay_db'

export const DemoDataService = {
    getRandomAmenities: getRandomFilterLabels,
    randomStay,
    generateStay,
    generateStays,

}

// generateRandomStays(170 )

// orderService.createDemoOrder()

function getFilterLabels() {
    return ['new', 'off-the-grid', 'iconic_cities', 'rooms', 'creative_spaces', 'boats', 'grand_pianos', 'vineyards', 'historical_homes', 'mansions', 'lake', 'bed_&_breakfasts', 'treehouses', 'farms', 'skiing', 'earth_homes', 'countryside', 'amazing_views', 'beach', 'desert', 'a-frames',
        'design', 'beachfront', 'caves', 'national_parks', 'castles', 'lakefront', 'islands', 'trulli', 'tropical', 'cabins', 'campers', 'camping', 'arctic', 'tiny_homes', 'surfing', 'barns', 'cycladic_homes', 'hanoks', 'ryokans', 'domes', 'shepard_huts', 'yurts', 'minsus', 'casas_particulares']
}

function getAmenities() {
    return [
        "Air conditioning",
        "Portable air conditioning unit",
        "Pets are welcome",
        "Allows pets on property",
        "Allows pets as host",
        "Bathtub",
        "Cable TV",
        "Satellite TV",
        "Cribs available",
        "Tumble dryer",
        "Washer dryer",
        "Dryer",
        "Heating",
        "Air Conditioning",
        "Braille elevator",
        "Elevator",
        "Free parking",
        "Free parking with garage",
        "Gym in the building",
        "Residence gym",
        "Hair dryer",
        "Central heating",
        "Floor heating",
        "Baby high chair",
        "Computer with free ASDL internet access",
        "Internet (computer supplied)",
        "Free cable internet",
        "Wireless internet",
        "Iron",
        "Ironing board on request",
        "Hot tub",
        "Hot tub (private)",
        "Hot tub (common)",
        "Jacuzzi bath with shower",
        "Kitchen",
        "Kitchen in the living/dining room",
        "Modern kitchen",
        "Kitchenette",
        "Bedroom/living room with kitchen corner",
        "Cooking hob",
        "Desk with lamp",
        "Laptop workspace",
        "Outlet adapters",
        "Swimming pool",
        "Spa pool",
        "Heated pool",
        "Indoor pool",
        "Outdoor pool",
        "Communal pool",
        "Private pool",
        "Shared swimming pool",
        "Separate entry",
        "TV",
        "TV (local channels only)",
        "Flat screen plasma TV",
        "Big screen TV",
        "LCD flat screen TV",
        "Widescreen TV",
        "Smart TV",
        "Washing machine with dryer",
        "Washing machine",
        "Smoking allowed",
        "Allows smoking on property",
        "Allows smoking as host",
        "Breakfast",
        "Fireplace",
        "Wood burning fireplace",
        "Smoke detectors",
        "Bed linen & towels",
        "Toiletries",
        "No children under 4",
        "No children under 12",
        "No children under 6",
        "Infants not allowed",
        "Children not allowed",
        "Family-friendly",
        "Allows children as host",
        "Allows infants as host",
        "Hanger",
        "Wheelchair access possible",
        "Ramp access to buildings",
        "Grab bars in bathroom",
        "Toilet paper",
        "Soap",
        "Beach chair",
        "Beach",
        "Baby listening device",
        "Babysitting/child services",
        "Children area",
        "Video game system",
        "On street parking",
        "Paid parking with garage",
        "Cleaning before checkout",
        "Baby bath",
        "Changing table",
        "Children's books and toys",
        "Electric vehicle charger",
        "Complimentary soap/shampoo/conditioner",
        "Extra pillows and blankets",
        "Ski in and out",
        "Window guards",
        "Accessible parking",
        "Wifi USB adapter",
        "Designated smoking area",
        "Parties allowed",
        "Shared kitchen, living room, and garden with another guest",
        "Shared bathroom",
        "Pets paid",
        "Grab bars in bathroom",
        "Free parking on the street",
        "Living room",
        "Security camera at entrance",
        "crib"
    ]


}


function getRandomFilterLabels(amount) {
    const filterLabels = []
    const allFilterLabels = getFilterLabels()

    for (let i = 0; i < amount; i++) {
        const randomIndex = Math.floor(Math.random() * allFilterLabels.length)
        filterLabels.push(allFilterLabels[randomIndex])
    }

    return filterLabels
}

function getRandomAmenities(amount) {
    const amenities = getAmenities();
    const selectedAmenities = [];
    let cribIncluded = false;

    for (let i = 0; i < amount; i++) {
        let amenityToAdd;
        const randomIndex = Math.floor(Math.random() * amenities.length);
        const randomAmenity = amenities[randomIndex];

        if (!cribIncluded && i < amount / 2) {
            amenityToAdd = "crib";
            cribIncluded = true;
        } else {
            if (randomAmenity === "Pets are welcome" ||
                randomAmenity === "Allows pets on property" ||
                randomAmenity === "Allows pets as host") {
                // If the randomly selected amenity is related to pets,
                // check if any of the three exists in the selected amenities
                const petsAmenities = ["Pets are welcome", "Allows pets on property", "Allows pets as host"];
                let found = false;
                for (const amenity of selectedAmenities) {
                    if (petsAmenities.includes(amenity)) {
                        found = true;
                        break;
                    }
                }
                // If none of the pet-related amenities exist, add the random one
                if (!found) {
                    amenityToAdd = randomAmenity;
                }
            } else {
                amenityToAdd = randomAmenity;
            }
        }

        if (amenityToAdd) {
            selectedAmenities.push(amenityToAdd);
        }
    }

    return selectedAmenities;
}


function getRandomStayType() {
    const accommodationTypes = ['house', 'apartment', 'hotel', 'guesthouse'];
    const randomIndex = Math.floor(Math.random() * accommodationTypes.length);
    return accommodationTypes[randomIndex];
}

function getRandomPrice() {
    const minPrice = 50.00;
    const maxPrice = 200.00;
    const randomPrice = Math.random() * (maxPrice - minPrice) + minPrice;
    return (Math.floor(randomPrice * 100) / 100).toFixed(2); // Round down to two decimal places and ensure ".00"
}

function getRandomSummary() {
    const adjectives = ['Fantastic', 'Lovely', 'Charming', 'Cozy', 'Beautiful', 'Stunning', 'Quaint', 'Modern', 'Rustic', 'Luxurious'];
    const types = ['duplex', 'penthouse', 'studio', 'apartment', 'house', 'cottage', 'villa', 'chalet', 'cabin', 'loft'];
    const locations = ['mountain', 'beach', 'city', 'countryside', 'lake', 'island', 'forest', 'river', 'desert', 'coast'];
    const propertyTypes = ['house', 'apartment', 'hotel', 'guesthouse'];

    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomType = types[Math.floor(Math.random() * types.length)];
    const randomLocation = locations[Math.floor(Math.random() * locations.length)];
    const randomPropertyType = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];

    return `${randomAdjective} ${randomType} ${randomLocation} ${randomPropertyType}`;
}  



 
function createRoom() {
    const roomName = Math.random() < 0.5 ? 'Living Room' : 'Bedroom';
    const bedTypes = ['sofa bed', 'single bed', ' double bed', 'king bed', 'bunk bed','queen bed'];
    const numBeds = Math.floor(Math.random() * 3) + 1; // Random number of beds from 1 to 3
    const beds = Array.from({ length: numBeds }, () => bedTypes[Math.floor(Math.random() * bedTypes.length)]);

    return { name: roomName, beds };
}

function createRooms(numPeople) {
    const rooms = [];

    // Determine the number of rooms needed based on the number of people
    const numRooms = Math.ceil(numPeople / 3); // Each room can accommodate up to 3 people

    // Create rooms until the total number of beds is enough to accommodate all people
    let totalBeds = 0;
    while (totalBeds < numPeople) {
        const room = createRoom();
        rooms.push(room);
        totalBeds += room.beds.length;
    }

    // If there are more beds than needed, remove excess beds
    while (totalBeds > numPeople) {
        const roomToRemoveFrom = rooms[Math.floor(Math.random() * rooms.length)];
        if (roomToRemoveFrom.beds.length > 1) {
            roomToRemoveFrom.beds.pop();
            totalBeds--;
        }
    }

    return rooms;

}


function generateStay() {
    let currentDate = new Date();

    let minDate = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);

    let maxDate = new Date(currentDate.getTime() + 365 * 24 * 60 * 60 * 1000); // Adjusted to one year from current date

    let rangeInDays = (maxDate.getTime() - minDate.getTime()) / (24 * 60 * 60 * 1000);

    let randomDays = Math.floor(Math.random() * (rangeInDays + 1));

    let entryDate = new Date(minDate.getTime() + randomDays * 24 * 60 * 60 * 1000);

    let exitDate = new Date(entryDate.getTime() + 7 * 24 * 60 * 60 * 1000);

    entryDate.setUTCHours(0, 0, 0, 0);

    exitDate.setUTCHours(0, 0, 0, 0);

    return { entryDate: entryDate.getTime(), exitDate: exitDate.getTime() };
}


function generateStays() {
    const stays = [];
    for (let i = 0; i < 10; i++) {
        stays.push(generateStay());
    }
    return stays;
}

function generateFullName() {
    const firstNames = ['John', 'Emma', 'Michael', 'Sophia', 'James', 'Olivia', 'William', 'Ava', 'Alexander', 'Isabella'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];

    const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];

    return `${randomFirstName} ${randomLastName}`;
}

function generateUsername(fullName) {
    // Extracting initials from the full name
    const initials = fullName
        .split(' ')
        .map(name => name.charAt(0))
        .join('')
        .toLowerCase();

    // Generating a random number
    const randomNumber = Math.floor(Math.random() * 1000) + 1;

    // Adding variety by appending a suffix based on the length of the full name
    let suffix = '';
    if (fullName.length <= 10) {
        suffix = 'user';
    } else if (fullName.length <= 15) {
        suffix = 'profile';
    } else {
        suffix = 'account';
    }

    // Combining initials, random number, and suffix to form the username
    const username = `${initials}_${randomNumber}_${suffix}`;

    // Appending a domain name to make it resemble an email address
    const emailUsername = `${username}@example.com`;

    return emailUsername;
}

function returnsTrueHalfOfTheTime() {
    return Math.random() < 0.5;
}

function generateLocation() {
    const regions = ["Greece", "United States", "South America", "Italy", "Middle East"];
    const randomRegion = regions[Math.floor(Math.random() * regions.length)];
    let country, countryCode, city, address, lat, lng;

    switch (randomRegion) {
        case "Greece":
            country = "Greece";
            countryCode = "GR";
            city = getRandomCity(["Athens", "Thessaloniki", "Heraklion", "Patras", "Larissa", "Volos", "Rhodes"]);
            address = getRandomAddress(["23 Parthenon Street", "56 Omonoia Avenue", "8 Aristotelous Square", "72 Minoos Street", "19 Plaka Lane", "34 Socrates Road", "45 Acropolis Avenue"]);
            lat = 37.9838;
            lng = 23.7275;
            break;
        case "United States":
            country = "United States";
            countryCode = "US";
            city = getRandomCity(["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio"]);
            address = getRandomAddress(["123 Broadway", "789 Hollywood Boulevard", "456 Michigan Avenue", "890 Sunset Strip", "234 Wall Street", "567 Rodeo Drive", "901 Main Street"]);
            lat = 40.7128;
            lng = -74.0060;
            break;
        case "South America":
            country = "Brazil";
            countryCode = "BR";
            city = getRandomCity(["Rio de Janeiro", "Sao Paulo", "Buenos Aires", "Lima", "Bogota", "Santiago", "Caracas"]);
            address = getRandomAddress(["789 Copacabana Street", "456 Paulista Avenue", "123 Plaza de Mayo", "890 Miraflores Boulevard", "234 El Dorado Road", "901 Providencia Avenue", "567 Bolivar Square"]);
            lat = -22.9068;
            lng = -43.1729;
            break;
        case "Italy":
            country = "Italy";
            countryCode = "IT";
            city = getRandomCity(["Rome", "Milan", "Naples", "Turin", "Palermo", "Genoa", "Bologna"]);
            address = getRandomAddress(["321 Roman Forum Road", "654 Duomo Square", "987 Spaccanapoli Street", "210 Piazza Castello", "543 Quattro Canti Avenue", "876 Porto Antico Lane", "109 Via dell'Indipendenza"]);
            lat = 41.9028;
            lng = 12.4964;
            break;
        case "Middle East":
            country = "United Arab Emirates";
            countryCode = "AE";
            city = getRandomCity(["Dubai", "Abu Dhabi", "Doha", "Riyadh", "Amman", "Kuwait City", "Muscat"]);
            address = getRandomAddress(["101 Sheikh Zayed Road", "202 Corniche Avenue", "303 West Bay Street", "404 King Fahd Road", "505 Jabal Amman Lane", "606 Kuwait Towers Boulevard", "707 Al Bustan Street"]);
            lat = 25.276987;
            lng = 55.296249;
            break;
        default:
            // Default values if no region is matched
            country = "Unknown";
            countryCode = "Unknown";
            city = "Unknown";
            address = "Unknown";
            lat = 0;
            lng = 0;
            break;
    }

    return {
        region: randomRegion,
        country: country,
        countryCode: countryCode,
        city: city,
        address: address,
        lat: lat,
        lng: lng
    };
}

function getRandomCity(cities) {
    return cities[Math.floor(Math.random() * cities.length)];
}

function getRandomAddress(addresses) {
    return addresses[Math.floor(Math.random() * addresses.length)];
}


function generateReviews(numReviews) {
    const reviews = [];
   const users = [
    { _id: utilService.makeId(10), fullName: "John Doe", imgUrl: "https://xsgames.co/randomusers/assets/avatars/male/11.jpg" },
    { _id: utilService.makeId(10), fullName: "Jane Smith", imgUrl: "https://xsgames.co/randomusers/assets/avatars/female/11.jpg" },
    // Add more user objects here
    { _id: utilService.makeId(10), fullName: "Michael Johnson", imgUrl: "https://xsgames.co/randomusers/assets/avatars/male/12.jpg" },
    { _id: utilService.makeId(10), fullName: "Emily Brown", imgUrl: "https://xsgames.co/randomusers/assets/avatars/female/12.jpg" },
    { _id: utilService.makeId(10), fullName: "Robert Williams", imgUrl: "https://xsgames.co/randomusers/assets/avatars/male/13.jpg" },
    { _id: utilService.makeId(10), fullName: "Sophia Garcia", imgUrl: "https://xsgames.co/randomusers/assets/avatars/female/13.jpg" },
    { _id: utilService.makeId(10), fullName: "William Martinez", imgUrl: "https://xsgames.co/randomusers/assets/avatars/male/14.jpg" },
    { _id: utilService.makeId(10), fullName: "Olivia Rodriguez", imgUrl: "https://xsgames.co/randomusers/assets/avatars/female/14.jpg" },
    { _id: utilService.makeId(10), fullName: "David Lopez", imgUrl: "https://xsgames.co/randomusers/assets/avatars/male/15.jpg" },
    { _id: utilService.makeId(10), fullName: "Emma Wilson", imgUrl: "https://xsgames.co/randomusers/assets/avatars/female/15.jpg" },
    // Add more users here as needed
    { _id: utilService.makeId(10), fullName: "Daniel Lee", imgUrl: "https://xsgames.co/randomusers/assets/avatars/male/16.jpg" },
    { _id: utilService.makeId(10), fullName: "Sophie Clark", imgUrl: "https://xsgames.co/randomusers/assets/avatars/female/16.jpg" },
    { _id: utilService.makeId(10), fullName: "Alexander Garcia", imgUrl: "https://xsgames.co/randomusers/assets/avatars/male/17.jpg" },
    { _id: utilService.makeId(10), fullName: "Isabella Johnson", imgUrl: "https://xsgames.co/randomusers/assets/avatars/female/17.jpg" },
    { _id: utilService.makeId(10), fullName: "Ethan Rodriguez", imgUrl: "https://xsgames.co/randomusers/assets/avatars/male/18.jpg" },
    { _id: utilService.makeId(10), fullName: "Ava Brown", imgUrl: "https://xsgames.co/randomusers/assets/avatars/female/18.jpg" },
    { _id: utilService.makeId(10), fullName: "Alexander Martinez", imgUrl: "https://xsgames.co/randomusers/assets/avatars/male/19.jpg" },
    { _id: utilService.makeId(10), fullName: "Charlotte Wilson", imgUrl: "https://xsgames.co/randomusers/assets/avatars/female/19.jpg" },
    { _id: utilService.makeId(10), fullName: "James Taylor", imgUrl: "https://xsgames.co/randomusers/assets/avatars/male/20.jpg" },
    { _id: utilService.makeId(10), fullName: "Mia Anderson", imgUrl: "https://xsgames.co/randomusers/assets/avatars/female/20.jpg" },
    // Add more users here as needed
];

    const titles = ["Amazing place!", "Lovely experience", "Disappointing", "Highly recommended!", "Not worth it"];
    const texts = [
        "It has been such a pleasure to spend our precious time at this place",
        "I had a wonderful time here. The ambiance was great and the staff were very friendly.",
        "I had high expectations but unfortunately, the experience fell short. The service was slow and the food was mediocre.",
        "This place exceeded my expectations. The food was delicious, the service was excellent, and the ambiance was delightful.",
        "I regret spending money here. The food was overpriced and not tasty at all."
    ];

    // Add more user objects here

    for (let i = 0; i < numReviews; i++) {
        const randomUserIndex = Math.floor(Math.random() * users.length);
        const randomTitleIndex = Math.floor(Math.random() * titles.length);
        const randomTextIndex = Math.floor(Math.random() * texts.length);

        // Adjust the score based on sentiment, even if the description contradicts it
        let randomScore;
        if (texts[randomTextIndex].includes("amazing") || texts[randomTextIndex].includes("excellent") || texts[randomTextIndex].includes("recommended")) {
            randomScore = Math.floor(Math.random() * 2) + 4; // Higher score for positive sentiment
        } else if (texts[randomTextIndex].includes("disappointing") || texts[randomTextIndex].includes("regret")) {
            randomScore = Math.floor(Math.random() * 2) + 1; // Lower score for negative sentiment
        } else {
            randomScore = Math.floor(Math.random() * 3) + 2; // Moderate score for neutral sentiment
        }

        const review = {
            _id: utilService.makeId(10),
            by: users[randomUserIndex],
            title: titles[randomTitleIndex],
            txt: texts[randomTextIndex],
            score: randomScore
        };

        reviews.push(review);
    }

    return reviews;
}



function randomStay() {
    const fullName = generateFullName();
    return {
        _id: utilService.makeId(10),
        type: getRandomStayType(),
        previewImg : `https://picsum.photos/id/${utilService.getRandomIntInclusive(1,150)}/600/600`,
        price: getRandomPrice(),
        imgUrls: ["https://cdn.pixabay.com/photo/2014/07/31/21/41/apartment-406901_1280.jpg",
            "https://cdn.pixabay.com/photo/2021/02/21/04/24/mahrous-houses-6035253_1280.jpg",
            "https://cdn.pixabay.com/photo/2018/05/14/12/18/airbnb-3399753_1280.jpg",
            "https://cdn.pixabay.com/photo/2016/11/18/17/20/living-room-1835923_1280.jpg",
            "https://cdn.pixabay.com/photo/2021/11/08/00/30/bedroom-6778193_1280.jpg",
            "https://media.istockphoto.com/id/1461624555/photo/home-interior-background-cozy-green-with-orange-bedroom-white-mock-up-frame-natural-furniture.jpg?s=2048x2048&w=is&k=20&c=https://cdn.pixabay.com/photo/2020/12/16/00/10/home-5835289_1280.jpg"
        ],
        summary: getRandomSummary(),
        capacity: utilService.getRandomIntInclusive(2, 16),
        bedrooms: [
            {
              name: 'Living Room',
              beds: ['couch']
            },
            {
              name: 'Bedroom 1',
              beds: ['double bed', 'double bed', 'sofa bed']
            },
            {
              name: 'Bedroom 2',
              beds: ['single bed', 'sofa bed', 'king size bed']
            }
          ],
        booked: generateStays(),
        baths: utilService.getRandomIntInclusive(1, 3),
        labels: getRandomFilterLabels(3),
        amenities: getRandomAmenities(10),
        host: {
            _id: utilService.makeId(10),
            fullName: fullName,
            imgUrl: "https://thispersondoesnotexist.com/",
            userName: generateUsername(fullName),
            password: "123456789",
            experience: {
                isSuper: returnsTrueHalfOfTheTime(),
                hostingTime: utilService.getRandomIntInclusive(2, 7)
            },


        },
        loc: generateLocation(),
        reviews: generateReviews(100)
    }
}

function generateRandomStays(num) {
    const randomStays = [];
    if (!utilService.loadFromStorage(STAY_DB)) {
        for (let i = 0; i < num; i++) {
            randomStays.push(randomStay());
        }
        stayService.createDemoStay(randomStays);
    }
}


