import { format } from 'date-fns';
import EditClass from '../../features/classschedule/EditClass';
import { formatTime } from '../../utils/formatTime';
import EditTask from './EditTask';

const TaskCard = ({ task, handleDelete, handleEdit }) => {
    const startTime = formatTime(task?.startTime);
    const endTime = formatTime(task?.endTime);
    return (
        <div>
            <div
                key={task._id}
                className="p-4 rounded-xl flex justify-between items-center shadow-2xl bg-primary"
            >
                <div>
                    <h3 className="font-bold text-lg text-[--color-primary]">{task.subject}</h3>
                    <p className="text-[--color-accent]">{format(task?.date, 'MM/dd/yyyy')} | {startTime} - {endTime}</p>
                    <p className="text-sm text-[--color-accent]">Instructor: {task.instructor}</p>
                </div>
                <div className="flex flex-col  gap-2">
                    <button
                        onClick={() => handleDelete(task._id)}
                        className="btn btn-sm bg-red-500 text-white hover:bg-red-600">Delete</button>

                    <button
                        onClick={() => handleEdit(task._id)}
                        className="btn btn-sm bg-red-500 text-white hover:bg-red-600">Edit</button>
                </div>
            </div>

            {/* Edit Class Modal */}
            <dialog id={`my_module_${task._id}`} className="modal">
                <div className="modal-box max-w-4xl mx-auto">
                    <EditTask task={task} />
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default TaskCard;