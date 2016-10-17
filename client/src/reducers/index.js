import { combineReducers } from 'redux'
import { story } from './story'
import { auth } from './auth'
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
	routing: routerReducer, 
	story, 
	auth
})

export default rootReducer