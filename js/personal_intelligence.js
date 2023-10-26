$(document).ready(function() {
    $('.form-check-input').change(function() {
      if ($(this).is(':checked')) {
        $("#agree-button").prop("disabled", false);
      }
      else {
        $("#agree-button").prop("disabled", true);
      }
    });
  });