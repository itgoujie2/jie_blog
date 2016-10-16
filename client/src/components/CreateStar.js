import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../actions/star'
import { routeActions } from 'react-router-redux'
import { browserHistory } from 'react-router'

function mapStateToProps(state){
	return{
		star: state.star
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators(actionCreators, dispatch)
}

export default class StarForm extends React.Component{

	constructor(props){
		super(props)
	}

	componentDidMount(){
	}

	handleKeyPress(e){
		if (e.key === 'Enter'){
			if (!this.state.disabled){
				this.createStar(e)
			}
		}
	}

	changeValue(e, type){
		const value = e.target.value
		const next_state = {}
		next_state[type] = value
		this.setState(next_state)
	}

	createStar(e){
		e.preventDefault()
		console.log('author in create saas page: ' + localStorage.getItem('account_id'))

		this.props.createStar(this.state.name, this.state.title)
			.then(() => {
				browserHistory.push('home')
			})		
					
	}

	render(){
		return(
			<div className="mdl-grid" onKeyPress={(e) => this.handleKeyPress(e)}>
				{
					<form className=''>
						<div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <input className="mdl-textfield__input" pattern="[A-Z,a-z, ]*" type="text" placeholder="name" onChange={(e) => this.changeValue(e, 'name')}/>
                            
                        </div>
                        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <input className="mdl-textfield__input" type="text" placeholder="title" onChange={(e) => this.changeValue(e, 'title')}/>
                            
                        </div>
						<button type="submit" onClick={(e) => this.createStar(e)} className="btn btn-primary">Create Star</button>
					</form>	
				}
			</div>
		)
	}
}

const CreateStar = connect(mapStateToProps, mapDispatchToProps)(StarForm)

module.exports = CreateStar