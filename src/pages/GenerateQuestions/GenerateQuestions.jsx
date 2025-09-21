import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import LoadingSpinner from "../../components/Spinner/LoadingSpinner"

const GenerateQuestions = () => {
    const [sub, setSub] = useState('');
    // const [questions, setQuestions] = useState(null);
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosSecure();

    const { data: questions } = useQuery({
        queryKey: ['question', sub],
        queryFn: async () => {
            const res = await axiosSecure.post(`/gemini`, { sub });
            console.log(res.data);
            setLoading(false)
            return res.data
        },
        enabled: !!sub,
        refetchOnWindowFocus: false
    })


    const handleSubmit = value => {
        setLoading(true)
        setSub(value);
        // refetch()
    };

    return (
        <div>
            <h2 className="card-title">Generate questions</h2>
            <div className='my-10 flex gap-5 '>
                <button onClick={() => handleSubmit("Math")} className="btn btn-neutral">Math</button>
                <button onClick={() => handleSubmit("English")} className="btn btn-primary">English</button>
                <button onClick={() => handleSubmit("Bangla")} className="btn bg-green-700">Bangla</button>
                <button onClick={() => handleSubmit("History")} className="btn btn-accent">History</button>
                <button onClick={() => handleSubmit("Physics")} className="btn btn-info">Physics</button>
                <button onClick={() => handleSubmit("Chemistry")} className="btn btn-success">Chemistry</button>
                <button onClick={() => handleSubmit("Biology")} className="btn btn-warning">Biology</button>
                <button onClick={() => handleSubmit("ICt")} className="btn btn-error">ICT</button>
            </div>
            <div className='whitespace-pre-line'>
                {
                    loading ?
                        <LoadingSpinner />
                        :
                        questions?.reply
                }
            </div>
        </div>
    );
};

export default GenerateQuestions;