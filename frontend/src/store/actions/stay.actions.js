import { stayService } from '../../services/stay.service'
import { ADD_STAY, REMOVE_STAY, SET_FILTER, SET_STAYS, UPDATE_STAY, SET_GALLERY_OBSERVATION, SET_IS_LOADING, SET_STAY } from "../reducers/stay.reducer"
import { store } from "../store"

export async function loadStays() {
    try {
        store.dispatch({ type: SET_IS_LOADING, isLoading: true })
        const { filterBy } = store.getState().stayModule
        const stays = await stayService.query(filterBy)
        store.dispatch({ type: SET_STAYS, stays })
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    } catch (err) {
        console.log(err)
        throw err
    }
}

export async function loadStayById(stayId) {
    try {
        store.dispatch({ type: SET_IS_LOADING, isLoading: true })
        const stay = await stayService.getById(stayId)
        store.dispatch({ type: SET_STAY, stay })
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        return stay
    } catch (err) {
        console.log(err)
    }
}

export async function removeStay(stayId) {
    try {
        await stayService.remove(stayId)
        store.dispatch({ type: REMOVE_STAY, stayId })
    } catch (err) {
        console.log(err)
        throw err
    }
}

export async function saveStay(stay) {
    try {
        const stayToSave = await stayService.save(stay)
        const type = stay._id ? UPDATE_STAY : ADD_STAY
        store.dispatch({ type, stay: stayToSave })
        return stayToSave
    } catch (err) {
        console.log(err)
        throw err
    }
}

export function setStayFilter(filterBy = stayService.getDefaultFilter()) {
    store.dispatch({ type: SET_FILTER, filterBy })
    return Promise.resolve(filterBy)
}

export function changeGalleryVisibility(visibility) {
    store.dispatch({ type: SET_GALLERY_OBSERVATION, isVisible: visibility })
}