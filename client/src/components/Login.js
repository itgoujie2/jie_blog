import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../actions/auth'
import { bindActionCreators } from 'redux'

function mapStateToProps(state){
	return {
		auth: state.auth
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators(actionCreators, dispatch)
}

export default class LoginForm extends React.Component{

	changeValue(e, type){
		const value = e.target.value
		const next_state = {}
		next_state[type] = value
		this.setState(next_state, () => {

		})
	}

	handleKeyPress(e){
		if (e.key === 'Enter'){
			this.login(e)
		}
	}

	login(e){
		e.preventDefault()
		console.log('username: ' + this.state.username)
		console.log('password: ' + this.state.password)
		this.props.loginUser(this.state.username, this.state.password)
	}

	render(){
		return(
			<div onKeyPress={(e) => this.handleKeyPress(e)}>
				<form>
					<input onChange={(e) => {this.changeValue(e, 'username')}} placeholder="username"/>
					<input onChange={(e) => {this.changeValue(e, 'password')}} placeholder="password"/>
					<button onClick={(e) => {this.login(e)}}>login</button>
				</form>
			</div>
		)
	}

}

const Login = connect(mapStateToProps, mapDispatchToProps)(LoginForm)

module.exports = Login