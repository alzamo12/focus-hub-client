import LoadingSpinner from "../../components/Spinner/LoadingSpinner";
import { useState } from "react";
import { Suspense } from "react";
import Classes from "../../features/classschedule/Classes"
import { ErrorBoundary } from 'react-error-boundary';
import ErrorHandler from "../../components/Error/ErrorHandler";
import useTittle from "../../hooks/useTittle";
import Pagination from "../../components/Pagination/Pagination";
import TabAndView from "../../components/TabAndView/TabAndView";

const ClassScheduleTracker = () => {
    const [activeTab, setActiveTab] = useState("next");
    const [pageView, setPageView] = useState('flat');
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    useTittle("Class Schedule Tracker");
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
                <TabAndView
                    handleActiveTab={handleActiveTab}
                    handlePageView={handlePageView}
                    activeTab={activeTab}
                />

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
            {/* <div className="join items-center justify-center mt-8 md:md-0">
                <button
                    onClick={() => { setPage(page - 1) }}
                    disabled={page === 1}
                    className="join-item btn">«</button>
                <button className="join-item btn">{page} &nbsp; / &nbsp; {totalPage}</button>
                <button
                    onClick={() => { setPage(page + 1) }}
                    disabled={page === totalPage}
                    className="join-item btn">»</button>
            </div> */}
            <Pagination
                setPage={setPage}
                page={page}
                totalPage={totalPage}
            />
        </div>
    );
};

export default ClassScheduleTracker;
