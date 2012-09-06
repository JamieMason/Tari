define([
    'domReady'
  ],

  function(
    $domReady
  ) {

    describe('domReady', function() {
      it('should defer invocation of a function until after the DOM is loaded', function() {
        $domReady(function() {
          expect(document.getElementsByTagName('title').length > 0).toEqual(true);
        });
      });

      it('should invoke a function immediately if the DOM is already loaded', function() {
        $domReady(function() {
          $domReady(function() {
            expect(document.getElementsByTagName('title').length > 0).toEqual(true);
          });
        });
      });
    });
  }
);
