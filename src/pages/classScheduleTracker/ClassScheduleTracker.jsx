import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { da } from "zod/v4/locales";
import AddClass from "../../features/classschedule/AddClass";
import ClassCard from "../../components/Class/ClassCard";
import { data, UNSAFE_createClientRoutesWithHMRRevalidationOptOut } from "react-router";

export default function Classes() {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const queryClient = useQueryClient();
    // const axiosSecure = useAxiosSecure();
    // Fetch Classes
    const { data: classes = [] } = useQuery({
        queryKey: ["classes", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/classes?email=${user?.email}`);
            console.log(res?.data)
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
    };

    const handleEdit = (id) => {
        document.getElementById(`my_module_${id}`).showModal()
    }

    return (
        <div className="p-6 max-w-4xl mx-auto bg-[--color-base-100] min-h-screen">
            <h2 className="text-2xl font-bold text-[--color-primary] mb-4">Class Schedule</h2>
            {/* Class List */}
            <div className="grid gap-4">
                {classes.map((cls) => (
                    <ClassCard key={cls._id} cls={cls} handleDelete={handleDelete} handleEdit={handleEdit} />
                ))}
            </div>
        </div>
    );
}
