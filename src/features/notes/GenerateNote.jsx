import React from 'react';
import GenerateForm from '../../components/Forms/GenerateForm';
import { useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import LoadingSpinner from '../../components/Spinner/LoadingSpinner';
import ReactMarkdown from "react-markdown";
import ReactQuill from 'react-quill-new';
import NoteViewer from '../../components/NoteViewer/NoteViewer';
import "react-quill-new/dist/quill.bubble.css";
import { useState } from 'react';
import DOMPurify from "dompurify";

const GenerateNote = ({ handleGeneratedSaveNote }) => {
    const axiosSecure = useAxiosSecure();
    const [note, setNote] = useState(null);


    const { data: generatedNote, mutateAsync, isPending } = useMutation({
        mutationFn: async (data) => {
            const res = await axiosSecure.post("/ai/generate-notes", data);
            const clean = res?.data?.data
                .replace(/^```json\s*/i, "")
                .replace(/\s*```$/, "");

            const delta = JSON.parse(clean);
            setNote(delta)
            return res.data
        }
    });


    const handleSubmit = async (data) => {
        const { chapter, language, level, subTopic, subject, type } = data;
        const generateNotesData = {
            subject: subject.value,
            chapter: chapter.value,
            level: level.value,
            subTopic: subTopic.value,
            type: type.value,
            language: language.value
        };
        mutateAsync(generateNotesData)
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
        "blockquote",
        "code-block",
        "script",   // for sub/sup
        "strike",
    ];

    return (
        <div>
            <h2 className="card-title relative mt-4 md:mt-0 text-2xl flex items-center justify-center font-bold">Generate questions</h2>
            <GenerateForm
                formType="notes"
                retryAfter={0}
                handleSubmit={handleSubmit} />
            <div className='my-10 relative w-full p-4 border border-primary 
            rounded-lg min-h-50 bg-white  shadow-lg'>
                {
                    isPending ?
                        <div className='absolute flex inset-0 justify-center items-center z-50  '>
                            <div className='loading loading-xl loading-ring text-black' />
                        </div>
                        :
                        <div>
                            <div className='flex justify-between'>
                                <h2 className="card-title font-bold mb-4 text-black ">Here is the answer:</h2>
                                <button
                                    onClick={() => handleGeneratedSaveNote(generatedNote?.text)}
                                    className='btn bg-primary text-black font-bold border-none'
                                >Save</button>
                            </div>
                            <article className="prose prose-lg max-w-none ">
                                <ReactQuill
                                    value={note}
                                    readOnly
                                    theme="bubble"
                                    formats={formats}
                                    className=''
                                />
                            </article>
                        </div>
                }
            </div>
        </div>
    );
};

export default GenerateNote;