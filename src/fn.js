define('fn', [

  ],

  function(

  ) {

    'use strict';

    /**
     * Returns a function which when called, will always return x
     * @param  {Mixed} x
     * @return {Function}
     */
    function id(x) {
      return function() {
        return x;
      };
    }

    /**
     * Returns a function which, if called with less than it's number of named arguments, returns a partially applied version of itself.
     * Otherwise those pre-applied arguments can be passed with the initial call.
     * @param  {Function} fn
     * @param  {Array} args
     * @return {Function}
     */
    function curry(fn, args) {
      return fn.length > 1 ?
      function() {
        var params = args ? args.concat() : [];
        return params.push.apply(params, arguments) < fn.length && arguments.length ? curry.call(this, fn, params) : fn.apply(this, params);
      } : fn;
    }

    /**
     * A composable version of Function.prototype.apply
     * @param  {Function} fn
     * @param  {Array} args
     * @return {Mixed}
     */
    function callWith (fn, args) {
      return fn.apply(this, args);
    }

    /**
     * Returns a function which when called, will always have a 'this' with a value of 'scope'
     * @param  {Function} fn
     * @param  {Object} scope
     * @return {Function}
     */
    function bind(fn, scope) {
      return function() {
        return fn.apply(scope, arguments);
      };
    }

    /**
     * Takes an Array of Functions and returns a Function which when called will call the first Function in your Array, then the 2nd etc.
     * Each Function is passed the return value of the previous as it's argument.
     * @param  {Function[]} xs
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

    /**
     * Swap the values between two indexes of an Array
     * @private
     * @param  {Number} a  eg. 0
     * @param  {Number} b  eg. 1
     * @param  {Array}  xs eg. ["world", "hello", "foo"]
     * @return {Array}  xs eg. ["hello", "world", "foo"]
     */
    function swap(a, b, xs) {
      xs[a] = xs.splice(b, 1, xs[a])[0];
      return xs;
    }

    /**
     * Returns it's arguments Object as an Array
     * @return {Array}
     */
    function input () {
      return [].slice.call(arguments);
    }

    /**
     * Returns a version of fn which, when called has it's first two arguments flipped
     * @param  {Function} fn
     * @return {Mixed}
     */
    function flip(fn) {
      return compose([input, curry(swap, [0, 1]), curry(callWith, [fn])]);
    }

    return {
      bind: curry(bind),
      callWith: curry(callWith),
      compose: compose,
      curry: curry,
      flip: flip,
      id: id,
      input: input,
      noOp: id(function() {})
    };
  }
);
