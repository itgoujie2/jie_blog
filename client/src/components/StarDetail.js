import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../actions/index'
import Disqus from './Disqus'

function mapStateToProps(state){
	return{
		star: state.star
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators(actionCreators, dispatch)
}

export default class DetailComponent extends React.Component{

	componentDidMount(){
		this.props.getStarDetail(this.props.location.query.star_id)
			.then(() => {

			})
	}

	handleNewComment(comment){
		console.log('new comment: ' + comment.text)
	}

	render(){
		return(
			<div className='container'>
				{this.props.location.query.star_id}
				<Disqus 
				shortname='asaastion' 
				identifier={this.props.location.query.star_id} 
				title={this.props.star.name}
				category_id='category_1'
				onNewComment={this.handleNewComment}/>
			</div>
		)
	}
}

const StarDetail = connect(mapStateToProps, mapDispatchToProps)(DetailComponent)

module.exports = StarDetail