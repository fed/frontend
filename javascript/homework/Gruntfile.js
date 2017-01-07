'use strict';

module.exports = function(grunt) {
  var options = {
    init: true,
    data: {
      pkg: grunt.file.readJSON('package.json')
    },
    loadGruntTasks: {
      pattern: 'grunt-!(cli)*'
    }
  };

  require('load-grunt-config')(grunt, options);
};
