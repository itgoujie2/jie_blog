import { routeActions, push } from 'react-router-redux'
import { FETCH_ALL_STAR, RECEIVED_ALL_STAR, CREATED_star, RECEIVED_CATEGORY } from '../constants/index'

export function fetchAllstar(){
	return{
		type: FETCH_ALL_STAR
	}
}

export function receivedAllStar(star_list){
	return{
		type: RECEIVED_ALL_STAR, 
		star_list
	}
}

export function getAllStar(){
	return (dispatch) => {
		dispatch(fetchAllstar())
		return fetch('/api/star_list')
			.then(response => response.json())
			.then(json => {
				console.log('res data: ' + JSON.stringify(json.data))
				dispatch(receivedAllStar(json.data))
			})
			.catch(error => {
				
			})
	}
}

export function getStarDetail(star_id){
	return (dispatch) => {
		return fetch('/api/star_detail?star_id=' + star_id)
			.then(response => response.json())
			.then(json => {
				console.log('star detail: ' + JSON.stringify(json))
			})
			.catch(error => {

			})
	}
}

export function createdStar(new_star){
	console.log('in action createstar: ' + JSON.stringify(new_star))
	return{
		type: CREATED_STAR, 
		payload: {
			personal_url : new_star.personal_url, 
			github_url : new_star.github_url, 
			linkedin_url : new_star.linkedin_url, 
			twittwer_url : new_star.twittwer_url, 
			facebook_url : new_star.facebook_url, 
			name : new_star.name, 
			title : new_star.title, 
			tagline : new_star.tagline, 
			skill_1 : new_star.skill_1, 
			skill_2 : new_star.skill_2, 
			skill_3 : new_star.skill_3, 
			rating_1 : new_star.rating_1, 
			rating_2 : new_star.rating_2, 
			rating_3 : new_star.rating_3, 
			answer_1 : new_star.answer_1, 
			answer_2 : new_star.answer_2, 
			answer_3 : new_star.answer_3, 
			answer_4 : new_star.answer_4, 
			answer_5 : new_star.answer_5, 
			token: localStorage.getItem('token')
		}
	}
}

export function createStar(name, title, tagline, personal_url, github_url, 
	linkedin_url, twittwer_url, facebook_url, skill_1, skill_2, 
	skill_3, rating_1, rating_2, rating_3, answer_1, answer_2, answer_3, 
	answer_4, answer_5){
	
	return (dispatch) => {

		return fetch('/api/create_star', {
			method: 'POST', 
			headers: {
			    'Accept': 'application/json',
		    	'Content-Type': 'application/json'
		  	},
			body: JSON.stringify({
				personal_url : personal_url, 
				github_url : github_url, 
				linkedin_url : linkedin_url, 
				twittwer_url : twittwer_url, 
				facebook_url : facebook_url, 
				name : name, 
				title : title, 
				tagline : tagline, 
				skill_1 : skill_1, 
				skill_2 : skill_2, 
				skill_3 : skill_3, 
				rating_1 : rating_1, 
				rating_2 : rating_2, 
				rating_3 : rating_3, 
				answer_1 : answer_1, 
				answer_2 : answer_2, 
				answer_3 : answer_3, 
				answer_4 : answer_4, 
				answer_5 : answer_5, 
				token: localStorage.getItem('token')
			})
		})
			.then(response => response.json())
			.then(json => {
				dispatch(createdstar(json))
			})
			.catch(error => {

			})

	}
}