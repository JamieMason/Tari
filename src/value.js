define('value', [
    'fn',
    'each'
  ],

  function(
    $fn,
    $each
  ) {

    'use strict';

    var curry = $fn.curry;
    var is;

    function get(x) {
      return {}.toString.call(x).slice(8, -1);
    }

    is = curry(function(type, x) {
      return get(x) === type;
    });

    function isNumber(x){

    }

    function and(fs, x) {
      var i = fs.length;

      while (i--) {
        if (!fs[i](x)) {
          return false;
        }
      }
      return true;
    }

    var $value = {
      get: get,
      is: is,
      isNumber: and(is('Number'), isNaN)
    };

    $each('Arguments Array Boolean Function Null Object RegExp String Undefined'.split(' '), function(type, ix){
      $value['is' + type] = is(type);
    });

    return $value;
  }
);
