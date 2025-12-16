import React from 'react';
import AddTaskForm from './AddTaskForm';
import { useForm } from 'react-hook-form';
import { formatTime } from '../../utils/formatTime';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import combineDateTime from '../../utils/combineDateTime';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';

const EditTask = ({ task }) => {
    const { module, subject, startTime, endTime, date, level, description, userEmail } = task;
    const { user } = useAuth();
    const {
        control,
        register,
        handleSubmit
    } = useForm({
        defaultValues: {
            module: module,
            subject: subject,
            date: date,
            level: level,
            description: description,
            startTime: formatTime(startTime),
            endTime: formatTime(endTime)
        }
    });
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const { mutateAsync:editAsync } = useMutation({
        mutationFn: async (data) => {
            const res = await axiosSecure.patch(`/task/${task._id}`, data);
            return res.data
        },
        onSuccess: async (data) => {
            toast.success("Data updated Successfully")
            queryClient.invalidateQueries({queryKey: ['task']});
            console.log(data)
        }
    })

    const handleEditTask = (data) => {
        if (user.email !== userEmail) {
            return alert("you can't change this class")
        }

        const newData = {
            ...data,
            startTime: combineDateTime(data.date, data.startTime),
            endTime: combineDateTime(data.date, data.endTime)
        }
        editAsync(newData)
    }

    return (
        <div>
            <AddTaskForm
                handleAddTask={handleEditTask}
                handleSubmit={handleSubmit}
                control={control}
                register={register}
            />
        </div>
    );
};

export default EditTask;