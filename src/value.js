define([
    'fn',
    'collection'
  ],

  function(
    $fn,
    $collection
  ) {

    var curry = $fn.curry;

    function get(x) {
      return {}.toString.call(x).slice(8, -1);
    }

    function is(type, x) {
      return get(x) === type;
    }

    return $collection.fold(function(memo, val) {
      memo['is' + val] = curry(is, [val]);
      return memo;
    }, {
      get: get,
      is: curry(is)
    }, 'Array Boolean Function Null Number Object RegExp String Undefined'.split(' '));
  }
);
