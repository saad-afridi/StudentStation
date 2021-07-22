import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Custom Components
import RouteApp from './RouteApp'

// Redux & Mui
import rootReducer from './reducers';
import { applyMiddleware, createStore, compose } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const middleware = [thunk];

const store = createStore(
	rootReducer,
	compose(
		applyMiddleware(...middleware),
		(window.__REDUX_DEVTOOLS_EXTENSION__ &&
			window.__REDUX_DEVTOOLS_EXTENSION__()) ||
			compose
	)
);

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<RouteApp />
		</Router>
	</Provider>,
	document.getElementById('root')
);
