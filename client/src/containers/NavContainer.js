import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../actions/index'
import './container.scss'

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
			<header className='nav-header'>
				<div className="nav-header-left">
					<a href="home"><h3>coder_stories</h3></a>
				</div>
				<div className="nav-header-right">
						<ul className="nav-header-links">
							<li>
								
								<a href="createStory"><span>create</span></a>
								
							</li>
							<li>
								{
									localStorage.getItem('token') ? 
									<a href='#' onClick={ (e) => {this.logout(e)} }><span>logout</span></a> : 
									<a href='login'><span>login</span></a>
								}
							</li>
						</ul>
					</div>
			</header>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NavContainer)


