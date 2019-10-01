;(function($, window, undefined) {
    'use strict';
  
    var pluginName = 'rating';
  
    function Plugin(element, options) {
      this.element = $(element);
      this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
      this.init();
    }
  
    Plugin.prototype = {
      init: function() {
        var $el = this.element;
        var starGrey = $el.find('.star-grey');
        var starYellow = $el.find('.star-yellow');
        var giveRatingBtn = $el.find('.give-rating-btn');

        giveRatingBtn.off('click').on('click', function() {
            $(this).addClass('hidden');
            starGrey.removeClass('hidden');
            starYellow.addClass('hidden');
        });
      },
  
      destroy: function() {
        $.removeData(this.element[0], pluginName);
      }
    };
  
    $.fn[pluginName] = function(options, params) {
      return this.each(function() {
        var instance = $.data(this, pluginName);
        if (!instance) {
          $.data(this, pluginName, new Plugin(this, options));
        } else if (instance[options]) {
          instance[options](params);
        }
      });
    };
  
    $.fn[pluginName].defaults = {};
  
    $(function() {
      $('[data-' + pluginName + ']')[pluginName]({
      });
    });
  
  }(jQuery, window));
