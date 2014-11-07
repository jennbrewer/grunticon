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
         svg: {
             files: [{
                 expand: true,
                 cwd: 'i/svg/svg-src',
                 src: ['*.svg'],
                 dest: 'i/svg/svg-dist'
              }],

              options: {
                cssprefix: ".svg-"
              }
             },
           png: {
               files: [{
                   expand: true,
                   cwd: 'i/png/png-src',
                   src: ['*.png'],
                   dest: 'i//png/png-dist'
                }],

                options: {
                  cssprefix: ".png-"
                }
              }
         },

         svgsprite: {
            render: {
              //
            },
            your_target: {
              src : 'i/svg-src-sprite',
              dest :  'i/svg-dist-sprite'
            },
          },

          svgstore: {
              options: {
                    prefix : 'icon-', 
                    includedemo : true,
                    svg: { 
                      viewBox : '0 0 100 100',
                      xmlns: 'http://www.w3.org/2000/svg'
                    }
                  },

              default : {
                files: {
                  'i/svg-dist-store/icon.svg': ['i/svg-src-store/*.svg'],
                },
              },
            },

  });

  // loadNpmTasks
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Grunticon
  grunt.loadNpmTasks ('grunt-grunticon');
  grunt.loadNpmTasks ('grunt-svgmin');

  // grunt-svg-sprite
  grunt.loadNpmTasks('grunt-svg-sprite');

  // grunt svg-store
  grunt.loadNpmTasks('grunt-svgstore');

  // registerTask
  grunt.registerTask('default', ['uglify']);

  grunt.registerTask('icons', ['uglify', 'grunticon:svg', 'grunticon:png', 'svgmin:dist']);

  grunt.registerTask('sprite', ['uglify', 'svgsprite']);

  grunt.registerTask('store', ['uglify', 'svgmin', 'svgstore']);  

};