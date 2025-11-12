import DOMPurify from "dompurify";
import { Link } from "react-router";

const NoteCard = ({ note, handleDeleteNote, handleEditNote }) => {
    // const cleanHTML = DOMPurify.sanitize(note?.content);
    const cut = note.content.slice(0, 200);
    const clean = DOMPurify.sanitize(cut);
    // console.log(note)
    return (
        <div className="card bg-primary text-neutral w-96 h-44">
            <div className="card-body items-center text-center">
                <h2 className="card-title text-xl">{note?.title}</h2>
                <h2 className="card-title  text-base">Subject: {note?.subject}</h2>
                <div className="card-actions justify-end">
                    <Link to={`/note/${note?._id}`} className="btn btn-secondary text-black">View</Link>
                    <button onClick={() => handleDeleteNote(note?._id)} className="btn btn-ghost border border-secondary">Delete</button>
                </div>
            </div>
        </div>
    );
};

export default NoteCard;