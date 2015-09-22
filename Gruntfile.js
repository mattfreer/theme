module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-aws');
  grunt.loadNpmTasks('grunt-invalidate-cloudfront');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadTasks('./tasks');

  var config = {
    aws: grunt.file.readJSON("grunt-aws.json"),
    version: "0.0.2-dev",
    builddir: 'build',
    watch: {
      files: ['index.html', 'overrides/**/*.less', 'components/*.less', 'build.less'],
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
        src: 'build/theme.css',
        dest: 'theme-<%= version %>.css'
      }
    },

    shell: {
      update_gh_pages: {
        command: [
          'git fetch upstream',
          'git checkout upstream/gh-pages -b gh-pages-deploy-temp',
          'git rebase upstream/master'
        ].join('&&')
      },
      push_gh_pages: {
        command: [
          'git add .',
          'git commit --amend -C HEAD',
          'git push upstream gh-pages-deploy-temp:gh-pages -f',
          'git checkout -',
          'git branch -D gh-pages-deploy-temp'
        ].join('&&')
      }
    }
  };

  var ticks = +new Date();
  var s3Task = 's3' + ticks;

  config[s3Task] = config.s3;
  grunt.initConfig(config);

  grunt.task.renameTask('s3', s3Task);

  grunt.registerTask('default', ['connect', 'less', 'watch']);
  grunt.registerTask('release', ['less', 'checkVersion', s3Task + ':development']);
  grunt.registerTask('gh-pages', ['shell:update_gh_pages', 'less', 'shell:push_gh_pages']);
};
