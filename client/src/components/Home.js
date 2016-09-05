// var React = require('react');

// var Home = React.createClass({

//   render: function() {
//     return (
//       <div>
//         Home
//       </div>
//     );
//   }

// });

// module.exports = Home;

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

export default class Main extends React.Component{

	constructor(props){
		super(props)
	}

	componentDidMount(){
		this.fetchData()
	}

	fetchData(){
		this.props.getAllPosts().then(() => {
			console.log('props: ' + JSON.stringify(this.props))
			this.props.posts.data.map( post => {
				console.log(post.content)
			})
		})
	}

	render(){
		return(
			<div>
				{!this.props.posts.loaded
					? <h1>loading...</h1>
					:
					<div>
						{this.props.posts.data.map(post => {
							return(
								<div key={post.id}>
									<h2>{post.title}</h2>
									<p>{post.content}</p>
								</div>
							)
						})}
					</div>
				}
			</div>
		)
	}
}

const Home = connect(mapStateToProps, mapDispatchToProps)(Main)

module.exports = Home


