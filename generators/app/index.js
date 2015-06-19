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

  askForPreprocessor: function () {
    var done = this.async();

    var prompts = [{
      type: 'list',
      name: 'preprocessor',
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
      this.templatePath(path.join('scripts', 'shared')),
      this.destinationPath(path.join('scripts', 'shared'))
    );
    this.fs.copy(
      this.templatePath(path.join('scripts', 'views')),
      this.destinationPath(path.join('scripts', 'views'))
    );
    this.fs.copyTpl(
      this.templatePath(path.join('scripts', 'bootstrap.jsx')),
      this.destinationPath(path.join('scripts', 'bootstrap.jsx')),
      { preprocessor: (this.preprocessor.name === 'less') ? 'less' : 'scss' }
    );
  },

  installAssets: function() {
    this.fs.copy(
      this.templatePath(path.join('assets', 'favicon.ico')),
      this.destinationPath(path.join('assets', 'favicon.ico'))
    );
    this.fs.copy(
      this.templatePath(path.join('assets', 'logo.png')),
      this.destinationPath(path.join('assets', 'logo.png'))
    );
    var ext = (this.preprocessor.name === 'less') ? 'less' : 'scss';
    this.fs.copy(
      this.templatePath(path.join('assets', 'app.' + ext)),
      this.destinationPath(path.join('assets', 'app.' + ext))
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
        app: this.app
      }
    );

    this.fs.copy(
      this.templatePath('editorconfig'),
      this.destinationPath('.editorconfig')
    );
    this.fs.copy(
      this.templatePath('eslintrc'),
      this.destinationPath('.eslintrc')
    );
  },

  install: function () {
    if (this.preprocessor.name === 'less') {
      Packages.dev.push('less');
      Packages.dev.push('less-loader');
    } else {
      Packages.dev.push('node-sass');
      Packages.dev.push('sass-loader');
    }

    this.npmInstall(Packages.main, {save: true});
    this.npmInstall(Packages.dev, {saveDev: true});
  }
});
