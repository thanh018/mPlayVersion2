;(function($, window, undefined) {
    'use strict';
  
    var pluginName = 'share';
  
    function Plugin(element, options) {
      this.element = $(element);
      this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
      this.init();
    }
  
    Plugin.prototype = {
      init: function() {
        var $el = this.element;
        var vafourite = $el.find('.add-to-vafourite');
        var vafouriteClicked = $el.find('.add-to-vafourite-clicked');
        var shareLink = $el.find('.share-link');

        vafourite.off('click').on('click', function() {
            $(this).addClass('hidden');
            vafouriteClicked.removeClass('hidden');
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
