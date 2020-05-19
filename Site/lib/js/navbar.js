function includeNavBar() {
  return fetch("/navbar.html")
    .then(response => {
      return response.text()
    })
    .then(data => {
      if (document.getElementById("mainPokefanNavBar") != null) {
        return;
      }
      var curr = document.body.innerHTML;
      document.body.innerHTML = data + curr;
      if (document.cookie.indexOf("PHPSESSID=") != -1) {
        // Im logged in
        $("#gobattle").show();
        $("#logout").show();

        $("#login").hide();
        $("#signup").hide();
      }
      else {
        $("#login").show();
        $("#signup").show();

        $("#gobattle").hide();
        $("#logout").hide();
      }

    });

};

includeNavBar();