/**
 * grunt-email-templates
 * https://github.com/ertrzyiks/grunt-email-templates
 *
 * Copyright (c) 2014 Mateusz Derks
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path'),
    mkdirp = require('mkdirp'),
    fs = require('fs'),
    async = require('async'),
    emailTemplates = require('email-templates');

module.exports = function(grunt) {
    grunt.registerMultiTask('email_templates', 'Email templates task', function () {
        var options = this.options({}),
            done = this.async();

        function doMkdirp(folder) {
            return function (next) {
                console.log("Preparing destination folder " + folder);

                mkdirp(folder, function (err) {
                    next(err);
                });
            }
        }

        function doWriteFile(file, content) {
            return function (next) {
                console.log("Writing " + file);

                fs.writeFile(file, content, next);
            };
        }

        function doCreateTemplate(folder, templateName) {
            return function (next) {
                emailTemplates(folder, function (err, template) {
                    if (err) {
                        return next(err);
                    }

                    template(templateName, {}, next);
                });
            }
        }

        function doExporMailTemplate(dest) {
            return function (html, text, next) {
                async.parallel([
                    doWriteFile(path.join(dest, "html.html"), html),
                    doWriteFile(path.join(dest, "text.txt"), text)
                ], function (err) {
                    next(err);
                });
            };
        }

        async.eachSeries(this.files, function (f, next) {
            var dest = path.resolve(f.dest);

            async.eachSeries(f.src, function (src, cb) {
                var folder = path.join(src, "../"),
                    templateName = path.basename(src);

                async.waterfall([
                    doMkdirp(dest),
                    doCreateTemplate(folder, templateName),
                    doExporMailTemplate(dest)
                ], cb);
            }, next);
        }, function (err) {
            if (err) {
                throw err;
            }

            done();
        });
    });
};
