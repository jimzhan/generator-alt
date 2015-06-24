'use strict';

import 'es6-shim';

import React from 'react';
import Router, {HistoryLocation} from 'react-router';
import {main} from './views/routes';


require('../assets/favicon.ico');
require('../assets/app.<%= preprocessor %>');


document.addEventListener('DOMContentLoaded', function(){
  Router.run(main, HistoryLocation, (View, state) => {
    React.render(<View {...state} />, document.body);
  });
});
