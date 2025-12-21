import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useCallback } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import ClassesGrid from '../../components/Class/ClassesGrid';
import GroupedClassUI from '../../components/Class/GroupedClassUI';

const Classes = ({ pageView, activeTab }) => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const queryClient = useQueryClient();

    // Fetch user all Classes
    const { data: classesData } = useQuery({
        queryKey: ["classes", user?.email, activeTab, pageView],
        queryFn: async () => {
            const res = await axiosSecure.get(`/classes?email=${user?.email}&type=${activeTab}&view=${pageView}`);
            console.log(res?.data)
            return res.data;
        },
        suspense: true,
        refetchOnWindowFocus: false
    });

    const { classes = [], view = '' } = classesData || {};

    const { mutateAsync: deleteAsync } = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.delete(`/class/${id}`);
            return res.data
        },
        onSuccess: (data) => {
            if (data.deletedCount > 0) {
                toast.success('your class has deleted successfully');
                queryClient.invalidateQueries(['classes'])
            }
            console.log(data)
        }
    })

    const handleDelete = (id) => {
        deleteAsync(id);
    };

    const handleEdit = useCallback((id) => {
        document.getElementById(`my_module_${id}`).showModal();
    }, []);
    // console.log(classes)
    let content;
    if (classes?.length > 0) {
        const safeView = view?.toLowerCase() ?? 'flat';
        switch (safeView) {
            case 'flat':
                content = (
                    <ClassesGrid
                        classes={classes}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                        activeTab={activeTab}
                    />
                );
                break;
            case 'group':
                content = (
                    <GroupedClassUI classes={classes}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                    />
                );
                break;
            default:
                content = (
                    <div>Invalid View</div>
                );
        }
    } else {
        content = (<div>No classes available here</div>)
    }

    return (
        <div>
            <h2 className="text-2xl font-bold text-[--color-primary] mb-4">Class Schedule</h2>
            <div>
                {content}
            </div>
        </div>
    );
};

export default Classes;