import ClassesGrid from './ClassesGrid';

const GroupedClassUI = ({ classes, handleDelete, handleEdit, activeTab }) => {
    const sortedData = [...classes].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    );
    console.log(sortedData)
    return (
        <div>
            {sortedData.map((day) => (
                <div key={day.date} className='my-10'>
                    <h3 className='text-bold text-2xl underline my-4'>{day.date}</h3>

                    <ClassesGrid classes={day?.classes}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                        activeTab={activeTab}
                    />
                </div>
            ))}

        </div>
    );
};

export default GroupedClassUI;