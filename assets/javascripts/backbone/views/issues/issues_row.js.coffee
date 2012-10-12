class App.Views.IssuesRow extends Backbone.View
  className: 'item'
  template : JST["backbone/templates/issues/issues_row"]
  events:
    'click' : 'load'
  load : ->
    $('.items .item').removeClass('selected') #hack
    @$el.addClass('selected')
    router.navigate("/issues/#{@model.get('number')}", {
      trigger: true
    })
  render: ->
    @$el.html @template(@model.attributes)
    @