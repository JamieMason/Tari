define([

  ],

  function(

  ) {

    /**
     * Returns a function which, if called with less than it's number of named arguments, returns a partially applied version of itself.
     * Otherwise those pre-applied arguments can be passed with the initial call.
     * @param  {Function} f
     * @param  {Array} args
     * @return {Function}
     */
    function curry(f, args) {
      return f.length > 1 ?
      function() {
        var params = args ? args.concat() : [];
        return params.push.apply(params, arguments) < f.length && arguments.length ? curry.call(this, f, params) : f.apply(this, params);
      } : f;
    }

    /**
     * Takes an Array of Functions and returns a Function which when called will call the first Function in your Array, then the 2nd etc.
     * Each Function is passed the return value of the previous as it's argument.
     * @param  {Array} xs
     * @return {Function}
     */
    function compose(xs) {
      return function() {
        var i;
        var len = xs.length;
        var args = arguments;
        for (i = 0; i < len; i++) {
          args = [xs[i].apply(this, args)];
        }
        return args[0];
      };
    }

    return {
      noOp: function() {},
      curry: curry,
      compose: compose
    };
  }
);
