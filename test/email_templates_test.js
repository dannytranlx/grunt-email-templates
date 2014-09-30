'use strict';

var grunt = require('grunt');

exports.email_templates = {
  default_options: function(test) {
    test.expect(2);

    var actualHtml = grunt.file.read('tmp/template1/html.html');
    var actualTxt = grunt.file.read('tmp/template1/text.txt');
    var expectedHtml = grunt.file.read('test/expected/template1/html.html');
    var expectedTxt = grunt.file.read('test/expected/template1/text.txt');

    test.equal(actualHtml, expectedHtml, 'should generate html file');
    test.equal(actualTxt, expectedTxt, 'should generate text file');

    test.done();
  }
};
