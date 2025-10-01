import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import LoadingSpinner from "../../components/Spinner/LoadingSpinner"
import QuestionForm from '../../components/GenerateQuestions/QuestionsForm';

const GenerateQuestions = () => {
    // const [sub, setSub] = useState('');
    const [questionInfo, setQuestionInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosSecure();

    const { data: questions, refetch } = useQuery({
        queryKey: ['question', questionInfo],
        queryFn: async () => {
            const res = await axiosSecure.post(`/gemini`, questionInfo);
            setLoading(false)
            return res.data
        },
        enabled: !!questionInfo,
        refetchOnWindowFocus: false
    })


    const handleSubmit = (subject, subTopic, level, language) => {
        setLoading(true)
        const questionInfo = {
            subject: subject.value,
            subTopic: subTopic.value,
            level: level.value,
            language: language.label
        };
        setQuestionInfo(questionInfo);
    };
    console.log(questionInfo)

    return (
        <div>
            <h2 className="card-title text-2xl flex items-center justify-center font-bold">Generate questions</h2>
            <QuestionForm onSubmit={handleSubmit} />
            <div className='my-10'>
                {
                    loading ?
                        <LoadingSpinner />
                        :
                        <div>
                            <h2 className="card-title font-bold mb-4">Here is the answer:</h2>
                            <p className='whitespace-pre-line'>{questions}</p>
                        </div>
                }
            </div>
        </div>
    );
};

export default GenerateQuestions;