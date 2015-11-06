$(document).ready(function () {

	//auto height
	$('.items .card__item').equalHeight();
	$('.js-slider, .js-slider-arrivals').on('init', function(){
		setTimeout(function(){
			$('.items .card__item').equalHeight();
		})
	})


	//input search
	$('.js-search-field').each(function(){
		var this_ = $(this);

		this_.focus(function(){
			var this_ = $(this),
				bigs = this_.parents('.js-search.search-big');
			//var time = setTimeout(function(){
			 	$(this).attr("placeholder", " ");
			 	bigs.addClass('focus');
			//},150);
			/*$(document).on('click', function(){
				clearTimeout(time);
			});*/
		});
		this_.blur(function(){
			var bigs = this_.parents('.js-search.search-big');			
			$(this).attr("placeholder", "Поиск по каталогу");
			bigs.removeClass('focus');
		});

		this_.on('input', function(){
			var value = $(this).val(),
				reset = this_.parents('.js-search').find('.js-reset'),
				find = this_.parents('.js-search').find('.js-find');
			if(value.length > 0) {
				reset.fadeIn(150);
				find.fadeOut(150);

			} else {
				reset.fadeOut(150);
				find.fadeIn(150);
			}
		});

		
		$('.js-reset').on('click', function(){
			$(this).parent().find('.js-search-field').val('')
			$(this).fadeOut(150);
			$(this).parents('.js-search').find('.js-find').fadeIn(150);
		});
	});

	//number plus/minus
	function number() {
		var number = $('.js-number');
		number.each(function(){
			var max_number = $(this).attr("data-max-number");
			var input = $(this).find("input");
			var plus = $(this).find(".js-plus-number");
			var minus = $(this).find(".js-minus-number");
			var add = $(this).parent().find('.js-add');
			plus.on("click", function(){
				var val = +(input.val());
				if (val >= max_number) {
					return false
				}
				else {
					val += 1;
					input.val(val);
				};				
				input.trigger('change');
			});
			minus.on("click", function(){
				var val = +(input.val());
				if (val > 0) {
					val -= 1;
					input.val(val);
				};
				input.trigger('change');
				return false;
			});
			input.on("change", function(){
				var val = +$(this).val();
				if (val > max_number) {
					val = max_number;
					$(this).val(val);
				}
				if (val == '') {
					val = 0;
					$(this).val(val);
				}
			});
		});
	}
	number();

	//price
	$('.js-price').each(function(){
		$(this).find('.js-price-input').on('change', function(){
			$(this).parents('.js-price').find('.js-price-text').text($(this).val()*$(this).parents('.js-price').find('.js-price-text').data('price'));
			
			if( $(this).val() === 0) {
				$(this).parents('.js-price').find('.js-price-text').text($(this).parents('.js-price').find('.js-price-text').data('price'));
			}
			$('.js-price-text').map(function(){
				$(this).text($(this).text().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
			})
		});
	});
	$(window).ready(function() {
		$('.js-price-text').map(function() {
			$(this).text($(this).text().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
		});
	})

	//add to card
	$('.js-add').on('click', function(){
		var add = $(this),
			input = $(this).parent().find('.js-price-input'),
			box = $(this).parents('.js-price').find('.btn_box'),
			price = $(this).parents('.js-price').find('.js-price-text'),
			price_val = $(this).parents('.js-price').find('.js-price-text').data('price');
		if (input.val() == 0) {
			return false
		} else {
			box.addClass('add');
		}
		setTimeout(function(){
			box.removeClass('add');
			input.val(0);
			//input.trigger('change', function(){
				price.text(price_val)
				price.map(function(){
					$(this).text($(this).text().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
				});
				//$(this).parents('.js-price').find('.js-price-text').text($(this).parents('.js-price').find('.js-price-text').data('price'));
			//})			
		}, 3000);
	});

	//AUTO RESIZE TEXTAREA
	autosize($('.txt__space'));


	//POPUP
	function Popups(){
		var duration = 300,
			popupSelector = $('.popup__wrap'),
			innerSelector = $('.popup'),
			frame = $('html');
		
		$('.js-popup-link').on('click', function(event){
			var popup = $(this).data('href');

			frame.find('body').css('overflow', "hidden");

			$('[data-popup="'+popup+'"]').fadeIn({
				duration: duration,
				complete: function(){
					$(this).addClass("is-visible");
				}
			});
			event.stopPropagation();
		});

		$(".popup").on("click", function(event){
			event.stopPropagation();
		});

		$(".js-close, .js-popup").on("click", function(){
			frame.find('body').css('overflow', "visible");		
			if(!popupSelector.hasClass('is-visible')) return;
			
			popupSelector
				.removeClass("is-visible")
				.delay(duration)
				.fadeOut({
					duration: duration
				});
	    });
	};
	Popups();



	//FORM VALIDATOR
	var form_validate = $('.js-validate');
	if (form_validate.length) {
		form_validate.each(function () {
			var form_this = $(this);
			$.validate({
				modules : 'security',
				form : form_this,
				borderColorOnError : true,
				scrollToTopOnError : false,
				onValidate: function($form){
					if($('.ms-drop').find('li.selected').length) {
						$('.ms-choice').css('border-color', "#e9eef2");
						$('.ms-drop').parents('.field__body').removeClass('has-error');
						$('.ms-drop').parents('.field__body').addClass('has-success');
					}else {
						$('.ms-choice').css('border-color', "#fd8787");
						$('.ms-drop').parents('.field__body').addClass('has-error').removeClass('has-success');
					}
				},
				onSuccess: function($form){
					if(!$('.selects').parents('.field__body').hasClass('has-success')){
						return false
					}
				}
			});
		});
	};

	//DROP DOWN MENU
	function dropdown() {
		var $menu = $('.navigation').find('nav > ul'),
			$items = $menu.find('.point'),
			$delay = 0;

		$items.each(function(){
			console.log($(this))
			var $this = $(this),
				$link = $this.find('> a');

			$this.bind('mouseenter', function(){
				$this.addClass('olo');
				$(this).find('.drop__box').stop(true,true).fadeIn();
			}).bind('mouseleave', function(){
				$this.removeClass('olo');
				$(this).find('.drop__box').stop(true,true).hide();
			});
		})
	};
	dropdown();

	$('.js-suggest-list').each(function(){
		$(this).jScrollPane({
			autoReinitialise: true,
			verticalGutter: 15
		});
	});
	// $('.js-suggest-list').each(function() {
	//  	var api = $(this).data('jsp'),
	//  		throttleTimeout;
	//  	$(window).bind('resize', function() {
	//  		if (!throttleTimeout) {
	//  			throttleTimeout = setTimeout(function() {
	//  				api.reinitialise();
	//  				throttleTimeout = null;
	//  			},50);
	//  		}
	//  	});
	//  });


	//fake header
	function fakePrice() {
		var fakeBox = $('.fake__header');

		fakeBox.sticky({topSpacing:0});
		fakeBox.css("opacity", 1);
	};
	fakePrice();

	//TABS
	function tab() {
		$(".js-tab").each(function(){
			var tab_link = $(this).find("a"),
				tab_item = $(this).find("li"),
				index = tab_link.data("href"),
				parents = $(this).parents(".js-tab_group"),
				tab_cont = parents.find(".js-tab-cont");

			tab_link.on("click", function() {
				var index = $(this).data("href");
				var activeTab = $(this).parents(".js-tab_group").find("."+index);
				$('.js-tab-item').removeClass("is-active");
				$(this).parent().addClass("is-active");
				tab_cont.fadeOut(0).removeClass('visible');
				setTimeout(function(){
        	   		parents.find("."+index).addClass('visible')
        		}, 10);
				parents.find("."+index).show().find('.js-slider').slick('setPosition');
        	   	autoHeight();
				return false;
			});
			tab_item.first().addClass("is-active");
			parents.find("."+index).show();
			setTimeout(function(){
        	   		parents.find("."+index).addClass('visible')
        	}, 10);
		});
	}
	tab();

	//SLICK SLIDER
	function slickInit() {
		var slider = $('.js-slider');

		if (slider.length) {
			slider.slick({
				slidesToShow: 6,
				slidesToScroll: 6,
				infinite: false,
				swipe: false,
				variableWidth: true,
				responsive: [
					{
						breakpoint: 1279,
						settings: {
							slidesToShow: 5
						}
					}
				]
			})
		};

		var slider_banner = $('.js-banner-slider');

		if (slider_banner.length) {
			slider_banner.slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: true,
				autoplay: true,
				speed: 500,
				swipe: false
			})
		};

		var slider_arrivals = $('.js-slider-arrivals');

		if (slider_arrivals.length) {
			slider_arrivals.slick({
				slidesToShow: 5,
				slidesToScroll: 5,
				infinite: false,
				swipe: false,
				variableWidth: true,
				responsive: [
					{
						breakpoint: 1279,
						settings: {
							slidesToShow: 4
						}
					}
				]
			})
		};

		var gallery_box = $('.js-gallery-box'),
			gallery_thumbnails = $('.js-gallery-thumbnails');

		if (gallery_box.length && gallery_thumbnails.length) {

			gallery_box.on('afterCgange')

			gallery_box.slick({
				arrows:false,
				asNavFor:'.js-gallery-thumbnails',
				slidesToShow: 1,
				slidesToScroll: 1,
				fade: true,
				swipe: false
			});

			gallery_thumbnails.slick({
				arrows: false,
				slidesToShow: 4,
				slidesToScroll: 1,
				asNavFor:'.js-gallery-box',
				focusOnSelect: true,
				dots: false,
				arrows: false,
				variableWidth: true,
				swipe: false
			});
		}

	};
	slickInit();

	//ANIMATE HEIGHT IN SLIDER ITEMS
	function autoHeight(){
		$('.js-hover').each(function(){
			var inn = $(this).find('.title_in'),
				inn_height = inn.height(),
				title = inn.closest('.js-title'),
				title_height = title.height(),
				link_hover = $(this),
				slice_b = $(this).find('.btn_box'),
				chars = $(this).find('.char'),
				compare = $(this).find('.compare'),
				duration = 300,
				price = $(this).find('.js-price');
			
			link_hover.hover(
				function(){
					$(this).addClass('actives');
					/*title.stop().animate({
					'max-height': inn_height
					});*/
					slice_b.stop(true,true).show();
					chars.stop(true,true).show();
					compare.stop(true,true).show();
				},
				function(event){
					$(this).removeClass('actives');
					
					
					//if ($(this).parent().hasClass('catalog_cover')) {
						/*slice_b.stop().hide();
						chars.stop().hide();
						compare.stop().hide();
						title.stop().animate({
							'max-height': title_height
						}, 0);
					/*} else {*/
						slice_b.stop().hide();
						chars.stop().hide();
						compare.stop().hide();
						/*title.stop().animate({
							'max-height': title_height
						});*/
					/*}*/
					var add = $(event.target),
						input = add.find('.js-price-input'),
						price_val = add.find('.js-price-text').data('price');
						p_val = add.find('.js-price-text');
					
					input.val(0);
					p_val.html(price_val);
					p_val.map(function(){
						$(this).text($(this).text().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
					});
				}
			);
			price.on('click', function(event) {
				event.stopPropagation();
				return false
			})
		});		
	};
	autoHeight();

	//SORTING
	$('.js-sorting-item').on('click', function(){
		var this_ = $(this),
			parent = this_.parents('.js-sorting'),
			item = parent.find('.js-sorting-item'),
			active = ('is-active'),
			activeTop = ('is-active-top');
		if(!this_.hasClass(active)) {
			item.removeClass(active).removeClass(activeTop);
			this_.addClass(active);
		} else if(!this_.hasClass(activeTop)) {
			this_.removeClass(active).toggleClass(activeTop);
		}
	});

	//SELECTS
	if($('.multiple-select').length){
		$('.js-single-select').multipleSelect({
			width: '100%',
			single: true,
			onClose: function () {
				$('.ms-choice').removeClass('is-active');
				if($('.ms-drop').find('li.selected').length) {
					$('.ms-choice').css('border-color', "#e9eef2");
					$('.ms-drop').parents('.field__body').removeClass('has-error');
					$('.ms-drop').parents('.field__body').addClass('has-success');
				}else {
					$('.ms-choice').css('border-color', "#fd8787");
					$('.ms-drop').parents('.field__body').addClass('has-error').removeClass('has-success');
				}
			}
		});
	};

	function activeSel() {
		var parent = $('.js-single-select, .js-multiple-select'),
			item = parent.find('> button'),
			li = parent.find('.ms-drop li');
		item.on('click', function () {
			var this_ = $(this),
				div = this_.find('> div');
			if (div.hasClass('open')) {
				$('.ms-choice').removeClass('is-active');
				div.parents('.ms-choice').addClass('is-active');
			}
			else {
				div.parents('.ms-choice').removeClass('is-active');
			}
		});
		li.on('click', function() {
			var parent = $(this).parents('.js-single-select, .js-multiple-select');
			parent.find('.ms-choice').removeClass('is-active');
		});

	}
	activeSel();

	//filter
	$('.js-filter-btn').on('click', function(){
		var this_ = $(this),
			parent = this_.parents('.js-filter'),
			btn__link = this_.data('form-tab'),
			filter_container = parent.find('.js-filter-container'),
			filter_footer = parent.find('.filter__footer');
			
		if(this_.hasClass('is-active')){
			filter_container.slideUp(400);
			filter_container.removeClass('is-open');
			this_.toggleClass('is-active');
			$('.'+btn__link).delay(200).fadeOut(400);
			/*filter_footer.fadeOut(150);*/
		} else {
			filter_container.slideUp(400).delay().slideDown(400);
			if (filter_container.hasClass('is-open')){
				setTimeout(function(){
					$('.'+btn__link).fadeIn(400).siblings().fadeOut(0);
				},300)
			} else {
				$('.'+btn__link).fadeIn(400);
			}
			filter_container.addClass('is-open');
			this_.addClass('is-active').siblings().removeClass('is-active');
		}

	});

	$('.js-filter').on('click', function(event){
		event.stopPropagation();
	});
	$(document).on("click", function(){
		$('.js-filter-container').slideUp(400).removeClass('is-open');
		$('.filter__tab .js-tab-item').fadeOut(400);
		$('.js-filter-btn').removeClass('is-active');
	})


	//slice
	function ui_slider(){
		$('.js-ui-slider').each(function(){
			var slider = $(this).find(".js-ui-slider-main"),
				inputFrom = $(this).find(".js-ui-slider-from"),
				inputFromHidden = $(this).find(".js-input-from-hidden"),
				inputTo = $(this).find(".js-ui-slider-to"),
				inputToHidden = $(this).find(".js-input-to-hidden"),
				maxVal = +slider.attr("data-max"),
				minVal = +slider.attr("data-min"),
				valFrom = inputFromHidden.val(),
				valTo = inputToHidden.val(),
				stepVal = +slider.attr("data-step"),
				reset = $(this).find('.js-refresh');
				inputFromHidden.val(minVal);
				inputToHidden.val(maxVal);
				setTimeout(function(){
					$('.ui-slider-handle').first().addClass('first');
				},100);					

				if (!valFrom) {
					var valFrom = minVal;
				}
				if (!valTo) {
					var valTo = maxVal;
				}
			slider.slider({
				range: true,
				min: minVal,
				max: maxVal,
				step: 100,
				values: [ valFrom, valTo ],
				stop: function( event, ui ) {
					var price = parseInt(ui.values[0]);
					var formPrice = accounting.formatNumber(price, 3, " ", ",");
					var priceField = formPrice.split(',', 2)[0];

					var price1 = parseInt(ui.values[1]);
					var formPrice1 = accounting.formatNumber(price1, 3, " ", ",");
					var priceField1 = formPrice1.split(',', 2)[0];


					inputFrom.val(priceField);
					inputFromHidden.val(ui.values[0]);
					inputTo.val(priceField1);
					inputToHidden.val(ui.values[1]);
				},
				slide: function( event, ui ) {
					var price = parseInt(ui.values[0]);
					var formPrice = accounting.formatNumber(price, 3, " ", ",");
					var priceField = formPrice.split(',', 2)[0];

					var price1 = parseInt(ui.values[1]);
					var formPrice1 = accounting.formatNumber(price1, 3, " ", ",");
					var priceField1 = formPrice1.split(',', 2)[0];


					inputFrom.val(priceField);
					inputFromHidden.val(ui.values[0]);
					inputTo.val(priceField1);
					inputToHidden.val(ui.values[1]);
				}
			});

			var price = parseInt(slider.slider( "values", 0 ));
			var formPrice = accounting.formatNumber(price, 3, " ", ",");
			var priceField = formPrice.split(',', 2)[0];

			var price1 = parseInt(slider.slider( "values", 1 ));
			var formPrice1 = accounting.formatNumber(price1, 3, " ", ",");
			var priceField1 = formPrice1.split(',', 2)[0];
			
			inputFrom.val(priceField);
			inputTo.val(priceField1);			

		});
	};
	ui_slider();

	$(".js-refresh").on("click",function(){
		var slider = $(".js-ui-slider").find(".js-ui-slider-main"),
			maxVal = slider.attr("data-max"),
			minVal = slider.attr("data-min");
		slider.slider( "values", [ minVal, maxVal ] );
		$(".js-ui-slider").find(".js-input-from-hidden").val(minVal);
		$(".js-ui-slider").find(".js-input-to-hidden").val(maxVal);
		var price = parseInt(minVal);
			var formPrice = accounting.formatNumber(price, 3, " ", ",");
			var priceField = formPrice.split(',', 2)[0];

			var price1 = parseInt(maxVal);
			var formPrice1 = accounting.formatNumber(price1, 3, " ", ",");
			var priceField1 = formPrice1.split(',', 2)[0];
			
		$(".js-ui-slider").find(".js-ui-slider-from").val(priceField);
		$(".js-ui-slider").find(".js-ui-slider-to").val(priceField1);
		$('input:checkbox').removeAttr('checked');
		return false;	
	});


	//Zoom Gallery
	var gallery_popup = $('.js-gallery-box');
	if (gallery_popup.length){
		var items = gallery_popup.find('[rel="popup_gallery"]');
		items.fancybox({
			padding: 0,
			maxWidth: 800
		});
	}
	
	//SHOW MORE

	if ($('.js-show').length){
		$('.js-show').readmore({
			speed: 550,
			moreLink: '<a href="#">Все описание</a>',
    		lessLink: '<a href="#">Скрыть</a>',
    		collapsedHeight: 120
		});
	}

	//ACCORDION
	if($('.js-accordion').length) {
		$('.js-accordion').accordion({
			active: false,
			header: '.header__accordion',
			heightStyle: 'content',
			collapsible: true
		});
		$('.return, .remove').on('click', function(e){
			e.stopPropagation()
		});
		$('.header__accordion').on('click', function(){
			if($(this).parent().hasClass('active')){
				$(this).parent().toggleClass('active')
			}else {
				$(this).parent().addClass('active').siblings().removeClass('active');
			}			
			if(!$('.accordion__item').first().hasClass('active') && $('.accordion__item').first().is(':hover')) {
				return
			}
			if(!$('.accordion__item').first().hasClass('active')){
				$('.shadow').stop(true,true).fadeIn();
			}
		});

		$('.accordion__item').first().hover(function(){
			var this_ = $(this);
			this_.parents('.table__basket').find('.shadow').stop(true,true).fadeOut();
		},function(){
			var this_ = $(this);
			if(this_.hasClass('active')){
				return
			}
			this_.parents('.table__basket').find('.shadow').stop(true,true).fadeIn();
		});
	}

	//GOOGLE MAPS
	function init_google(){
		var googleMapCollection = $('.map');
		$('.map').each(function(){
			googleMapFunc($(this));
		});
		function googleMapFunc(googleMap){
			var longitude = parseFloat(googleMap.attr('data-longitude')),
				latitude = parseFloat(googleMap.attr('data-latitude'));
			var latlng = new google.maps.LatLng(longitude, latitude);
			var mapOptions = {
				zoom: 15,
				center: latlng,
				disableDefaultUI: true,
				scrollwheel: false,
				zoomControl: true,
				zoomControlOptions: {
					style: google.maps.ZoomControlStyle.SMALL,
					position: google.maps.ControlPosition.RIGHT_CENTER
				}
			}
			var map = new google.maps.Map(document.getElementById(googleMap.attr('id')), mapOptions);
			var image = 'img/icons/marker.png';
			var myLatLng = latlng;
			var marker = new google.maps.Marker({
				position: myLatLng,
				map: map,
				title: 'Uluru (Ayers Rock)', 
				icon: image
			});

			var contentString = googleMap.attr('data-content');

			var infowindow = new google.maps.InfoWindow({
				content: contentString
			});
			marker.addListener('click', function() {
				infowindow.open(map, marker);
			});


		};
	}; init_google();
	
	$('.js-popup-link').on("click", function(){
		setTimeout(function(){
			init_google();
		})
	});

	//HOVERS

	if($('.catalog__area').length){
		var delegationSelector = null;

		document.querySelector('.catalog__area').addEventListener("mouseover", function(event){
			var target = event.target,
				related = event.relatedTarget;

				while (target !== this) {
					var check = target.classList.contains('card__item');
					if (check) {
						break;
					}
					target = target.parentNode;
				}
				if(target === this) {
					return;
				}
				target.parentNode.classList.add('active');

				//target.style.zIndex = '7';

		});
		document.querySelector('.catalog__area').addEventListener("mouseout", function(event){
				var target = event.target,
					related = event.relatedTarget;

				while (target !== this) {
					var check = target.classList.contains('card__item');
					if (check) {
						break;
					}
					target = target.parentNode;
				}

				if(target === this) {
					return;
				}

				if(target === related) {
					return;
				}

				classes(target);
				
				//target.parentNode.style.zIndex = '6';		
		});

		function classes(item) {
			item.parentNode.classList.remove('active')			
		}
	};


});