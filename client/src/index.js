import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, Redirect, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from './store/configureStore'
import routes from './routes'
import App from './components/App'
import Home from './components/Home'
import CreateSaas from './components/CreateSaas'
import Login from './components/Login'
// import 'style.scss'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<Redirect from="/" to="home"/>
			<Route path="/" component={App}>
				<Route path="home" component={Home}/>
				<Route path="createSaas" component={CreateSaas}/>
				<Route path="login" component={Login}/>
			</Route>
		</Router>
	</Provider>, 
	document.getElementById('root')
)

