define('each', [
    'fn'
  ],

  function(
    $fn
  ) {

    'use strict';

    var iterator = {
      /**
       * Iterate over every member of xs, calling f with the arguments: member, i, xs
       * @private
       * @param  {Array} xs
       * @param  {Function} f
       * @return {Array} xs
       */
      'Array': function(xs, f) {
        var i = 0;
        var len = xs.length;

        while (i < len) {
          f(xs[i], i++, xs);
        }
        return xs;
      },

      /**
       * Iterate over every member of xs, calling f with the arguments: value, key, xs
       * @private
       * @param  {Array} xs
       * @param  {Function} f
       * @return {Array} xs
       */
      'Object': function(xs, f) {
        for (var key in xs) {
          xs.hasOwnProperty(key) && f(xs[key], key, xs);
        }
        return xs;
      }
    };

    /**
     * Iterate over every member of xs, calling f with the arguments: value, key/i, xs
     * @param  {Array|Object} xs
     * @param  {Function} f
     * @return {Array|Object} xs
     */
    return $fn.curry(function(xs, f) {
      return iterator[{}.toString.call(xs).slice(8, -1)].call(this, xs, f);
    });
  }
);
