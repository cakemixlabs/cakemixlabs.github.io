$(document).ready(function () {

    $(document).on("scroll", function (event) {
        $navbar = $("#navbar")
        var $scrolling = $(document).scrollTop();
        if ($scrolling > 50) {
            $navbar.addClass("navbar-scrolling");
            $navbar.addClass("fixed-top");
        } else {
            $navbar.removeClass("navbar-scrolling");
            $navbar.removeClass("fixed-top");
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