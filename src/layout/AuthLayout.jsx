import React from 'react';
import { Link, Outlet } from 'react-router';
import SignIn from '../pages/SignIn/SignIn';

const AuthLayout = () => {
    return (
        <div className="min-h-screen bg-base-100 flex flex-col">
            {/* Top navigator -> Home */}
            <header className="w-full px-4 py-3 border-b border-base-200 bg-base-100">
                <div className="max-w-5xl mx-auto flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3">
                        {/* Replace the [LOGO] span with your image: <img src='/logo.png' alt='StudentLife' className='w-8 h-8 rounded' /> */}
                        <div className="w-8 h-8 rounded-md bg-primary text-base-100 flex items-center justify-center font-bold">
                            {/* small logo initial or icon */}
                            SL
                        </div>
                        <div className="hidden sm:block">
                            <div className="text-sm font-bold text-neutral-900">StudentLife</div>
                            <div className="text-xs text-neutral-700">Home</div>
                        </div>
                    </Link>

                    <nav className="hidden sm:flex items-center gap-4">
                        <Link to="/" className="text-sm text-neutral-700 hover:text-neutral-900">
                            Home
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Main content */}
            <main className="flex-1 flex items-center justify-center p-6">
                <div className="w-full max-w-md">
                    <Outlet />
                    {/* small footer note */}
                    <div className="mt-4 text-center text-xs text-neutral-500">
                        By signing in you agree to our <Link to="/terms" className="underline">Terms</Link>.
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AuthLayout;