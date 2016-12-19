import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../../actions/index'
// import renderHTML from 'react-render-html'
import Disqus from '../Disqus'

function mapStateToProps(state){
	return{
		story: state.story
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators(actionCreators, dispatch)
}

export default class DetailComponent extends React.Component{

	componentDidMount(){
		this.props.getStoryDetail(this.props.location.query.story_id)
			.then(() => {
				console.log('story detail in detail component: ' + JSON.stringify(this.props.story))
			})
	}

	handleNewComment(comment){
		console.log('new comment: ' + comment.text)
	}

	loadStoryDetail(){
		const questions_and_answers = this.props.story.data.question_answer_bundle.map((bundle, index) => {
			return (	
				<div className="question-answers" key={bundle.question.id}>
					<p>{bundle.question.content}</p>
					<p dangerouslySetInnerHTML = {{__html: bundle.answer.content}}></p>
				</div>
			)
		})

		return(
			<div>
				<p>{this.props.story.data.name}</p>
				<p>{this.props.story.data.title}</p>
				<p>{this.props.story.data.skill_1}</p>
				<p>{this.props.story.data.rating_1}</p>
				<p>{this.props.story.data.skill_2}</p>
				<p>{this.props.story.data.rating_2}</p>
				<p>{this.props.story.data.skill_3}</p>
				<p>{this.props.story.data.rating_3}</p>
				<p>{this.props.story.data.personal_url}</p>
				<p>{this.props.story.data.github_url}</p>
				<p>{this.props.story.data.linkedin_url}</p>
				<p>{this.props.story.data.twitter_url}</p>
				<p>{this.props.story.data.facebook_url}</p>
				{questions_and_answers}
				<Disqus 
				shortname='asaastion' 
				identifier={this.props.location.query.story_id} 
				title={this.props.story.name}
				category_id='category_1'
				onNewComment={this.handleNewComment}/>
			</div>
		)
	}

	render(){
		return(
			<div className='container'>
				{!this.props.story.data
					? <h1>loading...</h1>
					:
					<div>
						{this.loadStoryDetail()}
					</div>
				}
			</div>
		)
	}
}

const StoryDetail = connect(mapStateToProps, mapDispatchToProps)(DetailComponent)

module.exports = StoryDetail