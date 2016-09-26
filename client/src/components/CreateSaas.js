import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../actions/saas'
import { routeActions } from 'react-router-redux'
import { browserHistory } from 'react-router'

function mapStateToProps(state){
	return{
		saas: state.saas
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators(actionCreators, dispatch)
}

export default class SaasForm extends React.Component{

	constructor(props){
		super(props)
	}

	handleKeyPress(e){
		if (e.key === 'Enter'){
			if (!this.state.disabled){
				this.createSaas(e)
			}
		}
	}

	changeValue(e, type){
		const value = e.target.value
		const next_state = {}
		next_state[type] = value
		this.setState(next_state)
	}

	createSaas(e){
		e.preventDefault()
		this.props.createSaas(this.state.title, this.state.body)
			.then(() => {
				browserHistory.push('home')
			})
	}

	render(){
		return(
			<div className="col-md-6 col-md-offset-3" onKeyPress={(e) => this.handleKeyPress(e)}>
				<form role="form">
					<div className="form-group row">
						<input className="form-control" type="text" name="title" onChange={(e) => this.changeValue(e, 'title')}/>
					</div>
					<div className="form-group row">
						<input className="form-control" type="text" name="body" onChange={(e) => this.changeValue(e, 'body')}/>
					</div>	
					<button type="submit" onClick={(e) => this.createSaas(e)} className="btn btn-primary">Create Saas</button>
				</form>
			</div>
		)
	}
}

const CreateSaas = connect(mapStateToProps, mapDispatchToProps)(SaasForm)

module.exports = CreateSaas