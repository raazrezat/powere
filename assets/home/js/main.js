(function() {
    "use strict";

    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
        el = el.trim()
        if (all) {
            return [...document.querySelectorAll(el)]
        } else {
            return document.querySelector(el)
        }
    }

    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all)
        if (selectEl) {
            if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener))
            } else {
                selectEl.addEventListener(type, listener)
            }
        }
    }

    /**
     * Easy on scroll event listener 
     */
    const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
    }

    /**
     * Navbar links active state on scroll
     */
    let navbarlinks = select('#navbar .scrollto', true)
    const navbarlinksActive = () => {
        let position = window.scrollY + 200
        navbarlinks.forEach(navbarlink => {
            if (!navbarlink.hash) return
            let section = select(navbarlink.hash)
            if (!section) return
            if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                navbarlink.classList.add('active')
            } else {
                navbarlink.classList.remove('active')
            }
        })
    }
    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)

    /**
     * Scrolls to an element with header offset
     */
    const scrollto = (el) => {
        let header = select('#header')
        let offset = header.offsetHeight

        if (!header.classList.contains('header-scrolled')) {
            offset -= 16
        }

        let elementPos = select(el).offsetTop
        window.scrollTo({
            top: elementPos - offset,
            behavior: 'smooth'
        })
    }

    /**
     * Header fixed top on scroll
     */
    let selectHeader = select('#header')
    if (selectHeader) {
        let headerOffset = selectHeader.offsetTop
        let nextElement = selectHeader.nextElementSibling
        const headerFixed = () => {
            if ((headerOffset - window.scrollY) <= 0) {
                selectHeader.classList.add('fixed-top')
                nextElement.classList.add('scrolled-offset')
            } else {
                selectHeader.classList.remove('fixed-top')
                nextElement.classList.remove('scrolled-offset')
            }
        }
        window.addEventListener('load', headerFixed)
        onscroll(document, headerFixed)
    }

    /**
     * Back to top button
     */
    // let backtotop = select('.back-to-top')
    // if (backtotop) {
    //   const toggleBacktotop = () => {
    //     if (window.scrollY > 100) {
    //       backtotop.classList.add('active')
    //     } else {
    //       backtotop.classList.remove('active')
    //     }
    //   }
    //   window.addEventListener('load', toggleBacktotop)
    //   onscroll(document, toggleBacktotop)
    // }

    /**
     * Mobile nav toggle
     */
    on('click', '.mobile-nav-toggle', function(e) {
        select('#navbar').classList.toggle('navbar-mobile')
        this.classList.toggle('bi-list')
        this.classList.toggle('bi-x')
    })

    /**
     * Mobile nav dropdowns activate
     */
    on('click', '.navbar .dropdown > a', function(e) {
        if (select('#navbar').classList.contains('navbar-mobile')) {
            e.preventDefault()
            this.nextElementSibling.classList.toggle('dropdown-active')
        }
    }, true)

    /**
     * Scrool with ofset on links with a class name .scrollto
     */
    on('click', '.scrollto', function(e) {
        if (select(this.hash)) {
            e.preventDefault()

            let navbar = select('#navbar')
            if (navbar.classList.contains('navbar-mobile')) {
                navbar.classList.remove('navbar-mobile')
                let navbarToggle = select('.mobile-nav-toggle')
                navbarToggle.classList.toggle('bi-list')
                navbarToggle.classList.toggle('bi-x')
            }
            scrollto(this.hash)
        }
    }, true)

    /**
     * Scroll with ofset on page load with hash links in the url
     */
    window.addEventListener('load', () => {
        if (window.location.hash) {
            if (select(window.location.hash)) {
                scrollto(window.location.hash)
            }
        }
    });

    /**
     * Preloader
     */
    let preloader = select('#preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.remove()
        });
    }

    /**
     * Initiate glightbox
     */
    const glightbox = GLightbox({
        selector: '.glightbox'
    });

    /**
     * Skills animation
     */
    let skilsContent = select('.skills-content');
    if (skilsContent) {
        new Waypoint({
            element: skilsContent,
            offset: '80%',
            handler: function(direction) {
                let progress = select('.progress .progress-bar', true);
                progress.forEach((el) => {
                    el.style.width = el.getAttribute('aria-valuenow') + '%'
                });
            }
        })
    }

    /**
     * Initiate Gallery Lightbox 
     */
    const galelryLightbox = GLightbox({
        selector: '.galelry-lightbox'
    });

    /**
     * Testimonials slider
     */
    new Swiper('.packages-slider', {
        speed: 600,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        slidesPerView: 'auto',
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        },
        breakpoints: {
            320: {
                slidesPerView: 2,
                spaceBetween: 8
            },
            999: {
                slidesPerView: 3,
                spaceBetween: 0
            },
            1400: {
                slidesPerView: 4,
                spaceBetween: 0
            }
        }
    });

    /**
     * feedbacks slider
     */
    new Swiper('.feedbacks-slider', {
        speed: 600,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        slidesPerView: 'auto',
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 14
            },

            1200: {
                slidesPerView: 3,
                spaceBetween: 24
            }
        }
    });

    /**
     * Porfolio isotope and filter
     */
    window.addEventListener('load', () => {
        let portfolioContainer = select('.portfolio-container');
        if (portfolioContainer) {
            let portfolioIsotope = new Isotope(portfolioContainer, {
                itemSelector: '.portfolio-item'
            });

            let portfolioFilters = select('#portfolio-flters li', true);

            on('click', '#portfolio-flters li', function(e) {
                e.preventDefault();
                portfolioFilters.forEach(function(el) {
                    el.classList.remove('filter-active');
                });
                this.classList.add('filter-active');

                portfolioIsotope.arrange({
                    filter: this.getAttribute('data-filter')
                });
                portfolioIsotope.on('arrangeComplete', function() {
                    AOS.refresh()
                });
            }, true);
        }

    });

    /**
     * Cart Select All Fanction
     */
    on('click', '#cart-select-all-btn', function(e) {
        let selectAllBtn = select('#cart-select-all-btn')
        let CartItmes = select('.cart-select-auto input[type=checkbox]', true);
        if (selectAllBtn.checked) {
            CartItmes.forEach((el) => {
                el.checked = true
            });
        } else {
            CartItmes.forEach((el) => {
                el.checked = false
            });
        }
    });

    /**
     * Cart Select All Fanction
     */
    on('click', '#terms-service', function(e) {
        let termsService = select('#terms-service')
        let orderBtn = select('.right-bot-order-btn');
        if (termsService.checked) {
            orderBtn.classList.remove('dis')
            orderBtn.removeAttribute("disabled")
            orderBtn.setAttribute("onclick", 'confirmOrder()')
        } else {
            orderBtn.classList.add('dis')
            orderBtn.setAttribute("disabled", "disabled")
            orderBtn.removeAttribute("onclick")
        }
    });

    /**
     * Initiate portfolio lightbox 
     */
    const portfolioLightbox = GLightbox({
        selector: '.portfolio-lightbox'
    });

    /**
     * Portfolio details slider
     */
    new Swiper('.portfolio-details-slider', {
        speed: 400,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        }
    });

    /**
     * Animation on scroll
     */
    window.addEventListener('load', () => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        })
    });

    /**
     * Initiate typed js
     */
    window.addEventListener('load', () => {
        const typed = new Typed('#text_typed_position', {
            stringsElement: '#text_typed',
            typeSpeed: 40,
            backDelay: 1000,
            loop: true,
            // cursorChar: '_',
        });
    });

    /**
     * Initiate Pure Counter 
     */
    new PureCounter();

})()

// init swite alert
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});

// convert number to banlga number toBn('0123456789');
const toBn = n => n.replace(/\d/g, d => "০১২৩৪৫৬৭৮৯" [d]);

// Start Using JQery
$('document').ready(function() {
    // Quantity change
    var proQty = $('.pro-qty');
    proQty.prepend('<button class="dec qtybtn">-</button>');
    proQty.append('<button class="inc qtybtn">+</button>');
    proQty.on('click', '.qtybtn', function(e) {
        e.preventDefault();
        var $button = $(this);
        var oldValue = $button.parent().find('input').val();
        if ($button.hasClass('inc')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            // Don't allow decrementing below zero
            if (oldValue > 1) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 1;
            }
        }
        $button.parent().find('input').val(newVal);
        var service_price = $button.parent().parent().find('.service_price').val();
        var total_service_price = +(service_price) * +(newVal);
        $button.parent().parent().find('.item-price').html(toBn('৳ ' + total_service_price));
    });
    // Quantity change
    var proQty = $('.pro-qty2');
    proQty.prepend('<button class="dec qtybtn">-</button>');
    proQty.append('<button class="inc qtybtn">+</button>');
    proQty.on('click', '.qtybtn', function(e) {
        e.preventDefault();
        var $button = $(this);
        var oldValue = $button.parent().find('input').val();
        if ($button.hasClass('inc')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            // Don't allow decrementing below zero
            if (oldValue > 1) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 1;
            }
        }
        $button.parent().find('input').val(newVal);
        var service_price = $button.parent().parent().find('.service_price').val();
        var total_service_price = +(service_price) * +(newVal);
        $button.parent().parent().parent().find('.order_price_view').val(toBn('৳ ' + total_service_price));
    });

    // Update Profile Model/pop-up
    $('#changeProfileToEdit').click(function() {
        $('#changeProfileToEdit').addClass('d-none');
        $('#changeCustomerProfile').removeClass('d-none');
        $('#cus-profile-number').removeAttr('readonly');
        $('#cus-profile-number').focus();
        $('#cus-gender').removeAttr('disabled');
        $('#cus-address').removeAttr('readonly');
    });
    // Update Customer Profile
    $('#changeCustomerProfile').click(function() {
        var customer_id = $('#customer_id').val();
        var phone_number = $('#cus-profile-number').val();
        var gender = $('#cus-gender').val();
        var address = $('#cus-address').val();
        if (customer_id > 0) {
            if (phone_number) {
                if (address) {
                    $.ajax({
                        url: "controllers/customer-profile.php",
                        type: "POST",
                        data: {
                            "customer_id": customer_id,
                            "phone_number": phone_number,
                            "gender": gender,
                            "address": address
                        },
                        success: function(data) {
                            if (data == 'success') {
                                // alert("Your Profile Updated Successfully.");
                                // location.reload();
                                Swal.fire({
                                    title: 'Successful!',
                                    text: 'Your Profile Updated Successfully.',
                                    icon: 'success',
                                    confirmButtonText: 'Ok',
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        location.reload();
                                    } else {
                                        location.reload();
                                    }
                                });
                            } else {
                                alert("Something Wrong, Please Contact Us.");
                            }
                        }
                    });
                } else {
                    $('#cus-address').addClass('border-danger');
                }
            } else {
                $('#cus-profile-number').addClass('border-danger');
            }
        } else {
            alert("Something want Wrong. Please Login Again..");
        }
    });
    // all cart item remove
    $('.cart-remove-all-btn').click(function() {
        if ($("input:checkbox[name=cart-item-input]:checked").length == 0) {
            // alert('No Item Selected.');
            Toast.fire({
                icon: 'warning',
                title: 'No Item Selected.',
            });
        } else {
            $("input:checkbox[name=cart-item-input]:checked").each(function() {
                var service_id = $(this).val();
                removeToCart(service_id);
            });
        }
    });
    // all cart item order
    $('#all-cart-order-btn').click(function() {
        if ($("input:checkbox[name=cart-item-input]:checked").length == 0) {
            // alert('No Item Selected.');
            Toast.fire({
                icon: 'warning',
                title: 'No Item Selected.',
            });
        } else {
            var allService_id = "";
            var allServicePrice = 0;
            var allServiceCuntity = "";
            $("input:checkbox[name=cart-item-input]:checked").each(function() {
                var service_id = $(this).val();
                var service_price = $('#service_' + service_id + '_price').val();
                var service_cuntity = $('#service_' + service_id + '_cuntity').val();
                allService_id = allService_id + service_id + ",";
                allServicePrice = allServicePrice + parseInt(service_price * service_cuntity);
                allServiceCuntity = allServiceCuntity + service_cuntity + ",";
                // alert(service_id+'='+service_price+'='+service_cuntity);
            });
            // alert(allService_id+' & '+allServicePrice+' & '+allServiceCuntity);
            placeOrder('modal-cart', 'm', allService_id, allServiceCuntity, allServicePrice);
        }
    });
    // cart model opening and data clear
    // $('#modal-cart').on('show.bs.modal', function () {
    //   $("#modal-cart input:checkbox:checked").each(function(){
    //     $(this).prop( "checked", false );
    //   });
    // });
    // on order model close clean data
    $('#modal-services-order').on('hidden.bs.modal', function() {
        resetOrderModal();
    });
    // on order cancel model close clean data
    $('#order-cancel-message').on('hidden.bs.modal', function() {
        $('#cancel_order_id').val('');
        $('#cancel_order_message').val('');
    });
    // cancel order function
    $('#cancel_order_btn').click(function() {
        var customer_id = $('#customer_id').val();
        var order_id = $('#cancel_order_id').val();
        var cancel_message = $('#cancel_order_message').val();
        if (customer_id > 0) {
            if (order_id != '' && cancel_message != '') {
                $.ajax({
                    url: "controllers/orderFullController.php",
                    type: "POST",
                    data: {
                        "action": 'cancel_order',
                        "customer_id": customer_id,
                        "order_id": order_id,
                        "cancel_by": 'customer',
                        "cancel_message": cancel_message
                    },
                    success: function(response) {
                        if (response == 'success') {
                            // alert("The Order Has Been Cancelled Successfully.");
                            // location.reload();
                            Swal.fire({
                                title: 'Successful!',
                                text: 'The Order Has Been Cancelled Successfully.',
                                icon: 'success',
                                confirmButtonText: 'Ok',
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    location.reload();
                                } else {
                                    location.reload();
                                }
                            });
                        } else if (response == 'time_par') {
                            // alert("Sorry !! Your Order Time Up To 15 minite.");
                            // location.reload();
                            Swal.fire({
                                title: 'Sorry!',
                                text: 'Sorry !! Your Order Time Up To 15 minite.',
                                icon: 'warning',
                                confirmButtonText: 'Ok',
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    location.reload();
                                } else {
                                    location.reload();
                                }
                            });
                        } else {
                            alert("Something Wrong, Please Contact Us.");
                        }
                    }
                });
            } else {
                // alert('Please Fill The Form.');
                Toast.fire({
                    icon: 'error',
                    title: 'Please Fill The Form.'
                });
            }
        } else {
            // alert("You are Loged Out. Please Login Again.");
            var google_login_link = $('#google_login_btn').attr("href");
            window.location.assign(google_login_link);
        }
    });
    // on order cancel model close clean data
    $('#order-complete-feedback-modal').on('hidden.bs.modal', function() {
        $('#complete_order_id').val('');
        $('#complete_package_id').val('');
        $('#complete_service_id').val('');
        $('#complete_order_feedback_message').val('');
    });
    $('#order-proccing-info-modal').on('hidden.bs.modal', function() {
        $('#ServiceTBody').html('');
        $('#MaterialsTBody').html('');
    });
});

// add to cart ajax function
function addToCart(SERVICE_ID) {
    var customer_id = $('#customer_id').val();
    if (customer_id > 0) {
        if (SERVICE_ID > 0) {
            $.ajax({
                url: "controllers/cartController.php",
                type: "POST",
                data: {
                    "action": 'add',
                    "customer_id": customer_id,
                    "service_id": SERVICE_ID
                },
                success: function(data) {
                    if (data == 'success') {
                        // alert("This Service is Add To Cart - Successfully.");
                        // location.reload();
                        Swal.fire({
                            title: 'Successful!',
                            text: 'This Service is Add To Cart - Successfully.',
                            icon: 'success',
                            confirmButtonText: 'Ok',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                location.reload();
                            } else {
                                location.reload();
                            }
                        });
                    } else if (data == 'have') {
                        // alert("This Service Already In You Cart.");
                        Toast.fire({
                            icon: 'error',
                            title: 'This Service Already In Your Cart.'
                        });
                    } else {
                        alert("Something Wrong, Please Contact Us.");
                    }
                }
            });
        } else {
            alert("Something Wrong, Please Contact Us.");
        }
    } else {
        // alert("You are Loged Out. Please Login Again.");
        Swal.fire({
            title: 'Error!',
            text: 'You are Loged Out. Please Login Again.',
            icon: 'error',
            confirmButtonText: 'Login',
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                var google_login_link = $('#google_login_btn').attr("href");
                window.location.assign(google_login_link);
            } else {
                location.reload();
            }
        });
    }
}
// remove to cart ajax function
function removeToCart(SERVICE_ID) {
    var customer_id = $('#customer_id').val();
    if (customer_id > 0) {
        if (SERVICE_ID > 0) {
            $.ajax({
                url: "controllers/cartController.php",
                type: "POST",
                data: {
                    "action": 'remove',
                    "customer_id": customer_id,
                    "service_id": SERVICE_ID
                },
                success: function(data) {
                    if (data == 'success') {
                        // alert("This Service Remove From Cart - Successfully.");
                        // location.reload();
                        Swal.fire({
                            title: 'Successful!',
                            text: 'This Service Remove From Cart - Successfully.',
                            icon: 'success',
                            confirmButtonText: 'Ok',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                location.reload();
                            } else {
                                location.reload();
                            }
                        });
                    } else {
                        alert("Something Wrong, Please Contact Us.");
                    }
                }
            });
        } else {
            alert("Something Wrong, Please Contact Us.");
        }
    } else {
        alert("You are Loged Out. Please Login Again.");
    }
}

// confirm the order function
function placeOrder(BACK_MODEL, ORDER_TYPE, SERVICE_ID, QUANTITY, ORDER_PRICE) {
    $('#' + BACK_MODEL).modal('hide');
    $('#modal-services-order-back-btn').attr("data-bs-target", "#" + BACK_MODEL);
    $('#modal-services-order').modal('show');
    // set order_type
    $('#order_type').val(ORDER_TYPE);
    // set order_service_id
    $('#order_service_id').val(SERVICE_ID);
    // set order_quantity
    $('#order_quantity').val(QUANTITY);
    // set order number
    var new_order_number = $('#new_order_number').val();
    $('#order_number').val(new_order_number);
    // set order price
    $('#order_price_view').val(toBn('৳ ' + ORDER_PRICE));
}

function resetOrderModal() {
    var termsService = $('#terms-service');
    var orderBtn = $('.right-bot-order-btn');
    termsService.removeAttr("checked");
    orderBtn.addClass('dis');
    orderBtn.attr("disabled", "disabled");

    $('#order_type').val('');
    $('#order_service_id').val('');
    $('#order_quantity').val('');

    $('#order_number').val('');
    $('#order_price').val('');
    $('#order_price_view').val('');

    // alert("ohh ! You Miss The Order.");
    Toast.fire({
        icon: 'error',
        title: 'ohh ! You Miss The Order.'
    });
}

function confirmOrder() {
    // var order_customer_name = $('#order_customer_name').val();
    // var order_customer_phone = $('#order_customer_phone').val();
    // var order_customer_email = $('#order_customer_email').val();
    // var order_customer_address = $('#order_customer_address').val();
    // var order_want_start_date = $('#order_want_start_date').val();
    // var order_want_start_time = $('#order_want_start_time').val();
    // var order_customer_message = $('#order_customer_message').val();
    // var order_number = $('#order_number').val();
    // var order_price = $('#order_price').val();
    // var order_type = $('#order_type').val();
    // var order_service_id = $('#order_service_id').val();
    // var order_quantity = $('#order_quantity').val();

    // off the order button
    $(".right-bot-order-btn").removeAttr("onclick");
    var form_data = $('#order-confirm-form').serialize();
    $.ajax({
        url: "controllers/orderController.php",
        type: "POST",
        data: form_data,
        dataType: "json",
        encode: true,
        success: function(response) {
            // alert(response);
            if (!response.success) {
                // alert();
                // on the order button for showing error
                $(".right-bot-order-btn").attr("onclick", 'confirmOrder()');
                if (response.errors.order_customer_name) {
                    $('#order_customer_name').addClass("border-danger");
                    Toast.fire({
                        icon: 'error',
                        title: response.errors.order_customer_name
                    });
                } else if (response.errors.order_customer_phone) {
                    $('#order_customer_phone').addClass("border-danger");
                    Toast.fire({
                        icon: 'error',
                        title: response.errors.order_customer_phone
                    });
                } else if (response.errors.order_customer_email) {
                    $('#order_customer_email').addClass("border-danger");
                    Toast.fire({
                        icon: 'error',
                        title: response.errors.order_customer_email
                    });
                } else if (response.errors.order_customer_address) {
                    $('#order_customer_address').addClass("border-danger");
                    Toast.fire({
                        icon: 'error',
                        title: response.errors.order_customer_address
                    });
                } else if (response.errors.order_want_start_date) {
                    $('#order_want_start_date').addClass("border-danger");
                    Toast.fire({
                        icon: 'error',
                        title: response.errors.order_want_start_date
                    });
                } else if (response.errors.order_want_start_time) {
                    $('#order_want_start_time').addClass("border-danger");
                    Toast.fire({
                        icon: 'error',
                        title: response.errors.order_want_start_time
                    });
                } else {
                    Toast.fire({
                        icon: 'error',
                        title: response.message
                    });
                }
            } else {
                // alert(response.message);
                // location.reload();
                Swal.fire({
                    title: 'Successful!',
                    text: response.message,
                    icon: 'success',
                    confirmButtonText: 'Ok',
                }).then((result) => {
                    if (result.isConfirmed) {
                        location.reload();
                    } else {
                        location.reload();
                    }
                });
            }
        }
    });
    // alert(form_data);
}

// order proccing info
function order_view_details(order_id) {
    var customer_id = $('#customer_id').val();
    $.ajax({
        url: "controllers/orderFullController.php",
        type: "POST",
        data: {
            "action": 'order_info',
            "customer_id": customer_id,
            "order_id": order_id
        },
        dataType: "json",
        encode: true,
        success: function(response) {
            // alert(response);
            if (!response.success) {
                alert(response.message);
                location.reload();
            } else {
                $('#service_date').text(toBn(response.service_date));
                $('#service_price').text(response.service_price + ' ৳');
                $('#discount_percentage').text('- ' + response.discount_percentage + ' %');
                $('#admin_discount').text('- ' + toBn(response.admin_discount) + ' ৳');
                $('#extra_service_price').text('+ ' + response.extra_service_price + ' ৳');
                $('#extra_amount').text('+ ' + response.extra_amount + ' ৳');
                $('#order_price').text(response.order_price + ' ৳');
                $('#paid_price').text(response.paid_price + ' ৳');
                $('#char_price').text('০ ৳');
                $('#due_price').text(toBn(response.due_price) + ' ৳');
                if (response.paid == 1) {
                    $('#char_price').text('- ' + toBn(response.due_price) + ' ৳');
                    $('#due_price').text('০ ৳');
                }
                if (response.complain_status == 1) {
                    $('#complain_status_div').html("<span class='label label-warning'>আপনার কমপ্লেনটি পর্যবেক্ষন করা হচ্ছে।</span>");
                } else if (response.complain_status == 2) {
                    $('#complain_status_div').html("<span class='label label-info'>আপনার কমপ্লেনটি গ্রহন করা হয়েছে।</span>");
                } else if (response.complain_status == 3) {
                    $('#complain_status_div').html("<span class='label label-primary'>আপনার কমপ্লেনটি কার্যক্রম চলছে।</span>");
                } else if (response.complain_status == 4) {
                    $('#complain_status_div').html("<span class='label label-success'>আপনার কমপ্লেনটি সম্পন্ন কার্যক্রম শেষ হয়েছে।</span>");
                } else if (response.complain_status == 5) {
                    $('#complain_status_div').html("<span class='label label-danger'>আপনার কমপ্লেনটি বাতিল করা হয়েছে।</span>");
                } else {
                    $('#complain_status_div').html('');
                }
                if (response.employee_info == true) {
                    $('#employee_info').removeClass("d-none");
                    $('#employee_name').text('' + response.employee_name);
                    $('#employee_details').html(response.employee_post + "<br><b>" + response.employee_phone2 + "</b>");
                    $('#employee_pic').attr("src", "" + response.employee_pic);
                } else {
                    $('#employee_info').addClass("d-none");
                }
                $('#order-proccing-info-modal').modal('show');
            }
        }
    });
}

// order want cancel
function order_want_cancel(order_id) {
    // $('#modal-new-order').modal('hide');
    $('#cancel_order_id').val(order_id);
    $('#order-cancel-message').modal('show');
    // alert(message)
}

// complete order feedback send
function order_complete_feedback(order_id, package_id, service_id) {
    // alert(order_id);
    $('#complete_order_id').val(order_id);
    $('#complete_package_id').val(package_id);
    $('#complete_service_id').val(service_id);
    $('#order-complete-feedback-modal').modal('show');
}

// complete order feedback send function
function send_feedback() {
    $('#complete_order_send').removeAttr("onclick", "");
    var form_data = $('#complete_order_feedback_form').serialize();
    var customer_id = $('#customer_id').val();
    if (customer_id > 0) {
        $.ajax({
            url: "controllers/orderFullController.php",
            type: "POST",
            data: form_data,
            success: function(response) {
                // alert(response);
                if (response == 'success') {
                    // alert("Thank You For Feedback.");
                    // location.reload();
                    Swal.fire({
                        title: 'Thank You!',
                        text: 'Thank You For Feedback.',
                        icon: 'success',
                        confirmButtonText: 'Ok',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        } else {
                            location.reload();
                        }
                    });
                } else {
                    // alert("Something Wrong, Please Contact Us.");
                    Toast.fire({
                        icon: 'error',
                        title: 'Please Fill The Form.'
                    });
                    $('#complete_order_send').attr("onclick", "send_feedback()");
                }
            }
        });
    } else {
        alert("You are Loged Out. Please Login Again.");
    }
}

// complete order feedback send
function order_place_to_complain(order_id) {
    // alert(order_id);
    $('#complain_order_id').val(order_id);
    $('#order-place-complain-modal').modal('show');
}

// order complain send function
function send_order_place_complain() {
    var form_data = $('#order_place_complain_form').serialize();
    var customer_id = $('#customer_id').val();
    if (customer_id > 0) {
        $.ajax({
            url: "controllers/orderFullController.php",
            type: "POST",
            data: form_data,
            success: function(response) {
                // alert(response);
                if (response == 'success') {
                    // alert("Your Complain Submited Successfuly.");
                    // location.reload();
                    Swal.fire({
                        title: 'Successful!',
                        text: 'Your Complain Submited Successfuly.',
                        icon: 'success',
                        confirmButtonText: 'Ok',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        } else {
                            location.reload();
                        }
                    });
                } else {
                    // alert("Something Wrong, Please Contact Us.");
                    Toast.fire({
                        icon: 'error',
                        title: 'Please Fill The Form.'
                    });
                }
            }
        });
    } else {
        alert("You are Loged Out. Please Login Again.");
    }
}

// confirm order page service change details function
function order_id_change(service_id) {
    $.ajax({
        url: "controllers/public-api-controller.php",
        type: "POST",
        data: {
            "action": 'order_page_id_change_details',
            "service_id": service_id,
        },
        dataType: "json",
        encode: true,
        success: function(response) {
            // alert(response);
            if (!response.success) {
                alert(response.message);
                location.reload();
            } else {
                // alert(response.order_price);
                $('#service_price').val(response.order_price);
                $('#order_quantity').val('1');
                $('#order_price_view').val(toBn('৳ ' + response.order_price));
            }
        }
    });
}