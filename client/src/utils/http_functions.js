import axios from 'axios'

export function get_all_posts(){
	return axios.get('api/posts')	
}

export function create_saas(title, body){
	return axios.post('api/create_saas', {
		title: title, 
		body: body
	})
}