import { ManageAccount } from "./common.js";

document.getElementById("btn-signin").addEventListener("click", (e) =>{
    e.preventDefault();
    const  email = document.getElementById("signin-email").value;
    const  password = document.getElementById("signin-password").value;    
    
    const acount = new ManageAccount();
    acount.authenticate(email, password)

    },false
)

