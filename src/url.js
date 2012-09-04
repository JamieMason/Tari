define([
    'str',
    'collection'
  ],

  function (
    $str,
    $collection
  ) {

    /**
     * Does the URL have GET query params?
     * @param  {String}  url
     * @return {Boolean}
     */
    function hasParams(url) {
      return $str.contains(/\?[^=]+=/, url);
    }

    /**
     * Add a GET param key/value pair to a URL
     * @param {String} url
     * @param {String} name
     * @param {Mixed} value
     * @return {String} url
     */
    function addParam(url, name, value) {
      return url + (hasParams(url) ? '&' : '?') + name + '=' + value;
    }

    /**
     * Add many GET params to a URL
     * @param {String} url
     * @param {Object} xs
     * @return {String} url
     */
    function addParams(url, xs) {
      return $collection.fold(function(memo, val, key) {
        return addParam(memo, key, val);
      }, url, xs);
    }

    return {
      addParam: addParam,
      addParams: addParams,
      hasParams: hasParams
    };
  }
);
