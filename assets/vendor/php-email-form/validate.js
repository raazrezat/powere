$(document).ready(function() {
    $('#feedback_name,#feedback_subject,#feedback_message').focus(function() {
        $('#error-message').addClass("d-none");
    });
    $('.contact .submit_btn').click(function(event) {
        var customer_id = $('#customer_id').val();
        var feedback_name = $('#feedback_name').val();
        var feedback_subject = $('#feedback_subject').val();
        var feedback_message = $('#feedback_message').val();
        if (customer_id > 0) {
            if (feedback_name && feedback_subject && feedback_message) {
                $('#modal-rating').modal('show');
                $('.star-cb-group input').click(function() {
                    var ratingSter = $(':checked').val();
                    if (ratingSter == '') {
                        ratingSter = '0';
                    }
                    $.ajax({
                        url: "controllers/feedback.php",
                        type: "POST",
                        data: {
                            "customer_id": customer_id,
                            "feedback_name": feedback_name,
                            "feedback_subject": feedback_subject,
                            "feedback_message": feedback_message,
                            "ratingSter": ratingSter
                        },
                        success: function(data) {
                            if (data == 'success') {
                                $('.rating-model-footer-btn').removeClass('model-footer-btn-bg-1').addClass('model-footer-btn-bg-2').text('ধন্যবাদ');
                                setTimeout(function() {
                                    $('#modal-rating').modal('hide');
                                }, 3000);
                                setTimeout(function() {
                                    location.reload();
                                }, 3000);
                            } else {
                                alert("Something Wrong, Please Contact Us.")
                            }
                        }
                    });
                });
            } else {
                $('#error-message').removeClass("d-none");
                $('#error-message').html("Fill The Form.");
            }
        } else {
            $('#error-message').removeClass("d-none");
            $('#error-message').html("You are Loged Out. Please Login Again.");
        }
    });
});