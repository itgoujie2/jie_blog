import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../../actions/story'
import { routeActions } from 'react-router-redux'
import { browserHistory } from 'react-router'
import './story-form.scss'

function mapStateToProps(state){
	return{
		story: state.story
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators(actionCreators, dispatch)
}

export default class StoryForm extends React.Component{

	// constructor(props){
	// 	super(props)

	// 	this.state = {
	// 		rating_1: 0, 
	// 		rating_2: 0, 
	// 		rating_3: 0
	// 	}
	// }

	componentDidMount(){
		this.fetchQuestion()
	}

	fetchQuestion(){
		this.props.getAllQuestions()
			.then(() => {
				console.log(JSON.stringify(this.props.story))
			})
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

	renderStoryForm(){
		const results = []
		const question_bundle = this.props.story.data.map( (q, index) => {
			return (
				<div className="coder-question-answer" key={q.id}>
					<div className="coder-question" >
						<p>{q.content}</p>
					</div>
					<div className="coder-answer">
						<textarea className="coder-answer-textarea" />
					</div>
				</div>
			)
		})


		return (
			<div className="col-md-12">
				<form action='#' className='form ' onKeyPress={(e) => this.handleKeyPress(e)}>
					<div className="coder-story-form">
						<div className="card-head">
							<header>Create Your Coder Story</header>
						</div>
						<div className="">
							
	                        {question_bundle}
	                       
	                        <p>
	                        	<button type="submit" onClick={(e) => this.createStory(e)} className="btn style-primary-dark">Create</button>
	                        </p>
						</div>
					</div>
					
				</form>	
			</div>
		)
	}

	render(){
		return(
			<div>
				{!this.props.story.data
					? <h1>loading...</h1>
					:
					<div>
						{this.renderStoryForm()}
					</div>
				}
			</div>
			
		)
	}
}

const CreateStory = connect(mapStateToProps, mapDispatchToProps)(StoryForm)

module.exports = CreateStory