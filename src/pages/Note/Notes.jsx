import React, { useRef, useState } from 'react';
import NoteCard from '../../features/notes/NoteCard';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from "../../hooks/useAxiosSecure"
import { toast } from "react-toastify"
import useAuth from '../../hooks/useAuth';
import "react-quill-new/dist/quill.snow.css";
import "quill-better-table/dist/quill-better-table.css";
import Swal from 'sweetalert2'


import axios from 'axios';

import DOMPurify from "dompurify";
import NoteForm from '../../components/Forms/NoteForm';
import Select from "react-select";


function dataURLtoFile(dataurl, filename) {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new File([u8arr], filename, { type: mime });
};
const subjects = [
    { value: "Physics", label: "Physics" },
    { value: "Math", label: "Math" },
    { value: "Chemistry", label: "Chemistry" },
    { value: "History", label: "History" },
    { value: "All", label: "All" },
];
const Notes = () => {
    const [currentNote, setCurrentNote] = useState("");
    const [title, setTitle] = useState("");
    const [isEditing, setIsEditing] = useState(null);
    const [sub, setSub] = useState(null);
    const [selectedSub, setSelectedSub] = useState(null);
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const { mutateAsync } = useMutation({
        mutationFn: async (noteData) => {
            const res = await axiosSecure.post(`/note`, noteData);
            return res.data
        }, onSuccess: (data) => {
            toast.success("note added successfully")
            console.log(data)
            queryClient.invalidateQueries({ queryKey: ['note'] })
        }, onError: (err) => {
            console.log(err)
        }
    });

    const { mutateAsync: deleteNoteAsync } = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.delete(`/note/${id}`);
            return res.data
        },
        onSuccess: async (data) => {
            console.log(data);
            toast.success("Note deleted Successfully");
            queryClient.invalidateQueries({ queryKey: ['note'] })
        },
        onError: async (err) => {
            console.log(err);
            toast.error("Couldn't delete note. Please try again later")
        }
    });

    const { data: notes } = useQuery({
        queryKey: ['note', user.email, selectedSub],
        queryFn: async () => {
            const res = await axiosSecure.get(`/notes?email=${user?.email}&subject=${selectedSub?.value}`);
            return res.data
        }
    });


    const handleSaveNote = async () => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(currentNote, "text/html");
        console.log(doc.body.textContent)
        if (!sub) return toast.error("Please select a subject")
        if (!title) return toast.error("Please give a title")
        if (!doc.body.textContent) return toast.error("Please write something on your note")


        const images = doc.querySelectorAll("img");
        console.log("Total images:", images.length);

        for (let img of images) {
            const src = img.src;
            if (src.startsWith('http')) continue;

            const file = dataURLtoFile(src, "note-image.png");


            // 4. Upload to Cloudinary
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "focus-hub");

            const response = await axios.post(
                import.meta.env.VITE_cloudinary_url,
                formData
            );

            // 5. Replace src with Cloudinary URL
            img.src = response.data.secure_url;
            console.log(img.src)
        }
        let updatedHtml = doc.body.innerHTML;

        // 7. Sanitize before storing
        updatedHtml = DOMPurify.sanitize(updatedHtml);


        // console.log('data is of note', title, sub, updatedHtml);
        const noteData = {
            subject: sub?.value,
            title,
            content: updatedHtml
        };
        console.log(noteData)
        mutateAsync(noteData)
    };

    const handleEditNote = () => {

    };

    const handleDeleteNote = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteNoteAsync(id)
            }
        });

    };

    return (
        <div className='max-w-screen-2xl ' >
            <h2 className="text-2xl font-bold text-center my-4">📒 Study Notes</h2>
            {/* note add form */}
            <NoteForm
                currentNote={currentNote}
                setCurrentNote={setCurrentNote}
                title={title}
                setTitle={setTitle}
                sub={sub}
                setSub={setSub}
                handleSaveNote={handleSaveNote}
            />

            {/* previous note history */}
            <div className='mt-10'>
                <Select
                    options={subjects}
                    value={selectedSub}
                    onChange={setSelectedSub}
                    placeholder="Please select your subject"
                    className='w-full md:w-1/3 input-lg rounded-md'
                />
                <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 justify-between my-8">
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
        </div >
    );
};

export default Notes;