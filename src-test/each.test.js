define('eachTest', [
    'each'
  ],

  function(
    $each
  ) {

    describe('each', function() {

        it('should iterate over Arrays', function() {
          var alpha = ['A', 'B', 'C'];
          var out = '';

          $each(alpha, function(el, i, list) {
            expect(el).toBe(alpha[i]);
            expect(list).toBe(alpha);
            out += el;
          });

          expect(out).toEqual('ABC');
        });

        it('should iterate over Objects', function() {
          var alpha = { a:'A', b:'B', c:'C' };
          var out = '';

          $each(alpha, function(val, key, list) {
            expect(val).toBe(alpha[key]);
            expect(list).toBe(alpha);
            out += val;
          });

          expect(out).toEqual('ABC');
        });

    });
  }
);
