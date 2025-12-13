import { useState } from 'react';
import Timekeeper from "react-timekeeper";

const TimeInput = ({ value, onChange, name }) => {
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

export default TimeInput;