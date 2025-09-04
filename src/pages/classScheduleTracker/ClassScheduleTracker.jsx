import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";

// Schema must match server
const Days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const HHMM = /^([01]\d|2[0-3]):([0-5]\d)$/;

const classSchema = z.object({
    subject: z.string().min(1).max(100),
    day: z.enum(Days),
    startTime: z.string().regex(HHMM),
    endTime: z.string().regex(HHMM),
    instructor: z.string().min(1).max(100),
    color: z.string().regex(/^#([0-9A-Fa-f]{6})$/),
    userEmail: z.string().email(),
});

export default function Classes() {
    const queryClient = useQueryClient();
    const axiosPublic = useAxiosPublic();
    // const axiosSecure = useAxiosSecure();
    // Fetch Classes
    const { data: classes = [] } = useQuery({
        queryKey: ["classes"],
        queryFn: async () => {
            const res = await axiosPublic.get("/classes?userEmail=test@email.com");
            return res.data;
        },
    });

    // Add Class
    const { mutateAsync } = useMutation({
        mutationFn: async (newClass) => {
            const res = await axiosPublic.post("/class", newClass);
            return res.data;
        },
        onSuccess: (result) => {
            queryClient.invalidateQueries(["classes"]);
            console.log(result)
        },
    });

    // Form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(classSchema),
        defaultValues: { userEmail: "test@email.com" },
    });

    const onSubmit = (data) => mutateAsync(data);

    return (
        <div className="p-6 max-w-4xl mx-auto bg-[--color-base-100] min-h-screen">
            <h2 className="text-2xl font-bold text-[--color-primary] mb-4">Class Schedule</h2>


            {/* Class List */}
            <div className="grid gap-4">
                {classes.map((cls) => (
                    <div
                        key={cls._id}
                        className="p-4 rounded-xl flex justify-between items-center shadow-2xl bg-primary"
                        // style={{ backgroundColor: cls.color || "var(--color-secondary)" }}
                    >
                        <div>
                            <h3 className="font-bold text-lg text-[--color-primary]">{cls.subject}</h3>
                            <p className="text-[--color-accent]">{cls.day} | {cls.startTime} - {cls.endTime}</p>
                            <p className="text-sm text-[--color-accent]">Instructor: {cls.instructor}</p>
                        </div>
                        <button className="btn btn-sm bg-red-500 text-white hover:bg-red-600">Delete</button>
                    </div>
                ))}
            </div>
        </div>

    );
}
