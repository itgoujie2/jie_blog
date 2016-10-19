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
		console.log('email: ' + this.state.email)
		console.log('password: ' + this.state.password)
		this.props.loginAccount(this.state.email, this.state.password)
			.then(() => {
				browserHistory.push('home')
			})
	}

	render(){
		return(
			<div className="card card-outlined style-default-light" onKeyPress={(e) => this.handleKeyPress(e)}>
				<form className="form story-form">
					<div className="form-group">
						<input className="form-control" onChange={(e) => {this.changeValue(e, 'email')}} id="Email"/>
						<label htmlFor="Email">Email...</label>
					</div>
					<div className="form-group">
						<input className="form-control" onChange={(e) => {this.changeValue(e, 'password')}} id="Password"/>	
						<label htmlFor="Password">Password...</label>
					</div>
					<p>
						<a className="btn style-primary" href="#" onClick={(e) => {this.login(e)}}>login</a>
						<a className="btn style-primary pull-right" href='register'>register</a>
					</p>
					
				</form>
			</div>
		)
	}

}

const Login = connect(mapStateToProps, mapDispatchToProps)(LoginForm)

module.exports = Login