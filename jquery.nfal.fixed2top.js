 /*!
 * NFAL Fixed to top  - jQuery Plugin
 *
 * Copyright 2012, Near Future Arts Lab Co.,Ltd.
 * Released under the MIT License.
 *
 * Version: 1.0.1 (12/06/2012)
 */
(function ($) {
	$.fn.fixed2top = function(options) {
		var opts = $.extend({}, $.fn.fixed2top.defaults, options);
		var debug = function (str) {
            if (opts.debugmode)console.log(str);
		};
				
		return this.each(function () {
			var $this			= $(this),
				$window			= $(window),
				$document		= $(document),
				fixedClass		= 'fixed',
				absoluteClass	= 'bottomEnd',
				offsetTop		= opts.offsetTop,
				paddingBottom	= opts.paddingBottom;
			
			if(offsetTop == 'auto'){
				offsetTop = $this.offset().top;
			}
			
			debug('paddingBottom:',paddingBottom ,' offsetTop:',offsetTop)
			
			$window.on('scroll', function () {
				adjust();
			});
			$window.on('resize', function () {
				adjust();
			});
			function adjust(){
				if($window.scrollTop() < offsetTop){
					debug('#A static');
					$this.removeClass(fixedClass).removeClass(absoluteClass);
				}else if($document.height() - $window.scrollTop() -paddingBottom < $this.outerHeight(true)){
					debug('#B absolute');
					$this.removeClass(fixedClass).addClass(absoluteClass);
				}else {
					debug('#C fixed');
					$this.addClass(fixedClass).removeClass(absoluteClass);
				}				
			}
			adjust();
		});
		
	};
	$.fn.fixed2top.defaults = {
		debugmode		: false,	//デバッグモード
		offsetTop		: 'auto',	//基本的にautoのままで使用
		paddingBottom	: 0			//フッターに被せないようにする場合は、ここにフッターの高さを数値指定
	};

})(jQuery);