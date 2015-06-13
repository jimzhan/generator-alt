import React from 'react';
import Router, {Route, DefaultRoute} from 'react-router';

import App from '../views/App';
import Home from '../views/Home';
import About from '../views/About';

// ------- application routing -------
const router = Router.create({
  routes: (
    <Route name="app" handler={App} path="/">
      <DefaultRoute name="home" handler={Home} />
      <Route name="about" handler={About} path="/about" />
    </Route>
  )
});

export default router;
