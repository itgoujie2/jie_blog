import { combineReducers } from 'redux'
import { star } from './star'
import { auth } from './auth'
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
	routing: routerReducer, 
	star, 
	auth
})

export default rootReducer