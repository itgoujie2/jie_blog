import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Redirect, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from './store/configureStore'
import routes from './routes'
import Index from './components/index'
// import 'style.scss'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={Index}/>			
		</Router>
	</Provider>, 
	document.getElementById('root')
)


// <Redirect from="/" to="main"/>
// 			{routes}