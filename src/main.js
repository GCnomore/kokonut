import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
   apiKey: "AIzaSyA6059OFbyn5yAzHf-ywnxHgFy9SoFXYlw",
   authDomain: "kokonut-landing.firebaseapp.com",
   projectId: "kokonut-landing",
   storageBucket: "kokonut-landing.firebasestorage.app",
   messagingSenderId: "544367828210",
   appId: "1:544367828210:web:149ec1623e53c7d637846b",
   measurementId: "G-GJ93J6N1TQ",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

const cta1 = document.querySelector("#cta-1");
const cta2 = document.querySelector("#cta-2");
const cta3 = document.querySelector("#cta-3");
const backdrop = document.querySelector("#cta-modal-backdrop");

const showModal = (id) => {
   const modal = document.querySelector("#cta-modal");
   modal.classList.add("flex");
   modal.classList.remove("hidden");
   document.body.classList.add("overflow-y-hidden");
};

const closeModal = () => {
   const modal = document.querySelector("#cta-modal");
   modal.classList.add("hidden");
   modal.classList.remove("flex");
   document.body.classList.remove("overflow-y-hidden");
};

cta1.addEventListener("click", () => showModal("cta1"));
cta2.addEventListener("click", () => showModal("cta2"));
cta3.addEventListener("click", () => showModal("cta3"));
backdrop.addEventListener("click", closeModal);

const form = document.querySelector("#waitlist-form");

const handleSubmit = async (e) => {
   e.preventDefault();

   const email = e.target.elements["email"].value;

   try {
      await addDoc(collection(db, "user_email"), {
         email,
         timestamp: new Date(),
      });
      alert("You're on the list!");
      form.reset();
      closeModal();
   } catch (err) {
      console.error("Error adding email", err);
      alert("Oops! Something went wrong.");
   }
};

form.addEventListener("submit", handleSubmit);
