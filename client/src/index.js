import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, Redirect, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from './store/configureStore'
import routes from './routes'
import App from './containers/App'
import Home from './components/Home'
import CreateStar from './components/CreateStar'
import Login from './components/Login'
import Register from './components/Register'
import StarDetail from './components/StarDetail'
import { requireAuth } from './components/RequireAuth'
import 'react-mdl/extra/material.css'
import 'react-mdl/extra/material.js'
import './styles/index.scss'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<Redirect from="/" to="home"/>
			<Route path="/" component={App}>
				<Route path="home" component={Home}/>
				<Route path="createStar" component={requireAuth(CreateStar)}/>
				<Route path="login" component={Login}/>
				<Route path="register" component={Register}/>
				<Route path="/star" component={StarDetail}/>
			</Route>
		</Router>
	</Provider>, 
	document.getElementById('root')
)

