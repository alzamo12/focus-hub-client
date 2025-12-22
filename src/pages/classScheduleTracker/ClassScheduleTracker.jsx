import LoadingSpinner from "../../components/Spinner/LoadingSpinner";
import { useState } from "react";
import { Suspense } from "react";
import Classes from "../../features/classschedule/Classes"
import { ErrorBoundary } from 'react-error-boundary'; // Using a library for simplicity
import ErrorHandler from "../../components/Error/ErrorHandler";

export default function ClassScheduleTracker() {
    const [activeTab, setActiveTab] = useState("next");
    const [pageView, setPageView] = useState('flat');
    const [err, errMSg] = useState("");
    const handlePageView = (e) => {
        const view = e.target.value;
        const lowerTxtView = view.toLowerCase();
        setPageView(lowerTxtView);
    };

    return (
        <div className=" w-full mx-auto bg-[--color-base-100] min-h-screen">
            {/* name of each tab group should be unique */}
            <div className="flex gap-10">
                {/* next and prev classes tab */}
                <div className="tabs tabs-border mb-10">
                    <input
                        type="radio"
                        name="my_tabs_2"
                        checked={activeTab === "next"}
                        onChange={() => setActiveTab("next")}
                        className="tab"
                        aria-label="Next Classes" />
                    {/* <div className="tab-content border-base-300 bg-base-100 p-10">Next Classes</div> */}

                    <input
                        type="radio"
                        name="my_tabs_2"
                        checked={activeTab === "prev"}
                        onChange={() => setActiveTab("prev")}
                        className="tab"
                        aria-label="Previous Classes"
                    />
                    {/* <div className="tab-content border-base-300 bg-base-100 p-10">Previous Classes</div> */}

                </div>
                {/* make a view toggle button */}
                <select onChange={handlePageView} defaultValue="Flat" className="select">
                    <option>Flat</option>
                    <option>Group</option>
                </select>
            </div>

            {/* show classes with proper parent component and suspense */}
            <ErrorBoundary fallback={<ErrorHandler />}>
                <Suspense fallback={<LoadingSpinner />}>
                    <Classes errMSg={errMSg} activeTab={activeTab} pageView={pageView} />
                </Suspense>
            </ErrorBoundary>
        </div>
    );
}
