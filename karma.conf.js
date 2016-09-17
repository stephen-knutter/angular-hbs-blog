// Karma configuration
// Generated on Thu Sep 15 2016 11:31:28 GMT-0600 (MDT)

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      './node_modules/angular/angular.js',
      './node_modules/angular-mocks/angular-mocks.js',
      './bower_components/angular-sanitize/angular-sanitize.js',
      './bower_components/showdown/dist/showdown.js',
      './bower_components/ng-showdown/dist/ng-showdown.js',
      './public/javascripts/app.js',
      './specs/blog/blog.spec.js'
    ],
    exclude: [
    ],
    preprocessors: {
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  });
};
