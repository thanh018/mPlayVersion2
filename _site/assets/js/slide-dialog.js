;(function($, window, undefined) {
    'use strict';
  
    var pluginName = 'slide-dialog';
  
    function Plugin(element, options) {
      this.element = $(element);
      this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
      this.init();
    }
  
    Plugin.prototype = {
      init: function() {
        var $el = this.element;
        var $next = $el.find('[data-dialog-next]');

        function runSlick(){
            $next.slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: false,
                swipe: false,
                loop: false,
                speed: 300,
                arrows: true,
                dots: true,
                responsive: [
                  {
                    breakpoint: 767,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1,
                      arrows: false,
                    }
                  }
                ]
            }); 
        }
        
        var $load_more_btn = $('[data-load-more-btn]');
        var $dialog_btn = $('[data-dialog-btn]');
        
        $load_more_btn.on('click', function() {
          $dialog_btn.trigger('click');
        });

        $('.dialog-popup').on('show.bs.modal', function (event) {
          setTimeout(function() {
            runSlick();
          }, 200);
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
