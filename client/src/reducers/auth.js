import { LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE } from '../constants/index'
import jwtDecode from 'jwt-decode'

const initialState = {
	token: null, 
	isAuthenticated: false
}

export function auth(state = initialState, action){
	switch(action.type){
		case LOGIN_USER_SUCCESS:
			return Object.assign({}, state, {
				'isAuthenticated': true, 
				'token': action.payload.token, 
				'username': jwtDecode(action.payload.token).email
				'statusText': 'You have been successfully logged in.'
			})
		case LOGIN_USER_FAILURE:
			return Object.assign({}, state, {
				'isAuthenticated': false, 
				'token': null, 
				'username': null, 
				'statusText': `Authenticatoin Error: ${action.payload.status} ${action.payload.statusText}`
			})

		default:
			return state
	}
}