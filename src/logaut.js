import { ManageAccount } from "./common.js";

document.getElementById("btn-Logout").addEventListener("click", (e) =>{
    const acount = new ManageAccount();
    acount.singnOut()

    },false
)