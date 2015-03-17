/*
 * grunt-task-bower-dependencies
 * https://github.com/pcfreak30/grunt-task-bower-dependencies
 *
 * Copyright (c) 2015 Derrick Hammer
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    grunt.registerTask('task_bower_dependencies','Automatically resolves the bower asset dependencies to be used in bower concat for JS and CSS',function () {
        var bower = require('bower');
        var done = this.async();
        var _ = require('lodash');
        var Q = require('q');
        var path = require('path');
        bower.commands.list({},{offline: true}).on('end',function (graph) {
            var packages = [];
            var packageFiles = {};

            function escapeRegExp(string) {
                return string.replace(/([.*+?^${}()|\[\]\/\\])/g,"\\$1");
            }

            function addPackage(name) {
                return Q.Promise(function (resolve) {
                    bower.commands.info(name).on('end',function (info) {
                        var promise = Q();
                        _.forOwn(info.latest.dependencies || info.dependencies,function (value,key) {
                            promise = promise.then(function () {
                                return addPackage(key);
                            });
                        });
                        promise.then(function () {
                            packages.push(name);

                            if (!packageFiles[name]) {
                                packageFiles[name] = info.latest.main || info.main;
                                if (packageFiles[name]) {
                                    if (!_.isArray(packageFiles[name])) {
                                        packageFiles[name] = [packageFiles[name]];
                                    }
                                    packageFiles[name] = packageFiles[name].filter(function (v,i) {
                                        if (!/.*min.(?:js|css)/.test(v)) {
                                            var found = false;
                                            packageFiles[name].every(function (item) {
                                                if (new RegExp(escapeRegExp(v.replace(/\.(?:js|css)/,'')) + '.*min\\.(?:css|js)').test(item)) {
                                                    found = true;
                                                    return false;
                                                }
                                            });
                                            return !found;
                                        }
                                        return true;
                                    });
                                }
                            }
                        }).done(resolve);
                    });
                });
            }

            var promise = Q();
            _.forOwn(graph.dependencies,function (value,key) {
                promise = promise.then(function () {
                    return addPackage(key);
                });
            });
            promise.then(function () {
                packages = _.uniq(packages);
                var js_files = [];
                var css_files = [];
                var bowerrc;
                try {
                    bowerrc = grunt.file.readJSON('.bowerrc');
                }
                catch (e) {
                    bowerrc = {};
                }
                var directory = bowerrc.directory || 'bower_components';
                packages.forEach(function (pkg) {
                    if (!packageFiles[pkg]) {
                        return;
                    }
                    packageFiles[pkg].forEach(function (v) {
                        if (_.endsWith(v,'.js')) {
                            js_files.push(path.resolve(path.join(directory,pkg,v)));
                        }
                        else if (_.endsWith(v,'.css')) {
                            css_files.push(path.resolve(path.join(directory,pkg,v)));
                        }
                    });
                });
                grunt.option('bower_dependencies',{
                    js: js_files,
                    css: css_files
                });
                done();
            });
        });
    });

};
