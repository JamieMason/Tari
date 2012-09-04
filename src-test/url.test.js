define([
    'url'
  ],

  function(
    $url
  ) {

    describe('url', function() {
      describe('#hasParams', function() {
        it('should report whether a URL contains GET query params', function() {
          expect($url.hasParams('http://some.com/search?q=premiership+fixtures&aq=f&sourceid=chrome&ie=UTF-8')).toEqual(true);
          expect($url.hasParams('/search?q=premiership+fixtures&aq=f&sourceid=chrome&ie=UTF-8')).toEqual(true);
          expect($url.hasParams('http://some.com/search?q=premiership+fixtures')).toEqual(true);
          expect($url.hasParams('/search?q=premiership+fixtures')).toEqual(true);
          expect($url.hasParams('http://some.com/search?q=premiership')).toEqual(true);
          expect($url.hasParams('/search?q=premiership')).toEqual(true);
          expect($url.hasParams('http://some.com/search?q')).toEqual(false);
          expect($url.hasParams('/search?q')).toEqual(false);
          expect($url.hasParams('http://some.com/search?')).toEqual(false);
          expect($url.hasParams('/search?')).toEqual(false);
          expect($url.hasParams('http://some.com/search')).toEqual(false);
          expect($url.hasParams('/search')).toEqual(false);
          expect($url.hasParams('http://some.com/')).toEqual(false);
          expect($url.hasParams('/')).toEqual(false);
        });
      });

      describe('#addParam', function() {
        it('should add a GET query param to a URL', function() {
          var baseUrl = 'http://some.com/search';
          expect($url.addParam(baseUrl, 'q', 'premiership')).toEqual('http://some.com/search?q=premiership');
        });
      });

      describe('#addParams', function() {
        it('should add many GET query params to a URL', function() {
          var baseUrl = 'http://some.com/search';
          expect($url.addParams(baseUrl, {
            q: 'premiership+fixtures',
            aq: 'f',
            sourceid: 'chrome',
            ie: 'UTF-8'
          })).toEqual('http://some.com/search?q=premiership+fixtures&aq=f&sourceid=chrome&ie=UTF-8');
        });
      });
    });
  }
);

