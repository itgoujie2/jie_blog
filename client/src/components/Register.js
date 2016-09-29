import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../actions/auth'
import { bindActionCreators } from 'redux'
import { browserHistory } from 'react-router'

function mapStateToProps(state){
	return {
		auth: state.auth
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators(actionCreators, dispatch)
}

export default class RegisterForm extends React.Component{

	changeValue(e, type){
		const value = e.target.value
		const next_state = {}
		next_state[type] = value
		this.setState(next_state, () => {

		})
	}

	handleKeyPress(e){
		if (e.key === 'Enter'){
			this.register(e)
		}
	}

	register(e){
		e.preventDefault()
		console.log('username: ' + this.state.username)
		console.log('password: ' + this.state.password)
		this.props.registerAccount(this.state.username, this.state.password)
			.then(() => {
				browserHistory.push('home')
			})
	}

	render(){
		return(
			<div onKeyPress={(e) => this.handleKeyPress(e)}>
				<form>
					<input onChange={(e) => {this.changeValue(e, 'username')}} placeholder="username"/>
					<input onChange={(e) => {this.changeValue(e, 'password')}} placeholder="password"/>
					<button onClick={(e) => {this.register(e)}}>create</button>
				</form>
			</div>
		)
	}

}

const Register = connect(mapStateToProps, mapDispatchToProps)(RegisterForm)

module.exports = Register