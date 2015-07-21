'use strict';

import React from 'react';

require('./styles.<%= preprocessor %>');


export default class Banner extends React.Component {
  render() {
    return (
      <div className="banner valign-wrapper">
        <div className="container valign center-align">
          <a className="waves-effect waves-light btn-large">Get Started</a>
        </div>
      </div>
    );
  }
}
