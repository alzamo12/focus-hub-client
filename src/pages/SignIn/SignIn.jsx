import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import GoogleLogin from "../../components/SocialLogin/GoogleLogin";

const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { signIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || "/";

    const handleSubmit = (e) => {
        e.preventDefault();
        // Design-only: handle login logic here
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)
        signIn(email, password)
            .then(() => {
                navigate(from, { state: { from: "login" } })
            })
    };

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
                    <div className="card bg-base-100 shadow-lg rounded-2xl p-6">
                        <h1 className="text-2xl font-semibold text-neutral-900 mb-1">Sign in</h1>
                        <p className="text-sm text-neutral-700 mb-6">Welcome back — sign in to continue to StudentLife</p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="text-sm font-medium text-neutral-800 block mb-2">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="you@example.com"
                                    className="input input-bordered w-full rounded-lg bg-white"
                                    aria-label="Email"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="text-sm font-medium text-neutral-800 block mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        placeholder="Enter your password"
                                        className="input input-bordered w-full rounded-lg pr-12 bg-white"
                                        aria-label="Password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((s) => !s)}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-ghost btn-sm h-8 w-10 p-0 rounded"
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {/* simple eye/eye-off icons */}
                                        {showPassword ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.072.158-2.104.45-3.073M6.2 6.2A9.953 9.953 0 0112 5c5.523 0 10 4.477 10 10 0 1.072-.158 2.104-.45 3.073M3 3l18 18" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Sign in button */}
                            <div>
                                <button type="submit" className="btn btn-primary w-full rounded-lg">
                                    Sign in
                                </button>
                            </div>

                            {/* Or divider */}
                            <div className="flex items-center gap-3">
                                <div className="flex-1 h-px bg-base-200" />
                                <div className="text-xs text-neutral-500">or</div>
                                <div className="flex-1 h-px bg-base-200" />
                            </div>

                            {/* Google sign in */}
                            <GoogleLogin />
                        </form>

                        {/* bottom navigator -> Register */}
                        <div className="mt-6 text-center text-sm text-neutral-700">
                            Don’t have an account?{" "}
                            <Link to="/register" className="font-medium text-primary hover:underline">
                                Register
                            </Link>
                        </div>
                    </div>

                    {/* small footer note */}
                    <div className="mt-4 text-center text-xs text-neutral-500">
                        By signing in you agree to our <Link to="/terms" className="underline">Terms</Link>.
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SignIn
