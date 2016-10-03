import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../actions/index'

function mapStateToProps(state){
	return{
		auth: state.auth
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators(actionCreators, dispatch)
}

class NavContainer extends React.Component{

	componentDidMount(){
		
	}

	logout(e){
		e.preventDefault()
		this.props.logoutAccount(() => {
			console.log('logged out')
		})
	}

	render(){
		return (
			<nav className='navbar navbar-light bg-faded'>
				<a className='navbar-brand' href='home'>a<span className='red-text'>saas</span>tion</a>
				<ul className='nav navbar-nav'>
					<li className='nav-item'>
						<a className='nav-link' href='createSaas'>create</a>
					</li>
					<li className='nav-item pull-xs-right'>
						{
							localStorage.getItem('token') ? 
							<a className='nav-link' href='#' onClick={ (e) => {this.logout(e)} }>logout</a> : 
							<a className='nav-link' href='login'>login</a>
						}
					</li>
				</ul>
			</nav>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NavContainer)


