class App.Models.IssueComment extends Backbone.Model

# Initilaize with issueId
class App.Collections.IssueComments extends Backbone.Collection
  model: App.Models.IssueComment
  url: ()->
    "https://api.github.com/repos/rails/rails/issues/#{@issueId}/comments?callback=?"
  parse: (response) ->
    response.data    