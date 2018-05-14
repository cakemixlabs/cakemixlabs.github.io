$(document).ready(function () {
    $("a").on("click", function (event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
    });


    // set up on click ajax call for submitting email address
    $("#email-input-section").on("submit", function (event) {

        event.preventDefault();
        var $emailText = $("#email-input-box");

        var emailAddress = {
            body: $emailText.val().trim()
        };
        console.log("email address is ", emailAddress)
        var stringToCheck = emailAddress.body;

        var $resultText = $("#email-submit-result");

        // add some regex validation to submit the form if a reasonable email address is present
        if (
            stringToCheck.match(
                /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
            )) {
            $.ajax("/signup", {
                type: "POST",
                data: emailAddress
            }).then(
                function (data) { 
                    $resultText.text("Thanks for signing up for the Cakemix newsletter.");
                    $emailText.val("");
                }
            );
        }
        else {
            event.preventDefault();
            console.log("nope");
            $resultText.text("Something went wrong. Check the text you entered or try again later.");
        }
    });

});