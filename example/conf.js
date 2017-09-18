var log4js = require('C:/Users/Archi/AppData/Roaming/npm/node_modules/log4js');

exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  capabilities: {
    'browserName': 'chrome'
  },

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  suites: {
    smoke: './Tests/smoke/*.spec.js'
  },

  beforeLaunch: function() {
    var currentdate = new Date();

    const log4js = require('log4js');
    log4js.configure({
      appenders: {
        out: {
          type: 'stdout'
        },
        app: {
          type: 'file',
          filename: './logs/ExecutionLog' + currentdate.getDate() + "-" +
            (currentdate.getMonth() + 1) + "-" +
            currentdate.getFullYear() + "-" +
            currentdate.getHours() + "-" +
            currentdate.getMinutes() + "-" +
            currentdate.getSeconds() + '.log',
        }
      },
      categories: {
        default: {
          appenders: ['out', 'app'],
          level: 'debug'
        }
      }
    });
  },

  // Framework to use. Jasmine is recommended.
  framework: 'jasmine',

  params: require('./parameters.json'),

  onPrepare: function() {
    browser.logger = log4js.getLogger('protractorLog4js');
  }
};
