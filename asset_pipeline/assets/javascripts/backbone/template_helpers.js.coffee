App.TemplateHelpers =
  stateLabel: (state) ->
    switch state
      when 'open'
        html = '<span class="open">Open</span>'
      when 'closed'
        html = '<span class="closed">Closed</span>'
    html

  comment: (text) ->
    text = App.TemplateHelpers.codify(text)
    text = App.TemplateHelpers.userfy(text)
    text

  # convert ` to <code> tags
  codify: (text) ->
    parts = text.match(/`\S+`/g)
    return text if !parts
    for part in parts
      temp = part.substr(1, part.length-2)
      temp = "<code>#{temp}</code>"
      text = text.replace(part, temp)
    text

  # convert @usernames to links
  userfy: (text) ->
    parts = text.match(/@[a-zA-Z0-9-]+\s/g)
    return text if !parts
    for part in parts
      login = $.trim(part.substr(1, part.length))
      temp = "<a href='http://github.com/#{login}' target='_blank'>#{part}</a>"
      text = text.replace(part, temp)
    text    



