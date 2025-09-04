import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { da } from "zod/v4/locales";

export default function Classes() {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const queryClient = useQueryClient();
    // const axiosSecure = useAxiosSecure();
    // Fetch Classes
    const { data: classes = [] } = useQuery({
        queryKey: ["classes", user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/classes?userEmail=${user?.email}`);
            return res.data;
        },
    });

    const { mutateAsync: deleteAsync } = useMutation({
        mutationFn: async (id) => {
            const res = await axiosPublic.delete(`/class/${id}`);
            return res.data
        },
        onSuccess: (data) => {
            if (data.deletedCount > 0) {
                toast.success('your class has deleted successfully');
                queryClient.invalidateQueries(['classes'])
            }
            console.log(da)
        }
    })

    const handleDelete = (id) => {
        deleteAsync(id)
    }

    return (
        <div className="p-6 max-w-4xl mx-auto bg-[--color-base-100] min-h-screen">
            <h2 className="text-2xl font-bold text-[--color-primary] mb-4">Class Schedule</h2>


            {/* Class List */}
            <div className="grid gap-4">
                {classes.map((cls) => (
                    <div
                        key={cls._id}
                        className="p-4 rounded-xl flex justify-between items-center shadow-2xl bg-primary"
                    // style={{ backgroundColor: cls.color || "var(--color-secondary)" }}
                    >
                        <div>
                            <h3 className="font-bold text-lg text-[--color-primary]">{cls.subject}</h3>
                            <p className="text-[--color-accent]">{cls.day} | {cls.startTime} - {cls.endTime}</p>
                            <p className="text-sm text-[--color-accent]">Instructor: {cls.instructor}</p>
                        </div>
                        <button
                            onClick={() => handleDelete(cls._id)}
                            className="btn btn-sm bg-red-500 text-white hover:bg-red-600">Delete</button>
                    </div>
                ))}
            </div>
        </div>

    );
}
