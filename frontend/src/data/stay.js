

export const stays = [{
  _id: "s101",
  name: "A House",
  type: "House",
  imgUrls: ["https://cdn.pixabay.com/photo/2014/07/31/21/41/apartment-406901_1280.jpg",
    "https://cdn.pixabay.com/photo/2021/02/21/04/24/mahrous-houses-6035253_1280.jpg",
    "https://cdn.pixabay.com/photo/2018/05/14/12/18/airbnb-3399753_1280.jpg",
    "https://cdn.pixabay.com/photo/2016/11/18/17/20/living-room-1835923_1280.jpg",
    "https://cdn.pixabay.com/photo/2021/11/08/00/30/bedroom-6778193_1280.jpg",
    "https://media.istockphoto.com/id/1461624555/photo/home-interior-background-cozy-green-with-orange-bedroom-white-mock-up-frame-natural-furniture.jpg?s=2048x2048&w=is&k=20&c=https://cdn.pixabay.com/photo/2020/12/16/00/10/home-5835289_1280.jpg"
  ],
  price: 80.00,
  summary: "Fantastic duplex apartment...",
  capacity: 5,
  bedrooms: [
    {
      name: 'Living Room',
      beds: ['couch']
    },
    {
      name: 'Bedroom 1',
      beds: ['double bed', 'double bed', 'sofa bed']
    }
  ],
  booked: [
    { entryDate: 1722211200000, exitDate: 1722816000000 },
    { entryDate: 1718668800000, exitDate: 1719273600000 },
    { entryDate: 1717977600000, exitDate: 1718582400000 },
    { entryDate: 1720051200000, exitDate: 1720656000000 },
    { entryDate: 1727308800000, exitDate: 1727913600000 }
],
  baths: 2,
  amenities: ['Heating', 'Tv', 'Iron', 'Pool', 'Free parking',
    'Crib', 'Gym', 'Breakfast', 'Smoking allowed', 'Hot tub', 'Ev charger', 'King bed', 'BBQ grill',
    'Indoor fireplace', 'Beachfront', 'Ski-on/Ski-out', 'Waterfront',
    'Smoke alarm'],
  labels: [
    "Top of the world",
    "Trending"
  ],
  host: {
    _id: "u101",
    fullName: "User 1",
    imgUrl: "https://robohash.org/doodi",
    userName: "user1",
    password: "secret",
    experience: {
      isSuper: false,
      hostingTime: 5
    }
  },
  loc: {
    region: "Italy",
    country: "Portugal",
    countryCode: "PT",
    city: "Lisbon",
    address: "17 Kombo st",
    lat: -8.61308,
    lng: 41.1413
  },
  reviews: [
    {
        by: {
          _id: "u101",
          fullName: "User 1",
          imgUrl: "https://xsgames.co/randomusers/assets/avatars/female/1.jpg"
        },
        'title': 'Amazing place!',
        'txt': 'It has been such a pleasure to spend our precious time at this place',
        'score': 4
    },
    {
      by: {
        _id: "u101",
        fullName: "User 1",
        imgUrl: "https://xsgames.co/randomusers/assets/avatars/male/1.jpg"
      },
        'title': 'Lovely experience',
        'txt': 'I had a wonderful time here. The ambiance was great and the staff were very friendly.',
        'score': 4
    },
    {
      by: {
        _id: "u101",
        fullName: "User 1",
        imgUrl: "https://xsgames.co/randomusers/assets/avatars/female/2.jpg"
      },
        'title': 'Disappointing',
        'txt': 'I had high expectations but unfortunately, the experience fell short. The service was slow and the food was mediocre.',
        'score': 2
    },
    {
      by: {
        _id: "u101",
        fullName: "User 1",
        imgUrl: "https://xsgames.co/randomusers/assets/avatars/male/2.jpg"
      },
        'title': 'Highly recommended!',
        'txt': 'This place exceeded my expectations. The food was delicious, the service was excellent, and the ambiance was delightful.',
        'score': 4
    },
    {
      by: {
        _id: "u101",
        fullName: "User 1",
        imgUrl: "https://xsgames.co/randomusers/assets/avatars/female/3.jpg"
      },
        'title': 'Not worth it',
        'txt': 'I regret spending money here. The food was overpriced and not tasty at all.',
        'score': 1
    }
],
  likedByUsers: []
},
{
  _id: "s102",
  name: "Bed and breakfast",
  type: "House",
  imgUrls: ["https://cdn.pixabay.com/photo/2014/07/31/21/41/apartment-406901_1280.jpg",
    "https://cdn.pixabay.com/photo/2021/02/21/04/24/mahrous-houses-6035253_1280.jpg",
    "https://cdn.pixabay.com/photo/2018/05/14/12/18/airbnb-3399753_1280.jpg",
    "https://cdn.pixabay.com/photo/2016/11/18/17/20/living-room-1835923_1280.jpg",
    "https://cdn.pixabay.com/photo/2021/11/08/00/30/bedroom-6778193_1280.jpg",
    "https://media.istockphoto.com/id/1461624555/photo/home-interior-background-cozy-green-with-orange-bedroom-white-mock-up-frame-natural-furniture.jpg?s=2048x2048&w=is&k=20&c=https://cdn.pixabay.com/photo/2020/12/16/00/10/home-5835289_1280.jpg"
  ],
  price: 90.00,
  summary: "Fantastic duplex apartment...",
  capacity: 13,
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
  booked: [
    { entryDate: 1722211200000, exitDate: 1722816000000 },
    { entryDate: 1718668800000, exitDate: 1719273600000 },
    { entryDate: 1717977600000, exitDate: 1718582400000 },
    { entryDate: 1720051200000, exitDate: 1720656000000 },
    { entryDate: 1727308800000, exitDate: 1727913600000 }
],
  baths: 2,
  amenities: [
    'Tv', 'Iron', 'Pool', 'Free parking',
    'Crib', 'Gym', 'Breakfast', 'Smoking allowed', 'Hot tub', 'Ev charger', 'King bed', 'BBQ grill',
    'Indoor fireplace', 'Beachfront', 'Ski-on/Ski-out', 'Waterfront',
    'Smoke alarm', 'Carbon monoxide alarm'],
  labels: [
    "Play",
    "Tropical"
  ],
  host: {
    _id: "u101",
    fullName: "User 1",
    imgUrl: "https://robohash.org/doodi",
    userName: "user1",
    password: "secret",
    experience: {
      isSuper: false,
      hostingTime: 5
    }
  },
  loc: {
    region: "Middle East",
    country: "Portugal",
    countryCode: "PT",
    city: "Lisbon",
    address: "17 Kombo st",
    lat: -8.61308,
    lng: 41.1413
  },
  reviews: [
    {
        by: {
          _id: "u101",
          fullName: "User 1",
          imgUrl: "https://xsgames.co/randomusers/assets/avatars/male/3.jpg"
        },
        'title': 'Amazing place!',
        'txt': 'It has been such a pleasure to spend our precious time at this place',
        'score': 4
    },
    {
      by: {
        _id: "u101",
        fullName: "User 1",
        imgUrl: "https://xsgames.co/randomusers/assets/avatars/female/4.jpg"
      },
        'title': 'Lovely experience',
        'txt': 'I had a wonderful time here. The ambiance was great and the staff were very friendly.',
        'score': 4
    },
    {
      by: {
        _id: "u101",
        fullName: "User 1",
        imgUrl: "https://xsgames.co/randomusers/assets/avatars/male/4.jpg"
      },
        'title': 'Disappointing',
        'txt': 'I had high expectations but unfortunately, the experience fell short. The service was slow and the food was mediocre.',
        'score': 2
    },
    {
      by: {
        _id: "u101",
        fullName: "User 1",
        imgUrl: "https://xsgames.co/randomusers/assets/avatars/female/5.jpg"
      },
        'title': 'Highly recommended!',
        'txt': 'This place exceeded my expectations. The food was delicious, the service was excellent, and the ambiance was delightful.',
        'score': 4
    },
    {
      by: {
        _id: "u101",
        fullName: "User 1",
        imgUrl: "hhttps://xsgames.co/randomusers/assets/avatars/male/5.jpg"
      },
        'title': 'Not worth it',
        'txt': 'I regret spending money here. The food was overpriced and not tasty at all.',
        'score': 1
    }
],
  likedByUsers: []
},
{
  _id: "s103",
  name: "Cabana",
  type: "House",
  imgUrls: ["https://cdn.pixabay.com/photo/2014/07/31/21/41/apartment-406901_1280.jpg",
    "https://cdn.pixabay.com/photo/2021/02/21/04/24/mahrous-houses-6035253_1280.jpg",
    "https://cdn.pixabay.com/photo/2018/05/14/12/18/airbnb-3399753_1280.jpg",
    "https://cdn.pixabay.com/photo/2016/11/18/17/20/living-room-1835923_1280.jpg",
    "https://cdn.pixabay.com/photo/2021/11/08/00/30/bedroom-6778193_1280.jpg",
    "https://media.istockphoto.com/id/1461624555/photo/home-interior-background-cozy-green-with-orange-bedroom-white-mock-up-frame-natural-furniture.jpg?s=2048x2048&w=is&k=20&c=https://cdn.pixabay.com/photo/2020/12/16/00/10/home-5835289_1280.jpg"
  ],
  price: 80.00,
  summary: "Fantastic duplex apartment...",
  capacity: 4,
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
  booked: [
    { entryDate: 1720310400000, exitDate: 1720915200000 },
    { entryDate: 1720742400000, exitDate: 1721347200000 },
    { entryDate: 1723507200000, exitDate: 1724112000000 },
    { entryDate: 1721347200000, exitDate: 1721952000000 },
    { entryDate: 1720310400000, exitDate: 1720915200000 }
],  
  baths: 2,
  amenities: [
    'Wifi', 'Washer', 'Air conditioning', 'Dedicated workspace', 'Hair dryer',
    'Kitchen', 'Dryer', 'Heating', 'Tv', 'Iron', 'Pool', 'Free parking',
    'Crib', 'Gym', 'Breakfast', 'Smoking allowed'
  ],
  labels: [
    "Top of the world",
    "Trending",
    "Tropical"
  ],
  host: {
    _id: "u101",
    fullName: "User 1",
    imgUrl: "https://robohash.org/doodi",
    userName: "user1",
    password: "secret",
    experience: {
      isSuper: false,
      hostingTime: 5
    }
  },
  loc: {
    region: "United States",
    country: "Portugal",
    countryCode: "PT",
    city: "Lisbon",
    address: "17 Kombo st",
    lat: -8.61308,
    lng: 41.1413
  },
  reviews: [
    {
        by: {
          _id: "u101",
          fullName: "User 1",
          imgUrl: "https://xsgames.co/randomusers/assets/avatars/female/6.jpg"
        },
        'title': 'Amazing place!',
        'txt': 'It has been such a pleasure to spend our precious time at this place',
        'score': 4
    },
    {
      by: {
        _id: "u101",
        fullName: "User 1",
        imgUrl: "https://xsgames.co/randomusers/assets/avatars/male/6.jpg"
      },
        'title': 'Lovely experience',
        'txt': 'I had a wonderful time here. The ambiance was great and the staff were very friendly.',
        'score': 4
    },
    {
      by: {
        _id: "u101",
        fullName: "User 1",
        imgUrl: "https://xsgames.co/randomusers/assets/avatars/female/7.jpg"
      },
        'title': 'Disappointing',
        'txt': 'I had high expectations but unfortunately, the experience fell short. The service was slow and the food was mediocre.',
        'score': 2
    },
    {
      by: {
        _id: "u101",
        fullName: "User 1",
        imgUrl: "https://xsgames.co/randomusers/assets/avatars/male/7.jpg"
      },
        'title': 'Highly recommended!',
        'txt': 'This place exceeded my expectations. The food was delicious, the service was excellent, and the ambiance was delightful.',
        'score': 4
    },
    {
      by: {
        _id: "u101",
        fullName: "User 1",
        imgUrl: "https://xsgames.co/randomusers/assets/avatars/female/8.jpg"
      },
        'title': 'Not worth it',
        'txt': 'I regret spending money here. The food was overpriced and not tasty at all.',
        'score': 1
    }
],
  likedByUsers: []
},
{
  _id: "s104",
  name: "Cabana",
  type: "House",
  imgUrls: ["https://cdn.pixabay.com/photo/2014/07/31/21/41/apartment-406901_1280.jpg",
    "https://cdn.pixabay.com/photo/2021/02/21/04/24/mahrous-houses-6035253_1280.jpg",
    "https://cdn.pixabay.com/photo/2018/05/14/12/18/airbnb-3399753_1280.jpg",
    "https://cdn.pixabay.com/photo/2016/11/18/17/20/living-room-1835923_1280.jpg",
    "https://cdn.pixabay.com/photo/2021/11/08/00/30/bedroom-6778193_1280.jpg",
    "https://media.istockphoto.com/id/1461624555/photo/home-interior-background-cozy-green-with-orange-bedroom-white-mock-up-frame-natural-furniture.jpg?s=2048x2048&w=is&k=20&c=https://cdn.pixabay.com/photo/2020/12/16/00/10/home-5835289_1280.jpg"
  ],
  price: 80.00,
  summary: "Fantastic duplex apartment...",
  capacity: 2,
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
  booked:[
    { entryDate: 1727568000000, exitDate: 1728172800000 },
    { entryDate: 1726444800000, exitDate: 1727049600000 },
    { entryDate: 1724889600000, exitDate: 1725494400000 },
    { entryDate: 1717113600000, exitDate: 1717718400000 },
    { entryDate: 1717718400000, exitDate: 1718323200000 }
],
  baths: 2,
  amenities: [
    'Wifi', 'Washer', 'Air conditioning', 'Dedicated workspace', 'Hair dryer',
    'Kitchen', 'Dryer', 'Heating', 'Tv', 'Iron', 'Pool', 'Free parking',
    'Crib', 'Gym', 'Breakfast', 'Smoking allowed'
  ],
  labels: [
    "Top of the world",
    "Trending",
    "Tropical"
  ],
  host: {
    _id: "u101",
    fullName: "User 1",
    imgUrl: "https://robohash.org/doodi",
    userName: "user1",
    password: "secret",
    experience: {
      isSuper: false,
      hostingTime: 5
    }
  },
  loc: {
    region: "Greece",
    country: "Portugal",
    countryCode: "PT",
    city: "Lisbon",
    address: "17 Kombo st",
    lat: -8.61308,
    lng: 41.1413
  },
  reviews: [
    {
        by: {
          _id: "u101",
          fullName: "User 1",
          imgUrl: "https://xsgames.co/randomusers/assets/avatars/male/8.jpg"
        },
        'title': 'Amazing place!',
        'txt': 'It has been such a pleasure to spend our precious time at this place',
        'score': 4
    },
    {
      by: {
        _id: "u101",
        fullName: "User 1",
        imgUrl: "https://xsgames.co/randomusers/assets/avatars/female/9.jpg"
      },
        'title': 'Lovely experience',
        'txt': 'I had a wonderful time here. The ambiance was great and the staff were very friendly.',
        'score': 4
    },
    {
      by: {
        _id: "u101",
        fullName: "User 1",
        imgUrl: "https://xsgames.co/randomusers/assets/avatars/male/9.jpg"
      },
        'title': 'Disappointing',
        'txt': 'I had high expectations but unfortunately, the experience fell short. The service was slow and the food was mediocre.',
        'score': 2
    },
    {
      by: {
        _id: "u101",
        fullName: "User 1",
        imgUrl: "https://xsgames.co/randomusers/assets/avatars/male/10.jpg"
      },
        'title': 'Highly recommended!',
        'txt': 'This place exceeded my expectations. The food was delicious, the service was excellent, and the ambiance was delightful.',
        'score': 4
    },
    {
      by: {
        _id: "u101",
        fullName: "User 1",
        imgUrl: "https://xsgames.co/randomusers/assets/avatars/female/10.jpg"
      },
        'title': 'Not worth it',
        'txt': 'I regret spending money here. The food was overpriced and not tasty at all.',
        'score': 1
    }
],
  likedByUsers: []
},
{
  _id: "s105",
  name: "Cabana",
  type: "House",
  imgUrls: ["https://cdn.pixabay.com/photo/2014/07/31/21/41/apartment-406901_1280.jpg",
    "https://cdn.pixabay.com/photo/2021/02/21/04/24/mahrous-houses-6035253_1280.jpg",
    "https://cdn.pixabay.com/photo/2018/05/14/12/18/airbnb-3399753_1280.jpg",
    "https://cdn.pixabay.com/photo/2016/11/18/17/20/living-room-1835923_1280.jpg",
    "https://cdn.pixabay.com/photo/2021/11/08/00/30/bedroom-6778193_1280.jpg",
    "https://media.istockphoto.com/id/1461624555/photo/home-interior-background-cozy-green-with-orange-bedroom-white-mock-up-frame-natural-furniture.jpg?s=2048x2048&w=is&k=20&c=https://cdn.pixabay.com/photo/2020/12/16/00/10/home-5835289_1280.jpg"
  ],
  price: 80.00,
  summary: "Fantastic duplex apartment...",
  capacity: 8,
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
  booked: [
    { entryDate: 1727136000000, exitDate: 1727740800000 },
    { entryDate: 1726272000000, exitDate: 1726876800000 },
    { entryDate: 1714867200000, exitDate: 1715472000000 },
    { entryDate: 1726358400000, exitDate: 1726963200000 },
    { entryDate: 1719100800000, exitDate: 1719705600000 }
]
,  
  baths: 2,
  amenities: [
    'Wifi', 'Washer', 'Air conditioning', 'Dedicated workspace', 'Hair dryer',
    'Kitchen', 'Dryer', 'Heating', 'Tv', 'Iron', 'Pool', 'Free parking',
    'Crib', 'Gym', 'Breakfast', 'Smoking allowed'
  ],
  labels: [
    "Top of the world",
    "Trending",
    "Tropical"
  ],
  host: {
    _id: "u101",
    fullName: "User 1",
    imgUrl: "https://robohash.org/doodi",
    userName: "user1",
    password: "secret",
    experience: {
      isSuper: false,
      hostingTime: 5
    }
  },
  loc: {
    region: "South America",
    country: "Portugal",
    countryCode: "PT",
    city: "Lisbon",
    address: "17 Kombo st",
    lat: -8.61308,
    lng: 41.1413
  },
  reviews: [
    {
        by: {
          _id: "u101",
          fullName: "User 1",
          imgUrl: "https://xsgames.co/randomusers/assets/avatars/male/11.jpg"
        },
        'title': 'Amazing place!',
        'txt': 'It has been such a pleasure to spend our precious time at this place',
        'score': 4
    },
    {
      by: {
        _id: "u101",
        fullName: "User 1",
        imgUrl: "https://xsgames.co/randomusers/assets/avatars/female/11.jpg"
      },
        'title': 'Lovely experience',
        'txt': 'I had a wonderful time here. The ambiance was great and the staff were very friendly.',
        'score': 4
    },
    {
      by: {
        _id: "u101",
        fullName: "User 1",
        imgUrl: "https://xsgames.co/randomusers/assets/avatars/male/12.jpg"
      },
        'title': 'Disappointing',
        'txt': 'I had high expectations but unfortunately, the experience fell short. The service was slow and the food was mediocre.',
        'score': 2
    },
    {
      by: {
        _id: "u101",
        fullName: "User 1",
        imgUrl: "https://xsgames.co/randomusers/assets/avatars/female/12.jpg"
      },
        'title': 'Highly recommended!',
        'txt': 'This place exceeded my expectations. The food was delicious, the service was excellent, and the ambiance was delightful.',
        'score': 4
    },
    {
      by: {
        _id: "u101",
        fullName: "User 1",
        imgUrl: "https://xsgames.co/randomusers/assets/avatars/male/13.jpg"
      },
        'title': 'Not worth it',
        'txt': 'I regret spending money here. The food was overpriced and not tasty at all.',
        'score': 1
    }
],
  likedByUsers: []
},
{
  _id: "s107",
  name: "Cabana",
  type: "House",
  imgUrls: ["https://cdn.pixabay.com/photo/2014/07/31/21/41/apartment-406901_1280.jpg",
    "https://cdn.pixabay.com/photo/2021/02/21/04/24/mahrous-houses-6035253_1280.jpg",
    "https://cdn.pixabay.com/photo/2018/05/14/12/18/airbnb-3399753_1280.jpg",
    "https://cdn.pixabay.com/photo/2016/11/18/17/20/living-room-1835923_1280.jpg",
    "https://cdn.pixabay.com/photo/2021/11/08/00/30/bedroom-6778193_1280.jpg",
    "https://media.istockphoto.com/id/1461624555/photo/home-interior-background-cozy-green-with-orange-bedroom-white-mock-up-frame-natural-furniture.jpg?s=2048x2048&w=is&k=20&c=https://cdn.pixabay.com/photo/2020/12/16/00/10/home-5835289_1280.jpg"
  ],
  price: 80.00,
  summary: "Fantastic duplex apartment...",
  capacity: 6,
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
  booked: [
    {entryDate: 1727568000000, exitDate: 1728172800000},
    {entryDate: 1726444800000, exitDate: 1727049600000},
    {entryDate: 1724889600000, exitDate: 1725494400000},
    {entryDate: 1717113600000, exitDate: 1717718400000},
    {entryDate: 1717718400000, exitDate: 1718323200000},
],  
  baths: 2,
  amenities: [
    'Wifi', 'Washer', 'Air conditioning', 'Dedicated workspace', 'Hair dryer',
    'Kitchen', 'Dryer', 'Heating', 'Tv', 'Iron', 'Pool', 'Free parking',
    'Crib', 'Gym', 'Breakfast', 'Smoking allowed'
  ],
  labels: [
    "Top of the world",
    "Trending",
    "Tropical"
  ],
  host: {
    _id: "u101",
    fullName: "User 1",
    imgUrl: "https://robohash.org/doodi",
    userName: "user1",
    password: "secret",
    experience: {
      isSuper: false,
      hostingTime: 5
    }
  },
  loc: {
    region: "Greece",
    country: "Portugal",
    countryCode: "PT",
    city: "Lisbon",
    address: "17 Kombo st",
    lat: -8.61308,
    lng: 41.1413
  },
  reviews: [
    {
        by: {
          _id: "u101",
          fullName: "User 1",
          imgUrl: "https://xsgames.co/randomusers/assets/avatars/female/13.jpg"
        },
        'title': 'Amazing place!',
        'txt': 'It has been such a pleasure to spend our precious time at this place',
        'score': 4
    },
    {
      by: {
        _id: "u101",
        fullName: "User 1",
        imgUrl: "https://xsgames.co/randomusers/assets/avatars/male/14.jpg"
      },
        'title': 'Lovely experience',
        'txt': 'I had a wonderful time here. The ambiance was great and the staff were very friendly.',
        'score': 4
    },
    {
      by: {
        _id: "u101",
        fullName: "User 1",
        imgUrl: "https://xsgames.co/randomusers/assets/avatars/male/15.jpg"
      },
        'title': 'Disappointing',
        'txt': 'I had high expectations but unfortunately, the experience fell short. The service was slow and the food was mediocre.',
        'score': 2
    },
    {
      by: {
        _id: "u101",
        fullName: "User 1",
        imgUrl: "https://xsgames.co/randomusers/assets/avatars/female/15.jpg"
      },
        'title': 'Highly recommended!',
        'txt': 'This place exceeded my expectations. The food was delicious, the service was excellent, and the ambiance was delightful.',
        'score': 4
    },
    {
      by: {
        _id: "u101",
        fullName: "User 1",
        imgUrl: "https://xsgames.co/randomusers/assets/avatars/female/16.jpg"
      },
        'title': 'Not worth it',
        'txt': 'I regret spending money here. The food was overpriced and not tasty at all.',
        'score': 1
    }
],
  likedByUsers: []
}]


export const orders = [
  {
    _id: "o1225",
    hostId: "u102",
    buyer: {
      _id: "u101",
      fullName: "User 1"
    },
    totalPrice: 160,
    entryDate: "15-10-2025",
    exitDate: "17-10-2025",
    guests: {
      adults: 1,
      kids: 2
    },
    stay: {
      _id: "h102",
      name: "House Of Uncle My",
      price: 80.00
    },
    msgs: [],
    status: "pending" // approved / rejected
  }
]

export const users = [
  {
    _id: "u101",
    fullName: "User 1",
    imgUrl: "https://robohash.org/doodi",
    userName: "user1",
    password: "secret",
    experience: {
      isSuper: false,
      hostingTime: 5
    }
  },
  {
    _id: "u102",
    fullName: "User 2",
    imgUrl: "/img/img2.jpg",
    username: "user2",
    password: "secret",
    experience: {
      isSuper: true,
      hostingTime: 2
    }
  }
]

export const amenities = ['Wifi', 'Washer', 'Air conditioning', 'Dedicated workspace', 'Hair dryer',
  'Kitchen', 'Dryer', 'Heating', 'Tv', 'Iron', 'Pool', 'Free parking',
  'Crib', 'Gym', 'Breakfast', 'Smoking allowed', 'Hot tub', 'Ev charger', 'King bed', 'BBQ grill',
  'Indoor fireplace', 'Beachfront', 'Ski-on/Ski-out', 'Waterfront',
  'Smoke alarm', 'Carbon monoxide alarm']
// Homepage: TOP categories: Best Rate / Houses / Kitchen  - show all - link to Explore
// Renders a <StayList> with <StayPreview> with Link to <StayDetails>   url: /stay/123
// See More => /explore?topRate=true
// See More => /explore?type=House
// See More => /explore?amenities=Kitchen
// Explore page:
// stayService.query({type: 'House'})

// UserDetails
//  basic info
//  visitedStays => orderService.query({userId: 'u101'})
//  myStayOrders => orderService.query({hostId: 'u101'})
//  ownedStays => stayService.query({hostId: 'u103'})

// StayEdit - make it super easy to add Stay for development
// StayList, StayPreview
// Order, confirm Order
// Lastly: StayExplore, Filtering



// Example - figuring up if the user is an owner:
// userService.login()
//  const userStays = stayService.query({ownerId: loggeinUser._id})
//  loggeinUser.isOwner = userStays.length > 0
