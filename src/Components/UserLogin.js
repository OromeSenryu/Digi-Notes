import { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { auth, registerUser, userExist } from "../Firebase/Firebase-config";
import { signInWithEmailAndPassword, onAuthStateChanged, getAuth } from "firebase/auth";

function UserLogin () {

    const navigate = useNavigate();

    // useEffect(() => {
    //     onAuthStateChanged(auth, async (user) => {
    //     if (user) {
    //         await registerUser(user.uid, user.displayName, user.email);
    //         const isRegistered = await userExist(user.uid);
    //         if (isRegistered && user.uid) {
    //         navigate('/dashboardNotes');
    //         }
    //         console.log(user.displayName);
    //     }
    //     });
    // }, [navigate]);

    return (
        <section className="pageSection">
            <div className="userLoginElements">
                <p className="headParagraph">Login</p>
                <form className="loginForm">
                    <label className="formLabel">
                        <input 
                        type="email" 
                        placeholder='user@mail.com'/>
                    </label>
                    <label className="formLabel">
                        <input 
                        type="password" 
                        placeholder="Introduce your password"/>
                    </label>
                    <button className="mainButton">Submit</button>
                </form>
                <br></br>
                <p className="secondParagraph">Don't have an account yet?</p>
                <button className="mainButton"><Link to="/register">Create one</Link></button>
            </div>

            <div className="tamersContainer">
                <img src="https://i.imgur.com/CL5YTHB.png" className="tamersMainImages"></img>
            </div>
        </section>
    );
}

export default UserLogin;