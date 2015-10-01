var AWS = require("aws-sdk");
var _= require("lodash");

module.exports = function(grunt) {
  grunt.registerTask("checkVersion", "Check for an existing deployed version with the version number", function() {
    var version = grunt.config.get("version");

    if (!version) {
      grunt.log.error("No version config set");
      return false;
    }

    var done = this.async();
    var s3Opts = grunt.config.get("s3.cdn.options");
    AWS.config.update(_.pick(s3Opts,
      'accessKeyId',
      'secretAccessKey',
      'region',
      'sslEnabled',
      'maxRetries',
      'httpOptions'
    ), true);

    var S3 = new AWS.S3();
    var dest = grunt.config.get("s3.cdn.dest");

    S3.getObject({
      Bucket: s3Opts.bucket,
      Key: dest
    }).on("error", function(error, response) {
      done();
    }).on("success", function(response) {
      grunt.log.error("File " + dest + " already exists. Please use a different version");
      done(false);
    }).send();
  });
};
