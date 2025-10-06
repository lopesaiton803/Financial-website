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


// CORREÇÃO ESPECÍFICA PARA O TOGGLER MOBILE
document.addEventListener('DOMContentLoaded', function() {
    // Selecionar o botão do toggler e o menu
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    // Função para alternar o menu
    function toggleMenu() {
        navbarCollapse.classList.toggle('show');
        
        // Alterar o ícone do toggler quando aberto/fechado
        const togglerIcon = navbarToggler.querySelector('.navbar-toggler-icon');
        if (navbarCollapse.classList.contains('show')) {
            // Menu aberto - alterar para ícone X
            togglerIcon.innerHTML = '✕';
            togglerIcon.style.fontSize = '1.5rem';
            togglerIcon.style.lineHeight = '1';
        } else {
            // Menu fechado - voltar para ícone hambúrguer
            togglerIcon.innerHTML = '';
            togglerIcon.style.backgroundImage = "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 255, 255, 1)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e\")";
            togglerIcon.style.fontSize = '';
        }
    }
    
    // Adicionar evento de clique ao toggler
    if (navbarToggler) {
        navbarToggler.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        });
    }
    
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            if (window.innerWidth < 992) {
                navbarCollapse.classList.remove('show');
                
                // Restaurar ícone hambúrguer
                const togglerIcon = navbarToggler.querySelector('.navbar-toggler-icon');
                togglerIcon.innerHTML = '';
                togglerIcon.style.backgroundImage = "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 255, 255, 1)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e\")";
                togglerIcon.style.fontSize = '';
            }
        });
    });
    
    // Fechar menu ao clicar fora dele
    document.addEventListener('click', function(e) {
        if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
            if (!navbarCollapse.contains(e.target) && !navbarToggler.contains(e.target)) {
                navbarCollapse.classList.remove('show');
                
                // Restaurar ícone hambúrguer
                const togglerIcon = navbarToggler.querySelector('.navbar-toggler-icon');
                togglerIcon.innerHTML = '';
                togglerIcon.style.backgroundImage = "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 255, 255, 1)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e\")";
                togglerIcon.style.fontSize = '';
            }
        }
    });
    
    // Fechar menu ao redimensionar a tela para desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 992) {
            navbarCollapse.classList.remove('show');
            
            // Restaurar ícone hambúrguer
            const togglerIcon = navbarToggler.querySelector('.navbar-toggler-icon');
            togglerIcon.innerHTML = '';
            togglerIcon.style.backgroundImage = "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 255, 255, 1)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e\")";
            togglerIcon.style.fontSize = '';
        }
    });
});

// VERSÃO ALTERNATIVA MAIS SIMPLES
document.addEventListener('DOMContentLoaded', function() {
    // Solução simples usando Bootstrap nativo
    $('.navbar-toggler').click(function() {
        $(this).toggleClass('active');
        $('#navbarCollapse').collapse('toggle');
    });
    
    // Fechar menu ao clicar nos links (mobile)
    $('.navbar-nav .nav-link').click(function() {
        if ($(window).width() < 992) {
            $('#navbarCollapse').collapse('hide');
            $('.navbar-toggler').removeClass('active');
        }
    });
    
    // Fechar menu ao clicar fora (mobile)
    $(document).click(function(e) {
        if ($(window).width() < 992) {
            if (!$('.navbar').has(e.target).length && $('#navbarCollapse').hasClass('show')) {
                $('#navbarCollapse').collapse('hide');
                $('.navbar-toggler').removeClass('active');
            }
        }
    });
});


// JavaScript para alternar entre hamburger e X no toggler com animação
document.addEventListener('DOMContentLoaded', function() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.getElementById('navbarCollapse');
    const heroContainer = document.querySelector('.hero-container');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            // Alternar entre hamburger e X
            this.classList.toggle('active');
            
            // Ajustar posição do hero quando menu estiver aberto
            if (heroContainer) {
                if (navbarCollapse.classList.contains('show')) {
                    heroContainer.classList.remove('adjusted');
                } else {
                    heroContainer.classList.add('adjusted');
                }
            }
        });
        
        // Fechar menu ao clicar em um link (opcional)
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navbarToggler.classList.remove('active');
                if (heroContainer) {
                    heroContainer.classList.remove('adjusted');
                }
            });
        });
    }
});