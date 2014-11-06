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

    stylus: {
      dist: {
        options: {
          linenos: true,
          compress: false
        },
        files: [{
          expand: true,
          cwd: 'css/style.styl',
          src: [ '**/*.styl' ],
          dest: 'css/style.css',
          ext: '.css'
        }]
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
                 src: ['*.svg', '*.png'],
                 dest: 'i/svg-dist'
              }],

              options: {
                cssprefix: ".icon-",
                defaultWidth: '300px',
                defaultHeight: '300px',
              }
             }
         },

         sprite:{
               all: {
                 src: ['i/svg-src/*.png', 'i/svg-src/*.svg']
                 destImg: 'i/spritesheet.png',
                 destCSS: 'css/sprites.css'
               }
             }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Grunticon
  grunt.loadNpmTasks ('grunt-grunticon');
  grunt.loadNpmTasks ('grunt-svgmin');

  //stylus
  grunt.loadNpmTasks('grunt-contrib-stylus');

  //spritesmith
  grunt.loadNpmTasks('grunt-spritesmith');


  grunt.registerTask('default', ['uglify']);

  grunt.registerTask('grunticon', ['uglify', 'grunticon:myIcons', 'svgmin:dist']);

  grunt.registerTask('stylus', ['uglify', 'stylus:dist']);

  grunt.registerTask('spritesmith', ['uglify', 'spritesmith']);

};