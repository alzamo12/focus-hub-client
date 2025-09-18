import DatePicker from 'react-datepicker';
import { Controller } from 'react-hook-form';
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { TimeInput } from '../../features/classschedule/AddClass';

const AddClassForm = ({handleSubmit, onSubmit, register, control, subjects}) => {
    return (
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
    );
};

export default AddClassForm;