import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import combineDateTime from "../../utils/combineDateTime";
import AddTaskForm from "./AddTaskForm";


const AddTask = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

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

    const { mutateAsync: addTaskAsync } = useMutation({
        mutationFn: async (newTask) => {
            const res = await axiosSecure.post("/task", newTask);
            return res.data;
        },
        onSuccess: (result) => {
            queryClient.invalidateQueries(["tasks"]);
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

    const handleAddTask = (data) => {
        const updatedData = {
            ...data,
            startTime: combineDateTime(data.date, data.startTime),
            endTime: combineDateTime(data.date, data.endTime)
        }
        addTaskAsync(updatedData);
        console.log(updatedData)
    };
    return (
        <div>
            {/* <AddClassForm /> */}
            <h2 className="card-title">Describe Your Goal!</h2>
            <AddTaskForm
                handleAddTask={handleAddTask}
                handleSubmit={handleSubmit}
                register={register}
                control={control}
                // subjects={subjects}
                // level={level}
            />
        </div>
    );
};

export default AddTask;