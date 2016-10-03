import { combineReducers } from 'redux'
import { saas } from './saas'
import { auth } from './auth'
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
	routing: routerReducer, 
	saas, 
	auth
})

export default rootReducer