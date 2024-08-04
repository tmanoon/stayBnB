import { stayService } from "../../services/stay.service"

export const SET_STAYS = 'SET_STAYS'
export const SET_STAY = 'SET_STAY'
export const REMOVE_STAY = 'REMOVE_STAY'
export const ADD_STAY = 'ADD_STAY'
export const UPDATE_STAY = 'UPDATE_STAY'

export const SET_IS_LOADING = 'SET_IS_LOADING'

export const SET_FILTER = 'SET_FILTER'
export const SET_PAGE_IDX = 'SET_PAGE_IDX'

export const SET_GALLERY_OBSERVATION = 'SET_GALLERY_OBSERVATION'

const initialState = {
    stays: [],
    stay: null,
    isLoading: true,
    filterBy: {
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
    },
    isGalleryVisible: true
}

export function stayReducer(state = initialState, action = {}) {
    let stays
    let lastStays
    switch (action.type) {
        //Stays
        case SET_STAYS:
            lastStays = [...action.stays]
            return { ...state, stays: action.stays, lastStays }

        case SET_STAY:
            return { ...state, stay: action.stay }

        case REMOVE_STAY:
            lastStays = [...state.stays]
            stays = state.stays.filter(stay => stay._id !== action.stayId)
            return { ...state, stays, lastStays }

        case ADD_STAY:
            stays = [...state.stays, action.stay]
            return { ...state, stays }

        case UPDATE_STAY:
            stays = state.stays.map(stay => stay._id === action.stay._id ? action.stay : stay)
            return { ...state, stays }

        //Filter
        case SET_FILTER:
            return { ...state, filterBy: action.filterBy }

        case SET_PAGE_IDX:
            return { ...state, filterBy: { ...state.filterBy, pageIdx: action.pageIdx } }

        // Observation
        case SET_GALLERY_OBSERVATION:
            return { ...state, isGalleryVisible: action.isVisible }

        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }

        default:
            return state
    }
}