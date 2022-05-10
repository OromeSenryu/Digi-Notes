import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { auth } from "../Firebase/Firebase-config";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

function Register () {

    // * Create new user
    const createUser = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        });
        // console.log("Obtaining email and password", email, password);
    }

    // * Sign in with Google
    const googleLogin = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // TODO: React Redirect for getting logged in usser to Dashboard page
          })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
          });
    }
    // function UserForm() {
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
    
        return(
            <section className="pageSection">
                <div className="registerElements">
                    <p className="headParagraph">Create an account</p>
                    <form className='registerUserForm'>
                    
                        <label className="formLabel">
                            <input 
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder='user@mail.com'/>
                        </label>
                    
                        <label className="formLabel">
                            <input 
                            type="text" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Create a password"/>
                        </label>
                        
                        <button onClick={createUser}>Sign in</button>
                    </form>

                    <p className='or'>or</p>

                    <button className="secondButton googleButton" onClick={googleLogin}>
                        <img src="https://i.imgur.com/wSRm9x7.png" className="imageButton"/>  Sign in with Google
                    </button>
                    
                    <p className="secondParagraph">Already have an account?</p>
                    <button className="secondButton"><Link to="/">Login</Link></button>
                </div>

                <div className="tamersContainer">
                    <img src="https://i.imgur.com/7S2e7ox.png" className="tamersMainImages"></img>
                </div>
            </section>
        )
    // };
    
}

export default Register;