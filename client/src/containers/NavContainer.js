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
			<header className='nav-header'>
				<div className="nav-header-left">
					<h3><a href="home">coder_stories</a></h3>
				</div>
				<div className="nav-header-right">
						<ul className="nav-header-links">
							<li>
								
								<span><a href="createStory">create</a></span>
								
							</li>
							<li>
								{
									localStorage.getItem('token') ? 
									<span><a href='#' onClick={ (e) => {this.logout(e)} }>logout</a></span> : 
									<span><a href='login'>login</a></span>
								}
							</li>
						</ul>
					</div>
			</header>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NavContainer)


