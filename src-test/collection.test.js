define([
    'collection'
  ],

  function(
    $collection
  ) {

    describe('collection', function() {
      describe('#each', function() {
        it('should iterate over Arrays', function() {
          var alpha = ['A', 'B', 'C'];
          var out = '';

          $collection.each(alpha, function(el, i, list) {
            expect(el).toBe(alpha[i]);
            expect(list).toBe(alpha);
            out += el;
          });

          expect(out).toEqual('ABC');
        });

        it('should iterate over Objects', function() {
          var alpha = { a:'A', b:'B', c:'C' };
          var out = '';

          $collection.each(alpha, function(val, key, list) {
            expect(val).toBe(alpha[key]);
            expect(list).toBe(alpha);
            out += val;
          });

          expect(out).toEqual('ABC');
        });
      });

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
