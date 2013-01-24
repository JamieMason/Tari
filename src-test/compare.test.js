define('compareTest', [
    'compare'
  ],

  function(
    $compare
  ) {

    describe('compare', function() {
      describe('#eq', function() {
        it('should compare equality', function() {
          expect($compare.eq(1, 1)).toBe(true);
          expect($compare.eq('A', 'A')).toBe(true);
          expect($compare.eq(1, 2)).toBe(false);
          expect($compare.eq('A', 'B')).toBe(false);
        });
      });

      describe('#gt', function() {
        it('should determine if a is greater than b', function() {
          expect($compare.gt(2, 1)).toBe(true);
          expect($compare.gt(1, 1)).toBe(false);
          expect($compare.gt(1, 2)).toBe(false);
        });
      });

      describe('#lt', function() {
        it('should determine if a is smaller than b', function() {
          expect($compare.lt(2, 1)).toBe(false);
          expect($compare.lt(1, 1)).toBe(false);
          expect($compare.lt(1, 2)).toBe(true);
        });
      });

      describe('#gte', function() {
        it('should determine if a is greater or equal to b', function() {
          expect($compare.gte(2, 1)).toBe(true);
          expect($compare.gte(1, 1)).toBe(true);
          expect($compare.gte(1, 2)).toBe(false);
        });
      });

      describe('#lte', function() {
        it('should determine if a is smaller or equal to b', function() {
          expect($compare.lte(2, 1)).toBe(false);
          expect($compare.lte(1, 1)).toBe(true);
          expect($compare.lte(1, 2)).toBe(true);
        });
      });
    });
  }
);
