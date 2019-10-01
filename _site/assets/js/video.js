;(function($, window, undefined) {
    'use strict';
  
    var pluginName = 'video';
  
    function Plugin(element, options) {
      this.element = $(element);
      this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
      this.init();
    }
  
    Plugin.prototype = {
      init: function() {
        var el = this.element;
        var playVideo = el.find('.btn-play');
        var closeVideo = el.find('.video-close');
        var videoShowBlock = el.find('.video-show-block');
        var youtubeId = videoShowBlock.attr('data-youtubeId');

        playVideo.on('click', function() {
          videoShowBlock.append('<div class="video-show"></div>');
          videoShowBlock.addClass('overlay');
          var videoShow = videoShowBlock.find('.video-show');
          closeVideo.removeClass('d-none');

          new window.YT.Player(videoShow[0], {
            videoId: youtubeId,
            events: {
              'onReady': (e) => {
                e.target.playVideo();
              }
            },
            playerVars: {
              'autoplay': 1,
              'playsinline': 1,
              'mute': 1
            },
          });
        });

        closeVideo.off('click').on('click', (e) => {
          $(e.currentTarget).addClass('d-none');
          $('iframe.video-show').remove();
          videoShowBlock.removeClass('overlay');
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
