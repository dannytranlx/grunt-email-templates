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
        var options = this.options({
                htmlFileName: 'html.html',
                txtFileName: 'text.txt',
                locals: {}
            }),
            done = this.async();

        function doMkdirp(folder) {
            return function (next) {
                console.log("Preparing destination folder " + folder);

                mkdirp(folder, function (err) {
                    next(err);
                });
            };
        }

        function doWriteFile(file, content) {
            return function (next) {
                console.log("Writing " + file);

                fs.writeFile(file, content, next);
            };
        }

        function doCreateTemplate(folder, templateName, options) {
            return function (next) {
                emailTemplates(folder, function (err, template) {
                    if (err) {
                        return next(err);
                    }

                    template(templateName, options.locals, next);
                });
            };
        }

        function doExportMailTemplate(dest, options) {
            return function (html, text, next) {
                async.parallel([
                    doWriteFile(path.join(dest, options.htmlFileName), html),
                    doWriteFile(path.join(dest, options.txtFileName), text)
                ], function (err) {
                    next(err);
                });
            };
        }

        async.eachSeries(this.files, function (f, next) {
            var dest = f.dest;

            async.eachSeries(f.src, function (src, cb) {
                var folder = path.join(src, "../"),
                    templateName = path.basename(src);

                async.waterfall([
                    doMkdirp(dest),
                    doCreateTemplate(folder, templateName, options),
                    doExportMailTemplate(dest, options)
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
