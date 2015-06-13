import 'es6-shim';
import 'whatwg-fetch';

import React from 'react';
import router from './shared/router';


require('../assets/favicon.ico');


document.addEventListener('DOMContentLoaded', function(){
  router.run((Handler, state) => {
    React.render(<Handler {...state} />, document.body);
  });
});
