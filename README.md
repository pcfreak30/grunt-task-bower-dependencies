# grunt-task-bower-dependencies

> Automatically resolves the bower asset dependencies to be used in bower concat for JS and CSS

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-task-bower-dependencies --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-task-bower-dependencies');
```

## The "task_bower_dependencies" task

### Overview
In your project's Gruntfile, register tasks to be dependant on task_bower_dependencies. You may then access the JS and CSS file arrays via the example below.

```js
grunt.task.registerTask('sometask', function(grunt){
    grunt.task.run('task_bower_dependencies');
    var assets = grunt.option('bower_dependencies');
    var js = assets.js;
    var css = assets.css;
    /// Do more stuff here
});
grunt.task.registerTask('default','sometask');
```
## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality if possible. Lint and test your code using [Grunt](http://gruntjs.com/).

This code was developed so it could be reused by me in the future, so assumptions have been made based on my requirements. If you find it useful and want to extend it or give suggestions, PR/issues are welcome, but I can not guarantee to keep this maintained for anyone but myself.

Thanks.
## Release History
_(Nothing yet)_
