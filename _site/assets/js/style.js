(function($) {
	/* =============================================== */
	/* ============= Document Ready ================== */
	/* =============================================== */
	$(document).ready(function(){
		
		AOS.init();


		/* ============= Menu ================== */
		$('.burger_menu i').click(function(){
			$(this).toggleClass('fa-bars');	
			$(this).toggleClass('fa-times');	
			$('nav').toggleClass('open');
		});


		/* ============= Testimonial Slider ================== */
		$('.testimonial-slider').slick();


		/* ============= FAQ ================== */
		$(".faq").click(function(){
			$(this).find('.answer').slideToggle("fast");
			if($(this).hasClass('active')) {
				$(this).removeClass('active');
			} else {
				$(this).addClass('active');
			}
			$(this).find('i').toggle();
		});
		
		
		$("input[type=file]").change(function () {
          var fieldVal = event.target.files[0].name;
          if (fieldVal != undefined || fieldVal != "") {
            $(this).parent().parent().find(".custom-file-label").text(fieldVal);
          }
        });




		$('a[href*="#"]')
		.not('[href="#"]')
		.not('[href="#0"]')
		.click(function(event) {
			console.log(location.pathname.replace(/^\//, ''));
			console.log(this.pathname.replace(/^\//, '')); 
			if (
				location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
				&& 
				location.hostname == this.hostname
				) {
				var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				event.preventDefault();
				$('html, body').animate({
					scrollTop: target.offset().top
				}, 1000, function() {


				});
			}
		}
	});


	});
})(jQuery);