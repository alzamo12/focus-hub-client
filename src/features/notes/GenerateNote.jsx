import React from 'react';
import GenerateForm from '../../components/GenerateQuestions/GenerateForm';
import { useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import LoadingSpinner from '../../components/Spinner/LoadingSpinner';
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import "katex/dist/katex.min.css";

const GenerateNote = () => {
    const axiosSecure = useAxiosSecure();
    const { data: generatedNote, mutateAsync, isPending } = useMutation({
        mutationFn: async (data) => {
            const res = await axiosSecure.post("/ai/generate-notes", data);
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

    // console.log(data)

    // if (isPending) {
    //     return <LoadingSpinner />
    // };

    return (
        <div
        // className='overflow-hidden min-h-dvh lg:min-h-full'
        >

            <h2 className="card-title relative mt-4 md:mt-0 text-2xl flex items-center justify-center font-bold">Generate questions</h2>
            <GenerateForm
                formType="notes"
                // isPending={isPending}
                retryAfter={0}
                handleSubmit={handleSubmit} />
            <div className='my-10 relative w-full p-4 border border-primary rounded-lg min-h-50 bg-white shadow-lg'>
                {
                    isPending ?
                        <div className='absolute flex inset-0 justify-center items-center z-50  '>
                            <div className='loading loading-xl loading-ring' />
                        </div>
                        :
                        <div>
                            <h2 className="card-title font-bold mb-4">Here is the answer:</h2>
                            {/* <p className='whitespace-pre-line'>{generatedNote?.text}</p> */}
                            {/* <div className="markdown-body"> */}
                            {/* <ReactMarkdown
                                    remarkPlugins={[remarkMath, remarkGfm]}
                                    rehypePlugins={[rehypeKatex]}
                                >
                                    {generatedNote?.text}
                                </ReactMarkdown> */}
                            <article className="prose prose-lg max-w-none">
                                <ReactMarkdown
                                    remarkPlugins={[remarkMath, remarkGfm]}
                                    rehypePlugins={[rehypeKatex]}
                                >
                                    {generatedNote?.text}
                                </ReactMarkdown>
                            </article>
                            {/* </div> */}
                        </div>
                }
            </div>
        </div>
    );
};

export default GenerateNote;