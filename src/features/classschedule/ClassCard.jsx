
export default function ClassCard({ cls, handleDelete }) {
    return (
        <div className="card bg-base-100 shadow-md p-4 border-l-4" style={{ borderColor: cls.color }}>
            <h2 className="text-lg font-semibold">{cls.subject}</h2>
            <p><strong>Day:</strong> {cls.day}</p>
            <p><strong>Time:</strong> {cls.time}</p>
            <p><strong>Instructor:</strong> {cls.instructor}</p>
            <div className="flex justify-end gap-2 mt-3">
                <button className="bg-[--color-primary] btn text-white">Edit</button>
                <button
                    onClick={() => handleDelete(cls._id)}
                    className="btn btn-neutral"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
