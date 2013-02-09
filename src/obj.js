define('obj', [
    'fn',
    'collection'
  ],

  function(
    $fn,
    $collection
  ) {

    'use strict';

    var curry = $fn.curry;
    var fold = $collection.fold;

    /**
     * Add all members of source to target
     * @param  {Object} target
     * @param  {Object} source
     * @return {Object} target
     */
    function extend(target, source) {
      return fold(function(memo, val, key) {
        memo[key] = val;
        return memo;
      }, target, source);
    }

    /**
     * Adds members of defaultOpts to options that are not already present
     * @param  {Object} defaultOpts
     * @param  {Object} opts
     * @return {Object} opts
     */
    function defaults(defaultOpts, opts) {
      return fold(function(memo, val, key) {
        !(key in memo) && (memo[key] = val);
        return memo;
      }, opts, defaultOpts);
    }

    return {
      extend: curry(extend),
      defaults: curry(defaults)
    };
  }
);
