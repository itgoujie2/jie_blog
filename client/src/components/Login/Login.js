import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../../actions/auth'
import { bindActionCreators } from 'redux'
import { browserHistory } from 'react-router'
import './login.scss'

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
				//console.log('props after login: ' + JSON.stringify(this.props))
				browserHistory.push('home')
			})
	}

	render(){
		return(
			<div className="login_form_box">
				<form action="#" className="login_form" onKeyPress={(e) => this.handleKeyPress(e)}>
					<div className="login_form_row">
						<label htmlFor="login_form_email" className="login_form_label">Email:</label>
						<input type="text" className="login_form_input" id="login_form_email" onChange={(e) => this.changeValue(e, 'email')}/>
					</div>
					<div className="login_form_row">
						<label htmlFor="login_form_password" className="login_form_label">Password:</label>
						<input type="password" className="login_form_input" id="login_form_password" onChange={(e) => this.changeValue(e, 'password')}/>
					</div>
					<div className="login_form_row">
						<a className="login_form_login_button" href="#" onClick={(e) => {this.login(e)}}>login</a>
						<a className="login_fomr_register_button" href='register'>register</a>
					</div>
				</form>
			</div>
		)
	}

}

const Login = connect(mapStateToProps, mapDispatchToProps)(LoginForm)

module.exports = Login