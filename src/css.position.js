define([
    'fn',
    'value',
    'domQuery'
  ],

  function(
    $fn,
    $value,
    $domQuery
  ) {

    var win = window;
    var doc = win.document;
    var testElement = doc.createElement('div');
    var hasGetComputedStyle = !!win.getComputedStyle;
    var hasCurrentStyle = !!testElement.currentStyle;
    var getComputedStyle;
    var isNumber = $value.isNumber;
    var scrollPos;
    var offsetPos;

    /**
     * Take a dash separated String and return it in camel case
     * @param  {String} str e.g. "background-color"
     * @return {String} e.g. "backgroundColor"
     */
    function toCamelCase(str) {
      return str.replace(/(-[a-z])/g, function(x) {
        return x.toUpperCase().charAt(1);
      });
    }

    if (hasGetComputedStyle) {
      getComputedStyle = function(el, property) {
        var styles = win.getComputedStyle(el, '');
        return styles && property ? styles.getPropertyValue(property) : void(0);
      };
    } else if (hasCurrentStyle) {
      getComputedStyle = function(el, property) {
        return el.currentStyle[toCamelCase(property)];
      };
    } else {
      getComputedStyle = $fn.noOp();
    }

    /**
     * How many pixels is el below or to the right of the document?
     * @private
     * @param  {String} direction "offsetLeft" || "offsetTop"
     * @param  {HTMLElement} el
     * @return {Number}
     */
    offsetPos = $fn.curry(function(direction, el) {
      var ancestor = doc.body;
      return el && el !== ancestor ? offsetPos(direction, el.offsetParent) + el[direction] : 0;
    });

    /**
     * How many pixels has el (optional) or the window scrolled in the provided direction
     * @private
     * @param  {String} direction "scrollLeft" || "scrollTop"
     * @param  {HTMLElement} [el]
     * @return {Number}
     */
    scrollPos = $fn.curry(function(direction, el) {
      var html = doc.documentElement || {};
      var body = doc.body || {};
      return !el || $domQuery.is(el, 'html,body') ? html[direction] || body[direction] || 0 : el[direction] || 0;
    });

    return {
      toCamelCase: toCamelCase,
      getComputedStyle: getComputedStyle,

      /**
       * How many pixels from the left edge of the body is el?
       * @param  {HTMLElement} el
       * @return {Number}
       */
      offsetLeft: offsetPos('offsetLeft'),

      /**
       * How many pixels from the top edge of the body is el?
       * @param  {HTMLElement} el
       * @return {Number}
       */
      offsetTop: offsetPos('offsetTop'),

      /**
       * How many pixels has el (optional) or the window scrolled right?
       * @param  {HTMLElement} [el]
       * @return {Number}
       */
      scrollLeft: scrollPos('scrollLeft'),

      /**
       * How many pixels has el (optional) or the window scrolled down?
       * @param  {HTMLElement} [el]
       * @return {Number}
       */
      scrollTop: scrollPos('scrollTop')
    };

  }
);
