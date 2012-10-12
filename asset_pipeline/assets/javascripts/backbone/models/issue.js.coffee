class App.Models.IssueOne extends Backbone.Model
  url: ()->
    "https://api.github.com/repos/rails/rails/issues/#{@id}?callback=?"
  parse: (response)->
    response.data

class App.Models.Issue extends Backbone.Model
class App.Collections.Issues extends Backbone.Collection
  model: App.Models.Issue
  url: "https://api.github.com/repos/rails/rails/issues?callback=?"
  parse: (response, xhr) ->
    @links = response.meta.Link
    response.data

  goto: (term)->
    @setUrlFromLink(term)

  has: (term) ->
    link = _.find @link, (link)->
      link.rel == term

  more: (cb) ->
    @setUrlFromLink('next')
    @fetch
      add: true

  setUrlFromLink: (term) ->
    for link in @links
      if link[1].rel == term
        url = link[0]
        match = url.match(/page=.*/)
        parts = match[0].split('=')
        page = parts[1]

    @url = "https://api.github.com/repos/rails/rails/issues?page=#{page}&callback=?" if page