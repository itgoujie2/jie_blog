import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../actions/posts'

function mapStateToProps(state){
	return {
		posts: state.posts
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators(actionCreators, dispatch)
}

// @connect(mapStateToProps, mapDispatchToProps)
// export default class Index extends React.Component{

// 	constructor(props){
// 		super(props)
// 	}

// 	componentDidMount(){
// 		this.props.getAllPosts()
// 	}

// 	render(){
// 		return(
// 			<div>
// 				{this.props.posts}
// 			</div>
// 		)
// 	}
// }

class Index extends React.Component{
	// constructor(props){
	// 	super(props)
	// }, 

	componentDidMount(){
		this.props.getAllPosts()
	}

	render(){
		return(
			<div>
				yo
				{this.props.posts}
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)

// export default const Index = connect(mapStateToProps, mapDispatchToProps)(React.Component{
// 	constructor(props){
// 		super(props)
// 	}

// 	componentDidMount(){
// 		this.props.getAllPosts()
// 	}

// 	render(){
// 		return(
// 			<div>
// 				{this.props.posts}
// 			</div>
// 		)
// 	}	
// })

