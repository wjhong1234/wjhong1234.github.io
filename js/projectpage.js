
$(function() {
    $('.carousel').carousel();
    var caption = $('div.item:nth-child(1) .carousel-caption');
    $('#row_under_carousel span').html(caption.html());
    caption.css('display','none');
    $(".carousel").on('slide.bs.carousel', function(evt) {
   var caption = $('div.item:nth-child(' + ($(evt.relatedTarget).index()+1) + ') .carousel-caption');
   $('#row_under_carousel span').html(caption.html());
   caption.css('display','none');
	});
});

$("#nav div ul li a[href^='#']").on('click', function(e) {

   // prevent default anchor click behavior
   e.preventDefault();

   // animate
   $('html, body').animate({
       scrollTop: $(this.hash).offset().top -80
     }, 600, function(){

       // when done, add hash to url
       // (default click behaviour)
       window.location.hash = this.hash;
     });

});
