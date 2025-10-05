import { format } from 'date-fns';
import EditClass from '../../features/classschedule/EditClass';
import { formatTime } from '../../utils/formatTime';

const ClassCard = ({ cls, handleDelete, handleEdit }) => {
    const startTime = formatTime(cls?.startTime);
    const endTime = formatTime(cls?.endTime);
    // const customLocaleDate = cls?.date.toLocaleDateString('en-US', {
    //     year: 'numeric',
    //     month: 'long',
    //     day: 'numeric'
    // });
    return (
        <div>
            <div
                key={cls._id}
                className="p-4 rounded-xl flex justify-between items-center shadow-2xl bg-primary"
            // style={{ backgroundColor: cls.color || "var(--color-secondary)" }}
            >
                <div>
                    <h3 className="font-bold text-lg text-[--color-primary]">{cls.subject}</h3>
                    <p className="text-[--color-accent]">{format(cls?.date, 'MM/dd/yyyy')} | {startTime} - {endTime}</p>
                    <p className="text-sm text-[--color-accent]">Instructor: {cls.instructor}</p>
                </div>
                <div className="flex flex-col  gap-2">
                    <button
                        onClick={() => handleDelete(cls._id)}
                        className="btn btn-sm bg-red-500 text-white hover:bg-red-600">Delete</button>

                    <button
                        onClick={() => handleEdit(cls._id)}
                        className="btn btn-sm bg-red-500 text-white hover:bg-red-600">Edit</button>
                </div>
            </div>

            {/* Edit Class Modal */}
            <dialog id={`my_module_${cls._id}`} className="modal">
                <div className="modal-box max-w-4xl mx-auto">
                    <EditClass cls={cls} />
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default ClassCard;