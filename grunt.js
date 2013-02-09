module.exports = function(grunt) {

  'use strict';

  grunt.initConfig({

    shell: {
      docs: {
        command: 'jsdoc --recurse --configure jsdoc.json --destination docs src README.md'
      }
    },

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

  grunt.loadNpmTasks('grunt-shell');
  grunt.registerTask('docs', 'shell:docs');
  grunt.registerTask('default', 'lint');
};
