export function posts(state = {loaded: false}, action){
	switch(action.type){
		case 'FETCH_ALL_POSTS':
			return Object.assign({}, state, {
				'loaded': false
			})
		case 'RECEIVED_ALL_POSTS':
			return Object.assign({}, state, {
				'data': action.post_list, 
				'loaded': true
			})
		
		default:
			return state
	}
}