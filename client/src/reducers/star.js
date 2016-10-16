import { FETCH_ALL_STAR, RECEIVED_ALL_STAR, CREATED_STAR } from '../constants/index'

export function star(state = {loaded: false}, action){
	switch(action.type){
		case FETCH_ALL_STAR:
			return Object.assign({}, state, {
				'loaded': false
			})
		case RECEIVED_ALL_STAR:
			return Object.assign({}, state, {
				'data': action.star_list, 
				'loaded': true
			})
		case CREATED_STAR:
			return Object.assign({}, state, {
				loaded: true, 
				'new_star': {
					personal_url : action.payload.personal_url, 
					github_url : action.payload.github_url, 
					linkedin_url : action.payload.linkedin_url, 
					twittwer_url : action.payload.twittwer_url, 
					facebook_url : action.payload.facebook_url, 
					name : action.payload.name, 
					title : action.payload.title, 
					tagline : action.payload.tagline, 
					skill_1 : action.payload.skill_1, 
					skill_2 : action.payload.skill_2, 
					skill_3 : action.payload.skill_3, 
					rating_1 : action.payload.rating_1, 
					rating_2 : action.payload.rating_2, 
					rating_3 : action.payload.rating_3, 
					answer_1 : action.payload.answer_1, 
					answer_2 : action.payload.answer_2, 
					answer_3 : action.payload.answer_3, 
					answer_4 : action.payload.answer_4, 
					answer_5 : action.payload.answer_5
				}
			})

		default:
			return state
	}
}