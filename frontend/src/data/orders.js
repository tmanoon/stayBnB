const today = new Date().setHours(0, 0, 0, 0)
const in2Days = today + (48 * 60 * 60 * 1000)

export const orders = [
  {
    _orderId: "ABC123",
    hostId: "host1_id",
    buyer: {
      _id: "u101",
      fullName: "User 1"
    },
    totalPrice: 580.70,
    entryDate: 1737324000000,
    exitDate: 1737756000000,
    guests: {
      adults: 2,
      children: 2
    },
    stay: {
      _id: "s101",
      name: "Anne's place",
      price: 100,
      location: 'London, England', //city, country
      img: "https://cdn.pixabay.com/photo/2014/07/31/21/41/apartment-406901_1280.jpg"
    },
    msgs: [],
    status: "approved"
  },
  {
    _orderId: "DEF456",
    hostId: "host2_id",
    buyer: {
      _id: "u101",
      fullName: "User 1"
    },
    totalPrice: 620.50,
    entryDate: 1741384800000,
    exitDate: 1741644000000,
    guests: {
      adults: 2,
      children: 1
    },
    stay: {
      _id: "s102",
      name: "Barn-house on the river",
      price: 150,
      location: 'Elburg, Netherlands',
      img: "https://cdn.pixabay.com/photo/2021/02/21/04/24/mahrous-houses-6035253_1280.jpg"
    },
    msgs: [],
    status: "rejected"
  },
  {
    _orderId: "GHI789",
    hostId: "host3_id",
    buyer: {
      _id: "u101",
      fullName: "User 1"
    },
    totalPrice: 700,
    entryDate: 1748120400000,
    exitDate: 1748293200000,
    guests: {
      adults: 4,
      children: 5
    },
    stay: {
      _id: "s103",
      name: "Castle of vampires",
      price: 120,
      location: 'Transylvania, Romania',
      img: "https://cdn.pixabay.com/photo/2018/05/14/12/18/airbnb-3399753_1280.jpg"
    },
    msgs: [],
    status: "approved"
  },
  {
    _orderId: "JKL012",
    hostId: "host4_id",
    buyer: {
      _id: "u101",
      fullName: "User 1"
    },
    totalPrice: 1000,
    entryDate: 1752094800000,
    exitDate: 1752440400000,
    guests: {
      adults: 2,
      children: 2,
      infants: 1
    },
    stay: {
      _id: "s104",
      name: "Diamond Grand-Hall",
      price: 200,
      location: 'Tuscany, Italy',
      img: "https://cdn.pixabay.com/photo/2016/11/18/17/20/living-room-1835923_1280.jpg"
    },
    msgs: [],
    status: "approved"
  },
  {
    _orderId: "MNO345",
    hostId: "host5_id",
    buyer: {
      _id: "u101",
      fullName: "User 1"
    },
    totalPrice: 780,
    entryDate: 1756674000000,
    exitDate: 1756846800000,
    guests: {
      adults: 4,
      children: 5,
      infants: 1
    },
    stay: {
      _id: "s105",
      name: "Elegant studio in the center of town",
      price: 180,
      location: 'Paris, france',
      img: "https://cdn.pixabay.com/photo/2014/07/31/21/41/apartment-406901_1280.jpg"
    },
    msgs: [],
    status: "pending"
  }, {
    _orderId: "PQR123",
    hostId: "host6_id",
    buyer: {
      _id: "u101",
      fullName: "User 1"
    },
    totalPrice: 250.70,
    entryDate: today,
    exitDate: in2Days,
    guests: {
      adults: 2,
      children: 2
    },
    stay: {
      _id: "s106",
      name: "Fun park/house for kids",
      price: 100,
      location: 'Liverpool, England',
      img: "https://cdn.pixabay.com/photo/2014/07/31/21/41/apartment-406901_1280.jpg"
    },
    msgs: [],
    status: "approved"
  },
  {
    _orderId: "STU456",
    hostId: "host7_id",
    buyer: {
      _id: "u101",
      fullName: "User 1"
    },
    totalPrice: 620.50,
    entryDate: 1472418000000,
    exitDate: 1472850000000,
    guests: {
      adults: 2,
      children: 1
    },
    stay: {
      _id: "s107",
      name: "Grand Event Hall",
      price: 150,
      location: 'Amsterdam, Netherlands',
      img: "https://cdn.pixabay.com/photo/2021/02/21/04/24/mahrous-houses-6035253_1280.jpg"
    },
    msgs: [],
    status: "rejected"
  },
  {
    _orderId: "VWX789",
    hostId: "host8_id",
    buyer: {
      _id: "u101",
      fullName: "User 1"
    },
    totalPrice: 700,
    entryDate: 1492462800000,
    exitDate: 1492894800000,
    guests: {
      adults: 4,
      children: 5
    },
    stay: {
      _id: "s108",
      name: "House of cards",
      price: 120,
      location: 'Salzburg, Austria',
      img: "https://cdn.pixabay.com/photo/2018/05/14/12/18/airbnb-3399753_1280.jpg"
    },
    msgs: [],
    status: "approved"
  },
  {
    _orderId: "YZA012",
    hostId: "host9_id",
    buyer: {
      _id: "u101",
      fullName: "User 1"
    },
    totalPrice: 300,
    entryDate: 1517608800000,
    exitDate: 1517781600000,
    guests: {
      adults: 2,
      children: 2,
      infants: 1
    },
    stay: {
      _id: "s109",
      name: "Igloo with view",
      price: 200,
      location: 'Oslo, Norway',
      img: "https://cdn.pixabay.com/photo/2016/11/18/17/20/living-room-1835923_1280.jpg"
    },
    msgs: [],
    status: "approved"
  }
]
