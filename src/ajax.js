define('ajax', ['fn', 'value', 'url'], function($fn, $value, $url) {

  'use strict';

  // Object
  var exports = {};
  // Boolean
  var hasXhr = !$value.isUndefined(window.XMLHttpRequest);
  // Boolean
  var hasAxo = !$value.isUndefined(window.ActiveXObject);
  // Boolean
  var hasAjax = hasXhr || hasAxo;
  // Function
  var newRequest;

  // open a connection for the option's request Object
  // (String, Object) -> Object
  var openConnection = $fn.curry(function(kind, options) {
    options.request.open(kind, options.url, true);
    return options;
  });

  // () -> XMLHttpRequest
  function newXhr() {
    return new XMLHttpRequest();
  }

  // () -> ActiveXObject
  function newAxo() {
    return new ActiveXObject('Microsoft.XMLHTTP');
  }

  // return correct request object for the environment
  // () -> XMLHttpRequest|ActiveXObject
  newRequest = hasXhr ? newXhr : hasAxo ? newAxo : $fn.noOp();

  // is this options object valid?
  // (Object) -> Boolean
  function isValid(options) {
    return hasAjax && $value.isObject(options) && $value.isString(options.url) && $value.isFunction(options.success);
  }

  // Throw error if the attempted request parameters are not valid
  // (Object) ->
  function throwIfInvalid(options) {
    if(isValid(options)) {
      return options;
    }
    throw new Error('Invalid AJAX Request');
  }

  // Create and initialise a new User Agent request Object
  // (Object) -> Object
  function initRequest(options) {
    var req = options.request = newRequest();
    req.onreadystatechange = function() {
      if(req.readyState === 4) {
        options.success(req.responseText);
      }
    };
    return options;
  }

  // Implement Cache-busting if opts.noCache is true
  // (Object) -> Object
  function handleCaching(options) {
    if(options.noCache === true) {
      options.url = $url.addParam(options.url, 'nocache', new Date().getTime());
    }
    return options;
  }

  /**
   * Is AJAX supported in this environment?
   * @return {Boolean}
   * @memberOf ajax
   */
  exports.isSupported = $fn.id(hasAjax);

  /**
   * Send an HTTP GET Request
   * @param  {String} options.url
   * @param  {Function} options.success
   * @return {XMLHttpRequest|ActiveXObject} req
   * @memberOf ajax
   */
  exports.get = $fn.compose([throwIfInvalid, initRequest, handleCaching, openConnection('GET'), function(options) {
    var req = options.request;
    req.send('');
    return req;
  }]);

  /**
   * Send an HTTP JSON POST Request
   * @param  {String} options.url
   * @param  {String} options.postBody
   * @param  {Function} options.success
   * @return {XMLHttpRequest|ActiveXObject} req
   * @memberOf ajax
   */
  exports.post = $fn.compose([throwIfInvalid, initRequest, openConnection('POST'), function(options) {
    var req = options.request;
    req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    req.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    req.send(options.postBody || '');
    return req;
  }]);

  return exports;

});
