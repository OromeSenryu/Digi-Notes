import { useState, useEffect} from "react"
import { initializeApp } from 'firebase/app';
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { getStorage } from 'firebase/storage';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  setDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBssX7T2bvmVuCKZr5iHBY2qmz9VenfGRg",
    authDomain: "digi-notes-545db.firebaseapp.com",
    projectId: "digi-notes-545db",
    storageBucket: "digi-notes-545db.appspot.com",
    messagingSenderId: "780235481334",
    appId: "1:780235481334:web:e5062687c014f4c454ccd7",
    measurementId: "G-H6281WKX4V"
  };

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


// * Validate existing user
export async function userExist(uid) {
  const docRef = doc(db, 'users', uid);
  const res = await getDoc(docRef);
  console.log(res);
  return res.exists();
}

onAuthStateChanged(auth, (user) => {
  if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      const userName = user.displayName;
  } else {
      // User is signed out
      // ...
  }
  });

// * New user
export async function registerUser(uid, name, email) {
  try {
    const userCollection = collection(db, 'users');
    console.log(uid);
    console.log(name);
    console.log(email);
    await setDoc(doc(userCollection, uid), {
      uid,
      name,
      email,
    });
  } catch (error) {
    console.log('User not registered', error);
  }
}

export async function registerUserEmailPass(uid, userName, name, email, password) {
  try {
    const userCollection = collection(db, 'users');
    console.log(uid);
    console.log(userName);
    console.log(name);
    console.log(email);
    console.log(password);
    await setDoc(doc(userCollection, uid), {
      uid,
      userName,
      name,
      email,
      password,
    });
  } catch (error) {
    console.log('User not registered', error);
  }
}

// * Notes creator
export const NoteCreator = () => {
  const [noteTitle, setNewTitle] = useState ("");
  const [newContent, setNewContent] = useState ("");

  const [notes, setNotes] = useState ([]);
  const notesCollection = collection(db, "notes")

  const createNote = async () =>{
    await addDoc(notesCollection,{ title: noteTitle, content: newContent, timestamp: serverTimestamp() });
   };
   
   useEffect(() => {
   
       const getNotes = async () => {
            const data= await getDocs(notesCollection);
            setNotes(data.docs.map((doc) =>({...doc.data(), id: doc.id} )));
       }
       getNotes()
   
   }, [])
  
    return (
      <>
      <div>
            <form className="noteInputs">
                <input placeholder="noteTitle" onChange={(e) => {setNewTitle(e.target.value);}}>
                </input>
                <textarea placeholder="noteContent" onChange={(e) => {setNewContent(e.target.value);}}>
                </textarea>
            </form>
            <button onClick={createNote}>Create note</button>
        </div>
        <div>
        {notes.map((note)=>{
            return <div className="allNotesContainer">
                <div className="noteContainer">
                  <div className="noteTitleBox">
                    <p className="noteTitleParagraph">{note.title}</p>
                  </div>
                  <div className="noteContentBox">
                    <p className="noteContentParagraph">{note.content}</p>
                  </div>
                  <div className="noteButtonsBox">
                    <button>Edit</button>
                    <button>Delete</button>
                  </div>
                  {/* <p>{note.timestamp}</p> */}
                </div>
              </div>
          })}
          
        </div>
        </>
    )
}

// //* Logout function
// export const logOutUser= () => 
//   signOut(auth).then(() => {
//     // Sign-out successful.
//   }).catch((error) => {
//     // An error happened.
//   });