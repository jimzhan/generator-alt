'use strict';

import React from 'react';
import classNames from 'classnames';
import {config} from '../../shared';

require('./styles.scss');


export default class Status extends React.Component {
  render() {
    return (
      <div className={classNames('status', config.theme)}>
        <div className="container">
          Status
        </div>
      </div>
    );
  }
}
