import DatePicker from 'react-datepicker';
import { Controller } from 'react-hook-form';
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { TimeInput } from '../../features/classschedule/AddClass';

const AddClassForm = ({ handleSubmit, onSubmit, register, control, subjects }) => {

    const isDark = localStorage.getItem("theme") === 'dark';
    const selectBGColor = isDark ? "black" : "white";
    const cyanColor = "#33c7d8";
    const skyColor = "#7DD3FC"
    console.log("check dark mode", isDark)
    const customStyles = {
        control: (baseStyles, state) => ({
            ...baseStyles,
            // Change border color based on focus state
            // borderColor: state.isFocused ? 'white' : 'none',
            borderRadius: '5px',
            // borderColor: isDark && ""
            backgroundColor: selectBGColor,
            borderColor: isDark ? "#33c7d8" : '#7DD3FC'
            // Overwrite the default blue focus halo/glow
            // boxShadow: state.isFocused ? '0 0 0 1px #4f46e5' : 'none',
            // Keep the border styling consistent on hover
            // '&:hover': {
            //     borderColor: state.isFocused ? '#4f46e5' : '#9ca3af',
            // },
        }),
        menu: (base) => ({
            ...base,
            backgroundColor: selectBGColor
            // border: "1px solid #374151",
            // borderRadius: "6px",
        }),

        // The list inside the dropdown
        menuList: (base) => ({
            ...base,
            backgroundColor: selectBGColor
            // padding: 0,
        }),

        // Each option
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
                ? isDark ? cyanColor : skyColor //4f46e5
                : state.isFocused
                    ? isDark ? cyanColor : skyColor
                    : isDark ? 'black' : 'white',
            color: isDark ? "white" : 'black',
            cursor: "pointer",

            // ":active": {
            //     backgroundColor: "hsl(var(--bc) / 0.6)",
            // },
        }),
        placeholder: (base) => ({
            ...base,
            // color: var(--color- base - content),
            // opacity: 50 %,
            // color: "hsl(black / 0.5)",
        }),
        singleValue: (base) => ({
            ...base,
            color: isDark && 'white'
        }),
    };

    const inputCommonStyles = "input input-bordered w-full bg-white dark:bg-black border-primary dark:text-white"

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid  md:grid-cols-2 gap-4 mb-6">
            {/* Module name */}
            <input
                {...register("module")}
                placeholder="Module Name"
                className={`${inputCommonStyles}`}
            />
            {/*  select subject */}
            <Controller
                name="subject"
                required={true}
                control={control}
                render={({ field }) => (
                    <Select {...field}
                        onChange={(selectedOption) => field.onChange(selectedOption?.value)} // only store value
                        value={subjects.find((s) => s.value === field.value) || null}
                        options={subjects} placeholder="Choose Subject"
                        styles={customStyles}
                        className='border border-primary rounded-[5px]'
                    />
                )}

            />

            {/* select date */}
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
                            wrapperClassName="w-full" // Styles the outer container
                            className={`${inputCommonStyles}`}
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
                    <TimeInput {...field} inputCommonStyles={inputCommonStyles} />
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
                    <TimeInput {...field} inputCommonStyles={inputCommonStyles} />
                )}
            />

            <input
                {...register("instructor")}
                placeholder="Instructor"
                className={`${inputCommonStyles}`}
            />
            <input
                {...register("room")}
                placeholder="Room No."
                className={`${inputCommonStyles}`}
            />
            <input
                {...register("building")}
                placeholder="Building No."
                className={`${inputCommonStyles}`}
            />

            <button
                type="submit"
                className="btn col-span-2 not-dark:text-black bg-primary dark:bg-black dark:border-accent dark:hover:shadow-white
                hover:shadow-2xs"
            >
                Add Class
            </button>
        </form>
    );
};

export default AddClassForm;