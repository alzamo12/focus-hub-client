// src/layouts/DashboardLayout.jsx
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router";
import DesktopNavbar from "../components/navbar/DesktopNavbar";
import MobileNavbar from "../components/navbar/MobileNavbar";
import DesktopSidebar from "../components/sidebar/desktopSidebar";
import MobileSidebar from "../components/sidebar/MobileSidebar";
import useAuth from "../hooks/useAuth";


const RootLayout = () => {
    // mobile drawer open state
    const [drawerOpen, setDrawerOpen] = useState(false);
    const {logout} = useAuth();
    // live date/time
    const [now, setNow] = useState(new Date());
    useEffect(() => {
        const t = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(t);
    }, []);
    const timeString = now.toLocaleTimeString();
    const dateString = now.toLocaleDateString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    // ===== nav links as JSX fragment (reuse in sidebar UL) =====
    const navLinks = (
        <>
            <li className="">
                <Link to="/dashboard" className="rounded-md px-4 py-1 hover:bg-secondary/30">
                    Dashboard
                </Link>
            </li>
            <li>
                <Link to="/dashboard/schedule" className="rounded-md px-4 py-1 hover:bg-secondary/30">
                    Schedule
                </Link>
            </li>
            <li>
                <Link to="/dashboard/budget" className="rounded-md px-4 py-1 hover:bg-secondary/30">
                    Budget
                </Link>
            </li>
            <li>
                <Link to="/dashboard/notes" className="rounded-md px-4 py-1 hover:bg-secondary/30">
                    Notes
                </Link>
            </li>
            <li>
                <Link to="/dashboard/tasks" className="rounded-md px-4 py-1 hover:bg-secondary/30">
                    Tasks
                </Link>
            </li>
            <li>
                <Link to="/dashboard/settings" className="rounded-md px-4 py-1 hover:bg-secondary/30">
                    Settings
                </Link>
            </li>
        </>
    );

    return (
        <div className="flex h-screen bg-base-100 text-neutral-900">
            {/* sidebar for md+ devices */}
            <DesktopSidebar logout={logout} navLinks={navLinks} />

            {/* proper outlet + navbar*/}
            <div className="flex-1 flex flex-col">
                {/* Desktop navbar (visible md+) - occupies outlet width only */}
                <DesktopNavbar timeString={timeString} dateString={dateString} />

                {/* Mobile navbar (visible < md) */}
                <MobileNavbar setDrawerOpen={setDrawerOpen}
                    timeString={timeString}
                    dateString={dateString}
                />

                {/* Mobile sidebar drawer */}
                {drawerOpen && (
                    <MobileSidebar logout={logout} setDrawerOpen={setDrawerOpen} navLinks={navLinks} />
                )}

                {/* Outlet area (content) */}
                <main className="flex-1 overflow-auto p-4 md:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
export default RootLayout
