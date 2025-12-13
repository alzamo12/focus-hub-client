import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import DOMPurify from "dompurify";
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useState } from 'react';
import NoteForm from '../../components/Forms/NoteForm';
import LoadingSpinner from '../../components/Spinner/LoadingSpinner';
import { toast } from 'react-toastify';

const EditNote = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const [currentNote, setCurrentNote] = useState("");
    const [title, setTitle] = useState("");
    const [sub, setSub] = useState(null);
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { data: note, isLoading } = useQuery({
        queryKey: ['noteDetails', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/note/${id}`);
            if (res.data) {
                const cleanHTML = DOMPurify.sanitize(res.data.content);
                setCurrentNote(cleanHTML)
                setTitle(res.data.title)
                setSub({
                    value: res.data.subject,
                    label: res.data.subject
                })
            }
            return res.data
        }
    });
    const { mutateAsync: noteEditAsync } = useMutation({
        mutationFn: async (noteData) => {
            const res = await axiosSecure.patch(`/note/${id}`, noteData);
            return res.data
        },
        onSuccess: (data) => {
            console.log(data);
            toast.success("Your note updated successfully");
            queryClient.invalidateQueries({ queryKey: ['noteDetails', 'note'] });
            navigate(`/note/${id}`)
        }
    })
    if (isLoading) return <LoadingSpinner />
    console.log(note)

    const handleEditNote = (id) => {
        const cleanHTML = DOMPurify.sanitize(currentNote)
        const noteData = {
            content: cleanHTML,
            title,
            subject: sub.value
        };
        // console.log(noteData);
        noteEditAsync(noteData)
    };

    return (
        <div className='max-w-screen-2xl ' >
            <h2 className="text-2xl font-bold text-center my-4">📒 Edit Note</h2>
            {/* note add form */}
            <NoteForm
                currentNote={currentNote}
                setCurrentNote={setCurrentNote}
                title={title}
                setTitle={setTitle}
                sub={sub}
                setSub={setSub}
                handleNote={handleEditNote}
            />
        </div >
    );
};

export default EditNote;