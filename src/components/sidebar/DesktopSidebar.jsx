import { useState } from "react";
import Classes from "../../pages/classScheduleTracker/ClassScheduleTracker";
import { X } from "lucide-react";
import AddClass from "../../features/classschedule/AddClass";

const DesktopSidebar = ({ navLinks, logout, setDrawerOpen, drawerOpen }) => {
    const [extraNavs, setExtraNavs] = useState([]);
    const [showClock, setShowClock] = useState(false);

    const handleAddNav = () => {
        // Example: Add a new UL with some placeholder items
        if (extraNavs.length <= 0) {
            const newNav = (
                <ul key={extraNavs.length} className="space-y-2 border text-lg font-medium mt-4 border-t border-[--color-accent] pt-2">
                    <li className="cursor-pointer">Extra Link 1</li>
                    {/* Open the modal using document.getElementById('ID').showModal() method */}
                    <li>
                        <button className="btn" onClick={() => document.getElementById('my_modal_2').showModal()}>open modal</button>
                    </li>

                </ul>
            );
            setExtraNavs([...extraNavs, newNav]);
        }
        else {
            setExtraNavs([])
        }
    };

    const subjects = [
        { value: "math", label: "Math" },
        { value: "english", label: "English" },
        { value: "bangla", label: "Bangla" },
        { value: "physics", label: "Physics" },
        { value: "chemistry", label: "Chemistry" },
        { value: "biology", label: "Biology" },
        { value: "ict", label: "ICT" },
        { value: "religion", label: "Religion" },
        { value: "economics", label: "Economics" },
        { value: "geography", label: "Geography" }
    ];
    return (
        <aside className={` text-gray-700 lg:flex lg:translate-x-0 flex-col w-64 
            md:min-w-[240px] bg-primary shadow-lg z-50 h-screen fixed lg:sticky top-0
        ${drawerOpen ? 'translate-x-0 ' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
            <div className="p-4 flex items-center gap-3 border-b border-primary/30">
                {/* PLACE YOUR LOGO + SITE NAME HERE */}
                {/* Example: <img src="/logo.png" alt="StudentLife" className="w-8 h-8 rounded" /> */}
                <div className="px-2 flex justify-between w-full">
                    <div>
                        <div className="text-xl font-bold">[LOGO]</div>
                        <div className="text-sm font-semibold">Focus Hub</div>
                    </div>
                    <button
                        aria-label="Close menu"
                        onClick={() => setDrawerOpen(false)}
                        className="p-1 block lg:hidden rounded-md focus:outline-none focus:ring-2 focus:ring-primary/60"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <nav className="flex-1 overflow-auto p-4">
                <ul className="space-y-5 text-lg font-medium mb-10">{navLinks}</ul>
                {extraNavs.map((ul) => ul)}

                <button onClick={handleAddNav} className="btn btn-neutral rounded-2xl w-32 mx-auto">Add New</button>
            </nav>
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box max-w-4xl mx-auto">
                    <AddClass />
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            <div className="p-4 border-t border-primary/30">
                {/* small footer / version or logout */}
                <button onClick={() => logout()} className="btn btn-ghost btn-lg w-full justify-start text-gray-700 hover:bg-accent">
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default DesktopSidebar;