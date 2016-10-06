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
		saas: state.saas, 
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
		this.props.getAllSaas()
			.then(console.log(JSON.stringify(this.props.saas)))
	}

	renderSaas(){
		const chunk = 4
		const saas_list = this.props.saas.data
		const start = 0
		const end = saas_list.length / 4 + 1
		const results = []

		for (let i = start; i < end; i++){
			const saasCards = saas_list.slice(i*4, i*4 + chunk).map( (saas, j) => {
				return (
					<Link className='card col-sm-3' key={saas.id} to={`/saas/${saas.id}`}>
						<img className='card-img-top'/>
						<div className='card-block'>
							<h4 className='card-title'>{saas.title}</h4>
							<p className='card-text'>{saas.body}</p>
						</div>
						<div className='card-block'>
							<span>{saas.author_id}</span>
							<span className='pull-xs-right'>{saas.votes}</span>
						</div>
					</Link>
				)
			})

			// TODO: placeholder cards

			// if (saasCards.length < chunk){
			// 	console.log('saasCards length: ' + saasCards.length)
			// 	console.log('chunk: ' + chunk)
			// 	for (let k=0; k < chunk - saasCards.length + 1; k++){
			// 		console.log('k: ' + k)
			// 		saasCards.push(<div className='col-sm-3' key={`placeholder-${k}`}>{k}</div>)
			// 	}
			// }

			results.push(
				<div className='row' key={i}>
					{saasCards}
				</div>
			)
		}
		
		return results
	}

	render(){
		return(
			<div className='container-fluid'>
				<div >
					{!this.props.saas.loaded || !this.props.saas.data
						? <h1>loading...</h1>
						:
						<div >
							{this.renderSaas()}
						</div>
					}
				</div>
			</div>
		)
	}
}

const Home = connect(mapStateToProps, mapDispatchToProps)(Main)

module.exports = Home


