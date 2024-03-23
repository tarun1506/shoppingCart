// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  query,
  startAfter,
  limit,
  orderBy,
  updateDoc,
  
} from "firebase/firestore";
import {} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
function MyFirebase() {
  const firebaseConfig = {
    apiKey: "AIzaSyCltF1x3jqiU3Auiqd9j3IB7fEp0PMD5LA",
    authDomain: "shoppingcartnu.firebaseapp.com",
    projectId: "shoppingcartnu",
    storageBucket: "shoppingcartnu.appspot.com",
    messagingSenderId: "760454177837",
    appId: "1:760454177837:web:1b21cfb408df096a63c4a4",
    measurementId: "G-0DYSW18E7H",
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const me = {};

  me.getProducts = async () => {
    const productRef = collection(db, "Products");
    return (await getDocs(productRef)).docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
  };

  me.addProduct = async (product) => {
    const productRef = collection(db, "Products");
    await setDoc(doc(productRef), {
      name: product.name,
      price: product.price,
    });
  };

  me.addProductToCart = async (product) => {
    const productRef = collection(db, "Cart");
    await setDoc(doc(productRef), {
      name: product.name,
      price: product.price,
    });
  };

  me.updateProduct = async (id, updatedProductDetails) => {
    await updateDoc(doc(db, "Products", id), updatedProductDetails);
    return updatedProductDetails;
  };

  me.deleteProduct = async (product) => {
    const productRef = doc(db, "Products", product.id);
    await deleteDoc(productRef);
  };

  me.getCartItems = async () => {
    const productRef = collection(db, "Cart");

    return (await getDocs(productRef)).docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
  };

  me.deleteCartProduct = async (product) => {
    const productRef = doc(db, "Cart", product.id);
    await deleteDoc(productRef);
  };

  me.getProductsPerPage = async (lastVisible) => {
    const productRef = query(
      collection(db, "Products"),
      orderBy("name"),
      startAfter(lastVisible || 0),
      limit(20)
    );
    const querySnapshot = await getDocs(productRef);
    const lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
    const newProducts = querySnapshot.docs.reverse().map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return { newProducts, lastVisibleDoc };
  };


  me.getTotalCountOfProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "Products"));
    return querySnapshot.size;
  };

  return me;
}

export const firebase = new MyFirebase();
// Initialize Firebase
