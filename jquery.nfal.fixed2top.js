 /*!
 * NFAL Fixed to top  - jQuery Plugin
 *
 * Copyright 2012, Near Future Arts Lab Co.,Ltd.
 * Released under the MIT License.
 *
 * Version: 1.1.1 (13/06/2012)
 */
(function ($) {
	$.fn.fixed2top = function(options) {
		var opts = $.extend({}, $.fn.fixed2top.defaults, options);
		var debug = function (str) {
            if (opts.debugmode) console.log(str);
		};

		var $window			= $(window),
			$document		= $(document);

		return this.each(function () {
			var $this			= $(this),
				fixedClass		= opts.fixedClass,
				absoluteClass	= opts.absoluteClass,
				offsetTop		= opts.offsetTop,
				paddingBtm		= opts.paddingBottom,
				liquid			= opts.liquidLayout,
				defaBottom		= $this.css('bottom'),
				defaWidth		= $this.width(),
				pare			= $this.parent(),
				pareWidth		= $this.parent().width();

			

			footerHeightGet = function () {
				paddingBtm = $(opts.footerTarget).outerHeight(true) + opts.paddingBottom;
			};
			pareWidthGet = function(){
				pareWidth = $this.parent().width();
			};



			if(liquid){
				if(opts.footerTarget !== null ){
					footerHeightGet();
					$window.bind('resize', footerHeightGet);
				}
				$window.bind('resize', pareWidthGet);
			}


			if(offsetTop == 'auto'){
				offsetTop = $this.offset().top;
			}
			debug('paddingBtm:'+ paddingBtm);
			debug('offsetTop:'+ offsetTop);

			function adjust(){
				if($window.scrollTop() < offsetTop){
					debug('#A static');
					//$this.removeClass(fixedClass).removeClass(absoluteClass);
					$this.css({
						position:'static',
						top:'auto',
						width:defaWidth+'px'
					});
					if(liquid){
						$this.css({
							width:pareWidth+'px'
						});
					}
				}else if($document.height() - $window.scrollTop() -paddingBtm < $this.outerHeight(true)){
					debug('#B absolute(bottom end)');
					//$this.removeClass(fixedClass).addClass(absoluteClass);
					$this.css({
						position:'absolute',
						top:$(opts.footerTarget).offset().top - $this.outerHeight(true) + ($(opts.footerTarget).outerHeight() - paddingBtm)+'px',
						width:pareWidth+'px'
					});
					debug($(opts.footerTarget).offset().top);
				}else {
					debug('#C fixed');
					//$this.addClass(fixedClass).removeClass(absoluteClass);
					$this.css({
						position:'absolute',
						left:0,
						top:$window.scrollTop() + pare.offset().top+'px',
						width:pareWidth+'px'
					});
					/*$this.css({
						position:'fixed',
						top:0,
						bottom:defaBottom,
						width:pareWidth+'px'
					});*/

				}				
			}
			adjust();
			$window.bind('scroll resize', adjust);
		});
		
	};
	$.fn.fixed2top.defaults = {
		debugmode		: false,	//デバッグモード
		offsetTop		: 'auto',	//基本的にautoのままで使用
		footerTarget	: null,		//フッターに被せないようにする場合は、ここにフッターを指定
		paddingBottom	: 0,		//フッターに被せないようにする場合は、ここにフッターの高さを数値指定
		fixedClass		: 'f2t_scrolling',	//スクロール中に追加されるクラス名
		liquidLayout	: false,	//リキッドレイアウトの場合true
		absoluteClass	: 'f2t_bottomEnd'	//下端までスクロールされた時に追加されるクラス名
	};

})(jQuery);