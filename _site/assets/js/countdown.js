;(function($, window, undefined) {
    'use strict';
  
    var pluginName = 'countdown-custom';
  
    function Plugin(element, options) {
      this.element = $(element);
      this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
      this.init();
    }
  
    Plugin.prototype = {
      init: function() {
        var $el = this.element,
        $chevronDown = $el.find('.fa-chevron-down'),
        $hour1 = $el.find(".hour-1"),
        $hour2 = $el.find(".hour-2"),
        $minute1 = $el.find(".minute-1"),
        $minute2 = $el.find(".minute-2"),
        $second1 = $el.find(".second-1"),
        $second2 = $el.find(".second-2");
        var currentDay = new Date();
        var targetDay = addDay(currentDay, 2);

        var targetDayObj = new Date(targetDay);
        var targetDayIsoFormat = targetDayObj.toISOString();

        function addDay(date, n) {
            var date = new Date(date);
            return new Date(date.setDate(date.getDate() + n));   
        }

        function renderCountdownUnit(selector1, selector2, number) {
            var firstNumber;
            var secondNumber;
            if(number < 10) {
                firstNumber = 0;
                secondNumber = number;
            } else {
                firstNumber = Math.floor(number / 10);
                secondNumber = number - firstNumber*10;
            }

            selector1.html(firstNumber);
            selector2.html(secondNumber);
        }

        function startCountdown() {
            $el.countdown(moment(targetDayIsoFormat).format('YYYY/MM/DD HH:mm:ss'), function(event) {
                var offset = event.offset;
                var hours = offset.totalHours;
                var minutes = offset.minutes;
                var seconds = offset.seconds;

                renderCountdownUnit($hour1, $hour2, hours);
                renderCountdownUnit($minute1, $minute2, minutes);
                renderCountdownUnit($second1, $second2, seconds);
            });
        }
        startCountdown();

        if($(window).width() > 767) {
          var distanceRightToCountdown = $(window).width() - $("header nav").offset().left - $("header nav").width();
          $el.css("right", distanceRightToCountdown);
        }

        $chevronDown.on('click', function() {
          $el.find('.countdown-component-inner').slideToggle();
          $(this).toggleClass("fa-chevron-up");
          $(this).toggleClass("fa-chevron-down");
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
