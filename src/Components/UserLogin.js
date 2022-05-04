import { Link } from "react-router-dom";

function UserLogin () {
    return (
        <div className="userLoginElements">
            <p>Login</p>
            <form className="loginForm">
                <label className="formLabel">Email</label>
                <input type="email" placeholder='user@mail.com'/>
                <label className="formLabel">Password</label>
                <input type="password" placeholder="Introduce your password"/>
            </form>
            <br></br>
            <p>Don't have an account yet?</p>
            <button className="secondButton"><Link to="/register">Create one</Link></button>
        </div>
    );
}

export default UserLogin;