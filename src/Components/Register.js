import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import useRegisterForm from '../Forms/registerForm';
import { auth, registerUserEmailPass, userExist, } from "../Firebase/Firebase-config";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

function Register () {
    let navigate = useNavigate();
    const { handleChange, values, errors, handleSubmit } = useRegisterForm(userForm);

    async function userForm() {
        try {
          const res = await createUserWithEmailAndPassword(auth, values.email, values.password);
          await registerUserEmailPass(
            auth.currentUser.uid,
            values.userName,
            values.name,
            auth.currentUser.email,
            values.password
          );
    
          const registered = await userExist(auth.currentUser.uid);
          console.log(registered);
          if (registered && auth.currentUser.uid) {
            navigate('/dashboardNotes');
          }
        } catch (error) {
          console.log(error);
        }
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
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
    
        return(
            <section className="pageSection">
                <div className="registerElements">
                    <p className="headParagraph">Create an account</p>
                    
                    <form className='registerUserForm' onSubmit={handleSubmit}>
                    
                        <div className='formInput'>
                            <input 
                            name='email'
                            type='email'
                            id='inputEmail'
                            placeholder='user@example.com'
                            onChange={handleChange}
                            required/>
                        </div>
                    
                        <div className='formInput'>
                            <input 
                            name='password'
                            type='password'
                            className='form__text--register'
                            id='passwordOne'
                            placeholder='Password'
                            onChange={handleChange}
                            required
                            />
                        </div>
                        
                        <button className='mainButton'>Sign in</button>
                    </form>

                    <p className='or'>or</p>

                    <button className="googleButton" onClick={googleLogin}>
                        <img src="https://i.imgur.com/wSRm9x7.png" className="imageButton"/>  Sign in with Google
                    </button>
                    
                    <p className="secondParagraph">Already have an account?</p>
                    <button className="mainButton"><Link to="/">Login</Link></button>
                </div>

                <div className="tamersContainer">
                    <img src="https://i.imgur.com/7S2e7ox.png" className="tamersMainImages"></img>
                </div>
            </section>
        )
    };
    


export default Register;