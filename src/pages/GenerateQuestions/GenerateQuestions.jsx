import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import LoadingSpinner from "../../components/Spinner/LoadingSpinner"
import QuestionForm from '../../components/GenerateQuestions/QuestionsForm';
import { toast } from "react-toastify"
import { useEffect } from 'react';
import { useRef } from 'react';
const GenerateQuestions = () => {
    // const [sub, setSub] = useState('');
    const [questionInfo, setQuestionInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosSecure();
    const [retryAfter, setRetryAfter] = useState(0);
    const hasRestoredRef = useRef(false);

    useEffect(() => {
        if (retryAfter <= 0) return;
        // const interval = setInterval((prev) => {
        //     if (retryAfter <= 1) {
        //         clearInterval(interval);
        //         return 0
        //     };
        //     return prev - 1
        // }, 1000)
        const interval = setInterval(() => {
            setRetryAfter((prev) => {
                if (prev <= 1) {
                    clearInterval(interval)
                    return 0
                };
                return prev - 1
            })
        }, 1000)
        return () => clearInterval(interval);
    }, [retryAfter]);
    useEffect(() => {
        if (!hasRestoredRef.current) return;

        if (retryAfter > 0) {
            localStorage.setItem(
                "ai_retry_until",
                Date.now() + retryAfter * 1000
            );
        } else {
            localStorage.removeItem("ai_retry_until");
        }
    }, [retryAfter]);
    useEffect(() => {
        const retryUntil = localStorage.getItem("ai_retry_until");
        if (retryUntil) {
            const diff = Math.ceil((retryUntil - Date.now()) / 1000);
            if (diff > 0) setRetryAfter(diff);
        }
        hasRestoredRef.current = true;
    }, []);

    const { data: questionsData, mutateAsync, isPending } = useMutation({
        mutationFn: async (data) => {
            const res = await axiosSecure.post(`/generate-questions`, data);
            return res.data
        },
        onSuccess: () => {
            toast.success("Data get successfully");
        },
        onError: (err) => {
            console.error(err)
            if (err?.response?.status === 503) {
                return toast.error(err.response?.data?.message)
            }
            if (err?.response?.status === 429) {
                const retryAfter = err?.response?.data?.retryAfter;
                setRetryAfter(retryAfter);
            }
            toast.error("Please try again later")
        }
    });

    const handleSubmit = (subject, subTopic, level, language) => {
        // setLoading(true)
        const questionInfo = {
            subject: subject.value,
            subTopic: subTopic.value,
            level: level.value,
            language: language.label
        };
        // setQuestionInfo(questionInfo);

        mutateAsync(questionInfo)
    };
    // console.log(questionInfo)

    return (
        <div>
            <h2 className="card-title text-2xl flex items-center justify-center font-bold">Generate questions</h2>
            <QuestionForm
                isPending={isPending}
                retryAfter={retryAfter}
                onSubmit={handleSubmit} />
            <div className='my-10'>
                {
                    isPending ?
                        <LoadingSpinner />
                        :
                        <div>
                            <h2 className="card-title font-bold mb-4">Here is the answer:</h2>
                            <p className='whitespace-pre-line'>{questionsData}</p>
                        </div>
                }
            </div>
        </div>
    );
};

export default GenerateQuestions;