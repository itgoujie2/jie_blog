export { get_all_posts } from '../utils/http_functions'

export function getAllPosts(){
	return (dispatch) => {
		get_all_posts()
			.then(function(result){
				return result
			})
			.then(response => {
				console.log('res: ' + response)
				//dispatch(recieveAllPosts(response))
			})
			.catch(error => {
				console.error('err: ' + error)
			})
	}
}