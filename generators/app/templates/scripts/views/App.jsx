import React from 'react';
import {RouteHandler} from 'react-router';

import Nav from './Nav';
import Banner from './Banner';
import Status from './Status';


export default class App extends React.Component {
  render() {
    return (
      <div>
        <Nav />
        <Banner />
        <Status />
        <main>
          <div className="container">
            <RouteHandler />
          </div>
        </main>
      </div>
    );
  }
}
