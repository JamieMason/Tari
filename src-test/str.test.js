define('strTest', [
    'str'
  ],

  function(
    $str
  ) {

    describe('str', function() {
      describe('#eq', function() {
        it('should perform a case-insensitive equality comparison', function() {
          expect($str.eq('A', 'a')).toEqual(true);
          expect($str.eq('A', 'A')).toEqual(true);
          expect($str.eq('A', 'b')).toEqual(false);
          expect($str.eq('A', 'B')).toEqual(false);
        });
      });

      describe('#contains', function() {
        it('should state whether a pattern is found within a string', function() {
          expect($str.contains('ABC', 'abc')).toEqual(false);
          expect($str.contains(/ABC/i, 'abc')).toEqual(true);
          expect($str.contains('Pork', 'Lamb')).toEqual(false);
          expect($str.contains('Pork', ' Pork ')).toEqual(true);
        });
      });
    });
  }
);
