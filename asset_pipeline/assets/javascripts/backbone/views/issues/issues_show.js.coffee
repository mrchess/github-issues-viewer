class App.Views.IssuesShow extends Backbone.View
  template : JST["backbone/templates/issues/issues_show"]
  initialize: ->
    @commentsCollection = new App.Collections.IssueComments()
    @commentsCollection.issueId = @model.get('number')
    @commentsCollection.bind('add', @addComment)

  addComment: (model) =>
    view = new App.Views.IssuesComment({ model: model })
    @$el.find('.comments').append(view.render().el)

  render: ->
    @$el.html @template(@model.attributes)
    
    @commentsCollection.fetch
      add: true
    
    @