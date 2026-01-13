import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import LoadingSpinner from "../../components/Spinner/LoadingSpinner"
import QuestionForm from '../../components/GenerateQuestions/QuestionsForm';
import { toast } from "react-toastify"
const GenerateQuestions = () => {
    // const [sub, setSub] = useState('');
    const [questionInfo, setQuestionInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosSecure();

    const { data: questions, error, refetch, isLoading } = useQuery({
        queryKey: ['question', questionInfo],
        queryFn: async () => {
            const res = await axiosSecure.post(`/gemini`, questionInfo);
            console.log(res)
            setLoading(false)
            return res.data
        },
        onSuccess: (data) => { console.log(data) },
        enabled: !!questionInfo,
        refetchOnWindowFocus: false,
        retry: false
    });

    console.log(error)

    const { data: questionsData, mutateAsync, isPending } = useMutation({
        mutationFn: async (data) => {
            const res = await axiosSecure.post(`/generate-questions`, data);
            return res.data
        },
        onSuccess: () => toast.success("Data get successfully"),
        onError: (err) => {
            console.error(err)
            if (err?.response?.status === 503) {
                return toast.error(err.response?.data?.message)
            }
            toast.error("Please try again later")
        }
    });

    console.log(questionsData)


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
            <QuestionForm onSubmit={handleSubmit} />
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