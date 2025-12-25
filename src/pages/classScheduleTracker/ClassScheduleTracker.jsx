import LoadingSpinner from "../../components/Spinner/LoadingSpinner";
import { useState } from "react";
import { Suspense } from "react";
import Classes from "../../features/classschedule/Classes"
import { ErrorBoundary } from 'react-error-boundary';
import ErrorHandler from "../../components/Error/ErrorHandler";

const ClassScheduleTracker = () => {
    const [activeTab, setActiveTab] = useState("next");
    const [pageView, setPageView] = useState('flat');
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const handlePageView = (e) => {
        const view = e.target.value;
        const lowerTxtView = view.toLowerCase();
        setPage(1);
        setPageView(lowerTxtView);
    };
    const handleActiveTab = (activeTab) => {
        setPage(1);
        setActiveTab(activeTab);
    };

    return (
        <div className=" w-full mx-auto bg-[--color-base-100] min-h-screen grid">
            <div>
                {/* name of each tab group should be unique */}
                <div className="flex gap-10">
                    {/* next and prev classes tab */}
                    <div className="tabs tabs-border mb-10">
                        <input
                            type="radio"
                            name="my_tabs_2"
                            checked={activeTab === "next"}
                            onChange={() => handleActiveTab("next")}
                            className="tab"
                            aria-label="Next Classes" />
                        {/* <div className="tab-content border-base-300 bg-base-100 p-10">Next Classes</div> */}

                        <input
                            type="radio"
                            name="my_tabs_2"
                            checked={activeTab === "prev"}
                            onChange={() => handleActiveTab("prev")}
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
                        <Classes
                            activeTab={activeTab}
                            pageView={pageView}
                            page={page}
                            setTotalPage={setTotalPage}
                        />
                    </Suspense>
                </ErrorBoundary>
            </div>
            <div className="join items-center justify-center mt-8 md:md-0">
                <button
                    onClick={() => { setPage(page - 1) }}
                    disabled={page === 1}
                    className="join-item btn">«</button>
                <button className="join-item btn">{page} &nbsp; / &nbsp; {totalPage}</button>
                <button
                    onClick={() => { setPage(page + 1) }}
                    disabled={page === totalPage}
                    className="join-item btn">»</button>
            </div>
        </div>
    );
};

export default ClassScheduleTracker;
