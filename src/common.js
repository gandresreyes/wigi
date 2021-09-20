
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
  import { getAuth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut 
} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";

  const firebaseConfig = {
    apiKey: "AIzaSyBiWeNJ1Vm5JrhgJe6uM2EyyxD5O7EDPWU",
    authDomain: "wigi-788bf.firebaseapp.com",
    projectId: "wigi-788bf",
    storageBucket: "wigi-788bf.appspot.com",
    messagingSenderId: "776203766072",
    appId: "1:776203766072:web:7ef8a0d2652b293db859cd"
  };

  // Initialize Firebase
 initializeApp(firebaseConfig);

export  class ManageAccount{
     register (email ,password){
        createUserWithEmailAndPassword(getAuth(),email ,password) 
        .then((_)=>{
            window.location.href ="tareas.html";
        }).catch((error)=>{
            console.error(error.message)
        });
     }

     authenticate(email,password ){
        signInWithEmailAndPassword(getAuth(),email ,password)
        .then((_)=>{
            window.location.href = "tareas.html";
        }).catch((error)=>{
            console.error(error.message)
        }); 
     }     
     singnOut(){
        signOut(getAuth())
        .then((_)=>{
            window.location.href = "index.html";
        }).catch((error)=>{
            console.error(error.message)
        }); 


     }


 }
