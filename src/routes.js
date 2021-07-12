import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import AppContainer from './pages/AppContainer';

export default function Routers() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <AppContainer />
        </Route>
      </Switch>
    </Router>
  );
}
