$(document).ready(function () {

    $(document).on("scroll", function (event){
        $navbar = $("#navbar")
        var $scrolling = $(document).scrollTop();
        if ( $scrolling > 50 ){
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


    // set up on click ajax call for submitting email address
    $("#email-overall-area").on("submit", function (event) {

        event.preventDefault();

        // make variable for the email input text
        var $emailText = $("#email-input-box");

        var emailAddress = {
            body: $emailText.val().trim()
        };

        var stringToCheck = emailAddress.body;

        var $resultText = $("#email-submit-result");

        // add some regex validation to submit the form if a reasonable email address is present and do the ajax post if so
        if (
            stringToCheck.match(
                /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
            )) {
            $.ajax("/signup", {
                type: "POST",
                data: emailAddress
            }).then(
                function (data) {
                    // show the success text and then fade it out after 3 seconds
                    $resultText.text("Thanks for requesting access. We'll let you know when a beta is available!").fadeIn().delay(3000).fadeOut();
                    // reset the email text to the placeholder
                    $emailText.val("");
                }
            );
        }
        else {
            // if the text is invalid, then make it so the submit does not happen
            event.preventDefault();
            $resultText.text("Something went wrong. Check the text you entered or try again later.");
        }
    });

});