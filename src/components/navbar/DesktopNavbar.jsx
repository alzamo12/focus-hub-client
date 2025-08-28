import React from 'react';
import useAuth from '../../hooks/useAuth';

const DesktopNavbar = ({timeString, dateString}) => {
    const {user} = useAuth();
    const {displayName='user', photoURL='photo-url'} = user || {};
    return (
          <header className="hidden md:flex items-center justify-between h-16 px-6 border-b border-primary bg-base-100">
                    {/* Left: empty or breadcrumbs (keeps outlet width aligned) */}
                    <div className="flex items-center gap-4">
                        {/* optional space for page title if needed */}
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
                </header>
    );
};

export default DesktopNavbar;