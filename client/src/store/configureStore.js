import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../reducers/index'
import thunkMiddleware from 'redux-thunk'

const debugware = [];
if (process.env.NODE_ENV !== 'production') {
    const createLogger = require('redux-logger');
    debugware.push(createLogger({
        collapsed: true
    }));
}

// export default function configureStore(initialState = {}){
// 	const store = createStore(
// 		rootReducer, 
// 		initialState, 
// 		compose(
// 			window.devToolsExtension && window.devToolsExtension(), 
// 			applyMiddleware(thunkMiddleware, ...debugware)
// 		)
// 	)

// 	if (module.hot){
// 		module.hot.accept('../reducers', () => {
// 			const nextRootReducer = require('../reducers/index').default
// 			store.replaceReducer(nextRootReducer)
// 		})
// 	}

// 	return store
// }

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore)

export default function configureStore(initialState = {}){
	const store = createStoreWithMiddleware(rootReducer, initialState)

	if (module.hot){
		module.hot.accept('../reducers', () => {
			const nextRootReducer = require('../reducers/index').default
			store.replaceReducer(nextRootReducer)
		})
	}

	return store
}