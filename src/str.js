define('str', [
    'fn'
  ],

  function(
    $fn
  ) {

    'use strict';

    return {
      /**
       * Case-insensitive check whether a and b are the same
       * @param  {String} a
       * @param  {String} b
       * @return {Boolean}
       */
      eq: $fn.curry(function(a, b) {
        return a.toLowerCase() === b.toLowerCase();
      }),

      /**
       * Does the pattern form part of this String?
       * @param  {String|RegExp} pattern
       * @param  {String} string
       * @return {Boolean}
       */
      contains: $fn.curry(function(pattern, string) {
        return string.search(pattern) !== -1;
      })
    };
  }
);
