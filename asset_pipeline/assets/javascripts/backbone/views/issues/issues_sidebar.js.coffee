class App.Views.IssuesSidebar extends Backbone.View
  el: '.sidebar'
  events: 
    'click .more' : 'more'

  initialize: ->
    @collection = new App.Collections.Issues()
    @collection.bind('add', @addOne)

  fetch: ->
    @$items.empty()
    @collection.fetch
      add: true

  ###
  # Toggle pagination buttons
  togglePagination: ->
    $('.paginate').each (index, el)=>
      el = $(el)
      type = el.attr('data-type')
      el.prop('disabled', !@collection.has(type))
  ###
  more: () ->
    @collection.more()
  
  addOne: (model) =>
    view = new App.Views.IssuesRow({ model: model })
    @$items.append view.render().el

  render: ->
    @$items = @$el.find('.items')

    @