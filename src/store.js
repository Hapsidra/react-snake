import { createStore, combineReducers } from 'redux'
import { state } from './reducers'
import { directions } from './constants'

const store = createStore(
    state, localStorage['reduxState'] ? JSON.parse(localStorage['reduxState']) : null  , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store