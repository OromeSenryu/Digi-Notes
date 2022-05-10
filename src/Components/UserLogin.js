import { Link } from "react-router-dom";
import { auth } from "../Firebase/Firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";

function UserLogin () {
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
                    <button>Submit</button>
                </form>
                <br></br>
                <p className="secondParagraph">Don't have an account yet?</p>
                <button className="secondButton"><Link to="/register">Create one</Link></button>
            </div>

            <div className="tamersContainer">
                <img src="https://i.imgur.com/CL5YTHB.png" className="tamersMainImages"></img>
            </div>
        </section>
    );
}

export default UserLogin;