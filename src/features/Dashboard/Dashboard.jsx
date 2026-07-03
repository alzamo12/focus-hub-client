import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Dashboard = () => {
    // State Management
    const [todayTasks, setTodayTasks] = useState([]);
    const [budget, setBudget] = useState(null);
    const [markingDone, setMarkingDone] = useState(null);
    const axiosSecure = useAxiosSecure();
    // Fake Backend API Base URL
    const API_BASE = 'http://localhost:5000/api';

    const { data: { classes = [], tasks = [] } = {}, isLoading } = useQuery({
        queryKey: ['dashboardData'],
        queryFn: async () => {
            const result = await axiosSecure.get('/dashboard');
            return result.data;
        }
    });


    // Mark Task as Done (Smooth Interaction)
    // const markTaskDone = async (taskId) => {
    //     setMarkingDone(taskId);

    //     try {
    //         await fetch(`${API_BASE}/tasks/${taskId}/complete`, {
    //             method: 'PATCH',
    //             headers: { 'Content-Type': 'application/json' },
    //         });

    //         // Optimistic Update
    //         setTodayTasks(prev => prev.filter(task => task._id !== taskId));
    //     } catch (err) {
    //         alert("Failed to update task");
    //     } finally {
    //         setMarkingDone(null);
    //     }
    // };

    const formatTime = (dateString) => {
        return new Date(dateString).toLocaleTimeString([], {
            hour: '2-digit', minute: '2-digit'
        });
    };

    const spentPercentage = budget
        ? (budget.totalExpenses / budget.totalBudget) * 100
        : 0;
    console.log(isLoading, classes, tasks)
    if (isLoading) {
        return <div className="text-center py-20">Loading dashboard...</div>
    }

    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto">

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

                    <div className="xl:col-span-5">
                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="card-title text-2xl">🕒 Today's Classes</h2>
                                    <div className="badge badge-primary badge-lg">{classes.length} Class</div>
                                </div>

                                {isLoading ? (
                                    <div className="py-10 text-center">Loading classes...</div>
                                ) : classes.length > 0 ? (
                                    classes.map(cls => (
                                        <div key={cls._id} className="bg-base-200 rounded-2xl p-6 mb-4 hover:shadow transition-all">
                                            Class Card Content (same as before + small improvements)
                                            <div className="flex justify-between">
                                                <div>
                                                    <h3 className="text-2xl font-bold">{cls.subject}</h3>
                                                    <p className="opacity-75">{cls.module}</p>
                                                </div>
                                                <div className="text-right">
                                                    <div className="badge badge-outline">Room {cls.room}</div>
                                                </div>
                                            </div>

                                            <div className="mt-4 flex gap-6 text-sm">
                                                <div><span className="opacity-70">Instructor:</span> {cls.instructor}</div>
                                                <div><span className="opacity-70">Building:</span> {cls.building}</div>
                                            </div>

                                            <div className="mt-6 flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="badge badge-success">{formatTime(cls.startTime)}</div>
                                                    <span className="text-xl opacity-30">→</span>
                                                    <div className="badge badge-success">{formatTime(cls.endTime)}</div>
                                                </div>
                                                <button className="btn btn-primary btn-sm">Join Now</button>
                                            </div>
                                        </div>
                                    ))
                                ) : <p className="text-center py-12 opacity-60">No classes scheduled today 🎉</p>}
                            </div>
                        </div>
                    </div>

                    {/* Today's Tasks - Interactive */}
                    <div className="xl:col-span-4">
                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title text-2xl mb-6">✅ Today's Tasks</h2>

                                {tasks.length > 0 ? (
                                    tasks.map(task => (
                                        <div key={task._id} className="border border-base-300 rounded-2xl p-5 mb-4 hover:border-primary transition-all">
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-lg">{task.subject}</h3>
                                                    <p className="text-sm text-base-content/70 line-clamp-2 mt-1">
                                                        {task.description}
                                                    </p>
                                                </div>
                                                <div className={`badge ${task.level === 'medium' ? 'badge-warning' : 'badge-info'}`}>
                                                    {task.level}
                                                </div>
                                            </div>

                                            <div className="text-xs mt-4 opacity-70">
                                                {formatTime(task.startTime)} — {formatTime(task.endTime)}
                                            </div>

                                            <button
                                                onClick={() => alert(task._id)}
                                                // disabled={markingDone === task._id}
                                                className="btn btn-success btn-sm mt-5 w-full transition-all active:scale-95"
                                            >
                                                {markingDone === task._id ? "Marking..." : "Mark as Done ✓"}
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center py-10 text-success">All tasks completed! Great job 🎉</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Monthly Budget */}
                    {/* <div className="xl:col-span-3">
                        <div className="card bg-base-100 shadow-xl h-full">
                            <div className="card-body">
                                <h2 className="card-title">💰 {budget?.month} Budget</h2>

                                {budget && (
                                    <>
                                        <div className="stats bg-base-200 shadow mt-4 w-full">
                                            <div className="stat">
                                                <div className="stat-title">Total Budget</div>
                                                <div className="stat-value text-3xl text-primary">৳{budget.totalBudget}</div>
                                            </div>
                                        </div>

                                        <div className="mt-6">
                                            <div className="flex justify-between mb-1 text-sm">
                                                <span>Spent</span>
                                                <span className="font-medium">৳{budget.totalExpenses}</span>
                                            </div>
                                            <progress className="progress progress-error w-full" value={spentPercentage} max="100"></progress>
                                            <div className="flex justify-between mt-1 text-sm">
                                                <span>Remaining</span>
                                                <span className="font-bold text-success">
                                                    ৳{budget.totalBudget - budget.totalExpenses}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mt-8 space-y-3">
                                            <button className="btn btn-outline btn-block">+ Add Expense</button>
                                            <button className="btn btn-primary btn-block">View Details</button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );

};

export default Dashboard;