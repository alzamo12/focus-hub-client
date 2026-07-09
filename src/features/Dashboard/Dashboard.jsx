import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const Dashboard = () => {
    // State Management
    const axiosSecure = useAxiosSecure();
    // Fake Backend API Base URL

    const { data: { classes = [], tasks = [] } = {}, isLoading } = useQuery({
        queryKey: ['dashboardData'],
        queryFn: async () => {
            const result = await axiosSecure.get('/dashboard');
            return result.data;
        }
    });

    const classEvents = classes.map(cls => ({
        id: cls._id,
        title: cls.subject,
        start: cls.startTime,
        end: cls.endTime,
        color: "#2563eb",
        extendedProps: {
            type: "class"
        }
    }));

    const taskEvents = tasks.map(task => ({
        id: task._id,
        title: task.subject,
        start: task.startTime,
        end: task.endTIme,
        color: "#16a34a",
        extendedProps: {
            type: "task"
        }
    }));

    const handleDateClick = () => {
        alert("Date has clicked")
    };

    const renderEventContent = (eventInfo) => {
        <>
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{eventInfo?.title}</h3>
                    <p className="py-4">{eventInfo.start}</p>
                    <p className="py-4">{eventInfo.end}</p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    }

    const events = [...classEvents, ...taskEvents];

    console.log(isLoading, classes, tasks);

    if (isLoading) {
        return <div className="text-center py-20">Loading dashboard...</div>
    }

    return (
        <div className="min-h-screen">
            <FullCalendar
                plugins={[
                    dayGridPlugin,
                    timeGridPlugin,
                    interactionPlugin
                ]}
                initialView="dayGridMonth"
                events={events}
                // dateClick={handleDateClick}
                // eventContent={renderEventContent}
            />
        </div>
    );

};

export default Dashboard;