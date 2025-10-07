(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Fixed Navbar - VERSÃO CORRIGIDA
    $(window).scroll(function () {
        if ($(window).width() < 992) {
            // Comportamento simplificado para mobile
            if ($(this).scrollTop() > 10) {
                $('.fixed-top').addClass('bg-white shadow');
            } else {
                $('.fixed-top').removeClass('bg-white shadow');
            }
        } else {
            // COMPORTAMENTO CORRIGIDO PARA DESKTOP
            if ($(this).scrollTop() > 45) {
                $('.fixed-top').addClass('bg-white shadow');
            } else {
                $('.fixed-top').removeClass('bg-white shadow');
            }
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Project carousel
    $(".project-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        loop: true,
        center: true,
        dots: false,
        nav: true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });


    // Testimonials carousel - CORREÇÃO PARA MOBILE
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav: false,
        responsive: {
            0:{
                items:1,
                center: false
            },
            576:{
                items:1,
                center: false
            },
            768:{
                items:2,
                center: true
            },
            992:{
                items:3,
                center: true
            }
        }
    });

    // CORREÇÃO ADICIONAL: Prevenir conflitos de navbar
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        // Só aplica se não for mobile
        if (window.innerWidth >= 992) {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        }
    });

    // CORREÇÃO: Toggler do Bootstrap para mobile
    $(document).ready(function () {
        $('.navbar-toggler').click(function () {
            var target = $(this).data('bs-target');
            $(target).toggleClass('show');
        });

        // Fechar menu ao clicar em um link (mobile)
        $('.navbar-nav .nav-link').click(function () {
            if ($(window).width() < 992) {
                $('.navbar-collapse').collapse('hide');
            }
        });
    });

    // CORREÇÃO: Ajuste de altura do carousel em mobile
    function adjustCarouselHeight() {
        if ($(window).width() < 768) {
            var windowHeight = $(window).height();
            var navbarHeight = $('.navbar').outerHeight();
            $('#header-carousel .carousel-item').css('height', (windowHeight - navbarHeight) + 'px');
        } else {
            $('#header-carousel .carousel-item').css('height', '');
        }
    }

    // Aplicar ajuste ao carregar e redimensionar
    $(window).on('load resize', adjustCarouselHeight);

})(jQuery);


// Comportamento do scroll no mobile
$(document).ready(function() {
    let lastScrollTop = 0;
    
    $(window).scroll(function() {
        if ($(window).width() < 992) {
            let scrollTop = $(this).scrollTop();
            
            if (scrollTop > 100) {
                $('.fixed-top').addClass('scrolled');
            } else {
                $('.fixed-top').removeClass('scrolled');
            }
            
            lastScrollTop = scrollTop;
        }
    });
    
    // Ajuste inicial da altura do hero
    function adjustHeroHeight() {
        if ($(window).width() < 992) {
            let navbarHeight = $('.navbar').outerHeight();
            let windowHeight = $(window).height();
            $('.carousel-item').css('height', (windowHeight - navbarHeight) + 'px');
        }
    }
    
    // Aplicar ao carregar e redimensionar
    adjustHeroHeight();
    $(window).resize(adjustHeroHeight);
});


// NAVBAR MOBILE PROFISSIONAL - CONTROLE COMPLETO
document.addEventListener('DOMContentLoaded', function() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.getElementById('navbarCollapse');
    const navbar = document.querySelector('.navbar');
    
    // Criar overlay para fechar o menu
    function createOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'navbar-overlay';
        document.body.appendChild(overlay);
        return overlay;
    }
    
    const overlay = createOverlay();
    
    if (navbarToggler && navbarCollapse) {
        // Controle do estado do menu
        navbarCollapse.addEventListener('show.bs.collapse', function () {
            overlay.classList.add('show');
            document.body.style.overflow = 'hidden';
            navbarToggler.setAttribute('aria-expanded', 'true');
        });
        
        navbarCollapse.addEventListener('hide.bs.collapse', function () {
            overlay.classList.remove('show');
            document.body.style.overflow = '';
            navbarToggler.setAttribute('aria-expanded', 'false');
        });
        
        // Fechar menu ao clicar no overlay
        overlay.addEventListener('click', function() {
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
            if (bsCollapse) {
                bsCollapse.hide();
            }
        });
        
        // Fechar menu ao clicar nos links
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                if (window.innerWidth < 992) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (bsCollapse) {
                        bsCollapse.hide();
                    }
                }
            });
        });
        
        // Fechar menu ao redimensionar para desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth >= 992) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse && navbarCollapse.classList.contains('show')) {
                    bsCollapse.hide();
                }
            }
        });
    }
    
    // Efeito de scroll na navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Prevenir conflitos com outros scripts
    $(document).ready(function() {
        // Garantir que o Bootstrap Collapse funcione corretamente
        $('#navbarCollapse').on('show.bs.collapse', function () {
            $('.navbar-toggler').addClass('active');
        });
        
        $('#navbarCollapse').on('hide.bs.collapse', function () {
            $('.navbar-toggler').removeClass('active');
        });
        
        // Fechar menu ao clicar fora (backup)
        $(document).on('click', function(e) {
            if ($(window).width() < 992) {
                if (!$('.navbar').has(e.target).length && 
                    $('#navbarCollapse').hasClass('show')) {
                    const bsCollapse = new bootstrap.Collapse($('#navbarCollapse')[0]);
                    bsCollapse.hide();
                }
            }
        });
    });
});

// INICIALIZAÇÃO ADICIONAL PARA ANIMAÇÕES
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar classe inicial baseada no scroll
    if (window.scrollY > 100) {
        document.querySelector('.navbar').classList.add('scrolled');
    }
    
    // Garantir que o menu inicie fechado no mobile
    if (window.innerWidth < 992) {
        const navbarCollapse = document.getElementById('navbarCollapse');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            navbarCollapse.classList.remove('show');
        }
    }
});


// email js

function sendMail(){
    let parms = {
        name : document.getElementById("name").value,
        email : document.getElementById("email").value,
          subject : document.getElementById("subject").value,
            message : document.getElementById("message").value,
    }

    emailjs.send("lopesaiton803", "template_8hgfbx6", parms).then(alert("Email Sent!!"))
}