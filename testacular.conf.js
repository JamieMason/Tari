reporters = ['coverage', 'progress', 'junit'];

files = [
  JASMINE,
  JASMINE_ADAPTER,
  REQUIRE,
  REQUIRE_ADAPTER,
  { pattern: '**/src-test/lib/remote-file.txt', watched: false, included: false, served: true },
  'vendor/require-2.0.6.js',
  'vendor/jasmine-matchers-1.1.0.js',
  'test-runner.js',
  'src/*.js',
  'src-test/*.js'
];

proxies = {
  '/server': 'http://localhost:9000'
};

preprocessors = {
  '**/src/*.js': 'coverage'
};

coverageReporter = {
  type : 'html',
  dir : 'src-test/coverage/'
};

junitReporter = {
  outputFile: 'src-test/output/test-results.xml'
};

// browsers = ['PhantomJS'];

// run on save
autoWatch = !false;
singleRun = !true;

// system
port = 7357;
runnerPort = 9100;
captureTimeout = 5000;

// stdout
logLevel = LOG_INFO;
colors = true;
