import { ManageAccount } from "./common.js";

document.getElementById("btn-register").addEventListener("click", (e) =>{
    e.preventDefault();
    const  email = document.getElementById("register-email").value;
    const  password = document.getElementById("register-password").value;

    
    
    const acount = new ManageAccount();
    acount.register(email, password)

    },false
)