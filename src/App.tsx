import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Header from './components/application/Header';
import RegisterForm from './views/RegisterForm';
import RegisterType from './views/RegisterType';
import {theme} from './assets/styles';
import ScrollToTop from './components/ScrollToTop';

const App = () => (
    <Router>
      <ScrollToTop>
        <MuiThemeProvider theme={theme}>
          <div>
            <Header/>
            <div>
              <Route exact path="/" component={RegisterType}/>
              <Route path="/register" component={RegisterForm}/>
            </div>
          </div>
        </MuiThemeProvider>
      </ScrollToTop>
    </Router>
);

export default App;
