import {
    combineReducers,
    compose,
    legacy_createStore as createStore
} from 'redux'

import { reservationReducer } from "./reducers/reservation.reducer.js"
import { userReducer } from "./reducers/user.reducer.js"
import { reviewReducer } from './reducers/review.reducer.js'
import { stayReducer } from './reducers/stay.reducer.js'
import { orderReducer } from './reducers/order.reducer.js'

const rootReducer = combineReducers({
    reservationModule: reservationReducer,
    userModule: userReducer,
    reviewModule: reviewReducer,
    stayModule: stayReducer,
    orderModule: orderReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers())

window.gStore = store
