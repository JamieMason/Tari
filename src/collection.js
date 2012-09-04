define([
    'fn'
  ],

  function(
    $fn
  ) {

    var curry = $fn.curry;

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
    function each(xs, f) {
      return iterator[{}.toString.call(xs).slice(8, -1)].call(this, xs, f);
    }

    /**
     * Iterates over the Object to create a single item using the memo provided
     * @param  {Function} f
     * @param  {Mixed} memo
     * @param  {Object} xs
     * @return {Mixed}
     */
    function fold(f, memo, xs) {
      each(xs, function(val, key) {
        memo = f(memo, val, key);
      });
      return memo;
    }

    /**
     * Iterate over every member of xs, calling f with the arguments: member, i, xs to create a new array of f's return values
     * @param  {Array} xs
     * @param  {Function} f
     * @return {Array} ys
     */
    function map(xs, f) {
      return fold(function(memo, val, key) {
        memo[key] = f(val, key, xs);
        return memo;
      }, [], xs);
    }

    return {
      each: curry(each),
      fold: curry(fold),
      map: curry(map)
    };
  }
);
