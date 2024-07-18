export const UPDATE_RESERVATION = 'UPDATE_RESERVATION'
import { startOfDay, addDays } from 'date-fns'

// DEMO DATA TILL GETTING INFO FOR RESERVATION FROM PARAMS
const todayTimestamp = startOfDay(new Date()).getTime()
// Timestamp for today + three days
const timestampThreeDaysLater = addDays(todayTimestamp, 3).getTime()

// DEMO DATA FOR NOW

const initialState = {
    reservation: {
        checkIn: todayTimestamp,
        checkout: timestampThreeDaysLater,
        guests: {adults: 1, children: 0, infants: 0, pets: 0, sum: 1}
    }
}

export function reservationReducer(state = initialState, action = {}) {
    switch (action.type) {
        case UPDATE_RESERVATION:
            return { ...state, reservation: action.reservation }
        default:
            return state
    }
} 
