import { useNavigate } from "react-router-dom";
import { NoteCreator, auth } from "../Firebase/Firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";



function DashboardNotes () {

    const navigate = useNavigate();
    const logoutClick = () => {
        navigate("/");
    }
 
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            const userName = user.displayName;
        } else {
            // User is signed out
            // ...
        }
        });

        const logOutUser= () => {
        signOut(auth)
        .then(() => {
          logoutClick();
        }).catch((error) => {
          // An error happened.
        })};

    return(
        
        <>
        <header>
            <div className="headerContent">
                <div className="digiviceContainer">
                    <img src="https://i.imgur.com/pfG56a5.png" className="digiviceImage"></img>
                </div>
                <p className="headParagraph">Welcome to your Digi-Notes!</p>
                <button className="logoutButton" onClick={logOutUser}>Logout</button>
            </div>
        </header>
       
        <section className="pageSection">
            <section className='notesBoard'> 
                <NoteCreator/>
            </section>
            {/* <div className="DashboardNotes">
                <p className="headParagraph">This page is still awaiting for hatching</p>
                <img src="./assets/digiegg.gif" alt="digiegg" />
            </div> */}
        </section>
        </>

    );
}

export default DashboardNotes;