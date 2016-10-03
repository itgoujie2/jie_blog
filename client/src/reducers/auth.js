import { LOGIN_ACCOUNT_SUCCESS, LOGIN_ACCOUNT_FAILURE, REGISTER_ACCOUNT_SUCCESS, REGISTER_ACCOUNT_FAILURE, ACCOUNT_LOGGEDOUT } from '../constants/index'
import jwtDecode from 'jwt-decode'

const initialState = {
	token: null, 
	email: null, 
	isAuthenticated: false
}

export function auth(state = initialState, action){
	switch(action.type){
		case LOGIN_ACCOUNT_SUCCESS:
			return Object.assign({}, state, {
				'isAuthenticated': true, 
				'token': action.payload.token, 
				'email': jwtDecode(action.payload.token).email, 
				'statusText': 'You have been successfully logged in.'
			})
		case LOGIN_ACCOUNT_FAILURE:
			return Object.assign({}, state, {
				'isAuthenticated': false, 
				'token': null, 
				'email': null, 
				'statusText': `Authenticatoin Error: ${action.payload.status} ${action.payload.statusText}`
			})
		case REGISTER_ACCOUNT_SUCCESS:
			return Object.assign({}, state, {
				'isAuthenticated': true, 
				'token': action.payload.token, 
				'email': jwtDecode(action.payload.token).email, 
				'statusText': 'You have been successfully logged in.'
			})
		case REGISTER_ACCOUNT_FAILURE: 
			return Object.assign({}, state, {
				'isAuthenticated': false, 
				'token': null, 
				'email': null, 
				'statusText': `Register Error: ${action.payload.status} ${action.payload.statusText}`
			})
		case ACCOUNT_LOGGEDOUT:
			return Object.assign({}, state, {
				'isAuthenticated': false, 
				'token': null, 
				'email': null
			})

		default:
			return state
	}
}