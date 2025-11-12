import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import DOMPurify from "dompurify";
import { Link, useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import LoadingSpinner from '../../components/Spinner/LoadingSpinner';

const NoteDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { data: note, isLoading } = useQuery({
        queryKey: ['noteDetails', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/note/${id}`);
            return res.data
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
            navigate("/notes")
        },
        onError: async (err) => {
            console.log(err);
            toast.error("Couldn't delete note. Please try again later")
        }
    });

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

    if (isLoading) return <LoadingSpinner />

    const cleanNoteContent = DOMPurify.sanitize(note?.content);

    return (
        <div
            className="bg-white border rounded-xl shadow p-4 space-y-2"
        >
            <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">{note?.subject}</h3>
                <h3 className="font-semibold text-lg">{note?.title}</h3>
                <div className="space-x-2">
                    <Link
                        // onClick={() => handleEditNote(note._id)}
                        to={`/editNote/${note?._id}`}
                        className="px-3 py-1 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 cursor-pointer"
                    >
                        Edit
                    </Link>
                    <button
                        onClick={() => handleDeleteNote(note._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer"
                    >
                        Delete
                    </button>
                </div>
            </div>
            <div
                className="prose max-w-none ql-editor truncate"
                dangerouslySetInnerHTML={{ __html: cleanNoteContent }}
            />
            <p className="text-gray-400 text-sm">
                Created: {new Date(note.createdAt).toLocaleString()}
            </p>
        </div>
    );
};

export default NoteDetails;