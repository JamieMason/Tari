define([
  'fn',
  'sizzle'
  ],

  function(
    $fn,
    $sizzle
  ) {

    var doc = window.doc;
    var curry = $fn.curry;

    /**
     * States whether the element matches the CSS selector
     * @param  {String} selector
     * @param  {HTMLElement} el
     * @return {Boolean}
     */
    function is(selector, el) {
      var xs = $sizzle(selector, el.parentNode || doc);
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
      return $sizzle(selector, context);
    }

    return {
      is: curry(is),
      find: curry(find)
    };

  }
);
