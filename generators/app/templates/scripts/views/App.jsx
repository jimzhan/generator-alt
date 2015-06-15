import React from 'react';
import {RouteHandler} from 'react-router';

import Nav from './Nav';


export default class App extends React.Component {
  render() {
    return (
      <div>
        <Nav />
        <main>
          <div className="container">
            <RouteHandler />
          </div>
        </main>
      </div>
    );
  }
}
