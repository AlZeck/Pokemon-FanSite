function signup() {
    var user = $("#username").val();
    var pass = $("#password").val();
    var pasc = $("#password-confirm").val();
    var s = "";
    if (user != "" && pass.length > 5 && pass == pasc) {
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
                        window.location.href = "login.html";
                        alert("Loggati con il account appena creato!");
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
        if (pass.length <= 5) {
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