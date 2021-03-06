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
import * as actionCreators from '../../actions/index'
import { Link } from 'react-router'
import './home.scss'

function mapStateToProps(state){
	return {
		story: state.story, 
		auth: state.auth
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators(actionCreators, dispatch)
}

export default class Main extends React.Component{

	// constructor(props){
	// 	super(props)
	// }

	componentDidMount(){
		this.fetchData()
	}

	fetchData(){
		this.props.getAllStory()
			.then(() => {
				//console.log('story props in HOME: ' + JSON.stringify(this.props.story))
				//console.log('auth props in HOME: ' + JSON.stringify(this.props.auth))
			})
	}

	renderStory(){
		const chunk = 4
		const story_list = this.props.story.data
		const storyt = 0
		const end = story_list.length / 4 + 1
		const results = []

		for (let i = storyt; i < end; i++){
			const storyCards = story_list.slice(i*4, i*4 + chunk).map( (story, j) => {
				// console.log('story detail in for loop: ' + JSON.stringify(story))
				return (
					
					<div className="coder-card" key={story.id}>
						<a href={`/story?story_id=${story.id}`} className="coder-card-holder">
							<div className='coder-card-head'>
								<header>
									<span>{story.name}</span>
								</header>
							</div>
							<div className='coder-card-body'>
								<span>{story.title}</span>
							</div>
						</a>
					</div>
					
				)
			})

			// TODO: placeholder cards

			// if (storyCards.length < chunk){
			// 	console.log('storyCards length: ' + storyCards.length)
			// 	console.log('chunk: ' + chunk)
			// 	for (let k=0; k < chunk - storyCards.length + 1; k++){
			// 		console.log('k: ' + k)
			// 		storyCards.push(<div className='col-sm-3' key={`placeholder-${k}`}>{k}</div>)
			// 	}
			// }

			results.push(
				<div className='row' key={i}>
					{storyCards}
				</div>
			)
		}
		
		return results
	}

	render(){
		return(
			
			<div>
				{!this.props.story.loaded || !this.props.story.data
					? <h1>loading...</h1>
					:
					<div>
						{this.renderStory()}
					</div>
				}
			</div>
			
		)
	}
}

const Home = connect(mapStateToProps, mapDispatchToProps)(Main)

module.exports = Home


