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

	componentDidMount(){
		this.getCategories()
	}

	getCategories(){
		this.props.getCategories()
			.then(() => {
				console.log(JSON.stringify(this.props.saas.category_list))
			})
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

	toggleDropdown(selection, type){
		console.log('clicked!!')
		const value = selection
		console.log('check dropdown: ' + JSON.stringify(value))
		const next_state = {}
		next_state[type] = value
		this.setState(next_state)
	}

	createSaas(e){
		e.preventDefault()
		console.log('author in create saas page: ' + localStorage.getItem('account_id'))

		this.props.createSaas(this.state.title, this.state.body, this.state.url, this.state.category)
			.then(() => {
				browserHistory.push('home')
			})		
					
	}

	renderCategories(){

		console.log('check props in render category: ' + JSON.stringify(this.props))
		console.log('check category_list: ' + JSON.stringify(this.props.saas.category_list))
		const categories = this.props.saas.category_list
		
		const category_items = categories.map( (category, index) => {
			return (
				<li key={category.id} onClick={(e) => this.toggleDropdown(category.id, 'category')}>{category.name}</li>
			)
		})

		return category_items
	}

	render(){
		return(
			<div className="col-md-6 col-md-offset-3" onKeyPress={(e) => this.handleKeyPress(e)}>
				{
					!this.props.saas.category_list
					? <span>loading...</span>
					:
					<form role="form">
						<div className="form-group row">
							<input className="form-control" type="text" name="title" onChange={(e) => this.changeValue(e, 'title')} placeholder="title"/>
						</div>
						<div className="form-group row">
							<input className="form-control" type="text" name="body" onChange={(e) => this.changeValue(e, 'body')} placeholder="body"/>
						</div>	
						<div className="form-group row">
							<input className="form-control" type="text" name="url" onChange={(e) => this.changeValue(e, 'url')} placeholder="url"/>
						</div>
						<div className="form-group row dropdown">
							<button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Dropdown Example
  <span className="caret"></span></button>
							<ul className="dropdown-menu">
								{this.renderCategories()}
							</ul>
						</div>
						<div className="form-group row">
							<input className="form-control" type="text" name="category" onChange={(e) => this.changeValue(e, 'category')} placeholder="category"/>
						</div>
						<button type="submit" onClick={(e) => this.createSaas(e)} className="btn btn-primary">Create Saas</button>
					</form>	
				}
			</div>
		)
	}
}

const CreateSaas = connect(mapStateToProps, mapDispatchToProps)(SaasForm)

module.exports = CreateSaas