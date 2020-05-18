function includeNavBar() {
  fetch("/navbar.html")
    .then(response => {
      return response.text()
    })
    .then(data => {
      var curr = document.body.innerHTML;
      document.body.innerHTML = data + curr ;
      if (document.cookie.indexOf("PHPSESSID=")!=-1) {
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
function logout(){
  document.cookie = "PHPSESSID=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  location.reload();
}

function search(){
  var search = $("#navbar-search").val().toLowerCase();
  window.location.href = "/search.php?s="+search;
  return false;
}

includeNavBar();