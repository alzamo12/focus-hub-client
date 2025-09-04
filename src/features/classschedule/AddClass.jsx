import { useMutation, useQueryClient } from '@tanstack/react-query';
import z from 'zod';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Select from "react-select";
import Timekeeper from "react-timekeeper";
import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast, ToastContainer } from 'react-toastify';
import useAuth from '../../hooks/useAuth';

const Days = ["monday", "tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const HHMM = /^([01]\d|2[0-3]):([0-5]\d)$/;

const classSchema = z.object({
    subject: z.string().min(1).max(100),
    day: z.enum(Days),
    startTime: z.string().regex(HHMM),
    endTime: z.string().regex(HHMM),
    instructor: z.string().min(1).max(100),
    // color: z.string().regex(/^#([0-9A-Fa-f]{6})$/),
    // userEmail: z.string().email(),
});
function TimeInput({ value, onChange, name }) {
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
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();

    // Fetch Classes
    // Add Class
    const { mutateAsync } = useMutation({
        mutationFn: async (newClass) => {
            const res = await axiosPublic.post("/class", newClass);
            return res.data;
        },
        onSuccess: (result) => {
            queryClient.invalidateQueries(["classes"]);
            console.log(result)
            if (result?.acknowledged) {
                toast.success('Your data has inserted successfully')
            }
        },
    });

    // Form
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        // resolver: zodResolver(classSchema),
        defaultValues: { userEmail: user?.email },
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
    const days = [
        { value: "monday", label: "Monday" },
        { value: "tuesday", label: "Tuesday" },
        { value: "wednesday", label: "Wednesday" },
        { value: "thursday", label: "Thursday" },
        { value: "friday", label: "Friday" },
        { value: "saturday", label: "Saturday" },
        { value: "sunday", label: "Sunday" }
    ];

    const onSubmit = (data) => {
        mutateAsync(data);
        // console.log(data)
    };
    return (
        <div className="p-6 w-full mx-auto bg-[--color-base-100] h-auto">
            <h2 className="text-2xl font-bold text-[--color-primary] mb-4">Class Schedule</h2>
            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-4 mb-6">
                <input
                    {...register("module")}
                    placeholder="Module Name"
                    className="input input-bordered w-full bg-white border-[--color-accent]"
                />
                <Controller
                    name="subject"
                    required={true}
                    control={control}
                    render={({ field }) => (
                        <Select {...field}
                            onChange={(selectedOption) => field.onChange(selectedOption?.value)} // only store value
                            value={subjects.find((s) => s.value === field.value) || null}
                            options={subjects} placeholder="Choose Subject" />
                    )}

                />

                {/* <Controller
                    name="day"
                    control={control}
                    required={true}
                    render={({ field }) => (
                        <Select {...field}
                            onChange={(selectedOption) => field.onChange(selectedOption?.value)} // only store value
                            value={days.find((s) => s.value === field.value) || null}
                            options={days.map(tag => ({
                                value: tag?.value,
                                label: tag?.label
                            }))}
                            placeholder="Select Day" />
                    )}
                /> */}

                <Controller
                    name="date"
                    control={control}
                    rules={{ required: "Please select a date" }}
                    render={({ field, fieldState }) => (
                        <div>
                            <DatePicker
                                placeholderText="Select date"
                                selected={field.value}
                                onChange={(date) => field.onChange(date)}
                                className=" input input-bordered cursor-pointer  bg-white border-[--color-accent]"
                            />
                            {fieldState.error && (
                                <p className="text-red-500 mt-1">{fieldState.error.message}</p>
                            )}
                        </div>
                    )}
                />

                <Controller
                    name="startTime"
                    control={control}
                    render={({ field }) => (
                        // <Timekeeper
                        //     time={field.value}
                        //     onChange={(val) => field.onChange(val.formatted12)} // e.g. "03:45 pm"
                        // />
                        <TimeInput {...field} />
                    )}
                />

                <Controller
                    name="endTime"
                    control={control}
                    render={({ field }) => (
                        // <Timekeeper
                        //     time={field.value}
                        //     onChange={(val) => field.onChange(val.formatted12)} // e.g. "03:45 pm"
                        // />
                        <TimeInput {...field} />
                    )}
                />

                <input
                    {...register("instructor")}
                    placeholder="Instructor"
                    className="input input-bordered w-full bg-white border-[--color-accent]"
                />
                <input
                    {...register("room")}
                    placeholder="Room No."
                    className="input input-bordered w-full bg-white border-[--color-accent]"
                />
                <input
                    {...register("building")}
                    placeholder="Building No."
                    className="input input-bordered w-full bg-white border-[--color-accent]"
                />



                <button
                    type="submit"
                    className="btn col-span-2 text-black bg-[--color-primary] hover:bg-[--color-accent]"
                >
                    Add Class
                </button>
            </form>

        </div>
    );
};

export default AddClass;