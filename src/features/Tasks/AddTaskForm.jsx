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
const AddTaskForm = ({ register, handleSubmit, handleAddTask, control, subjects }) => {
    const [currentNote, setCurrentNote] = useState("");
    console.log(currentNote);
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

            <input
                {...register("instructor")}
                placeholder="Instructor"
                className="input input-bordered w-full bg-white border-[--color-accent]"
            />
            {/* <input
                {...register("description")}
                placeholder="Task Description"
                className="textarea w-full col-span-2 bg-white border-[--color-accent]"
            /> */}
            <ReactQuill
                theme='snow'
                value={currentNote}
                onChange={setCurrentNote}
                formats={formats}
                modules={modules}
                // height="250px"
                style={{ height: "250px" }}
                className='bg-white  rounded-xl col-span-2 border-0'
                placeholder='Write your note here ....'
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