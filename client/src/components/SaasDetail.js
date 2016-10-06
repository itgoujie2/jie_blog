import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../actions/index'

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

	render(){
		return(
			<div className='container'>
				{this.props.location.query.saas_id}
			</div>
		)
	}
}

const SaasDetail = connect(mapStateToProps, mapDispatchToProps)(DetailComponent)

module.exports = SaasDetail