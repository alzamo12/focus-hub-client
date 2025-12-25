import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useCallback } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import ClassesGrid from '../../components/Class/ClassesGrid';
import GroupedClassUI from '../../components/Class/GroupedClassUI';

const Classes = ({ pageView, activeTab, page, setTotalPage }) => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const limit = 5;
    // const timezone = "Nothing";

    // Fetch user all Classes
    const { data: classesData } = useQuery({
        queryKey: ["classes", user?.email, activeTab, pageView, page, limit],
        queryFn: async () => {
            const res = await axiosSecure.get(`/classes?email=${user?.email}&type=${activeTab}&view=${pageView}&timezone=${timezone}&page=${page}&limit=${limit}`);
            if (res.data.totalPages) {
                setTotalPage(res.data.totalPages);
            };
            return res.data;
        },
        suspense: true,
        refetchOnWindowFocus: false
    });
    // console.log(error)

    const { classes = [], view = '', type } = classesData || {};

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
                    <GroupedClassUI
                        activeTab={activeTab}
                        classes={classes}
                        type={type}
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