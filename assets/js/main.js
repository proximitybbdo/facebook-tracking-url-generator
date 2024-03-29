//@ sourceMappingURL=main.map
(function() {
  var _ref;

  if ((_ref = window.FBT) == null) {
    window.FBT = {
      Events: {}
    };
  }

  FBT.Site = (function() {
    var result;

    result = '';

    function Site() {
      this.init_events();
    }

    Site.prototype.init_events = function() {
      $(document).on('goto', this.goto);
      return $('form').on('submit', {
        ref: this
      }, this.submit_form);
    };

    Site.prototype.validate = function() {
      return true;
    };

    Site.prototype.submit_form = function(e) {
      var that;

      e.preventDefault();
      that = e.data.ref;
      if (that.validate()) {
        that.generate_url();
      }
      return false;
    };

    Site.prototype.generate_url = function() {
      var base_url, url;

      base_url = this.fetch('url');
      base_url += "?app_data=";
      url = "{";
      url += '"utm_source":"' + this.fetch('source') + '",';
      url += '"utm_medium":"' + this.fetch('medium') + '",';
      url += '"utm_campaign":"' + this.fetch('campaign') + '"';
      url += "}";
      url = encodeURIComponent(url);
      result = base_url + url;
      $('#result').hide();
      $('#result').val(result);
      return this.start_progress();
    };

    Site.prototype.fetch = function(id) {
      return $("#" + id).val();
    };

    Site.prototype.start_progress = function() {
      var _this = this;

      $('.progress').show();
      $('.progress .bar').css('width', '80%');
      return $('.progress .bar').animate({
        width: '100%'
      }, 500, function() {
        $('.progress').hide();
        return $('#result').fadeIn();
      });
    };

    return Site;

  })();

  $(document).ready(function() {
    return window.site = new FBT.Site();
  });

}).call(this);
