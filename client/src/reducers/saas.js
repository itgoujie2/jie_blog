import { FETCH_ALL_SAAS, RECEIVED_ALL_SAAS, CREATED_SAAS, RECEIVED_CATEGORY } from '../constants/index'

export function saas(state = {loaded: false}, action){
	switch(action.type){
		case FETCH_ALL_SAAS:
			return Object.assign({}, state, {
				'loaded': false
			})
		case RECEIVED_ALL_SAAS:
			return Object.assign({}, state, {
				'data': action.saas_list, 
				'loaded': true
			})
		case RECEIVED_CATEGORY:
			return Object.assign({}, state, {
				'category_list': action.category_list
			})
		case CREATED_SAAS:
			return Object.assign({}, state, {
				loaded: true, 
				'new_saas': {
					title: action.payload.title, 
					body: action.payload.body
				}
			})

		default:
			return state
	}
}