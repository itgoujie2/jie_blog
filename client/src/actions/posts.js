import fetch from 'isomorphic-fetch'

export { get_all_posts } from '../utils/http_functions'

export function fetchAllPosts(){
	return{
		type: 'FETCH_ALL_POSTS'
	}
}

export function receivedAllPosts(posts){
	return{
		type: 'RECEIVED_ALL_POSTS', 
		post_list: posts
	}
}

export function getAllPosts(){
	return (dispatch) => {
		dispatch(fetchAllPosts())
		return fetch('/api/posts')
			.then(response => response.json())
			.then(json => {
				dispatch(receivedAllPosts(json.data))
			})
			.catch(error => {
				
			})
	}
}