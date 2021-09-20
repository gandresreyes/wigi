
import { ManageAccount } from "./common.js";
import { getFirestore, collection, addDoc, serverTimestamp, query, where, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";


document.getElementById("btn-Logout").addEventListener("click", () => {
    const acount = new ManageAccount();
    acount.singnOut()

}, false
)

const db = getFirestore();
let currentUser = undefined;
const messagesQuery = query(
    collection(db, "messages"),
    where("roomid", "==", "chat1"),
    orderBy("date", "desc")
);


onAuthStateChanged(getAuth(), (user) => {
    if (user) {
        currentUser = user;
        document.getElementById("userName").innerHTML = 'Hola' + "  " + user.email;
    }

})
document.getElementById("btn-send").addEventListener("click", (e) => {
    e.preventDefault();
    const message = document.getElementById("message").value;
    document.getElementById("message").value = "";
    addDoc(collection(db, "messages"), {
        user: currentUser.email,
        roomid: "chat1",
        message,
        date: serverTimestamp()
    });

}, false
);
document.getElementById("message").addEventListener("keyup", (event) => {   
    if (event.code === "Enter") {
        event.preventDefault();
        const message = document.getElementById("message").value;
        document.getElementById("message").value = "";
        addDoc(collection(db, "messages"), {
            user: currentUser.email,
            roomid: "chat1",
            message,
            date: serverTimestamp()
        });
    }
}, false
);

onSnapshot(messagesQuery, (querySnapshot) => {
    let chatHtml = "";
    querySnapshot.forEach((doc) => {
        const message = doc.data();
        if (message.user == currentUser.email)
            chatHtml += '<div class="alert alert-secondary mr-5" >'            
         + message.message +'</div>'
        else {
            chatHtml += '<div class="alert alert-info ml-5" >'
            + message.message +'</div>'
        }
        document.getElementById("chat").innerHTML = chatHtml;



    });

});



