define([
    'fn',
    'each'
  ],

  function(
    $fn,
    $each
  ) {

    var curry = $fn.curry;
    var win = window;
    var doc = win.document;
    var root = doc.documentElement;
    var addEvent;
    var removeEvent;
    var cache = [];

    /**
     * Add/Remove listener using W3C methods
     * @private
     * @param  {String} method "addEventListener" or "removeEventListener"
     * @param  {HTMLElement} el
     * @param  {String} type
     * @param  {Function} f
     * @return {Boolean}
     */
    var w3cDom = curry(function(method, el, type, f) {
      return el[method](type, f, false);
    });

    /**
     * Add/Remove listener using Microsoft methods
     * @private
     * @param  {String} method "attachEvent" or "detachEvent"
     * @param  {HTMLElement} el
     * @param  {String} type
     * @param  {Function} f
     * @return {Boolean}
     */
    var microsoftDom = curry(function(method, el, type, f) {
      return el[method]('on' + type, f);
    });

    if (root.addEventListener) {
      addEvent = w3cDom('addEventListener');
      removeEvent = w3cDom('removeEventListener');
    } else if (root.attachEvent) {
      addEvent = microsoftDom('attachEvent');
      removeEvent = microsoftDom('detachEvent');
    } else {
      addEvent = function() {
        throw new Error('!addEventListener && !attachEvent');
      };
      removeEvent = function() {
        throw new Error('!removeEventListener && !detachEvent');
      };
    }

    /**
     * Remove all event listeners bound by this module
     * @return {Array} cache
     */
    function flushCache () {
      return $each(cache, function(item){
        removeEvent.apply({}, item);
      });
    }

    addEvent(win, 'unload', flushCache);

    return {
      /**
       * Add listener to DOM Element
       * @param  {HTMLElement} el
       * @param  {String} type
       * @param  {Function} f
       */
      add: function(el, type, f) {
        addEvent(el, type, f);
        cache.push([el, type, f]);
      },

      /**
       * Remove listener from DOM Element
       * @param  {HTMLElement} el
       * @param  {String} type
       * @param  {Function} f
       */
      remove: removeEvent,
      flush: flushCache
    };
  }
);
