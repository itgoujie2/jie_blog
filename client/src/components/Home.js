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
import * as actionCreators from '../actions/index'
import { Link } from 'react-router'

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
			.then(console.log(JSON.stringify(this.props.story)))
	}

	renderStory(){
		const chunk = 4
		const story_list = this.props.story.data
		const storyt = 0
		const end = story_list.length / 4 + 1
		const results = []

		for (let i = storyt; i < end; i++){
			const storyCards = story_list.slice(i*4, i*4 + chunk).map( (story, j) => {
				console.log('story detail in for loop: ' + JSON.stringify(story))
				return (
					
					<a href={`/story?story_id=${story.id}`} key={story.id} className='mdl-cell mdl-cell--3-col mdl-cell--2-col-tablet mdl-cell--2-col-phone mdl-card mdl-shadow--4dp'>
						<div className='mdl-card__title'>
							<h2 className='mdl-card__title-text'>{story.name}</h2>
						</div>
						<div className='mdl-card__supporting-text'>
							{story.tagline}
						</div>
						<div className='mdl-card__actions mdl-card-boarder'>
							<span className='mdl-button mdl-button-colored'>test</span>
							
						</div>
					</a>
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
				<div className='mdl-grid content-grid' key={i}>
					{storyCards}
				</div>
			)
		}
		
		return results
	}

	render(){
		return(
			
			<div >
				{!this.props.story.loaded || !this.props.story.data
					? <h1>loading...</h1>
					:
					<div >
						{this.renderStory()}
					</div>
				}
			</div>
			
		)
	}
}

const Home = connect(mapStateToProps, mapDispatchToProps)(Main)

module.exports = Home


