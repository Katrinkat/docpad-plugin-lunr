// Generated by CoffeeScript 1.3.3
(function() {
  var lunrdoc,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  lunrdoc = require('./lunrdoc');

  module.exports = function(BasePlugin) {
    var LunrPlugin;
    return LunrPlugin = (function(_super) {

      __extends(LunrPlugin, _super);

      function LunrPlugin() {
        var _base;
        if ((_base = this.config).lunrOutPath == null) {
          _base.lunrOutPath = '/lunr';
        }
        return LunrPlugin.__super__.constructor.apply(this, arguments);
      }

      LunrPlugin.prototype.name = 'lunr';

      LunrPlugin.prototype.extendTemplateData = function(_arg) {
        var templateData;
        templateData = _arg.templateData;
        lunrdoc.init(this.docpad);
        templateData.getLunrSearchPage = function(index, placeholder) {
          return lunrdoc.getLunrSearchPage(index, placeholder);
        };
        return templateData.getLunrSearchBlock = function(searchPage, placeholder, submit) {
          return lunrdoc.getLunrSearchBlock(searchPage, placeholder, submit);
        };
      };

      LunrPlugin.prototype.writeAfter = function() {
        var index, indexCollection, indexName, _ref;
        if (this.config.indexes) {
          _ref = this.config.indexes;
          for (indexName in _ref) {
            index = _ref[indexName];
            indexCollection = this.docpad.getCollection(index.collection);
            if (indexCollection) {
              indexCollection.forEach(function(document) {
                return lunrdoc.index(indexName, document);
              });
            }
          }
          return lunrdoc.save();
        }
      };

      return LunrPlugin;

    })(BasePlugin);
  };

}).call(this);
