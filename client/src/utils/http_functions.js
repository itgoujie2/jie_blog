import axios from 'axios'

export function get_all_posts(){
	return axios.get('api/posts')	
}