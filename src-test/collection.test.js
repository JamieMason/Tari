define('collectionTest', [
    'collection'
  ],

  function(
    $collection
  ) {

    describe('collection', function() {

      describe('#map', function() {

        it('should transform Arrays', function() {
          var alpha = ['A', 'B', 'C'];
          var out = $collection.map(alpha, function(el, i, list){
            return el.toLowerCase() + i;
          });

          expect(out.join('')).toEqual('a0b1c2');
        });

      });

    });
  }
);
