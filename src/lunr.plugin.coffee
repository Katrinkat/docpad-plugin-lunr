lunrdoc = require('./lunrdoc')

# Export Plugin
module.exports = (BasePlugin) ->
  # Define Plugin
  class LunrPlugin extends BasePlugin
    # Plugin name
    name: 'lunr'
    constructor: ->
      # use custom out path or default
      @config.lunrOutPath ?= '/lunr'
      return super
    
    # Provide some helper functions
    extendTemplateData: ({templateData}) ->
      lunrdoc.init(@docpad)
      # helper functions for printing input boxes
      templateData.getLunrSearchPage = (index, placeholder) -> 
        return lunrdoc.getLunrSearchPage(index, placeholder)
      templateData.getLunrSearchBlock = (searchPage, placeholder, submit) ->
        return lunrdoc.getLunrSearchBlock(searchPage, placeholder, submit)

    # hook into the writeAfter event for generating the index/files
    writeAfter: ->
      if (@config.indexes)
        for indexName, index of @config.indexes
          indexCollection = @docpad.getCollection(index.collection)
          if indexCollection
            indexCollection.forEach (document) ->
              lunrdoc.index(indexName, document)
        lunrdoc.save()
