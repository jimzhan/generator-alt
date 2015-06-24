'use strict';

import 'whatwg-fetch';

var execute = (url, options) => {
  return window.fetch(url, options);
};


export default class http {
  static get(url, options) {
    options = options || {};
    options.method = 'GET';
    return execute(url, options);
  }

  static post(url, options) {
    options = options || {};
    options.method = 'POST';
    return execute(url, options);
  }

  static put(url, options) {
    options = options || {};
    options.method = 'PUT';
    return execute(url, options);
  }

  static delete(url, options) {
    options = options || {};
    options.method = 'DELETE';
    return execute(url, options);
  }
}
