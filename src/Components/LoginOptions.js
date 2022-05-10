import "./Components.css"
import { Link } from "react-router-dom";
import { auth } from "../Firebase/Firebase-config";
import { GoogleAuthProvider, signInWithPopup,  } from "firebase/auth";

function LoginOptions () {

    // * Login with Google
    const googleLogin = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then((result) => {
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
          });
    }

    return(
        <section className="pageSection">
            <div className="loginElements">
                <p className="headParagraph">Welcome to Digi-Notes!</p>
                <button className="mainButton userButton" ><Link to="/userLogin">
                    <img src="https://i.imgur.com/pfG56a5.png" className="imageButton"/>  Login with account</Link>
                </button>
                <button className="secondButton googleButton" onClick={googleLogin}>
                <img src="https://i.imgur.com/wSRm9x7.png" className="imageButton"/>  Login with Google</button>
                <br></br>
                <p className="secondParagraph">Don't have an account yet?</p>
                <button className="secondButton"><Link to="/register">Create one</Link></button>

                {/* <button><Link to="/dashboardNotes">Dashboard mock</Link></button> */}
            </div>

            <div className="tamersContainer">
                <img src="https://i.imgur.com/Qk6ooyb.png" className="tamersMainImages"></img>
            </div>
        </section>
    );
}

export default LoginOptions;