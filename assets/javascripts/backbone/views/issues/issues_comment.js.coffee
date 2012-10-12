class App.Views.IssuesComment extends Backbone.View
  className: 'comment'
  template : JST["backbone/templates/issues/issues_comment"]
  render: ->
    @$el.html @template(@model.attributes)
    @