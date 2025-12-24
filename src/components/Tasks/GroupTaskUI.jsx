import React from 'react';
import TasksGrid from './TasksGrid';

const GroupTaskUI = ({ tasks, handleDelete, handleEdit, activeTab }) => {
    const sortedData = [...tasks].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    );
    console.log(sortedData)
    return (
        <div>
            {sortedData.map((day) => (
                <div key={day.date} className='my-10'>
                    <h3 className='text-bold text-2xl underline my-4'>{day.date}</h3>

                    <TasksGrid
                        tasks={day?.tasks}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                        activeTab={activeTab}
                    />
                </div>
            ))}

        </div>
    );
};

export default GroupTaskUI;