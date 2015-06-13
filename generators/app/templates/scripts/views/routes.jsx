import React from 'react';
import Router, {Route, DefaultRoute} from 'react-router';

import App from './App';
import Home from './Home';
import About from './About';

// ------- application routing -------
const main = (
  <Route name="app" handler={App} path="/">
    <DefaultRoute name="home" handler={Home} />
    <Route name="about" handler={About} path="/about" />
  </Route>
);


export function create(routes) {
  return Router.create({ 'routes': routes });
}


export {main};
