# grunt-email-templates

> Email templates task

## Getting Started
This plugin requires Grunt `~0.4.5`. 
This task is encapsulation of [node-email-templates](https://github.com/niftylettuce/node-email-templates).

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-email-templates --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-email-templates');
```

## The "email_templates" task

### Overview
In your project's Gruntfile, add a section named `email_templates` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  email_templates: {
    your_target: {
      // Target-specific file lists and/or options go here.
      'target/folder': 'source/folder'
    },
  },
});
```

### Options

#### htmlFileName

Type: `String`  
Default: `html.html`

Name of output file with html content.

#### txtFileName

Type: `String`  
Default: `text.txt`

Name of output file with text content.

### Usage Examples

#### Default Options
In this example, the default options are used. Template from *source/folder* will be handled by emails-template and saved
in *target/folder* with file names html.html and text.txt.

```js
grunt.initConfig({
  email_templates: {
    files: {
      'target/folder': 'source/folder'
    },
  },
});
```

#### Custom filenames
Template from *source/folder* will be handled by emails-template and saved
in *target/folder* with file names index.html and text.txt.

```js
grunt.initConfig({
  email_templates: {
    options: {
      htmlFileName: 'index.html'
    },
    files: {
      'target/folder': 'source/folder'
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
