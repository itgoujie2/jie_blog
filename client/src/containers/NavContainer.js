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
			<header id="header">
				<div className="headerbar">
					<div className="headerbar-left">
						<ul className="header-nav header-nav-options">
							<li className="header-nav-brand">
								<div className="brand-holder">
									<a href="home"><span>coder_stories</span></a>
								</div>
							</li>
						</ul>
					</div>

					<div className="headerbar-right">
						<ul className="header-nav header-nav-options">
							<li className="">
								
								<a href="createStory"><span>create</span></a>
								
							</li>
						</ul>
						<ul className="header-nav header-nav-profile">
							<li >
								{
									localStorage.getItem('token') ? 
									<a href='#' onClick={ (e) => {this.logout(e)} }><span>logout</span></a> : 
									<a href='login'><span>login</span></a>
								}
							</li>
						</ul>
					</div>
				</div>
			</header>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NavContainer)


