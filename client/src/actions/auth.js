import { browserHistory } from 'react-router'
import jwtDecode from 'jwt-decode'
import { LOGIN_ACCOUNT_SUCCESS, LOGIN_ACCOUNT_FAILURE, REGISTER_ACCOUNT_SUCCESS, REGISTER_ACCOUNT_FAILURE, ACCOUNT_LOGGEDOUT } from '../constants/index'

export function loginAccountSuccess(token){
	localStorage.setItem('token', token)
	return {
		type: LOGIN_ACCOUNT_SUCCESS, 
		payload: {
			token: token
		}
	}
}

export function loginAccountFailure(error){
	localStorage.removeItem('token')
	return {
		type: LOGIN_ACCOUNT_FAILURE, 
		payload: {
			status: error.status, 
			statusText: error.statusText
		}
	}
}

export function registerAccountSuccess(token){
	localStorage.setItem('token', token)
	return {
		type: REGISTER_ACCOUNT_SUCCESS, 
		payload: {
			token: token
		}
	}
}

export function registerAccountFailure(error){
	localStorage.removeItem('token')
	return {
		type: REGISTER_ACCOUNT_FAILURE, 
		payload: {
			status: error.status, 
			statusText: error.statusText
		}
	}
}

export function logoutAccount(cb){
	localStorage.removeItem('token')
	cb()
	return {
		type: ACCOUNT_LOGGEDOUT
	}
}

export function loginAccount(email, password){
	return (dispatch) => {
		return fetch('/api/get_token', {
			method: 'POST', 
			headers: {
				'Accept': 'application/json', 
				'Content-Type': 'application/json'
			}, 
			body: JSON.stringify({
				email: email, 
				password: password
			})
		})
			.then(response => response.json())
			.then(res => {
				try{
					let decoded = jwtDecode(res.token)
					console.log('res from login: ' + JSON.stringify(res))
					dispatch(loginAccountSuccess(res.token))
				}
				catch(e){
					console.error(e)
					dispatch(loginAccountFailure({
						response: {
							status: 403, 
							statusText: 'Invalid Token'
						}
					}))
				}
			})
			.catch(e => {
				dispatch(loginAccountFailure(e))
			})
	}
}

export function registerAccount(email, password){
	return (dispatch) => {
		return fetch('/api/create_account', {
			method: 'POST', 
			headers: {
				'Accept': 'application/json', 
				'Content-Type': 'application/json'
			}, 
			body: JSON.stringify({
				email: email, 
				password: password
			})
		})
			.then(response => response.json())
			.then(res => {
				try{
					let decoded = jwtDecode(res.token)
					dispatch(registerAccountSuccess(res.token))
				}
				catch(e){
					dispatch(registerAccountFailure({
						response: {
							status: 403, 
							statusText: 'Invalid Token'
						}
					}))
				}
			})
			.catch(error => {
				dispatch(registerAccountFailure(error))
			})
	}
}


