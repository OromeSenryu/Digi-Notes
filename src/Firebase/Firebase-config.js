import { useState, useEffect} from "react"
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage } from 'firebase/storage';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  orderBy,
  setDoc,
  deleteDoc,
  serverTimestamp,
  where,
  onSnapshot,
  QuerySnapshot,
} from 'firebase/firestore';
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import { async } from "@firebase/util";


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
const MySwal = withReactContent(Swal);




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
  const notesCollectionRef = collection(db, "notes")

  const createNote = async () =>{
    await addDoc(notesCollectionRef,{ title: noteTitle, content: newContent, timestamp: serverTimestamp(), user: auth.currentUser.email });

    getNotes();
   };

  // * Render notes

  const getNotes = async () => {
 
    // const noteUser = doc.data().user;
    const arrayNotes = [];
    // console.log("Getting userID:", userID);
    // console.log("Getting noteUser:", noteUser);

    const q = query(collection(db, "notes"), orderBy("timestamp", "desc"));
      onSnapshot(q, (QuerySnapshot) => {
        console.log("On shapshot")
        console.log("this is from inside onSnapshot", auth.currentUser.email )
        let userID = auth.currentUser.email 
        QuerySnapshot.forEach((docs) => {
          console.log("On querry shapshot")
              // let userID = auth.currentUser.email
          // if (docs.data().user === userID) {
            console.log("this is from inside onQuerry Snapshot", userID )
            if (docs.data().user ===   userID) {
            arrayNotes.push({ ...docs.data(), id: docs.id });
          }



        })
        setNotes(arrayNotes);
      })

      // const data= await getDocs(query(notesCollectionRef, orderBy("timestamp", "desc")));
      // setNotes(data.docs.map((doc) =>({...doc.data(), id: doc.id, } )));
   }

   // * Delete a note
  const deleteNote = async (id) => {
    let idRef = doc(db, 'notes', id);
    // console.log("idRef", idRef);
    await deleteDoc(idRef);
    getNotes();
}

  const handleConfirmDelete = (id) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "This note will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#A5F18D",
      cancelButtonColor: "#FB9393",
      confirmButtonText: "Yes, I'm sure!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteNote(id);
        MySwal.fire(
          "Deleted!", 
          "This note doesn't exist anymore", 
          "success");
      }
    })
  }
   
  useEffect(() => {
    getNotes();
  }, []);


    return (
      <>
        <div className="noteCreatingBox">
            <form className="noteInputs">
                <div className="noteTitle">
                  <input className="inputTitle" placeholder="Create a title" onChange={(e) => {setNewTitle(e.target.value);}}>
                  </input>
                </div>
                <div className="noteContent">
                  <textarea className="inputContent" placeholder="Write your content here!" onChange={(e) => {setNewContent(e.target.value);}}>
                  </textarea>
                </div>
            </form>
            <button className="createButton" onClick={createNote}>Create note</button>
        </div>
      <div className="notesContainer">
        {notes.map((note)=>{
            return(
                <div className="note" id={note.id} key={note.id}>
                  <div className="noteTitleBox">
                    <p className="noteTitleParagraph">{note.title}</p>
                  </div>
                  <div className="noteContentBox">
                    <p className="noteContentParagraph">{note.content}</p>
                  </div>
                  <div className="noteButtonsBox">
                    <button>Edit</button>
                    <button onClick={()=> {handleConfirmDelete(note.id)}}>Delete</button>
                  </div>
                </div>
              )
          })}
          
        </div>
        </>
    )
}

