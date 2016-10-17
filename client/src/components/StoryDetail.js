import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../actions/index'
import Disqus from './Disqus'

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

			})
	}

	handleNewComment(comment){
		console.log('new comment: ' + comment.text)
	}

	render(){
		return(
			<div className='container'>
				{this.props.location.query.story_id}
				<Disqus 
				shortname='asaastion' 
				identifier={this.props.location.query.story_id} 
				title={this.props.story.name}
				category_id='category_1'
				onNewComment={this.handleNewComment}/>
			</div>
		)
	}
}

const StoryDetail = connect(mapStateToProps, mapDispatchToProps)(DetailComponent)

module.exports = StoryDetail