import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import AddClassForm from '../../components/Class/AddClassForm';
import { toast } from 'react-toastify';


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
const EditClass = ({ cls }) => {
    const { _id, userEmail, module, instructor, room, building, subject, date, startTime, endTime } = cls;
    // console.log(cls)
    const queryClient = useQueryClient();
    // const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        // resolver: zodResolver(classSchema),
        defaultValues: {
            // instructor: "Zakir"
            module: module,
            instructor: instructor,
            room: room,
            building: building,
            subject: subject,
            date: date,
            startTime: startTime,
            endTime: endTime
        },
    });

    const { mutateAsync: classEditAsync } = useMutation({
        mutationFn: async (data) => {
            const res = await axiosSecure.patch(`/class/${_id}`, data);
            return res?.data
        },
        onSuccess: async (data) => {
            toast.success("class updated successfully");
            console.log(data)
            queryClient.invalidateQueries({ queryKey: ["classes"] })
        },
        onError: (err) => {
            console.log(err)
        }
    })

    const onSubmit = (data) => {
        // console.log(data)
        if (user.email !== userEmail) {
            return alert("you can't change this class")
        }
        classEditAsync(data)
        // mutateAsync(newData);
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

export default EditClass;