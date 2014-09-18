module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-aws');

  grunt.initConfig({
    aws: grunt.file.readJSON("grunt-aws.json"),
    builddir: 'build',
    watch: {
      files: ['index.html', 'variables.less', 'overrides.less', 'components/*.less'],
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
          "build/theme.css": "build.less"
        }
      }
    },
    s3: {
      options: {
        accessKeyId: '<%= aws.accessKeyId %>',
        secretAccessKey: '<%= aws.secretAccessKey %>',
        bucket: '<%= aws.bucket %>',
        region: '<%= aws.region %>',
        access: 'public-read',
        headers: {
          CacheControl: "max-age=630720000, public",
        }
      },
      development: {
        cwd: 'build/',
        src: 'theme.css'
      }
    }
  });

  grunt.registerTask('default', ['connect', 'watch']);
  grunt.registerTask('release', ['less', 's3:development']);
}
