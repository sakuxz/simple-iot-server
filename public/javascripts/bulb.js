$(function () {
  $('#bulb-control').change(function(event) {
    if (this.checked) {
      controlBulb(true, function () {
        $('.bulb-light').addClass('open');
        $('.bulb-icon-o').addClass('b-hide');
        $('.bulb-icon').removeClass('b-hide');
      });
    } else {
      controlBulb(false, function () {
        $('.bulb-light').removeClass('open');
        $('.bulb-icon-o').removeClass('b-hide');
        $('.bulb-icon').addClass('b-hide');
      });
    }
  });
})

function controlBulb(status, callback) {
  $.ajax({
    url: '/api/led',
    type: 'POST',
    data: {open: status}
  })
  .done(function(e) {
    callback();
    console.log("success");
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });

}
