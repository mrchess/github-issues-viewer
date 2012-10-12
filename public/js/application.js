(function() {

  window.App = {
    Models: {},
    Collections: {},
    Routers: {},
    Views: {},
    Helpers: {},
    TemplateHelpers: {}
  };

  App.initialize = function() {
    window.router = new App.Routers.MasterRouter();
    return Backbone.history.start();
  };

}).call(this);
// Simple before and after filter for backbone router
// https://github.com/FLOChip/backbone_router_filter
(function() {
  _.extend(Backbone.Router.prototype, Backbone.Events, {
    before: function(){},
    after : function(){},
    route : function(route, name, callback) {
      Backbone.history || (Backbone.history = new Backbone.History);
      if (!_.isRegExp(route)) route = this._routeToRegExp(route);
      Backbone.history.route(route, _.bind(function(fragment) {
        var args = this._extractParameters(route, fragment);
        if( _(this.before).isFunction() ){
          this.before.apply(this, args);
        }
        callback.apply(this, args);
        if( _(this.after).isFunction() ){
          this.after.apply(this, args);
        }
        this.trigger.apply(this, ['route:' + name].concat(args));
      }, this));
    }
  });
}).call(this);
(function() {
  var _base, _base2, _base3, _base4, _base5, _base6;

  window.HAML || (window.HAML = {});

  (_base = window.HAML).escape || (_base.escape = function(text) {
    return ("" + text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  });

  (_base2 = window.HAML).cleanValue || (_base2.cleanValue = function(text) {
    if (text === null || text === void 0) {
      return '';
    } else {
      return text;
    }
  });

  (_base3 = window.HAML).extend || (_base3.extend = function(globals, locals) {
    if (typeof jQuery !== "undefined" && jQuery !== null ? jQuery.extend : void 0) {
      return jQuery.extend({}, globals, locals);
    } else if (typeof _ !== "undefined" && _ !== null ? _.extend : void 0) {
      return _.extend({}, globals, locals);
    } else if (typeof Zepto !== "undefined" && Zepto !== null ? Zepto.extend : void 0) {
      return Zepto.extend(Zepto.extend({}, globals), locals);
    } else if (Object.append) {
      return Object.append(Object.append({}, globals), locals);
    } else if (Object.extend) {
      return Object.extend(Object.extend({}, globals), locals);
    } else {
      return locals;
    }
  });

  (_base4 = window.HAML).globals || (_base4.globals = function() {
    return {};
  });

  (_base5 = window.HAML).context || (_base5.context = function(locals) {
    return HAML.extend(HAML.globals(), locals);
  });

  (_base6 = window.HAML).preserve || (_base6.preserve = function(text) {
    return text.replace(/\\n/g, '&#x000A;');
  });

  ({
    surround: function(start, end, fn) {
      return start + fn() + end;
    },
    succeed: function(end, fn) {
      return fn() + end;
    },
    precede: function(start, fn) {
      return start + fn();
    }
  });

}).call(this);
(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  App.Models.IssueOne = (function(_super) {

    __extends(IssueOne, _super);

    function IssueOne() {
      IssueOne.__super__.constructor.apply(this, arguments);
    }

    IssueOne.prototype.url = function() {
      return "https://api.github.com/repos/rails/rails/issues/" + this.id + "?callback=?";
    };

    IssueOne.prototype.parse = function(response) {
      return response.data;
    };

    return IssueOne;

  })(Backbone.Model);

  App.Models.Issue = (function(_super) {

    __extends(Issue, _super);

    function Issue() {
      Issue.__super__.constructor.apply(this, arguments);
    }

    return Issue;

  })(Backbone.Model);

  App.Collections.Issues = (function(_super) {

    __extends(Issues, _super);

    function Issues() {
      Issues.__super__.constructor.apply(this, arguments);
    }

    Issues.prototype.model = App.Models.Issue;

    Issues.prototype.url = "https://api.github.com/repos/rails/rails/issues?callback=?";

    Issues.prototype.parse = function(response, xhr) {
      this.links = response.meta.Link;
      return response.data;
    };

    Issues.prototype.goto = function(term) {
      return this.setUrlFromLink(term);
    };

    Issues.prototype.has = function(term) {
      var link;
      return link = _.find(this.link, function(link) {
        return link.rel === term;
      });
    };

    Issues.prototype.more = function(cb) {
      this.setUrlFromLink('next');
      return this.fetch({
        add: true
      });
    };

    Issues.prototype.setUrlFromLink = function(term) {
      var link, match, page, parts, url, _i, _len, _ref;
      _ref = this.links;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        link = _ref[_i];
        if (link[1].rel === term) {
          url = link[0];
          match = url.match(/page=.*/);
          parts = match[0].split('=');
          page = parts[1];
        }
      }
      if (page) {
        return this.url = "https://api.github.com/repos/rails/rails/issues?page=" + page + "&callback=?";
      }
    };

    return Issues;

  })(Backbone.Collection);

}).call(this);
(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  App.Models.IssueComment = (function(_super) {

    __extends(IssueComment, _super);

    function IssueComment() {
      IssueComment.__super__.constructor.apply(this, arguments);
    }

    return IssueComment;

  })(Backbone.Model);

  App.Collections.IssueComments = (function(_super) {

    __extends(IssueComments, _super);

    function IssueComments() {
      IssueComments.__super__.constructor.apply(this, arguments);
    }

    IssueComments.prototype.model = App.Models.IssueComment;

    IssueComments.prototype.url = function() {
      return "https://api.github.com/repos/rails/rails/issues/" + this.issueId + "/comments?callback=?";
    };

    IssueComments.prototype.parse = function(response) {
      return response.data;
    };

    return IssueComments;

  })(Backbone.Collection);

}).call(this);
(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  App.Routers.MasterRouter = (function(_super) {

    __extends(MasterRouter, _super);

    function MasterRouter() {
      MasterRouter.__super__.constructor.apply(this, arguments);
    }

    MasterRouter.prototype.routes = {
      ".*": "index",
      "issues/:id": "showIssue"
    };

    MasterRouter.prototype.initialize = function() {
      var view;
      this.content = $(".content");
      view = new App.Views.IssuesSidebar();
      view.render();
      return view.fetch();
    };

    MasterRouter.prototype.before = function() {};

    MasterRouter.prototype.after = function() {};

    MasterRouter.prototype.showIssue = function(number) {
      var model,
        _this = this;
      model = new App.Models.IssueOne({
        id: number
      });
      return model.fetch({
        success: function() {
          var view;
          _this.content.empty();
          view = new App.Views.IssuesShow({
            model: model
          });
          return _this.content.append(view.render().el);
        }
      });
    };

    MasterRouter.prototype.index = function() {
      return this.content.empty();
    };

    return MasterRouter;

  })(Backbone.Router);

}).call(this);
(function() {

  App.TemplateHelpers = {
    stateLabel: function(state) {
      var html;
      switch (state) {
        case 'open':
          html = '<span class="open">Open</span>';
          break;
        case 'closed':
          html = '<span class="closed">Closed</span>';
      }
      return html;
    },
    comment: function(text) {
      text = App.TemplateHelpers.codify(text);
      text = App.TemplateHelpers.userfy(text);
      return text;
    },
    codify: function(text) {
      var part, parts, temp, _i, _len;
      parts = text.match(/`\S+`/g);
      if (!parts) return text;
      for (_i = 0, _len = parts.length; _i < _len; _i++) {
        part = parts[_i];
        temp = part.substr(1, part.length - 2);
        temp = "<code>" + temp + "</code>";
        text = text.replace(part, temp);
      }
      return text;
    },
    userfy: function(text) {
      var login, part, parts, temp, _i, _len;
      parts = text.match(/@[a-zA-Z0-9-]+\s/g);
      if (!parts) return text;
      for (_i = 0, _len = parts.length; _i < _len; _i++) {
        part = parts[_i];
        login = $.trim(part.substr(1, part.length));
        temp = "<a href='http://github.com/" + login + "' target='_blank'>" + part + "</a>";
        text = text.replace(part, temp);
      }
      return text;
    }
  };

}).call(this);
(function() {
  var _ref;
  if ((_ref = window.JST) == null) {
    window.JST = {};
  }
  window.JST['backbone/templates/issues/issues_comment'] = function(context) {
    return (function() {
      var $c, $e, $o;
      $e = window.HAML.escape;
      $c = window.HAML.cleanValue;
      $o = [];
      $o.push("<p>\n  <strong>");
      $o.push("    " + $e($c(this.user.login)));
      $o.push("  </strong>\n  says:\n</p>\n<p class='body'>");
      $o.push("  " + $c(App.TemplateHelpers.comment(this.body)));
      $o.push("</p>");
      return $o.join("\n").replace(/\s(\w+)='true'/mg, ' $1').replace(/\s(\w+)='false'/mg, '');
    }).call(context);
  };
}).call(this);
(function() {
  var _ref;
  if ((_ref = window.JST) == null) {
    window.JST = {};
  }
  window.JST['backbone/templates/issues/issues_row'] = function(context) {
    return (function() {
      var $c, $e, $o, label, _i, _len, _ref2;
      $e = window.HAML.escape;
      $c = window.HAML.cleanValue;
      $o = [];
      $o.push("<span class='number'>");
      $o.push("  " + $e($c("#" + this.number)));
      $o.push("</span>\n<div class='info'>\n  <img class='avatar' src='" + ($e($c(this.user.avatar_url))) + "'>\n  <div class='user'>\n    <h4>");
      $o.push("      " + $e($c(this.user.login)));
      $o.push("    </h4>\n  </div>\n  <div class='title'>");
      $o.push("    " + $e($c(_.truncate(this.title, 30))));
      $o.push("  </div>\n  <div class='clearfix'></div>\n</div>\n<div class='body'>");
      $o.push("  " + $e($c(_.truncate(this.body, 70))));
      $o.push("</div>\n<div class='labels'>");
      _ref2 = this.labels;
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        label = _ref2[_i];
        $o.push("  <span class='label' style='background-color: #" + label.color + "'>");
        $o.push("    " + $e($c(label.name)));
        $o.push("  </span>");
      }
      $o.push("</div>");
      return $o.join("\n").replace(/\s(\w+)='true'/mg, ' $1').replace(/\s(\w+)='false'/mg, '');
    }).call(context);
  };
}).call(this);
(function() {
  var _ref;
  if ((_ref = window.JST) == null) {
    window.JST = {};
  }
  window.JST['backbone/templates/issues/issues_show'] = function(context) {
    return (function() {
      var $c, $e, $o, label, _i, _len, _ref2;
      $e = window.HAML.escape;
      $c = window.HAML.cleanValue;
      $o = [];
      $o.push("<div class='issue'>\n  <div class='header lrpad'>\n    <div class='title'>\n      <h3>");
      $o.push("        " + $e($c(this.title)));
      $o.push("        <small>");
      $o.push("          " + $e($c("#" + this.number)));
      $o.push("        </small>\n      </h3>\n    </div>\n    <div class='labels'>");
      _ref2 = this.labels;
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        label = _ref2[_i];
        $o.push("      <span class='label' style='background-color: #" + label.color + "'>");
        $o.push("        " + $e($c(label.name)));
        $o.push("      </span>");
      }
      $o.push("    </div>\n    <div class='state'>\n      <h4>");
      $o.push("        " + $c(App.TemplateHelpers.stateLabel(this.state)));
      $o.push("      </h4>\n    </div>\n  </div>\n  <hr>\n  <div class='lrpad'>\n    <section class='issue'>\n      <strong>");
      $o.push("        " + $e($c(this.user.login)));
      $o.push("      </strong>\n      raised:\n      <div class='body'>\n        <p>");
      $o.push("          " + $c(App.TemplateHelpers.comment(this.body)));
      $o.push("        </p>\n      </div>\n    </section>\n    <br>\n    <section>\n      <h3>");
      $o.push("        " + $e($c("Comments (" + this.comments + ")")));
      $o.push("      </h3>\n      <div class='comments'></div>\n    </section>\n  </div>\n</div>");
      return $o.join("\n").replace(/\s(\w+)='true'/mg, ' $1').replace(/\s(\w+)='false'/mg, '');
    }).call(context);
  };
}).call(this);
(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  App.Views.IssuesComment = (function(_super) {

    __extends(IssuesComment, _super);

    function IssuesComment() {
      IssuesComment.__super__.constructor.apply(this, arguments);
    }

    IssuesComment.prototype.className = 'comment';

    IssuesComment.prototype.template = JST["backbone/templates/issues/issues_comment"];

    IssuesComment.prototype.render = function() {
      this.$el.html(this.template(this.model.attributes));
      return this;
    };

    return IssuesComment;

  })(Backbone.View);

}).call(this);
(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  App.Views.IssuesRow = (function(_super) {

    __extends(IssuesRow, _super);

    function IssuesRow() {
      IssuesRow.__super__.constructor.apply(this, arguments);
    }

    IssuesRow.prototype.className = 'item';

    IssuesRow.prototype.template = JST["backbone/templates/issues/issues_row"];

    IssuesRow.prototype.events = {
      'click': 'load'
    };

    IssuesRow.prototype.load = function() {
      $('.items .item').removeClass('selected');
      this.$el.addClass('selected');
      return router.navigate("/issues/" + (this.model.get('number')), {
        trigger: true
      });
    };

    IssuesRow.prototype.render = function() {
      this.$el.html(this.template(this.model.attributes));
      return this;
    };

    return IssuesRow;

  })(Backbone.View);

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  App.Views.IssuesShow = (function(_super) {

    __extends(IssuesShow, _super);

    function IssuesShow() {
      this.addComment = __bind(this.addComment, this);
      IssuesShow.__super__.constructor.apply(this, arguments);
    }

    IssuesShow.prototype.template = JST["backbone/templates/issues/issues_show"];

    IssuesShow.prototype.initialize = function() {
      this.commentsCollection = new App.Collections.IssueComments();
      this.commentsCollection.issueId = this.model.get('number');
      return this.commentsCollection.bind('add', this.addComment);
    };

    IssuesShow.prototype.addComment = function(model) {
      var view;
      view = new App.Views.IssuesComment({
        model: model
      });
      return this.$el.find('.comments').append(view.render().el);
    };

    IssuesShow.prototype.render = function() {
      this.$el.html(this.template(this.model.attributes));
      this.commentsCollection.fetch({
        add: true
      });
      return this;
    };

    return IssuesShow;

  })(Backbone.View);

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  App.Views.IssuesSidebar = (function(_super) {

    __extends(IssuesSidebar, _super);

    function IssuesSidebar() {
      this.addOne = __bind(this.addOne, this);
      IssuesSidebar.__super__.constructor.apply(this, arguments);
    }

    IssuesSidebar.prototype.el = '.sidebar';

    IssuesSidebar.prototype.events = {
      'click .more': 'more'
    };

    IssuesSidebar.prototype.initialize = function() {
      this.collection = new App.Collections.Issues();
      return this.collection.bind('add', this.addOne);
    };

    IssuesSidebar.prototype.fetch = function() {
      this.$items.empty();
      return this.collection.fetch({
        add: true
      });
    };

    /*
      # Toggle pagination buttons
      togglePagination: ->
        $('.paginate').each (index, el)=>
          el = $(el)
          type = el.attr('data-type')
          el.prop('disabled', !@collection.has(type))
    */

    IssuesSidebar.prototype.more = function() {
      return this.collection.more();
    };

    IssuesSidebar.prototype.addOne = function(model) {
      var view;
      view = new App.Views.IssuesRow({
        model: model
      });
      return this.$items.append(view.render().el);
    };

    IssuesSidebar.prototype.render = function() {
      this.$items = this.$el.find('.items');
      return this;
    };

    return IssuesSidebar;

  })(Backbone.View);

}).call(this);
// This is a manifest file that'll be compiled into including all the files listed below.
// Add new JavaScript/Coffee code in separate files in this directory and they'll automatically
// be included in the compiled file accessible from http://example.com/assets/application.js
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//


;
