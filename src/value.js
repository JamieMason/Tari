define([
    'fn',
    'each'
  ],

  function(
    $fn,
    $each
  ) {

    function get(x) {
      return {}.toString.call(x).slice(8, -1);
    }

    function is(type, x) {
      return get(x) === type;
    }

    var curry = $fn.curry;
    var $value = {
      get: get,
      is: curry(is)
    };

    $each('Array Boolean Function Null Number Object RegExp String Undefined'.split(' '), function(type, ix){
      $value['is' + type] = curry(is, [type]);
    });

    return $value;
  }
);
