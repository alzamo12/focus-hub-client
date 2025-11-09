import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { da } from "zod/v4/locales";
import ClassCard from "../../components/Class/ClassCard";
import LoadingSpinner from "../../components/Spinner/LoadingSpinner";
import { useCallback, useMemo, useState } from "react";

export default function Classes() {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const [activeTab, setActiveTab] = useState("next");

    // Fetch Classes
    const { data: classes = [], isLoading } = useQuery({
        queryKey: ["classes", user?.email, activeTab],
        queryFn: async () => {
            const res = await axiosSecure.get(`/classes?email=${user?.email}&type=${activeTab}`);
            console.log(res?.data)
            return res.data;
        }
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

    const handleDelete = useCallback((id) => {
        deleteAsync(id);
    }, [deleteAsync]);

    const handleEdit = useCallback((id) => {
        document.getElementById(`my_module_${id}`).showModal();
    }, []);

    if (isLoading) {
        return <LoadingSpinner />
    }


    return (
        <div className=" w-full mx-auto bg-[--color-base-100] min-h-screen">
            {/* name of each tab group should be unique */}
            <div className="tabs tabs-border mb-10">
                <input
                    type="radio"
                    name="my_tabs_2"
                    checked={activeTab === "next"}
                    onChange={() => setActiveTab("next")}
                    className="tab"
                    aria-label="Next Classes" />
                {/* <div className="tab-content border-base-300 bg-base-100 p-10">Next Classes</div> */}

                <input
                    type="radio"
                    name="my_tabs_2"
                    checked={activeTab === "prev"}
                    onChange={() => setActiveTab("prev")}
                    className="tab"
                    aria-label="Previous Classes"
                />
                {/* <div className="tab-content border-base-300 bg-base-100 p-10">Previous Classes</div> */}

            </div>
            <h2 className="text-2xl font-bold text-[--color-primary] mb-4">Class Schedule</h2>

            {/* Class List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {classes?.length > 0 ? 
                classes?.map((cls) => (
                    <ClassCard key={cls._id} activeTab={activeTab} cls={cls} handleDelete={handleDelete} handleEdit={handleEdit} />
                ))
            :
            <div>No classes available here</div>
            }
            </div>

        </div>
    );
}
