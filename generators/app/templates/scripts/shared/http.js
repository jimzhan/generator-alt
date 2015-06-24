'use strict';

export default class http {
  static get(url, options) {
    options = options || {};
    options.method = 'GET';
    return fetch(url, options);
  }

  static post(url, options) {
    options = options || {};
    options.method = 'POST';
    return fetch(url, options);
  }

  static put(url, options) {
    options = options || {};
    options.method = 'PUT';
    return fetch(url, options);
  }

  static delete(url, options) {
    options = options || {};
    options.method = 'DELETE';
    return fetch(url, options);
  }
}
