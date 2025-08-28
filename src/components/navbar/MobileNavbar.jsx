import { Menu } from 'lucide-react';

const MobileNavbar = ({setDrawerOpen, timeString, dateString}) => {
    return (
        <header className="md:hidden flex items-center justify-between h-14 px-4 bg-base-100 border-b border-base-200">
            {/* Hamburger */}
            <button
                aria-label="Open menu"
                onClick={() => setDrawerOpen(true)}
                className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/60"
            >
                <Menu className="w-6 h-6 text-neutral-900" />
            </button>

            {/* Center: time */}
            <div className="text-center">
                <div className="text-sm font-medium">{timeString}</div>
                <div className="text-xs opacity-80">{dateString}</div>
            </div>

            {/* Small avatar (tap for profile) */}
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-xs font-bold text-neutral-900">
                    AZ
                </div>
            </div>
        </header>
    );
};

export default MobileNavbar;