import { browserHistory } from 'react-router'
import jwtDecode from 'jwt-decode'
import { LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE } from '../constants/index'

export function loginUserSuccess(token){
	localStorage.setItem('token', token)
	return {
		type: LOGIN_USER_SUCCESS, 
		payload: {
			token: token
		}
	}
}

export function loginUserFailure(error){
	localStorage.removeItem('token')
	return {
		type: LOGIN_USER_FAILURE, 
		payload: {
			status: error.status, 
			statusText: error.statusText
		}
	}
}

export function loginUser(email, password){
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
			.then(res => {
				try{
					let decoded = jwtDecode(res.token)
					dispatch(loginUserSuccess(res.token))
					browserHistory.push('home')
				}
				catch(e){
					console.error(e)
					dispatch(loginUserFailure({
						response: {
							status: 403, 
							statusText: 'Invalid Token'
						}
					}))
				}
			})
			.catch(e => {
				dispatch(loginUserFailure(e))
			})
	}
}

