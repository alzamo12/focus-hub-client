import useAuth from '../../hooks/useAuth';
import { Menu } from 'lucide-react';
import { Link } from 'react-router';

const DesktopNavbar = ({ timeString, dateString, setDrawerOpen }) => {
    const { user, logout } = useAuth();
    // console.log(user)
    const handleLogout = () => {
        logout();
    }
    return (
        // <div className='fixed top-0 w-screen z-50'>
            <nav className="flex items-center justify-between h-16
         w-11/12 mx-auto border-primary bg-base-100
                 ">
                {/* Left: empty or breadcrumbs (keeps outlet width aligned) */}
                <div className="flex items-center gap-4">
                    <button
                        aria-label="Open menu"
                        onClick={() => setDrawerOpen(true)}
                        className="p-2 flex lg:hidden rounded-md focus:outline-none focus:ring-2 focus:ring-primary/60"
                    >
                        <Menu className="w-6 h-6 text-neutral-900" />
                    </button>
                </div>
                {/* Right: time & profile */}
                {
                    user ?
                        <div className="flex items-center gap-6">
                            {/* Time & date */}
                            <div className="text-right">
                                <div className="text-sm font-medium">{timeString}</div>
                                <div className="text-xs opacity-80">{dateString}</div>
                            </div>

                            {/* Profile */}
                            <div className="flex items-center gap-3">
                                {/* Avatar placeholder */}
                                {/* <div role='button' tabIndex={0} className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-sm font-bold text-neutral-900">
                                <img className='w-12 h-12 rounded-full' src={photoURL} alt="" />
                            </div> */}
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            <img
                                                alt="Tailwind CSS Navbar component"
                                                src={user?.photoURL} />
                                        </div>
                                    </div>
                                    <ul
                                        tabIndex={0}
                                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                        <li><button className='w-full h-full' onClick={handleLogout}>Logout</button></li>
                                    </ul>
                                </div>
                                <div className="text-sm">
                                    <div className="font-semibold">{user.displayName}</div>
                                    <div className="text-xs opacity-80">Student</div>
                                </div>
                            </div>
                        </div>
                        :
                        <Link to="/auth/signin" className="btn btn-secondary text-black">Signin</Link>
                }
            </nav>
        // </div>
    );
};

export default DesktopNavbar;