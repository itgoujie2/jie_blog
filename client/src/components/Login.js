import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../actions/auth'
import { bindActionCreators } from 'redux'

function mapStateToProps(state){
	return {
		auth: state.auth
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators(actionCreators, dispatch)
}

