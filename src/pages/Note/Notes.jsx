import React, { useRef, useState } from 'react';
import ReactQuill from "react-quill-new";
import { ReactSketchCanvas } from 'react-sketch-canvas';
import NoteCard from '../../features/notes/NoteCard';
import { useMutation, useQuery } from '@tanstack/react-query';
import useAxiosSecure from "../../hooks/useAxiosSecure"
import { toast } from "react-toastify"
import useAuth from '../../hooks/useAuth';
import "react-quill-new/dist/quill.snow.css";
import "quill-better-table/dist/quill-better-table.css";

import Quill from "quill";
import Table from "quill/modules/table";
import ImageResize from "quill-image-resize-module-react";
import axios from 'axios';

import DOMPurify from "dompurify";

Quill.register("modules/table", Table);
Quill.register("modules/imageResize", ImageResize)

function dataURLtoFile(dataurl, filename) {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new File([u8arr], filename, { type: mime });
}

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


    const handleSaveNote = async () => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(currentNote, "text/html");

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
                "https://api.cloudinary.com/v1_1/djdhkulah/image/upload",
                formData
            );

            // 5. Replace src with Cloudinary URL
            img.src = response.data.secure_url;
            console.log(img.src)
        }
        let updatedHtml = doc.body.innerHTML;

        // 7. Sanitize before storing
        updatedHtml = DOMPurify.sanitize(updatedHtml);


        console.log('data is of note', subject, updatedHtml)
        mutateAsync({
            subject,
            content: updatedHtml
        })
    };

    const handleEditNote = () => {

    };

    const handleDeleteNote = () => {

    };

    // const modules = {
    //     toolbar: [
    //         [{ header: [1, 2, 3, false] }],
    //         ["bold", "italic", "underline"],
    //         [{ color: [] }, { background: [] }],
    //         [{ list: "ordered" }, { list: "bullet" }],
    //         ['link', 'image'],
    //         ["clean"],
    //         ["table"]
    //     ],
    //     table: true
    // };
    const modules = {
        toolbar: {
            container: [
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "image"],
                ["table"],
                ["increaseImageSize", "decreaseImageSize"],
                ["clean"],
            ],
            handlers: {
                table() {
                    this.quill.getModule("table").insertTable(3, 3);
                },
                increaseImageSize() {
                    const range = this.quill.getSelection();
                    if (!range) return;
                    const [blot] = this.quill.getLeaf(range.index);
                    if (blot && blot.domNode.tagName === "IMG") {
                        const img = blot.domNode;
                        const currentWidth = img.width;
                        img.width = currentWidth + 20; // increase width by 20px
                        img.style.height = "auto"; // maintain aspect ratio
                    }
                },
                decreaseImageSize() {
                    const range = this.quill.getSelection();
                    if (!range) return;
                    const [blot] = this.quill.getLeaf(range.index);
                    if (blot && blot.domNode.tagName === "IMG") {
                        const img = blot.domNode;
                        const currentWidth = img.width;
                        img.width = currentWidth - 100; // decrease width by 20px
                        img.style.height = "auto";
                    }
                },
            },
        },
        table: true,
        imageResize: {
            parchment: Quill.import("parchment"),
            modules: ["Resize", "DisplaySize"], // "Toolbar" not supported in v2
            handleStyle: {
                border: "2px solid #4A90E2",
                width: "12px",
                height: "12px",
                backgroundColor: "white",
                borderRadius: "50%",
            },
        },

    };

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "color",
        "background",
        "list",
        "bullet",
        "link",
        "image",
        "table",
    ]

    return (
        <div className='max-w-screen-2xl ' >
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
        </div >
    );
};

export default Notes;