import React, { useState } from 'react';
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { ReactSketchCanvas } from 'react-sketch-canvas';
import NoteCard from '../../features/notes/NoteCard';
import { useMutation, useQuery } from '@tanstack/react-query';
import useAxiosSecure from "../../hooks/useAxiosSecure"
import {toast} from "react-toastify"
import useAuth from '../../hooks/useAuth';

const Notes = () => {
    // const [notes, setNotes] = useState([]);
    const [currentNote, setCurrentNote] = useState("");
    const [subject, setSubject] = useState("");
    const [isEditing, setIsEditing] = useState(null);
    const [showCanvas, setShowCanvas] = useState(false);
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { mutateAsync } = useMutation({
        mutationFn: async (noteData) => {
            const res = await axiosSecure.post(`/note`, noteData);
            return res.data
        }, onSuccess: (data) => {
            toast.success("note added successfully")
            console.log(data)
        }, onError: (err) => {
            console.log(err)
        }
    });

    const { data: notes } = useQuery({
        queryKey: ['note', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/notes?email=${user?.email}`);
            return res.data
        }
    })


    const handleSaveNote = () => {
        console.log('data is of note', subject, currentNote)
        mutateAsync({
            subject,
            content: currentNote
        })
    };

    const handleEditNote = () => {

    };

    const handleDeleteNote = () => {

    };

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline"],
            [{ color: [] }, { background: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["table"],
            ["clean"]
        ],
    };

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "color",
        "background",
        "list",
        // "bullet",
        "table",
    ]

    return (
        <div className='max-w-screen-2xl '>
            <h2 className="text-2xl font-bold text-center my-4">📒 Study Notes</h2>
            <div className="bg-white shadow-lg rounded-2xl p-6 space-y-4">
                <input
                    type="text"
                    className="w-full border rounded-lg p-2 text-lg"
                    placeholder="Enter subject..."
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                />

                <ReactQuill
                    theme='snow'
                    value={currentNote}
                    onChange={setCurrentNote}
                    height="300px"
                    modules={modules}
                    formats={formats}
                    style={{ height: "400px", paddingBottom: "40px" }}
                    className='bg-white  rounded-2xl'
                    placeholder='Write your note here ....'
                />

                <button
                    onClick={() => setShowCanvas(!showCanvas)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    {showCanvas ? "Hide Drawing Canvas" : "Show Drawing Canvas"}
                </button>

                {showCanvas && (
                    <div className='border rounded-lg p-2 bg-gray-50'>
                        <ReactSketchCanvas
                            strokeWidth={3}
                            strokeColor='black'
                            width='100%'
                            height="800px"
                            style={{ borderRadius: "12px" }}
                        />
                    </div>
                )}
                <button
                    onClick={handleSaveNote}
                    className="w-full mt-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                    {isEditing ? "Update Note" : "Save Note"}
                </button>
            </div>
            <div className="space-y-4">
                {notes?.length === 0 ? (
                    <p className="text-center text-gray-500">No notes yet.</p>
                ) : (
                    notes?.map((note) => (
                        <NoteCard
                        key={note._id}
                            note={note}
                            handleEditNote={handleEditNote}
                            handleDeleteNote={handleDeleteNote}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default Notes;