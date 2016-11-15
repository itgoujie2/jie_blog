import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../actions/story'
import { routeActions } from 'react-router-redux'
import { browserHistory } from 'react-router'

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
		this.props.getAllQuestions()
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

	render(){
		return(
			<div>
				{!this.props.story.data
					? <h1>loading...</h1>
					:
					<div className="row">
						<div className="col-md-12">
							<form action='#' className='form ' onKeyPress={(e) => this.handleKeyPress(e)}>
								<div className="card style-default-dark">
									<div className="card-head">
										<header>Create Your Coder Story</header>
									</div>
									<div className="card-body form-inverse">
										
				                        {this.props.story.data}
				                        
				                       
				                        <p>
				                        	<button type="submit" onClick={(e) => this.createStory(e)} className="btn style-primary-dark">Create</button>
				                        </p>
									</div>
								</div>
								
							</form>	
						</div>
					</div>
				}
			</div>
			
		)
	}
}

const CreateStory = connect(mapStateToProps, mapDispatchToProps)(StoryForm)

module.exports = CreateStory