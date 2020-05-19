function logout() {
    document.cookie = "PHPSESSID=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    location.reload();
}

function searchNavbar() {
    var search = $("#navbar-search").val().toLowerCase();
    window.location.href = "/search.php?s=" + search;
    return false;
}