import { LOGIN_ACCOUNT_SUCCESS, LOGIN_ACCOUNT_FAILURE, REGISTER_ACCOUNT_SUCCESS, REGISTER_ACCOUNT_FAILURE, ACCOUNT_LOGGEDOUT } from '../constants/index'
import jwtDecode from 'jwt-decode'

const initialState = {
	token: null, 
	username: null, 
	isAuthenticated: false
}

export function auth(state = initialState, action){
	switch(action.type){
		case LOGIN_ACCOUNT_SUCCESS:
			return Object.assign({}, state, {
				'isAuthenticated': true, 
				'token': action.payload.token, 
				'username': jwtDecode(action.payload.token).username
				'statusText': 'You have been successfully logged in.'
			})
		case LOGIN_ACCOUNT_FAILURE:
			return Object.assign({}, state, {
				'isAuthenticated': false, 
				'token': null, 
				'username': null, 
				'statusText': `Authenticatoin Error: ${action.payload.status} ${action.payload.statusText}`
			})
		case REGISTER_ACCOUNT_SUCCESS:
			return Object.assign({}, state, {
				'isAuthenticated': true, 
				'token': action.payload.token, 
				'username': jwtDecode(action.payload.token).username
				'statusText': 'You have been successfully logged in.'
			})
		case REGISTER_ACCOUNT_FAILURE: 
			return Object.assign({}, state, {
				'isAuthenticated': false, 
				'token': null, 
				'username': null, 
				'statusText': `Register Error: ${action.payload.status} ${action.payload.statusText}`
			})
		case ACCOUNT_LOGGEDOUT:
			return Object.assign({}, state, {
				'isAuthenticated': false, 
				'token': null, 
				'username': null
			})

		default:
			return state
	}
}