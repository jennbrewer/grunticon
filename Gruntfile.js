module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        // banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },

    svgmin: {
          dist: {
              files: [{
                  expand: true,
                  cwd: 'i/svg-src',
                  src: ['*.svg'],
                  dest: 'i/svg-src'
              }]
          }
     },

     grunticon: {
         myIcons: {
             files: [{
                 expand: true,
                 cwd: 'i/svg-src',
                 src: ['*.svg'],
                 dest: 'i/svg-dist'
              }],

              options: {
                pngcrush: false
              }
             }
         },

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks ('grunt-grunticon');
  grunt.loadNpmTasks ('grunt-svgmin');

  grunt.registerTask('default', ['uglify', 'grunticon:myIcons', 'svgmin:dist']);

};