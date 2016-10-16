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
		star: state.star, 
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
		this.props.getAllStar()
			.then(console.log(JSON.stringify(this.props.star)))
	}

	renderStar(){
		const chunk = 4
		const star_list = this.props.star.data
		const start = 0
		const end = star_list.length / 4 + 1
		const results = []

		for (let i = start; i < end; i++){
			const starCards = star_list.slice(i*4, i*4 + chunk).map( (star, j) => {
				console.log('star detail in for loop: ' + JSON.stringify(star))
				return (
					
					<a href={`/star?star_id=${star.id}`} key={star.id} className='mdl-cell mdl-cell--3-col mdl-cell--2-col-tablet mdl-cell--2-col-phone mdl-card mdl-shadow--4dp'>
						<div className='mdl-card__title'>
							<h2 className='mdl-card__title-text'>{star.name}</h2>
						</div>
						<div className='mdl-card__supporting-text'>
							{star.tagline}
						</div>
						<div className='mdl-card__actions mdl-card-boarder'>
							<span className='mdl-button mdl-button-colored'>test</span>
							
						</div>
					</a>
				)
			})

			// TODO: placeholder cards

			// if (starCards.length < chunk){
			// 	console.log('starCards length: ' + starCards.length)
			// 	console.log('chunk: ' + chunk)
			// 	for (let k=0; k < chunk - starCards.length + 1; k++){
			// 		console.log('k: ' + k)
			// 		starCards.push(<div className='col-sm-3' key={`placeholder-${k}`}>{k}</div>)
			// 	}
			// }

			results.push(
				<div className='mdl-grid content-grid' key={i}>
					{starCards}
				</div>
			)
		}
		
		return results
	}

	render(){
		return(
			
			<div >
				{!this.props.star.loaded || !this.props.star.data
					? <h1>loading...</h1>
					:
					<div >
						{this.renderStar()}
					</div>
				}
			</div>
			
		)
	}
}

const Home = connect(mapStateToProps, mapDispatchToProps)(Main)

module.exports = Home


