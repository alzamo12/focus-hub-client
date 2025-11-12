import DOMPurify from "dompurify";
import { Link } from "react-router";

const NoteCard = ({ note, handleDeleteNote, handleEditNote }) => {
    // const cleanHTML = DOMPurify.sanitize(note?.content);
    const cut = note.content.slice(0, 200);
    const clean = DOMPurify.sanitize(cut);
    // console.log(note)
    return (
        <div
            key={note.id}
            className="bg-white border rounded-xl shadow p-4 space-y-2"
        >
            <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">{note?.subject}</h3>
                <h3 className="font-semibold text-lg">{note?.title}</h3>
                <div className="space-x-2">
                    <Link
                        // onClick={() => handleEditNote(note._id)}
                        to={`/note/${note?._id}`}
                        className="px-3 py-1 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 cursor-pointer"
                    >
                        View
                    </Link>
                    <button
                        onClick={() => handleDeleteNote(note._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer"
                    >
                        Delete
                    </button>
                </div>
            </div>
            <div
                className="prose max-w-none ql-editor truncate"
                dangerouslySetInnerHTML={{ __html: clean }}
            />
            <p className="text-gray-400 text-sm">
                Created: {new Date(note.createdAt).toLocaleString()}
            </p>
        </div>
    );
};

export default NoteCard;