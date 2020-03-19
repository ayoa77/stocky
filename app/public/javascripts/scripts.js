$(".close").on("click", function(event) {
  event.preventDefault();
  $(".alert").hide();
});

function revealErrorAlert(message) {
  $("#errorMessage").text(message);
  $("#alertError").show();
}

function revealSuccessAlert(message) {
  $("#successMessage").text(message);
  $("#alertSuccess").show();
}

function ajaxPostFormSubmit(formId) {
  $(".alert").hide();
  var form = $(formId);
  var input = form.serialize();
  $.post(form.action, input)
    .done(function(data) {
      if ((data && data.redirect) || (data && data.responseJSON))
        window.location.replace(data.redirect || data.responseJSON.redirect);
      if (data.responseJSON && data.responseJSON.redirect) {
        window.location.replace(data.responseJSON.redirect);
      } else if (data) {
        window.location.replace(data.redirect);
      }
    })
    .fail(function(data) {
      if ((data && data.message) || (data && data.responseJSON))
        revealErrorAlert(data.message || data.responseJSON.message);
    });
}

$("#submitSignup").on("submit", function(event) {
  event.preventDefault();
  ajaxPostFormSubmit("#submitSignup");
});

$("#loginSignup").on("submit", function(event) {
  event.preventDefault();
  ajaxPostFormSubmit("#submitSignup");
});

$("#stockForm").on("submit", function(event) {
  event.preventDefault();
  $("#stockStats").fadeOut();
  $(".alert").hide();
  console.log("submitting");

  var form = $("#stockForm");
  var input = form.serialize();
  $.post(form.action, input)
    .done(function(data) {
      if (data && data.response) {
        var stock = data.response;
        for (var firstLetter in stock) {
          var id = "#" + firstLetter;
          console.log(id);
          $(id).text(stock[firstLetter]);
        }

        $("#stockSymbol").val(stock.s);
        $("#stockStats").fadeIn();
      }
    })
    .fail(function(data) {
      console.log(data);
      if ((data && data.message) || (data && data.responseJSON))
        revealErrorAlert(data.message || data.responseJSON.message);
    });
});
