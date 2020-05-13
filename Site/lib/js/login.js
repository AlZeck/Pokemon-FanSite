function login() {
    var user = $("#username").val();
    var pass = $("#password").val();
    var check = $("#checkrem").prop('checked');
    if (user != "" && pass != "") {
        $.ajax
            ({
                type: 'post',
                url: '/lib/php/login.php',
                data: {
                    username: user,
                    password: pass,
                    check: check
                },
                success: function (response) {
                    if (response == "success") {
                        window.location.href = "/index.html";
                    }
                    else {
                        if (response == "error: password"){
                            $("#username").addClass("is-valid");
                            $("#password").addClass("is-invalid");
                        }
                        else {
                            $("#username").addClass("is-invalid");
                        }
                    }
                }
            });
    }

    else {
        $("#username").addClass("is-invalid");
    }
    return false; //prevent submit form waits till ajax response
}

function removeValidationUsername(){
    $("#username").removeClass("is-valid");
    $("#username").removeClass("is-invalid");
}

function removeValidationPassword(){
    $("#password").removeClass("is-invalid");
}
