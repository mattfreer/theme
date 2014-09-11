module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.initConfig({
    builddir: 'build',
    watch: {
      files: ['index.html', 'variables.less'],
      tasks: ['less'],
      options: {
        livereload: true,
         nospawn: true
      }
    },
    connect: {
      server: {
        options: {
          port: 3001,
          livereload: true
        }
      }
    },
    less: {
      development: {
        files: {
          "build/bootstrap.css": "build.less"
        }
      }
    }
  });

  grunt.registerTask('default', ['connect', 'watch']);
}
