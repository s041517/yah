
(function($) {
				 
	$.fn.scrollAnimate = function(options) {

				var animatedNameIn  =  ["bounce", "flash", "pulse", "rubberBand", "shake", "headShake", "swing", "tada", "wobble", "jello", "bounceIn", "bounceInDown", "bounceInLeft", "bounceInRight", "bounceInUp", "fadeIn", "fadeInDown", "fadeInDownBig", "fadeInLeft", "fadeInLeftBig", "fadeInRight", "fadeInRightBig", "fadeInUp", "fadeInUpBig", "flipInX", "flipInY", "lightSpeedIn", "rotateIn", "rotateInDownLeft", "rotateInDownRight", "rotateInUpLeft", "rotateInUpRight", "rollIn", "zoomIn", "zoomInDown", "zoomInLeft", "zoomInRight", "zoomInUp", "slideInDown", "slideInLeft", "slideInRight", "slideInUp"];
				var animatedNameOut =  ["hinge","bounceOut", "bounceOutDown", "bounceOutLeft", "bounceOutRight", "bounceOutUp", "fadeOut", "fadeOutDown", "fadeOutDownBig", "fadeOutLeft", "fadeOutLeftBig", "fadeOutRight", "fadeOutRightBig", "fadeOutUp", "fadeOutUpBig", "flipOutX", "flipOutY", "lightSpeedOut", "rotateOut", "rotateOutDownLeft", "rotateOutDownRight", "rotateOutUpLeft", "rotateOutUpRight", "rollOut", "zoomOut", "zoomOutDown", "zoomOutLeft", "zoomOutRight", "zoomOutUp", "slideOutDown", "slideOutLeft", "slideOutRight", "slideOutUp"];
				var randomAnimate   =  Math.floor(Math.random()*((animatedNameIn.length-1)-0));
                
                
                //預設值
				var settings = $.extend({
								            animate   : animatedNameIn[randomAnimate],  // animated name
								            infinite  : "no",                           // 是否循環 (yes/no)
								            byItem    : "no",                           // 多個依序顯示 (yes/no)
								            time      : "1000",                          // 動畫時間 (預設 1000=1s)
								            delay     : "200",                           // 延遲時間 (預設 200)

								            distance  : "150",                           // animate = scrollMove用，設定移動距離
								            moveto    : "top",                           // animate = scrollMove用，設定移動方向
								        }, options );

				//設定
				var animatedSetting=[
										{
											"target"    :  this,              // 目標 
											"animate"   :  settings.animate,  // animated name
											"infinite"  :  settings.infinite, // 是否循環 (yes/no)
											"byItem"    :  settings.byItem,   // 多個依序顯示 (yes/no)
											"time"      :  settings.time,     // 動畫時間 (預設 1000=1s)
											"delay"     :  settings.delay,    // 延遲時間 (預設 200)

											"distance"  :  settings.distance, // 設定移動距離 (預設 150)
											"moveto"    :  settings.moveto  , // 設定移動方向 (預設 top)
										}
									];

			//判斷模式：進出動畫或移動
			$.each(animatedSetting, function( index, item ) {
				var scrollMode=item["animate"];
				// console.log(scrollMode);
					

				switch(scrollMode){

					case 'scrollMove':
						//scroll move Start  -------------------
							$(function(){
								scrollMove(item["target"] , moveDistance=item["distance"] , item["moveto"]);  
							});

							function scrollMove( $obj , moveDistance , moveto ){
							   

							    if($obj.length){

							        $obj.css({
							             'position':'relative',
							             'transition':'top 1s cubic-bezier(0.11, 0.29, 0.62, 0.88)',
							             '-webkit-transition':'top 1s cubic-bezier(0.11, 0.29, 0.62, 0.88)',
							         });



							        //set distance and moveto
							        tmpData=$obj.attr('data-scrollMove');
							        
							        if(tmpData!=undefined){
							            tmpData=JSON.parse(tmpData);
							            moveDistance = (tmpData['moveDistance']!=undefined) ? tmpData['moveDistance'] : moveDistance;
							            moveto = (tmpData['moveto']!=undefined) ? tmpData['moveto'] : moveto;
							        }           

							       
							       $(window).scroll(function(){
							            objHeight     = $obj.height();
							            objOffsetTop  = $obj.offset().top;            
							            winH          = $(window).innerHeight();
							            objViewStart  = objOffsetTop;
							            objViewEnd    = objHeight+objOffsetTop;

							            scrollTop     = $(window).scrollTop();
							            nowViewStart  = scrollTop;
							            nowViewEnd    = scrollTop+winH;
							                

							            if( (objViewStart<nowViewEnd) && (nowViewStart<objViewStart) ) {                
							                console.log("obj in");
							                
							                // set move distance (%)
							                movePercent = parseInt((nowViewEnd-objViewStart) / winH * moveDistance);
							                // get now css top
							                objCssTop   = parseInt($obj.css('top').replace('px',''));

							                // set new pos
							                if (moveto=='top')   {newTop=(moveDistance*.5)-movePercent; }
							                if (moveto=='bottom'){newTop=(-moveDistance*.5)+movePercent }
							                
							                $obj.css({'top':newTop});
							                return false;

							            
							            } else {

							                // console.log("obj out");
							                return false;
							            }

							       });
							    }
							}
						//scroll move END  -------------------
						break;






					default:

						//scroll animate.css  START -------------------

							$.each(animatedSetting, function( index, item ) {
								var target      =  item["target"];
								var animateTime =  (item["time"] / 1000) + 's';
								//預先隱藏target
								$(target).css("opacity",0);
								//設定動畫執行時間
								if(animateTime){$(target).css({"animation-duration":animateTime,"-webkit-animation-duration":animateTime}); }
							});



							$(window).on('load scroll resize',function(){
								$.each(animatedSetting, function( index, item ) {
								   var target         =   item["target"];
								   var targetPos      =   $(target).offset().top-window.screen.height*.50;
								   var animateMode    =   item["infinite"]=='yes'? " infinite":"";
								   var animateClass   =   "animated " + item["animate"] + animateMode;
								   var animateEnd     =   "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
								   var animateDelay   =   (item["delay"])?item["delay"]:parseInt(200);
								   
								   if($(window).scrollTop()>=targetPos) {
								   		if(item["byItem"]=="yes"){
								   			$(target).each(function(index){
								   				setTimeout(function(){
								   					$(target).eq(index).addClass(animateClass).css({opacity:1});
								   				},animateDelay*(index+1));
								   			});
								   		}else{
								   			setTimeout(function(){
										   	 	$(target).addClass(animateClass).css({opacity:1});
										   	},animateDelay);
								   		}

								   }
								});	
							});

						//scroll animate.css END  -------------------

						break;
						//end  default

				}//end switch (scrollMode)

			});//結束判斷scrollMode





				




	}; //end scrollAnimate

})(jQuery);