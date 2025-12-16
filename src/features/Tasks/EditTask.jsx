import React from 'react';
import AddTaskForm from './AddTaskForm';
import { useForm } from 'react-hook-form';
import { formatTime } from '../../utils/formatTime';

const EditTask = ({ task }) => {
    const { module, subject, startTime, endTime, date, level, description } = task;
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

    const handleEditTask = () => {

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