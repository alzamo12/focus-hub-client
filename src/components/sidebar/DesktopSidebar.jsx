
const DesktopSidebar = ({navLinks}) => {
    return (
           <aside className="hidden text-gray-700 md:flex md:flex-col w-64 min-w-[240px] bg-primary shadow-lg">
            <div className="p-4 flex items-center gap-3 border-b border-primary/30">
                {/* PLACE YOUR LOGO + SITE NAME HERE */}
                {/* Example: <img src="/logo.png" alt="StudentLife" className="w-8 h-8 rounded" /> */}
                <div className="px-2">
                    <div className="text-xl font-bold">[LOGO]</div>
                    <div className="text-sm font-semibold">StudentLife</div>
                </div>
            </div>

            <nav className="flex-1 overflow-auto p-4">
                <ul className="space-y-5 text-lg font-medium">{navLinks}</ul>
            </nav>

            <div className="p-4 border-t border-primary/30">
                {/* small footer / version or logout */}
                <button className="btn btn-ghost btn-lg w-full justify-start text-gray-700 hover:bg-accent">
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default DesktopSidebar;