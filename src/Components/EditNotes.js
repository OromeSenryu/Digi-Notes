import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase/Firebase-config";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";

function EditNotes () {
    const {state} = useLocation();
    const { noteId } = state; // Read values passed on state
    const MySwal = withReactContent(Swal);

    let id = noteId
    const navigate = useNavigate();
    const [originalTitle, setOriginalTitle] = useState("");
    const [originalContent, setOriginalContent] = useState("");


    const handleEdit = async (id) => {
        const noteRef = await getDoc(doc(db, 'notes', id));
            if(noteRef.exists()) {
                setOriginalTitle(noteRef.data().title);
                setOriginalContent(noteRef.data().content);
            } 
        } 

    const updateNotes = async (id) => {
        // e.preventDefault()
        let idRef = doc(db, 'notes', id);
        const data = {
            title: originalTitle,
            content: originalContent }
        await updateDoc(idRef, data);
        } 

    const handleConfirmEdit = (id) => {
        MySwal.fire({
            text: "Do you want to save your changes?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#A5F18D",
            cancelButtonColor: "#FB9393",
            confirmButtonText: "Yes, save!",
            cancelButtonText: "No, cancel!",
        }).then((result) => {
            if (result.isConfirmed) {
                updateNotes(id);
                MySwal.fire(
                    "Done!",
                    "Your changes have been saved!",
                    "success");
                navigate('/dashboardNotes');
            }
        })
    }
    
        useEffect(() => {
            handleEdit(id);
        }, [])

    const handleCancelEdit = () => {
        navigate('/dashboardNotes')
    }

    return (
        <>
        <header>
            <div className="headerContent">
                <img src="https://i.imgur.com/bSeOlpp.png" className="digiviceImage" alt=''></img>
                <img src="https://i.imgur.com/lkTSipg.png" className="digiviceImage" ></img>
                <h1 className="headParagraph" >Edit your note</h1>
                <img src="https://i.imgur.com/i8Krdsu.png" className="digiviceImage" ></img>
                <img src="https://i.imgur.com/lkcpXRW.png" className="digiviceImage" ></img>
            </div>
        </header>
        <section className='pageSection'>
            <form className='editSection'>
                <div className='noteTitle'>
                    <input className="inputTitle" value={originalTitle} onChange={(e) => setOriginalTitle(e.target.value)} />
                </div>
                <div className='noteContent'>
                    <textarea className="inputContent" rows="15" cols="20" value={originalContent} onChange={(e) => setOriginalContent(e.target.value)} />
                </div>
                <div className='editFooter'>
                    <button className='saveBtn' type='button' onClick={handleConfirmEdit}>Save</button>
                    <button className='cancelBtn' type='button' onClick={handleCancelEdit}>Cancel</button>
                </div>
            </form>
        </section>
        </>
    )
}

export default EditNotes;