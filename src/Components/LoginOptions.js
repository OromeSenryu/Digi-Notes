import { Link } from "react-router-dom";
import { auth } from "../Firebase/Firebase-config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

function LoginOptions () {

    const googleLogin = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // ...
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

    return(
        <div className="loginElements">
            <p>Welcome to Digi-Notes!</p>
            <button className="mainButton" ><Link to="/userLogin">Login</Link></button>
            <button className="secondButton googleButton" onClick={googleLogin}>Login with Google</button>
            <br></br>
            <p>Don't have an account yet?</p>
            <button className="secondButton"><Link to="/register">Create one</Link></button>
        </div>
    );
}

export default LoginOptions;