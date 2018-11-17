import { createStore, combineReducers } from 'redux'
import { state } from './reducers'
import { directions } from './constants'
import initialState from './initialState'

const store = createStore(
    state, localStorage['reduxState'] ? JSON.parse(localStorage['reduxState']) : initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store