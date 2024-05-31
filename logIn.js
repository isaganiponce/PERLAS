function LogIn(){
    var username = document.getElementById("email").value;
    var password = document.getElementById("password").value;


    if(username != ""){
        if(username == "daniel"){
            if(password != ""){
                if(password == "lausa"){
                    window.location.href = "homepage.html";
                    return true;
                } else {
                    document.getElementById("password").style.borderBlockColor = "red";
                    document.getElementById("errorMessage").innerHTML = "Incorrect password";
                    return false;
                }
            } else {
                document.getElementById("password").style.borderBlockColor = "red";
                document.getElementById("errorMessage").innerHTML = "Enter your password";
                return false;
            }
        } else {
            document.getElementById("email").style.borderBlockColor = "red";
            document.getElementById("errorMessage").innerHTML = "Incorrect username";
            return false;
        }
    } else {
        document.getElementById("email").style.borderBlockColor = "red";
        document.getElementById("errorMessage").innerHTML = "Enter your username";
        return false;
    }
}

