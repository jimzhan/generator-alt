import 'es6-shim';
import 'whatwg-fetch';

import React from 'react';
import Router from 'react-router';
import {main} from './views/routes';


require('../assets/favicon.ico');


document.addEventListener('DOMContentLoaded', function(){
  Router.run(main, (Handler, state) => {
    React.render(<Handler {...state} />, document.body);
  });
});
