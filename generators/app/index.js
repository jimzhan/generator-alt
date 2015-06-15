'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path  = require('path');

var Packages = {
  main:  [
    'alt',
    'classnames',
    'debug',
    'es6-shim',
    'react',
    'react-router',
    'whatwg-fetch'
  ],
  dev: [
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
  ]
};


module.exports = yeoman.generators.Base.extend({

  askForApp: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'React.js' + chalk.red(' ❤ ') + ' Alt  '
    ));
    this.log(chalk.magenta(
      'Out of the box I include React.js, react-router, Alt, all backed by webpack to build your app.'
    ));

    var root = this.destinationPath();

    var prompts = [{
      name: 'app',
      message: 'What\'s the name of the app?',
      default: path.basename(root)
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;
      this.app = props.app;
      done();
    }.bind(this));
  },

  askForLicense: function() {
    var done = this.async();

    var prompts = [{
      type: 'list',
      name: 'license',
      message: 'Which license you\'d like to use?',
      choices: [{
        name: 'Apache License 2.0',
        value: 'Apache-2.0'
      }, {
        name: 'BSD 2-clause "Simplified" License',
        value: 'BSD-2-Clause'
      }, {
        name: 'Eclipse Public License 1.0',
        value: 'EPL-1.0'
      }, {
        name: 'GNU General Public License v3.0',
        value: 'GPL-3.0'
      }, {
        name: 'GNU Lesser General Public License v3.0',
        valeu: 'LGPL-3.0'
      }, {
        name: 'MIT License',
        value: 'MIT'
      }, {
        name: 'Mozilla Public License 2.0',
        value: 'MPL-2.0'
      }],
      default: 0
    }];

    this.prompt(prompts, function (answers) {
      this.license = answers.license;
      done();
    }.bind(this));

  },

  askForPreprocessor: function () {
    var done = this.async();

    var prompts = [{
      type: 'list',
      name: 'preprocessors',
      message: 'How\'d you like to pre-process stylesheets?',
      choices: [{
        name: 'Sass',
        value: 'sass'
      }, {
        name: 'Less',
        value: 'less'
      }],
      default: 0
    }];

    this.prompt(prompts, function (answers) {
      var preprocessor = answers.preprocessor;

      function use(item) {
        return preprocessor && preprocessor.indexOf(item) !== -1;
      }

      // pre-processor for style sheets.
      if (use('less')) {
        this.preprocessor = { name: 'less', ext: '/\.less$/' };
      } else {
        this.preprocessor = { name: 'sass', ext: '/\.scss$/' };
      }

      done();
    }.bind(this));
  },

  installApp: function() {
    this.fs.copy(
      this.templatePath('index.html'),
      this.destinationPath('index.html')
    );
    this.fs.copy(
      this.templatePath('scripts'),
      this.destinationPath('scripts')
    );
  },

  installAssets: function() {
    this.fs.copy(
      this.templatePath('assets'),
      this.destinationPath('assets')
    );
  },

  finalize: function() {
    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js'),
      { preprocessor: this.preprocessor }
    );

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      {
        app: this.app,
        license: this.license
      }
    );

    this.fs.copy(
      this.templatePath('editorconfig'),
      this.destinationPath('.editorconfig')
    );
  },

  install: function () {
    if (this.preprocessor.name === 'less') {
      Packages.dev.push('less-loader');
    } else {
      Packages.dev.push('node-sass');
      Packages.dev.push('sass-loader');
    }

    this.npmInstall(Packages.main, {save: true});
    this.npmInstall(Packages.dev, {saveDev: true});
  }
});
