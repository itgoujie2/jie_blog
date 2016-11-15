import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../actions/auth'
import { bindActionCreators } from 'redux'
import { browserHistory } from 'react-router'
import StarRatingComponent from 'react-star-rating-component'

function mapStateToProps(state){
	return {
		auth: state.auth
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators(actionCreators, dispatch)
}

export default class RegisterForm extends React.Component{

	constructor(props){
		super(props)

		this.state = {
			rating_1: 0, 
			rating_2: 0, 
			rating_3: 0
		}
	}

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
		console.log('email: ' + this.state.email)
		console.log('password: ' + this.state.password)
		this.props.registerAccount(this.state.email, this.state.password)
			.then(() => {
				browserHistory.push('home')
			})
	}

	onStarClick(nextVal, preVal, name){
		const value = nextVal
		const next_state = {}
		next_state[name] = value
		this.setState(next_state)
	}

	render(){
		return(
			<div className="row">
				<div className="col-md-12">
					<form action="#" className="form" onKeyPress={(e) => this.handleKeyPress(e)}>
						<div className="card style-default-dark">
							<div className="card-head">
								<header>Profile</header>
							</div>
							<div className="card-body">

								<div className="row">
									<div className="col-md-5">
										<div className="form-group">
											<label htmlFor="Email" className="col-md-2 control-label">Email</label>
											<div className="col-md-3">
												<input className="form-control" onChange={(e) => this.changeValue(e, 'email')} id='Email'/>
												<div className="form-control-line"/>
											</div>
										</div>
									</div>
								</div>

								<div className="row">
									<div className="col-md-5">
										<div className="form-group">
											<label htmlFor="Password" className="col-md-2 control-label">Password</label>
											<div className="col-md-3">
												<input className="form-control" type="password" onChange={(e) => this.changeValue(e, 'password')} id='Password'/>
												<div className="form-control-line"/>
											</div>
										</div>
									</div>
								</div>

								<div className="row">
									<div className="col-md-5">
										<div className="form-group">
											<label htmlFor="Name" className="col-md-2 control-label">Name</label>
											<div className="col-md-3">
												<input className="form-control" pattern="[A-Z,a-z, ]*" type="text" onChange={(e) => this.changeValue(e, 'name')} id='Name'/>
												<div className="form-control-line"/>
											</div>
										</div>
									</div>
								</div>

								<div className="row">
									<div className="col-md-5">
										<div className="form-group">
											<label htmlFor="Title">Title... (ex. Full Stack Developer)</label>
											<div className="col-md-3">
												<input className="form-control" type="text" onChange={(e) => this.changeValue(e, 'title')} id='Title'/>
												<div className="form-control-line"/>
											</div>
										</div>
									</div>
								</div>								
								
		                        
		                        <div>
		                        	<i className="form-icons material-icons ion-ios-photos-outline"></i>
		                        	<i className="form-icons material-icons ion-social-github-outline"></i>
		                        	<i className="form-icons material-icons ion-social-twitter-outline"></i>
		                        	<i className="form-icons material-icons ion-social-facebook-outline"></i>
		                        	<i className="form-icons material-icons ion-social-linkedin-outline"></i>
		                        </div>
		                        <div className="row">
		                        	
		                        	<div className="col-md-5">
		                        		<div className="form-group">
		                        			<label htmlFor="Skill_1" className="col-md-2 control-label">Skill_1</label>
		                        			<div className="col-md-3">
		                        				<input className="form-control" type="text" onChange={(e) => this.changeValue(e, 'skill_1')} id='Skill_1'/>
		                        				<div className="form-control-line"/>
		                        			</div>
		                        		</div>
		                        	</div>
		                        	
			                        <div className="col-md-5">
			                        	<StarRatingComponent name='rating_1' starCount={5} value={this.state.rating_1} emptyStarColor={`#a1aab7`} onStarClick={this.onStarClick.bind(this)}/>
			                        </div>
		                        </div>

		                        <div className="row">
		                        	
		                        	<div className="col-md-5">
		                        		<div className="form-group">
		                        			<label htmlFor="Skill_1" className="col-md-2 control-label">Skill_2</label>
		                        			<div className="col-md-3">
		                        				<input className="form-control" type="text" onChange={(e) => this.changeValue(e, 'skill_2')} id='Skill_2'/>
		                        				<div className="form-control-line"/>
		                        			</div>
		                        		</div>
		                        	</div>
		                        	
			                        <div className="col-md-5">
			                        	<StarRatingComponent name='rating_2' starCount={5} value={this.state.rating_2} emptyStarColor={`#a1aab7`} onStarClick={this.onStarClick.bind(this)}/>
			                        </div>
		                        </div>

		                        <div className="row">
		                        	
		                        	<div className="col-md-5">
		                        		<div className="form-group">
		                        			<label htmlFor="Skill_3" className="col-md-2 control-label">Skill_3</label>
		                        			<div className="col-md-3">
		                        				<input className="form-control" type="text" onChange={(e) => this.changeValue(e, 'skill_3')} id='Skill_3'/>
		                        				<div className="form-control-line"/>
		                        			</div>
		                        		</div>
		                        	</div>
		                        	
			                        <div className="col-md-5">
			                        	<StarRatingComponent name='rating_3' starCount={5} value={this.state.rating_3} emptyStarColor={`#a1aab7`} onStarClick={this.onStarClick.bind(this)}/>
			                        </div>
		                        </div>
							</div>

							<button onClick={(e) => {this.register(e)}}>Register</button>
						</div>
					</form>
				</div>
			</div>


			
		)
	}

}

const Register = connect(mapStateToProps, mapDispatchToProps)(RegisterForm)

module.exports = Register