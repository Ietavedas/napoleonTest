import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';
import { routes } from './routes';

import '../node_modules/normalize.scss/normalize.scss';
import "./style.scss";

const store = createStore(reducer);

class App extends React.Component {
    render() {

        return (
            <div className="wrapper">
                { routes }
            </div>
        );
    }
}

ReactDOM.render(
    <Provider store={store}>
        <Router routes={routes}>
            <App/>
        </Router>
    </Provider>,
    document.getElementById('app')
);
