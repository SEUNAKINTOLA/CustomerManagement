(function (window, document, $) {
  'use strict';
  // for active tab arrow
  $('.nav-tabs .nav-item').click(function () {
    $(this).addClass('current').siblings().removeClass('current');
  });
  // add current class to parent of active class
  $('.nav-tabs .nav-item').find('.active').parent().addClass("current");
})(window, document, jQuery);
