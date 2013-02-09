define('domQuery', [
  'fn'
  ],

  function(
    $fn
  ) {

    'use strict';

    var doc = document;
    var curry = $fn.curry;

    /**
     * States whether the element matches the CSS selector
     * @param  {String} selector
     * @param  {HTMLElement} el
     * @return {Boolean}
     */
    function is(selector, el) {
      var xs = find(selector, el.parentNode);
      var i = xs.length;

      while (i--) {
        if (xs[i] === el) {
          return true;
        }
      }
      return false;
    }

    /**
     * Gather elements matching the CSS selector
     * @param  {String} selector
     * @param  {HTMLElement} [context]
     * @return {HTMLElement[]}
     */
    function find(selector, context) {
      return (context || doc).querySelectorAll(selector);
    }

    return {
      is: curry(is),
      find: curry(find)
    };

  }
);
