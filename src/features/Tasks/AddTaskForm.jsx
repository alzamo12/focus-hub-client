import DatePicker from 'react-datepicker';
import { Controller } from 'react-hook-form';
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
// import TimeInput from "../../features/classschedule/AddClass/TimeInput"
import TimeInput from '../../components/Inputs/TimeInput';
import ReactQuill from "react-quill-new"
import { useState } from 'react';


const modules = {
    toolbar: {
        container: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }], // <-- Add this line for color
            [{ list: "ordered" }, { list: "bullet" }],
            ["clean"],
        ],
    },
};
const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "color",
    "background",
    "list",
    "bullet",
];
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
const level = [
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" },
    { value: "complex", label: "Complex" },
];
const AddTaskForm = ({ register, handleSubmit, handleAddTask, control }) => {
    // const [currentNote, setCurrentNote] = useState("");
    // console.log(currentNote);
    return (
        <form onSubmit={handleSubmit(handleAddTask)} className="grid md:grid-cols-2 gap-4 mb-6">
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
                // this render the uncontrolled component
                render={({ field }) => (
                    // <Timekeeper
                    //     time={field.value}
                    //     onChange={(val) => field.onChange(val.formatted12)} // e.g. "03:45 pm"
                    // />
                    // use time input function to show the current time with react library
                    <TimeInput {...field} />
                )}
            />

            <Controller
                name="endTime"
                control={control}
                render={({ field }) => (
                    <TimeInput {...field} />
                )}
            />

            <Controller
                name="level"
                required={true}
                control={control}
                render={({ field }) => (
                    <Select {...field}
                        onChange={(selectedOption) => field.onChange(selectedOption?.value)} // only store value
                        value={level.find((l) => l.value === field.value) || null}
                        options={level} placeholder="Choose Subject" />
                )}
            />
            <input
                {...register("description")}
                placeholder="Task Description"
                className="textarea w-full col-span-2 bg-white border-[--color-accent]"
            />


            <button
                type="submit"
                className="btn col-span-2 text-black bg-[--color-primary] hover:bg-[--color-accent]"
            >
                Add Class
            </button>
        </form>
    );
};

export default AddTaskForm;