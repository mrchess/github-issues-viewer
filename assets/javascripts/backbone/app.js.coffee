window.App =
  Models: {}
  Collections: {}
  Routers: {}
  Views: {}
  Helpers : {}
  TemplateHelpers: {}

App.initialize = ->
  window.router = new App.Routers.MasterRouter()
  Backbone.history.start()