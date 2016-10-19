import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../actions/story'
import { routeActions } from 'react-router-redux'
import { browserHistory } from 'react-router'
import StarRatingComponent from 'react-star-rating-component'

function mapStateToProps(state){
	return{
		story: state.story
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators(actionCreators, dispatch)
}

export default class StoryForm extends React.Component{

	constructor(props){
		super(props)

		this.state = {
			rating_1: 0, 
			rating_2: 0, 
			rating_3: 0
		}
	}

	componentDidMount(){
		componentHandler.upgradeDom()
	}

	handleKeyPress(e){
		if (e.key === 'Enter'){
			if (!this.state.disabled){
				this.createStory(e)
			}
		}
	}

	changeValue(e, type){
		const value = e.target.value
		const next_state = {}
		next_state[type] = value
		this.setState(next_state)
	}

	createStory(e){
		e.preventDefault()
		console.log('author in create saas page: ' + localStorage.getItem('account_id'))

		this.props.createStory(this.state)
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
				<div className="col-md-4 col-md-offset-4">
					<form action='#' className='form ' onKeyPress={(e) => this.handleKeyPress(e)}>
						<div className="card style-default-dark">
							<div className="card-head">
								<header>Create Your Coder Story</header>
							</div>
							<div className="card-body form-inverse">
								<div className="form-group">
		                            <input className="form-control" pattern="[A-Z,a-z, ]*" type="text" onChange={(e) => this.changeValue(e, 'name')} id='Name'/>
		                            <label htmlFor="Name">Name...</label>
		                            
		                        </div>
		                        <div className="form-group">
		                            <input className="form-control" type="text" onChange={(e) => this.changeValue(e, 'title')} id='Title'/>
		                            <label htmlFor="Title">Title... (ex. Full Stack Developer)</label>
		                        </div>
		                        <div>
		                        	<i className="form-icons material-icons ion-ios-photos-outline"></i>
		                        	<i className="form-icons material-icons ion-social-github-outline"></i>
		                        	<i className="form-icons material-icons ion-social-twitter-outline"></i>
		                        	<i className="form-icons material-icons ion-social-facebook-outline"></i>
		                        	<i className="form-icons material-icons ion-social-linkedin-outline"></i>
		                        </div>
		                        <div className="row">
		                        	<div className="col-sm-6">
		                        		<div className="form-group">
				                        	<input className="form-control" type="text" onChange={(e) => this.changeValue(e, 'skill_1')} id='Skill_1'/>
				                        	<label htmlFor="Skill_1">Skill 1...</label>
				                        </div>
		                        	</div>
			                        <div className="col-sm-6" style={{"verticalAlign": "middle"}}>
			                        	<StarRatingComponent name='rating_1' starCount={5} value={this.state.rating_1} emptyStarColor={`#a1aab7`} onStarClick={this.onStarClick.bind(this)}/>
			                        </div>
		                        </div>
		                        
		                        
		                        <div className="form-group">
		                        	<input className="form-control" type="text" onChange={(e) => this.changeValue(e, 'skill_2')} id='Skill_2'/>
		                        	<label htmlFor="Skill_2">Skill 2...</label>
		                        </div>
		                        <div>
		                        	<StarRatingComponent name='rating_2' starCount={5} value={this.state.rating_2} emptyStarColor={`#a1aab7`} onStarClick={this.onStarClick.bind(this)}/>
		                        </div>
		                        <div className="form-group">
		                        	<input className="form-control" type="text" onChange={(e) => this.changeValue(e, 'skill_3')} id='Skill_3'/>
		                        	<label htmlFor="Skill_3">Skill 3...</label>
		                        </div>
		                        <div>
		                        	<StarRatingComponent name='rating_3' starCount={5} value={this.state.rating_3} emptyStarColor={`#a1aab7`} onStarClick={this.onStarClick.bind(this)}/>
		                        </div>
		                        <p>
		                        	<button type="submit" onClick={(e) => this.createStory(e)} className="btn style-primary-dark">Create</button>
		                        </p>
							</div>
						</div>
						
					</form>	
				</div>
			</div>
		)
	}
}

const CreateStory = connect(mapStateToProps, mapDispatchToProps)(StoryForm)

module.exports = CreateStory