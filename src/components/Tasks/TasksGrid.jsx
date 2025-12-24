import TaskCard from '../../features/Tasks/TaskCard';

const TasksGrid = ({ tasks, activeTab, handleDelete, handleEdit }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tasks?.length > 0 ?
                tasks?.map((task) => (
                    <TaskCard key={task._id} activeTab={activeTab} task={task} handleDelete={handleDelete} handleEdit={handleEdit} />
                ))
                :
                <div>No classes available here</div>
            }
        </div>
    );
};

export default TasksGrid;