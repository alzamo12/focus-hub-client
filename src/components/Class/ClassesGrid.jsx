import ClassCard from './ClassCard';

const ClassesGrid = ({ classes, activeTab, handleDelete, handleEdit }) => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {
                classes?.length > 0 ?
                    classes?.map((cls) => (
                        <ClassCard
                            key={cls._id}
                            activeTab={activeTab}
                            cls={cls}
                            handleDelete={handleDelete}
                            handleEdit={handleEdit}
                        />
                    )) :
                    <div>No classes available here</div>
            }
        </div>
    );
};

export default ClassesGrid;