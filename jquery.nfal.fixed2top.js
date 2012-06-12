 /*!
 * NFAL Fixed to top  - jQuery Plugin
 *
 * Copyright 2012, Near Future Arts Lab Co.,Ltd.
 * Released under the MIT License.
 *
 * Version: 1.1.0 (12/06/2012)
 */
(function ($) {
	$.fn.fixed2top = function(options) {
		var opts = $.extend({}, $.fn.fixed2top.defaults, options);
		var debug = function (str) {
            if (opts.debugmode) console.log(str);
		};
				
		return this.each(function () {
			var $this			= $(this),
				$window			= $(window),
				$document		= $(document),
				fixedClass		= opts.fixedClass,
				absoluteClass	= opts.absoluteClass,
				offsetTop		= opts.offsetTop,
				paddingBtm		= opts.paddingBottom,
				defaBottom		= $this.css('bottom');
			
			if(offsetTop == 'auto'){
				offsetTop = $this.offset().top;
			}

			debug('paddingBtm:'+ paddingBtm);
			debug('offsetTop:'+ offsetTop);

			function adjust(){
				if($window.scrollTop() < offsetTop){
					debug('#A static');
					$this.removeClass(fixedClass).removeClass(absoluteClass);
					$this.css({bottom:defaBottom});
				}else if($document.height() - $window.scrollTop() -paddingBtm < $this.outerHeight(true)){
					debug('#B absolute');
					$this.removeClass(fixedClass).addClass(absoluteClass);
					$this.css({bottom:paddingBtm+'px'});
				}else {
					debug('#C fixed');
					$this.addClass(fixedClass).removeClass(absoluteClass);
					$this.css({bottom:defaBottom});
				}				
			}
			adjust();
			$window.bind('scroll resize', adjust);
		});
		
	};
	$.fn.fixed2top.defaults = {
		debugmode		: false,	//デバッグモード
		offsetTop		: 'auto',	//基本的にautoのままで使用
		paddingBottom	: 0,		//フッターに被せないようにする場合は、ここにフッターの高さを数値指定
		fixedClass		: 'f2t_scrolling',	//スクロール中に追加されるクラス名
		absoluteClass	: 'f2t_bottomEnd'	//下端までスクロールされた時に追加されるクラス名
	};

})(jQuery);