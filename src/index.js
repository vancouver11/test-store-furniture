import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';

import App from './components/app';
import ErrorBoundry from './components/error-boundry';
import {FurnitureProvider} from './components/furniture-service-context';
import Furniture from './services/furniture-service';
import store from './store';

const serviceFurniture = new Furniture();

 ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundry>
        <FurnitureProvider value = {serviceFurniture}>
          <Router>
            <App>
            
            </App>
          </Router>    
        </FurnitureProvider>
    </ErrorBoundry>
  </Provider>,
  document.getElementById('root')
);

 