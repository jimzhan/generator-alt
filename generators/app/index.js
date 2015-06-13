'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path  = require('path');


module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to ' + chalk.red('React.js')
    ));

    var root = this.destinationPath();

    var prompts = [
      {
        name: 'app',
        message: 'What\'s the name of the app?',
        default: path.basename(root)
      }
    ];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;
      this.app = props.app;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.fs.copy(
        this.templatePath('index.html'),
        this.destinationPath('index.html')
      );

      this.fs.copy(
        this.templatePath('assets'),
        this.destinationPath('assets')
      );

      this.fs.copy(
        this.templatePath('scripts'),
        this.destinationPath('scripts')
      );

      this.fs.copy(
        this.templatePath('webpack.config.js'),
        this.destinationPath('webpack.config.js')
      );

      this.fs.copyTpl(
        this.templatePath('package.json'),
        this.destinationPath('package.json'),
        { app: this.app }
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
    }
  },

  install: function () {
    this.npmInstall([
      'alt',
      'debug',
      'es6-shim',
      'react',
      'react-router',
      'whatwg-fetch'
    ], {
      'save': true
    });

    this.npmInstall([
      'autoprefixer-loader',
      'babel-core',
      'babel-loader',
      'css-loader',
      'file-loader',
      'html-webpack-plugin',
      'node-libs-browser',
      'react-hot-loader',
      'style-loader',
      'webpack',
      'webpack-dev-server'
    ], {
      'saveDev': true
    });
  }
});
