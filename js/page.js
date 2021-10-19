$(function(){


    if($('.pageWidget').length){
		$(document).ready(function(){        	
        	setTimeout(function(){$('.pageWidget').fadeOut(1000)},1000);
        });
	}

    
    $("menu, .logo").each(function(){
        $(this).scrollAnimate({
            animate   : "fadeInUp",  // animated name    
            byItem    : "yes",                           
            time      : "800",
            delay     : "500",
            distance  : "20",                       
        });
    })



})


// if($(window).width() < 1025){
        
//     $(".workBlock ul li").each(function(){
//         $(this).scrollAnimate({
//             animate   : "fadeInUp",  // animated name    
//             time      : "800",
//             byItem    : "yes",                   
//         });
//     })

// }
