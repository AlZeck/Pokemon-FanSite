function signup() {
    var user = $("#username").val();
    var pass = $("#password").val();
    var pasc = $("#password-confirm").val();
    var confirmpass =  new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!#$%&\(\)\*+,\-./:;<=>?@\[\\\]^_{|}~])(?=.{6,})").test(pass);
    if (user != "" && confirmpass && pass == pasc) {
        $.ajax
            ({
                type: 'post',
                url: '/lib/php/signup.php',
                data: {
                    username: user,
                    password: pass
                },
                success: function (response) {
                    if (response == "success") {
                        window.location.href = "/index.html";
                    }
                    else {
                        if (response == "error: user") {
                            $("#username").addClass("is-invalid");
                        } else {
                            alert("Stiamo avendo problemi per elaborare la tua richiesta per favore riprovaci piu tardi");
                        }
                    }
                }
            });
    }

    else {
        if (user == "") {
            $("#username").addClass("is-invalid");
        }
        if (!confirmpass) {
            $("#password").addClass("is-invalid");
        }
        if (pass != pasc){
            $("#password-confirm").addClass("is-invalid");
        }
    }
    return false; //prevent submit form waits till ajax response
}

function removeValidationUsername() {
    $("#username").removeClass("is-invalid");
}

function removeValidationPassword() {
    $("#password").removeClass("is-invalid");
}

function removeValidationPasswordConf() {
    $("#password-confirm").removeClass("is-invalid");
}