define('collection', [
    'fn',
    'each'
  ],

  function(
    $fn,
    $each
  ) {

    'use strict';

    var curry = $fn.curry;

    /**
     * Iterates over the Object to create a single item using the memo provided
     * @param  {Function} f
     * @param  {Mixed} memo
     * @param  {Object} xs
     * @return {Mixed}
     */
    function fold(f, memo, xs) {
      $each(xs, function(val, key) {
        memo = f(memo, val, key);
      });
      return memo;
    }

    /**
     * Iterate over every member of xs, calling f with the arguments: member, i, xs to create a new array of f's return values
     * @param  {Array|Object} xs
     * @param  {Function} f
     * @return {Array|Object}
     */
    function map(xs, f) {
      return fold(function(memo, val, key) {
        memo[key] = f(val, key, xs);
        return memo;
      }, {}.toString.call(xs).slice(8, -1) === 'Array' ? [] : {}, xs);
    }

    return {
      fold: curry(fold),
      map: curry(map),

      /**
       * Convert an Array-like Object into a true Array
       * @param  {Array|Object|NodeList} xs
       * @return {Array}
       */
      toArray: function(xs) {
        return fold(function(memo, val) {
          memo.push(val);
          return memo;
        }, [], xs);
      }
    };
  }
);
