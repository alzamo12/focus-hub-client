import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import LoadingSpinner from '../../components/Spinner/LoadingSpinner';
import TaskCard from '../../features/Tasks/TaskCard';
import { useState } from 'react';
import { toast } from 'react-toastify';

const Tasks = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [activeTab, setActiveTab] = useState("next");
    // get the tasks data
    const { data: tasks, isLoading } = useQuery({
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
                queryClient.invalidateQueries(['classes'])
            }
            console.log(data)
        }
    })
    if (isLoading) {
        return <LoadingSpinner />
    };

    const handleDelete = (id) => {
        deleteAsync(id);
    };
    const handleEdit = (id) => {
        console.log(id)
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