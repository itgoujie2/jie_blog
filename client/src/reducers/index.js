import { combineReducers } from 'redux'
import { saas } from './saas'
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
	routing: routerReducer, 
	saas
})

export default rootReducer