import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import Timekeeper from "react-timekeeper";
import { toast } from 'react-toastify';
import AddClassForm from '../../components/Class/AddClassForm';
import combineDateTime from '../../utils/combineDateTime';

const Days = ["monday", "tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const HHMM = /^([01]\d|2[0-3]):([0-5]\d)$/;

// main add class component of the files
const AddClass = () => {
    const queryClient = useQueryClient();
    const axiosSecure = useAxiosSecure();


    // Add Class Api
    const { mutateAsync } = useMutation({
        mutationFn: async (newClass) => {
            const res = await axiosSecure.post("/classes", newClass);
            return res.data;
        },
        onSuccess: (result) => {
            queryClient.invalidateQueries(["classes"]);
            console.log(result)
            if (result?.acknowledged) {
                toast.success('Your data has inserted successfully')
            }
        },
        onError: (err) => {
            console.log(err)
            const message = err?.response?.data?.message || "Server error occurred. Please try again later"
            toast.error(message)
        }
    });

    // Form
    const {
        register,
        handleSubmit,
        control,
        // formState: { errors },
    } = useForm({
        // resolver: zodResolver(classSchema),
        defaultValues: {
            instructor: "Zakir"
        },
    });

    const subjects = [
        { value: "math", label: "Math" },
        { value: "english", label: "English" },
        { value: "bangla", label: "Bangla" },
        { value: "physics", label: "Physics" },
        { value: "chemistry", label: "Chemistry" },
        { value: "biology", label: "Biology" },
        { value: "ict", label: "ICT" },
        { value: "religion", label: "Religion" },
        { value: "economics", label: "Economics" },
        { value: "geography", label: "Geography" }
    ];
    // const days = [
    //     { value: "monday", label: "Monday" },
    //     { value: "tuesday", label: "Tuesday" },
    //     { value: "wednesday", label: "Wednesday" },
    //     { value: "thursday", label: "Thursday" },
    //     { value: "friday", label: "Friday" },
    //     { value: "saturday", label: "Saturday" },
    //     { value: "sunday", label: "Sunday" }
    // ];

    const onSubmit = (data) => {

        const updatedData = {
            ...data,
            startTime: combineDateTime(data.date, data.startTime),
            endTime: combineDateTime(data.date, data.endTime)
        }
        // console.log(data)
        mutateAsync(updatedData);
        // console.log(data)
    };
    return (
        <div className="bg-white dark:bg-black border-2 border-primary p-6 w-full mx-auto h-auto">
            <h2 className="text-2xl font-bold mb-4">Class Schedule</h2>

            <AddClassForm
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                register={register}
                control={control}
                subjects={subjects}
                buttonText="Add Class"
                />
        </div>
    );
};

export default AddClass;