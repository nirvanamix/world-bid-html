"use strict";

jQuery(document).ready(function ($) {
  var manu = {
    fun: function fun() {
      $('.open-menu').click(function (event) {
        $('.menu-wr').toggleClass('active');
      });
      jQuery(document).click(function (event) {
        if (jQuery(event.target).closest(".open-menu").length) return;
        $('.menu-wr').removeClass('active');
        event.stopPropagation();
      });
    }
  };
  manu.fun();
  var acardion = {
    fun: function fun() {
      $('.acardion .top span').click(function (event) {
        $('.acardion .top span').not($(this)).parents('.item').removeClass('active').find('.bottom').slideUp(400);
        $(this).parents('.item').toggleClass('active').find('.bottom').slideToggle(400);
      });
    }
  };
  acardion.fun();
  var langwich = {
    fun: function fun() {
      $('.langwich .top').click(function (event) {
        $(this).parent('.langwich').toggleClass('acitve');
      });
      jQuery(document).click(function (event) {
        if (jQuery(event.target).closest(".langwich .top").length) return;
        $('.langwich').removeClass('acitve');
        event.stopPropagation();
      });
    }
  };
  langwich.fun();
  var modal_window = {
    fun: function fun() {
      $('body').on('click', 'a[data-modal]', function (event) {
        event.preventDefault();
        $('.modal-window').fadeOut(400).removeClass('active');
        $('.modal-window[data-modal="' + $(this).attr('data-modal') + '"]').fadeIn(400).addClass('active');
        $('html, body').addClass('overflow-body');
      });

      var close_window = function close_window() {
        $('.modal-window').fadeOut(400).removeClass('active');
        $('html, body').removeClass('overflow-body');
      };

      $('body').on('click', '.close', function (event) {
        close_window();
      });
      jQuery(".modal-window").click(function (event) {
        if (jQuery(event.target).closest(".window").length) return;
        close_window();
        event.stopPropagation();
      });
    }
  };
  modal_window.fun();
  var checkbox = {
    fun: function fun() {
      $('label.label-checkbox').each(function (event) {
        if ($(this).find('input').prop('checked') == true) $(this).addClass('active');else $(this).removeClass('active');
      });
      $('label.label-checkbox').click(function (event) {
        $('label.label-checkbox').each(function (event) {
          if ($(this).find('input').prop('checked') == true) $(this).addClass('active');else $(this).removeClass('active');
        });
      });
    }
  };
  checkbox.fun();
});