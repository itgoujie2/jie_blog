import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../actions/index'
import Disqus from './Disqus'

function mapStateToProps(state){
	return{
		saas: state.saas
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators(actionCreators, dispatch)
}

export default class DetailComponent extends React.Component{

	componentDidMount(){
		console.log('route params: ' + this.props.location.query.saas_id)
		this.props.getSaasDetail(this.props.location.query.saas_id)
			.then(() => {

			})
	}

	handleNewComment(comment){
		console.log('new comment: ' + comment.text)
	}

	render(){
		return(
			<div className='container'>
				{this.props.location.query.saas_id}
				<Disqus 
				shortname='asaastion' 
				identifier={this.props.location.query.saas_id} 
				title={this.props.saas.title}
				category_id='category_1'
				onNewComment={this.handleNewComment}/>
			</div>
		)
	}
}

const SaasDetail = connect(mapStateToProps, mapDispatchToProps)(DetailComponent)

module.exports = SaasDetail