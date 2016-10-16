import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../actions/index'
import { Layout, Header, HeaderRow, Navigation } from 'react-mdl/lib'

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
			<header className='mdl-layout__header'>
				<div className='mdl-layout__header-row'>
					<span className='mdl-layout__title'><a href='home'>coder_star</a></span>
					<div className='mdl-layout-spacer'></div>
					<nav className='mdl-navigation mdl-typography--body-1-force-preferred-font'>
						<a className='mdl-navigation__link' href='createStar'>create</a>
						{
							localStorage.getItem('token') ? 
							<a className='mdl-navigation__link' href='#' onClick={ (e) => {this.logout(e)} }>logout</a> : 
							<a className='mdl-navigation__link' href='login'>login</a>
						}
					</nav>
				</div>
			</header>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NavContainer)


