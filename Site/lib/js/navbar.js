function includeNavBar() {
  fetch("/navbar.html")
    .then(response => {
      return response.text()
    })
    .then(data => {
      var curr = document.querySelector("body").innerHTML 
      document.querySelector("body").innerHTML = data + curr ;
    });

};

includeNavBar();