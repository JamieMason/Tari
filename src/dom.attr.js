define([
    'fn',
    'each'
  ],

  function(
    $fn,
    $each
  ) {

    var curry = $fn.curry;

    /**
     * Get value of attr on el
     * @param  {HTMLElement} el
     * @param  {String}      attr
     * @return {Mixed}       value
     */
    var get = curry(function(el, attr) {
      return el.getAttribute(attr);
    });

    /**
     * Set or update the value of attr on el
     * @param  {HTMLElement} el
     * @param  {String}      attr
     * @param  {Mixed}       value
     * @return {HTMLElement} el
     */
    var set = curry(function(el, attr, value) {
      el.setAttribute(attr, value);
      return el;
    });

    /**
     * Remove the named attr from el
     * @param  {HTMLElement} el
     * @param  {String}      attr
     * @return {HTMLElement} el
     */
    var remove = curry(function(el, attr) {
      el.removeAttribute(attr);
      return el;
    });

    /**
     * Set or update the values of many attributes on an element
     * @param  {HTMLElement} el
     * @param  {Object}      obj
     * @return {HTMLElement} el
     */
    var setMany = curry(function(el, obj) {
      $each(obj, $fn.flip(set(el)));
      return el;
    });

    return {
      get: get,
      remove: remove,
      set: set,
      setMany: setMany
    };

  }
);
