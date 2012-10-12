class App.Routers.MasterRouter extends Backbone.Router
  routes: 
    ".*": "index" 
    "issues/:id" : "showIssue"
  initialize: ->
    @content = $(".content")
    view = new App.Views.IssuesSidebar()
    view.render()
    view.fetch()

  before : ->
  after :->
  showIssue : (number) ->
    model = new App.Models.IssueOne({id: number})
    model.fetch
      success: () =>
        @content.empty()
        view = new App.Views.IssuesShow({ model: model })
        @content.append view.render().el
  index : ->
    @content.empty()