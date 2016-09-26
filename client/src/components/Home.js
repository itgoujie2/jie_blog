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
import * as actionCreators from '../actions/saas'

function mapStateToProps(state){
	return {
		saas: state.saas
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
		this.props.getAllSaas()
			.then(console.log(JSON.stringify(this.props.saas)))
	}

	render(){
		return(
			<div>
			<div>
				{!this.props.saas.loaded || !this.props.saas.data
					? <h1>loading...</h1>
					:
					<div>
						{this.props.saas.data.map(saas => {
							return(
								<div key={saas.id}>
									<h2>{saas.title}</h2>
									<p>{saas.body}</p>
								</div>
							)
						})}
					</div>
				}
			</div>
			<div>
				<a href="createSaas">create saas</a>
			</div>
			</div>
		)
	}
}

const Home = connect(mapStateToProps, mapDispatchToProps)(Main)

module.exports = Home


