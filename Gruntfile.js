module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-aws');
  grunt.loadNpmTasks('grunt-invalidate-cloudfront');
  grunt.loadTasks('./tasks');

  var config = {
    aws: grunt.file.readJSON("grunt-aws.json"),
    version: "0.0.2-dev",
    builddir: 'build',
    watch: {
      files: ['docs/**/*.*', 'overrides/**/*.less', 'components/**/*.less', 'build.less'],
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
          "build/theme.css": "build.less",
          "public/vendor/css/theme.css": "build.less",
          "public/css/site.css": "docs/core/styles/site.less"
        }
      }
    },
    s3: {
      options: {
        access: 'public-read',
        cache: false,
        headers: {
          CacheControl: "max-age=630720000, public",
        }
      },
      cdn: {
        options: {
          accessKeyId: '<%= aws.cdn.accessKeyId %>',
          secretAccessKey: '<%= aws.cdn.secretAccessKey %>',
          bucket: '<%= aws.cdn.bucket %>',
          region: '<%= aws.cdn.region %>'
        },
        src: 'build/theme.css',
        dest: 'theme-<%= version %>.css'
      },
      documentation: {
        options: {
          accessKeyId: '<%= aws.documentation.accessKeyId %>',
          secretAccessKey: '<%= aws.documentation.secretAccessKey %>',
          bucket: '<%= aws.documentation.bucket %>',
          region: '<%= aws.documentation.region %>'
        },
        cwd: 'public',
        src: '**'
      }
    }
  };

  var ticks = +new Date();
  var s3Task = 's3' + ticks;

  config[s3Task] = config.s3;
  grunt.initConfig(config);

  grunt.task.renameTask('s3', s3Task);

  grunt.loadTasks('tasks');

  grunt.registerTask('default', ['connect', 'less', 'buildDocs', 'watch']);
  grunt.registerTask('build-docs', ['less', 'buildDocs']);
  grunt.registerTask('deploy-docs', ['build-docs', 'checkVersion', s3Task + ':documentation']);
  grunt.registerTask('release', ['less', 'checkVersion', s3Task + ':cdn']);
};
