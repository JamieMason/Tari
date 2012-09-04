define([
    'fn'
  ],

  function(
    $fn
  ) {

    var curry = $fn.curry;

    return {
      /**
       * Does a strictly equal b?
       * @param  {Mixed} a
       * @param  {Mixed} b
       * @return {Boolean}
       */
      eq: curry(function (a, b) {
        return a === b;
      }),

      /**
       * Is a greater than b?
       * @param  {Mixed} a
       * @param  {Mixed} b
       * @return {Boolean}
       */
      gt: curry(function (a, b) {
        return a > b;
      }),

      /**
       * Is a less than b?
       * @param  {Mixed} a
       * @param  {Mixed} b
       * @return {Boolean}
       */
      lt: curry(function (a, b) {
        return a < b;
      }),

      /**
       * Is a greater than or equal to b?
       * @param  {Mixed} a
       * @param  {Mixed} b
       * @return {Boolean}
       */
      gte: curry(function (a, b) {
        return a >= b;
      }),

      /**
       * Is a less than or equal to b?
       * @param  {Mixed} a
       * @param  {Mixed} b
       * @return {Boolean}
       */
      lte: curry(function (a, b) {
        return a <= b;
      })
    };
  }
);
