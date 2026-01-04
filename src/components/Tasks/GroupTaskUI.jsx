import React from 'react';
import TasksGrid from './TasksGrid';
import useSortedData from '../../hooks/useSortedData';

const GroupTaskUI = ({ type, tasks, handleDelete, handleEdit, activeTab }) => {
    // const sortedData = [...tasks].sort(
    //     (a, b) => new Date(a.startTime) - new Date(b.startTime)
    // );
    // const sortedData = [...tasks].sort((a, b) => {
    //     const dateA = new Date(a.startTime);
    //     const dateB = new Date(b.startTime);

    //     if (type.toLowerCase() === "next") {
    //         return dateA - dateB; // ascending
    //     } else if (type.toLowerCase() === "prev") {
    //         return dateB - dateA; // descending
    //     } else {
    //         return 0; // no change if type is unknown
    //     }
    // });
    const sortedData = useSortedData({ tasks, type });
    console.log(sortedData)
    return (
        <div>
            {sortedData?.map((day) => (
                <div key={day.date} className='my-10'>
                    <h3 className='text-bold text-2xl underline my-4'>{day.date}</h3>

                    <TasksGrid
                        tasks={day?.tasks}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                        activeTab={activeTab}
                        type={type}
                    />
                </div>
            ))}

        </div>
    );
};

export default GroupTaskUI;