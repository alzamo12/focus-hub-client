import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import Timekeeper from "react-timekeeper";
import { useState } from 'react';
// import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import AddClassForm from '../../components/Class/AddClassForm';
import combineDateTime from '../../utils/combineDateTime';

const Days = ["monday", "tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const HHMM = /^([01]\d|2[0-3]):([0-5]\d)$/;

// const classSchema = z.object({
//     subject: z.string().min(1).max(100),
//     day: z.enum(Days),
//     startTime: z.string().regex(HHMM),
//     endTime: z.string().regex(HHMM),
//     instructor: z.string().min(1).max(100),
//     // color: z.string().regex(/^#([0-9A-Fa-f]{6})$/),
//     // userEmail: z.string().email(),
// });
export function TimeInput({ value, onChange, name }) {
    const [showClock, setShowClock] = useState(false);

    return (
        <div className="">
            {/* <ToastContainer /> */}
            {/* Input */}
            <input
                type="text"
                value={value}
                placeholder={`${name}`}
                readOnly
                onClick={() => setShowClock(true)}
                className="input input-bordered w-full bg-white border-[--color-accent] cursor-pointer"
            />

            {/* Clock Popup */}
            {showClock && (
                <div
                    // style={{ transform: "scale(0.9)", transformOrigin: "top left" }} 
                    className="absolute z-50 top-4">
                    <Timekeeper
                        time={value}

                        onChange={(newTime) => onChange(newTime.formatted12)}
                        onDoneClick={() => setShowClock(false)} // hide clock when done
                        switchToMinuteOnHourSelect
                    />
                </div>
            )}
        </div>
    );
};

// main add class component of the files
const AddClass = () => {
    const queryClient = useQueryClient();
    const axiosSecure = useAxiosSecure();


    // Add Class Api
    const { mutateAsync } = useMutation({
        mutationFn: async (newClass) => {
            const res = await axiosSecure.post("/class", newClass);
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
        <div className="p-6 w-full mx-auto bg-[--color-base-100] h-auto">
            <h2 className="text-2xl font-bold text-[--color-primary] mb-4">Class Schedule</h2>

            <AddClassForm
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                register={register}
                control={control}
                subjects={subjects} />
        </div>
    );
};

export default AddClass;