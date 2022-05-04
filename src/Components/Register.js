import { Link } from "react-router-dom";

function Register () {
    return(
        <div className="registerElements">
            <p>Create an account</p>
            <form>
            <label className="formLabel">Email</label>
                <input type="email" placeholder='user@mail.com'/>
                <label className="formLabel">Password</label>
                <input type="password" placeholder="Create a password"/>
            </form>
            <br></br>
            <p>Already have an account?</p>
            <button className="secondButton"><Link to="/">Login</Link></button>
        </div>
    );
}

export default Register;