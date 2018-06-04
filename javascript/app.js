$(document).ready(function () {
  
  // jQuery to collapse the navbar on scroll
  $(window).scroll(function() {
      if ($(".navbar").offset().top > 50) {
          $(".navbar").addClass("navbar-scroll");
      } else {
          $(".navbar").removeClass("navbar-scroll");
      }
  });

    // add smooth scrolling function to the links (via w3 example)
    $("a").on("click", function (event) {

        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;

            // use animate to scroll to the page in  800 ms
            $("html, body").animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {

                // add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        }
    });

});