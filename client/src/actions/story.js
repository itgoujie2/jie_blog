import { routeActions, push } from 'react-router-redux'
import { FETCH_ALL_STORY, RECEIVED_ALL_STORY, CREATED_STORY, RECEIVED_CATEGORY, FETCH_ALL_QUESTION, RECEIVED_ALL_QUESTION } from '../constants/index'

export function fetchAllStory(){
	return{
		type: FETCH_ALL_STORY
	}
}

export function fetchAllQuestion(){
	return {
		type: FETCH_ALL_QUESTION
	}
}

export function receivedAllStory(story_list){
	return{
		type: RECEIVED_ALL_STORY, 
		story_list
	}
}

export function receivedAllQuestion(quesiton_list) {
	return{
		type: RECEIVED_ALL_QUESTION, 
		quesiton_list
	}
}

export function getAllStory(){
	return (dispatch) => {
		dispatch(fetchAllStory())
		return fetch('/api/story_list')
			.then(response => response.json())
			.then(json => {
				console.log('res data: ' + JSON.stringify(json.data))
				dispatch(receivedAllStory(json.data))
			})
			.catch(error => {
				
			})
	}
}

export function getAllQuestions(){
	return (dispatch) => {
		dispatch(fetchAllQuestion())
		return fetch('/api/question_list')
			.then(response => response.json())
			.then(json => {
				dispatch(receivedAllQuestion(json.data))
			})
			.catch(error => {

			})
	}
}

export function getStoryDetail(story_id){
	return (dispatch) => {
		return fetch('/api/story_detail?story_id=' + story_id)
			.then(response => response.json())
			.then(json => {
				console.log('story detail: ' + JSON.stringify(json))
			})
			.catch(error => {

			})
	}
}

export function createdStory(new_story){
	console.log('in action createstory: ' + JSON.stringify(new_story))
	return{
		type: CREATED_STORY, 
		payload: {
			personal_url : new_story.personal_url, 
			github_url : new_story.github_url, 
			linkedin_url : new_story.linkedin_url, 
			twittwer_url : new_story.twittwer_url, 
			facebook_url : new_story.facebook_url, 
			name : new_story.name, 
			title : new_story.title, 
			tagline : new_story.tagline, 
			skill_1 : new_story.skill_1, 
			skill_2 : new_story.skill_2, 
			skill_3 : new_story.skill_3, 
			rating_1 : new_story.rating_1, 
			rating_2 : new_story.rating_2, 
			rating_3 : new_story.rating_3, 
			answer_1 : new_story.answer_1, 
			answer_2 : new_story.answer_2, 
			answer_3 : new_story.answer_3, 
			answer_4 : new_story.answer_4, 
			answer_5 : new_story.answer_5, 
			token: localStorage.getItem('token')
		}
	}
}

export function createStory(theState){
	
	return (dispatch) => {

		return fetch('/api/create_story', {
			method: 'POST', 
			headers: {
			    'Accept': 'application/json',
		    	'Content-Type': 'application/json'
		  	},
			body: JSON.stringify({
				personal_url : theState.personal_url, 
				github_url : theState.github_url, 
				linkedin_url : theState.linkedin_url, 
				twittwer_url : theState.twittwer_url, 
				facebook_url : theState.facebook_url, 
				name : theState.name, 
				title : theState.title, 
				tagline : theState.tagline, 
				skill_1 : theState.skill_1, 
				skill_2 : theState.skill_2, 
				skill_3 : theState.skill_3, 
				rating_1 : theState.rating_1, 
				rating_2 : theState.rating_2, 
				rating_3 : theState.rating_3, 
				answer_1 : theState.answer_1, 
				answer_2 : theState.answer_2, 
				answer_3 : theState.answer_3, 
				answer_4 : theState.answer_4, 
				answer_5 : theState.answer_5, 
				token: localStorage.getItem('token')
			})
		})
			.then(response => response.json())
			.then(json => {
				dispatch(createdstory(json))
			})
			.catch(error => {

			})

	}
}