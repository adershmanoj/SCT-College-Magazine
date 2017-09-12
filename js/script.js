$(document).ready(function() {
	window.viewportUnitsBuggyfill.init();	
	new WOW().init();
	fix();
 	menu();
 	books();
 	form();
 	
 	$("#btn-invisible1").hover(function(){
		$("#invisible1").attr("src", 'http://www.adoratorio.com/parallaxis/wp-content/themes/paralla%CC%80xis.it/images/invisible-w.png'); 		
 	}, function(){
 		$("#invisible1").attr("src", 'http://www.adoratorio.com/parallaxis/wp-content/themes/paralla%CC%80xis.it/images/invisible.png');
 	});

 	$("#btn-invisible2").hover(function(){
		$("#invisible2").attr("src", 'http://www.adoratorio.com/parallaxis/wp-content/themes/paralla%CC%80xis.it/images/invisible-w.png'); 		
 	}, function(){
 		$("#invisible2").attr("src", 'http://www.adoratorio.com/parallaxis/wp-content/themes/paralla%CC%80xis.it/images/invisible.png');
 	});
});
$('#click').click(function(evt) {
     console.log("clicked");
    evt.preventDefault();
});

// Get the modal
var modal = document.getElementById("myModal")
// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementsByClassName('myImg');
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
$(img).click(function (){
    console.log("click");
    modal.style.display = "block";
    if(this.src==null)
        modalImg.src=this.lang;
    else
        modalImg.src = this.src;
});

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}
function fix() {

	$(window).resize(function(){

		// Menu
		$(window).scroll(function() {
			if($(window).scrollTop() > $("#about").offset().top-300) {
				$("#menu").show();
				$("header .logo").hide();				
			}
			else {
				$("#menu").hide();
				$("header .logo").show();				
			}
		});

		$("nav li a").click(function() {
			$(".navbar-toggle").trigger("click");
		});

		// Header

	    $("header .logo").css({
	        top: ($(window).height() - $("header .logo").outerHeight())/2,
	        left: ($(window).width() - $("header .logo").outerWidth())/2
	    });

	    // Team

	    $("#team .member .photo").height($("#team .member .photo").width());

	    // Busta

	    $("#team .busta .top").height($("#team .busta .top").width());


	});
	$(window).resize();

}

function menu() {

	$("#menu ul li a").each(function(index, element) {

		var id = $(element).attr('id');
		var href = $(element).attr('href');


	});

	$("#menu ul li a").each(function(index, element) {

		$(this).click(function() {

		  	var id = $(element).attr('id');
		  	var href = $(element).attr('href');

			$('html, body').animate({
			    scrollTop: ($(href).offset().top-200)
			},2000);
			

		});

	});

}

function books() {

	$("#writers2-button").click(function() {	
		$("#writers2").slideDown(500, function() {
			$('html, body').animate({
		    	scrollTop: $(this).offset().top - 111
		    }, 800);
		});
		$("#writers0").hide();
		$("#writers1").hide();
        $("#writers3").hide();
        $("#writers4").hide();
        $("#writers5").hide();
        $("#writers6").hide();
		$(".book0").css("margin-top","200px");
		$("#press").css("margin-top","0px");					
	});
	$("#writers1-button").click(function() {	
		$("#writers1").slideDown(500, function() {
			$('html, body').animate({
		    	scrollTop: $(this).offset().top - 111
		    }, 800);
		});
		$("#writers0").hide();
		$("#writers2").hide();
        $("#writers3").hide();
        $("#writers4").hide();
        $("#writers5").hide();
        $("#writers6").hide();
		$(".book0").css("margin-top","200px");
		$("#press").css("margin-top","0px");					
	});
	$("#writers0-button").click(function() {
		$("#writers0").slideDown(500, function() {
			$('html, body').animate({
		    	scrollTop: $(this).offset().top - 111
		    }, 800);
		});		
		$("#writers1").slideUp();
		$("#writers2").hide();
        $("#writers3").hide();
        $("#writers4").hide();
        $("#writers5").hide();
        $("#writers6").hide();
		$(".book0").css("margin-top","0px");	
		$("#press").css("margin-top","200px");			
	});
    $("#writers3-button").click(function() {	
		$("#writers3").slideDown(500, function() {
			$('html, body').animate({
		    	scrollTop: $(this).offset().top - 111
		    }, 800);
		});
		$("#writers0").hide();
		$("#writers1").hide();
        $("#writers2").hide();
        $("#writers4").hide();
        $("#writers5").hide();
        $("#writers6").hide();
		$(".book1").css("margin-top","200px");
		$("#press").css("margin-top","0px");					
	});
    $("#writers4-button").click(function() {	
		$("#writers4").slideDown(500, function() {
			$('html, body').animate({
		    	scrollTop: $(this).offset().top - 111
		    }, 800);
		});
		$("#writers0").hide();
        $("#writers1").hide();
		$("#writers2").hide();
        $("#writers3").hide(); 
        $("#writers5").hide();
        $("#writers6").hide();
		$(".book0").css("margin-top","200px");
		$("#press").css("margin-top","0px");					
	});
     $("#writers5-button").click(function() {	
		$("#writers5").slideDown(500, function() {
			$('html, body').animate({
		    	scrollTop: $(this).offset().top - 111
		    }, 800);
		});
		$("#writers0").hide();
		$("#writers1").hide();
        $("#writers2").hide();
        $("#writers3").hide();
        $("#writers4").hide();
        $("#writers6").hide();
		$(".book1").css("margin-top","200px");
		$("#press").css("margin-top","0px");					
	});
   $("#writers6-button").click(function() {	
		$("#writers6").slideDown(500, function() {
			$('html, body').animate({
		    	scrollTop: $(this).offset().top - 111
		    }, 800);
		});
		$("#writers0").hide();
        $("#writers1").hide();
		$("#writers2").hide();
        $("#writers3").hide(); 
        $("#writers4").hide();
        $("#writers5").hide();
		$(".book0").css("margin-top","200px");
		$("#press").css("margin-top","0px");					
	}); 
}

function form() {

    var form = $('#form');
    var formMessages = $('#email-status p');	

    $(form).submit(function(event) {
    	event.preventDefault();

		$("#email-loading").show();

    	var formData = $(form).serialize();
    	$.ajax({
		    type: 'POST',
		    url: $(form).attr('action'),
		    data: formData
		})

		.done(function(response) {

			$("#email-loading").hide();
			$("#email-status").show();

		    $("#email-status").removeClass('alert-error');
		    $("#email-status").addClass('alert-success');

		    $(formMessages).text("Grazie! La tua mail è stata inviata");

		    $('#name').val('');
		    $('#email').val('');
		    $('#message').val('');
		})

		.fail(function(data) {

			$("#email-loading").hide();
			$("#email-status").show();

		    $("#email-status").removeClass('alert-success');
		    $("#email-status").addClass('alert-error');

		    $(formMessages).text('Si è verificato un errore! Email non inviata.');

		});

	});
}