
import { ManageAccount } from "./common.js";
import { getFirestore, collection, addDoc, serverTimestamp, query, where, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";


//consulta con query al Firestore
const db = getFirestore();
let currentUser = undefined;

const tareasQuery = query(
    collection(db, "tareas"),
    where("user", "==", "greyes@tinformatica.com"),
    orderBy("date", "desc")
);

onAuthStateChanged(getAuth(), (user) => {
    if (user) {
        currentUser = user;
        document.getElementById("userName").innerHTML = 'Hola' + "  " + user.email;
        
    }

});

const tareaForm = document.getElementById('tarea-form');
tareaForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombreTarea = document.getElementById('tarea-name').value;
    const descTarea = document.getElementById('tarea-desc').value;
    document.getElementById('tarea-name').value = "";
    document.getElementById('tarea-desc').value = "";
    addDoc(collection(db, "tareas"), {
        user: currentUser.email,
        ntarea: nombreTarea,
        destarea: descTarea,
        date: serverTimestamp()
    });
    $('#tareamodal').modal('hide')

}, false);


onSnapshot(tareasQuery, (querySnapshot) => {
    let tareasHtml = "";
    querySnapshot.forEach((doc) => {
        const tarea = doc.data();

        tareasHtml +=
        '<div class="col-md-4">'           
        +'<div class="card p-3 mb-2">'
        +'<div class="d-flex justify-content-between">'
        +'<div class="d-flex flex-row align-items-center">'
        +'<div class="icon"> <i class="bx bxl-mailchimp"></i> </div>'
        +'<div class="ms-2 c-details">'
        +'<span>'+tarea.date+'</span>'
        +'</div>'
        +'</div>'
        +'<button type="button" class="btn btn-outline-dark badge" id="terea-edit">Edit</button>'
        +'</div>'
        +'<div class="mt-5">'
        +'<h3 class="heading">'+tarea.ntarea+'</h3>'
        +'<div class="mt-5">  '
        +'<div class="mt-3"> <span class="text1">'+tarea.destarea+'</span> </div>'
        +'</div>'
        +'</div>'
        +'</div>'
        +'</div>'

        document.getElementById("list-terea").innerHTML = tareasHtml;



    });

});






