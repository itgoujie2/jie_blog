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
			<div className="row">
				<div className="col-md-6 col-md-offset-3">
					
					<div className="card style-default-dark">
						<div className="card-head">
							<span>Login</span>
						</div>
						<div className="card-body">
							<form action="#" className="form" onKeyPress={(e) => this.handleKeyPress(e)}>
								<div className="form-group">
									<div className="row">
										<div className="col-md-2">
											<label htmlFor="Email">Email</label>
										</div>
										<div className="col-md-6">
											<input className="form-control" onChange={(e) => {this.changeValue(e, 'email')}} id="Email"/>
										</div>
									</div>
								</div>
								<div className="form-group">
									<div className="row">
										<div className="col-md-2">
											<label htmlFor="Password">Password</label>
										</div>
										<div className="col-md-6">
											<input className="form-control" onChange={(e) => {this.changeValue(e, 'password')}} id="Password"/>	
										</div>
									</div>
								</div>
							
								<a className="btn btn-flat style-default-dark" style={{'float': 'left'}} href="#" onClick={(e) => {this.login(e)}}>login</a>
								<a className="btn btn-flat style-default-dark" style={{'float': 'right'}} href='register'>register</a>
							</form>
						</div>
					</div>
					
				</div>
			</div>
		)
	}

}

const Login = connect(mapStateToProps, mapDispatchToProps)(LoginForm)

module.exports = Login