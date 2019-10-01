;(function($, window, undefined) {
    'use strict';
  
    var pluginName = 'show-video-popup';
  
    function Plugin(element, options) {
      this.element = $(element);
      this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
      this.init();
    }
  
    Plugin.prototype = {
      init: function() {
        var $el = this.element;
        var $showMoreBtn = $el.find('[data-show-more-btn]');

        if($(window).width() > 767) {

          // post
          $showMoreBtn.on('click', function() {
            var order = $(this).data('show-more-order'); // 2
            $el.find('[data-show-more-block]:not([data-show-more-block="' + order + '"]) [data-show-more-block-inner]').hide();
            $el.find('[data-show-more-btn]:not([data-show-more-order="' + order + '"])').removeClass('less-info-link');
            $el.find('[data-show-more-block="' + order + '"] [data-show-more-block-inner]').fadeToggle();
            $(this).toggleClass('less-info-link');
          });

          // Display "more-block" when clicking button "more-button"
          $('.banner-group [data-more-info-btn]').off('click').on('click', function() {
            $(this).toggleClass('less-info-link');
            $('.banner-group .more-info-of-banner').stop().slideToggle();
          });
        } 
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
