var Mocha = require('mocha');
var Suite = require('mocha/lib/suite');
var Test = require('mocha/lib/test');
var escapeRe = require('escape-string-regexp');
var extend = require('util')._extend;

module.exports = Mocha.interfaces['test-options'] = function(suite) {
  var suites = [suite];

  suite.on('pre-require', function(context, file, mocha) {
    var common = require('mocha/lib/interfaces/common')(suites, context);

    context.before = common.before;
    context.after = common.after;
    context.beforeEach = common.beforeEach;
    context.afterEach = common.afterEach;
    context.run = mocha.options.delay && common.runWithSuite(suite);
    /**
     * Describe a "suite" with the given `title`
     * and callback `fn` containing nested suites
     * and/or tests.
     */

    context.describe = context.context = function(title, options, fn) {
      if(typeof(options) === 'function' && fn == undefined){
        fn = options;
        options = {}
      }

      var suite = Suite.create(suites[0], title);
      suite.file = file;
      suite.testOptions = options;
      suites.unshift(suite);
      fn.call(suite);
      suites.shift();
      return suite;
    };

    /**
     * Pending describe.
     */

    context.xdescribe = context.xcontext = context.describe.skip = function(title, options, fn) {
      if(typeof(options) === 'function' && fn == undefined){
        fn = options;
        options = {}
      }

      var suite = Suite.create(suites[0], title);
      suite.testOptions = options;
      suite.pending = true;
      suites.unshift(suite);
      fn.call(suite);
      suites.shift();
    };

    /**
     * Exclusive suite.
     */

    context.describe.only = function(title, options, fn) {
      var suite = context.describe(title, options, fn);
      mocha.grep(suite.fullTitle());
      return suite;
    };

    /**
     * Describe a specification or test-case
     * with the given `title` and callback `fn`
     * acting as a thunk.
     */

    context.it = context.specify = function(title, options, fn) {
      var suite = suites[0];

      if(typeof(options) === 'function' && fn == undefined){
        fn = options;
        options = {};
      } else if (typeof(options) === 'object' && fn === null){
        fn = undefined;
        options = {};
      }

      if (suite.pending) {
        fn = null;
      }
      var test = new Test(title, fn);
      test.testOptions = extend(extend({}, suite.testOptions), options);
      test.file = file;
      suite.addTest(test);
      return test;
    };

    context.it.only = function(title, options, fn) {
      var test = context.it(title, options, fn);
      var reString = '^' + escapeRe(test.fullTitle()) + '$';
      mocha.grep(new RegExp(reString));
      return test;
    };

    /**
     * Pending test case.
     */

    context.xit = context.xspecify = context.it.skip = function(title, options, fn) {
      if(typeof(options) === 'function' && fn == undefined){
        options = {}
      }
      context.it(title, options, null);
    };
  });
};
