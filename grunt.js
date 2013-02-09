module.exports = function(grunt) {

  grunt.initConfig({

    lint: {
      files: ['src/*.js']
    },

    jshint: (function() {
      var jshintrc = JSON.parse(require('fs').readFileSync(require.resolve('./.jshintrc'), 'utf8'));
      var grunt = {
        options: jshintrc,
        globals: jshintrc.globals || {}
      };
      (grunt.options.predef || []).forEach(function(globalVarName) {
        grunt.globals[globalVarName] = true;
      });
      delete grunt.options.predef;
      return grunt;
    }())

  });

  grunt.registerTask('default', 'lint');
};
