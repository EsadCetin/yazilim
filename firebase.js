import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyBYpP9zkhXt-JXdy9fN4aXkRt8JX1qDbVs",
	authDomain: "dersvesinavhatirlatici.firebaseapp.com",
	projectId: "dersvesinavhatirlatici",
	storageBucket: "dersvesinavhatirlatici.appspot.com",
	messagingSenderId: "981043824812",
	appId: "1:981043824812:web:71c4b0011f531f669cb709",
};
let app;

if (firebase.apps.length === 0) {
	const firebaseApp = firebase.initializeApp(firebaseConfig);
} else {
	app = firebase.app();
}

const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };
