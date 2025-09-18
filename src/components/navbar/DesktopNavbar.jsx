import useAuth from '../../hooks/useAuth';
import { Menu } from 'lucide-react';

const DesktopNavbar = ({ timeString, dateString, setDrawerOpen }) => {
    const { user } = useAuth();
    const { displayName = 'user', photoURL = 'photo-url' } = user || {};
    return (
        <nav className="flex items-center justify-between h-16 px-6 border-b border-primary bg-base-100">
            {/* Left: empty or breadcrumbs (keeps outlet width aligned) */}
            <div className="flex items-center gap-4">
                <button
                    aria-label="Open menu"
                    onClick={() => setDrawerOpen(true)}
                    className="p-2 flex md:hidden rounded-md focus:outline-none focus:ring-2 focus:ring-primary/60"
                >
                    <Menu className="w-6 h-6 text-neutral-900" />
                </button>
            </div>

            {/* Right: time & profile */}
            <div className="flex items-center gap-6">
                {/* Time & date */}
                <div className="text-right">
                    <div className="text-sm font-medium">{timeString}</div>
                    <div className="text-xs opacity-80">{dateString}</div>
                </div>

                {/* Profile */}
                <div className="flex items-center gap-3">
                    {/* Avatar placeholder */}
                    <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-sm font-bold text-neutral-900">
                        <img className='w-12 h-12 rounded-full' src={photoURL} alt="" />
                    </div>
                    <div className="text-sm">
                        <div className="font-semibold">{displayName}</div>
                        <div className="text-xs opacity-80">Student</div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default DesktopNavbar;