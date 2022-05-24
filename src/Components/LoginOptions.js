import "./Components.css"
import { Link, useNavigate } from "react-router-dom";
import { auth, } from "../Firebase/Firebase-config";
import { GoogleAuthProvider, signInWithPopup,  } from "firebase/auth";

function LoginOptions () {

    const navigate = useNavigate();
    const loginClick = () => {
        navigate("/dashboardNotes");
    }

    // * Login with Google
    const googleLogin = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            loginClick(result);
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
                <button className="mainButton userButton"><Link to="/userLogin">Login with account</Link>
                </button>
                <button className="googleButton" onClick={googleLogin}>
                <img src="https://i.imgur.com/wSRm9x7.png" className="imageButton"/>  Login with Google</button>
                <br></br>
                <p className="secondParagraph">Don't have an account yet?</p>
                <button className="mainButton"><Link to="/register">Create one</Link></button>
            </div>

            <div className="tamersContainer">
                <img src="https://i.imgur.com/Qk6ooyb.png" className="tamersMainImages"></img>
            </div>
        </section>
    );
}

export default LoginOptions;