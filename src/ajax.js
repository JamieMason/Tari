define('ajax', [
    'fn',
    'value',
    'url'
  ],

  function(
    $fn,
    $value,
    $url
  ) {

    'use strict';

    var global = window;
    var compose = $fn.compose;
    var hasXhr = !$value.isUndefined(global.XMLHttpRequest);
    var hasAxo = !$value.isUndefined(global.ActiveXObject);
    var hasAjax = hasXhr || hasAxo;

    /**
     * Open a connection for the option's request Object
     * @private
     * @param  {String} kind "GET" or "POST"
     * @param  {Object} ops
     * @return {Object} ops
     */
    var openConnection = $fn.curry(function(kind, ops) {
      ops.request.open(kind, ops.url, true);
      return ops;
    });

    /**
     * @private
     * @return {XMLHttpRequest}
     */
    function newXhr() {
      return new XMLHttpRequest();
    }

    /**
     * @private
     * @return {ActiveXObject}
     */
    function newAxo() {
      return new ActiveXObject('Microsoft.XMLHTTP');
    }

    var newRequest = hasXhr ? newXhr : hasAxo ? newAxo : $fn.noOp();

    /**
     * Throw error if the attempted request parameters are not valid
     * @private
     * @param  {Object} ops
     * @return {Object} ops
     */
    function throwIfInvalid(ops) {
      if (validate(ops)) {
        return ops;
      }
      throw new Error('Supports AJAX:' + hasAjax);
    }

    /**
     * Create and initialise a new User Agent request Object
     * @private
     * @param  {Object} ops
     * @return {Object} ops
     */
    function initRequest(ops) {
      var req = ops.request = newRequest();
      req.onreadystatechange = function() {
        if (req.readyState === 4) {
          ops.success(req.responseText);
        }
      };
      return ops;
    }

    /**
     * Implement Cache-busting if opts.noCache is true
     * @private
     * @param  {Object} ops
     * @return {Object} ops
     */
    function handleCaching(ops) {
      if (ops.noCache === true) {
        ops.url = $url.addParam(ops.url, 'nocache', new Date().getTime());
      }
      return ops;
    }

    /**
     * Is AJAX supported in this environment?
     * @return {Boolean}
     */
    function support() {
      return hasAjax;
    }

    /**
     * Are the callee's supplied options valid?
     * @param  {Object} ops
     * @return {Boolean}
     */
    function validate(ops) {
      return hasAjax && $value.isObject(ops) && $value.isString(ops.url) && $value.isFunction(ops.success);
    }

    /**
     * Send an HTTP GET Request
     * @param  {Object} ops
     * @param  {String} ops.url
     * @param  {Function} ops.success
     * @return {XMLHttpRequest|ActiveXObject} req
     */
    var get = compose([throwIfInvalid, initRequest, handleCaching, openConnection('GET'), function(ops) {
      var req = ops.request;
      req.send('');
      return req;
    }]);

    /**
     * Send an HTTP JSON POST Request
     * @param  {Object} ops
     * @param  {String} ops.url
     * @param  {String} ops.postBody
     * @param  {Function} ops.success
     * @return {XMLHttpRequest|ActiveXObject} req
     */
    var post = compose([throwIfInvalid, initRequest, openConnection('POST'), function(ops) {
      var req = ops.request;
      req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      req.setRequestHeader('Content-type', 'application/json; charset=utf-8');
      req.send(ops.postBody || '');
      return req;
    }]);

    return {
      support: support,
      validate: validate,
      get: get,
      post: post
    };
  }
);
