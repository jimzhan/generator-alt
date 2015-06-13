var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path  = require('path');
var _ = require('lodash');


const Base = path.join('scripts', 'stores');


module.exports = yeoman.generators.Base.extend({

  askForName: function () {
    var done = this.async();

    var root = this.destinationPath(Base);

    var prompts = [{
      name: 'className',
      message: 'Name?'
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      if (props.className.length > 0) {
        this.className = _.capitalize(_.camelCase(props.className.replace(/store$/i, ''))) + 'Store';
      }
      done();
    }.bind(this));
  },

  writing: function () {

    if (this.className) {
      // create the store itself
      this.fs.copyTpl(
        this.templatePath('Store.js'),
        this.destinationPath(path.join(Base, this.className + '.js')),
        { className: this.className }
      );

      // export the store via index.js
      var index = this.destinationPath(path.join(Base, 'index.js'));

      if (this.fs.exists(index)) {

        var content = this.read(index);
        var insert = 'module.exports = require(\'./' + this.className +  '\');';
        if (content.indexOf(insert) === -1) {
          this.write(index, content.replace(content, content + '\n' + insert));
        }

      } else {

        this.fs.copyTpl(
          this.templatePath('index.js'),
          index,
          { className: this.className }
        );

      }
    }
  }
});