import React from 'react'
import { connect } from 'react-redux'
import { validate_token } from '../utils/http_functions'
import * as actionCreators from '../actions/auth'
import { bindActionCreators } from 'redux'
import { browserHistory } from 'react-router'

function mapStateToProps(state){
	return{
		token: state.auth.token, 
		isAuthenticated: state.auth.isAuthenticated
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators(actionCreators, dispatch)
}

export function requireAuth(Component){

	class AuthenticatedComponent extends React.Component{

		componentWillMount(){
			this.checkAuth()
		}

		componentWillReceiveNextProps(nextProps){
			this.checkAuth(nextProps)
		}

		// checkAuth(props = this.props){
		// 	if (!props.isAuthenticated){
		// 		let token = localStorage.getItem('token')
		// 		if (!token){
		// 			browserHistory.push('/login')
		// 		}
		// 		else{
		// 			return fetch('api/is_token_valid', {
		// 				method: 'POST', 
		// 				headers: {
		// 					'Accept': 'applicatoin/json', 
		// 					'Content-Type': 'applicatoin/json'
		// 				}, 
		// 				body: JSON.stringify({token: token})
		// 			})
		// 				.then(response => response.json())
		// 				.then(res => {
		// 					if (res.status === 200){
		// 						// this.props.loginUserSuccess(token)
		// 						this.setState({
		// 							token_still_valid: true
		// 						})
		// 					}
		// 				})
		// 		}
		// 	}
		// 	else {
		// 		this.setState({
		// 			token_still_valid: true
		// 		})
		// 	}
		// }
		checkAuth(props = this.props) {
            if (!props.isAuthenticated) {
                let token = localStorage.getItem('token')
                if (!token) {
                    browserHistory.push('/login')

                } else {
                    return fetch('api/is_token_valid', {
                        method: 'post',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({token: token})
                    })
                        .then(res => {
                            if (res.status === 200) {
                            	this.props.loginAccountSuccess(token)
								//console.log(JSON.stringify(this.props))
                            } else {
                                browserHistory.push('/home')

                            }
                        })

                }
            }
        }

		render(){
			return (
				<div>
					{this.props.isAuthenticated 
						? <Component {...this.props}/>
						: null
					}	
				</div>
			)
		}
	}

	return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent)
}