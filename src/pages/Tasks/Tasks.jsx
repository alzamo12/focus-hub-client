import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import LoadingSpinner from '../../components/Spinner/LoadingSpinner';
import TaskCard from '../../features/Tasks/TaskCard';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'
const Tasks = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [activeTab, setActiveTab] = useState("next");
    // get the tasks data
    const { data: tasks, isLoading:tasksLoading } = useQuery({
        queryKey: ['task', user?.email, activeTab],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tasks?email=${user?.email}&type=${activeTab}`);
            return res.data
        }
    });
    console.log(tasks);

    const { mutateAsync: deleteAsync } = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.delete(`/task/${id}`);
            return res.data
        },
        onSuccess: (data) => {
            if (data.deletedCount > 0) {
                toast.success('your task has deleted successfully');
                queryClient.invalidateQueries({ queryKey: ['task'] })
            }
            // queryClient.invalidateQueries(['task'])
            console.log(data)
        }
    })


    const handleDelete = (id) => {
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
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
                deleteAsync(id);
            }
        });
    };

    const handleEdit = (id) => {
        // console.log(id)
        document.getElementById(`my_module_${id}`).showModal();
    };

    if (tasksLoading) {
        return <LoadingSpinner />
    };
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
                {tasks?.length > 0 ?
                    tasks?.map((task) => (
                        <TaskCard key={task._id} activeTab={activeTab} task={task} handleDelete={handleDelete} handleEdit={handleEdit} />
                    ))
                    :
                    <div>No classes available here</div>
                }
            </div>

        </div>
    );
};

export default Tasks;