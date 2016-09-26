import axios from 'axios'
import { routeActions, push } from 'react-router-redux'
import { create_saas } from '../utils/http_functions'
import { FETCH_ALL_SAAS, RECEIVED_ALL_SAAS, CREATED_SAAS } from '../constants/index'

export function fetchAllSaas(){
	return{
		type: FETCH_ALL_SAAS
	}
}

export function receivedAllSaas(saas_list){
	return{
		type: RECEIVED_ALL_SAAS, 
		saas_list
	}
}

export function getAllSaas(){
	return (dispatch) => {
		dispatch(fetchAllSaas())
		return fetch('/api/saas_list')
			.then(response => response.json())
			.then(json => {
				console.log('res data: ' + JSON.stringify(json.data))
				dispatch(receivedAllSaas(json.data))
			})
			.catch(error => {
				
			})
	}
}

export function createdSaas(new_saas){
	console.log('in action createSaas: ' + JSON.stringify(new_saas))
	return{
		type: CREATED_SAAS, 
		payload: {
			title: new_saas.title, 
			body: new_saas.body
		}
	}
}

export function createSaas(title, body){
	
	return (dispatch) => {

		return fetch('/api/create_saas', {
			method: 'POST', 
			headers: {
			    'Accept': 'application/json',
		    	'Content-Type': 'application/json'
		  	},
			body: JSON.stringify({
				title: title, 
				body: body
			})
		})
			.then(response => response.json())
			.then(json => {
				dispatch(createdSaas(json))
			})
			.catch(error => {

			})

	}
}