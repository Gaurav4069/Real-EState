import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {
    const [formData, setFormData] = useState({});
    const { loading, error } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(signInStart());
            const res = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success === false) {
                dispatch(signInFailure(data.message));
                return;
            }
            dispatch(signInSuccess(data));
            navigate('/');
        } catch (error) {
            dispatch(signInFailure(error.message));
        }
    };

    return (
        <div className="bg-gray-900 text-white font-sans min-h-screen flex items-center justify-center">
            <div className="grid md:grid-cols-2 items-center gap-4 w-full max-w-7xl px-4 md:px-0">
                {/* Image Section */}
                <div className="hidden md:block p-6">
                    <img
                        src="https://readymadeui.com/signin-image.webp"
                        className="w-full h-auto rounded-lg shadow-lg object-cover"
                        alt="login-image"
                    />
                </div>

                {/* Form Section */}
                <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-sm mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <h3 className="text-3xl font-semibold text-yellow-400 text-center">Sign In</h3>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-lg text-white">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                className="w-full mt-2 bg-transparent text-white border-b-2 border-gray-300 focus:border-yellow-400 py-2 px-3 outline-none"
                                placeholder="Enter email"
                                onChange={handleChange}
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-lg text-white">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                required
                                className="w-full mt-2 bg-transparent text-white border-b-2 border-gray-300 focus:border-yellow-400 py-2 px-3 outline-none"
                                placeholder="Enter password"
                                onChange={handleChange}
                            />
                        </div>

                        {/* Terms and Conditions */}
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-yellow-500"
                            />
                            <label htmlFor="remember-me" className="ml-2 text-xs text-white">
                                I accept the <a href="#" className="text-yellow-400 hover:underline"><Link to="/termsandcondition"> Terms and Conditions</Link></a>
                            </label>
                        </div>

                        {/* Sign In Button */}
                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 px-4 text-sm text-gray-800 font-semibold rounded-md bg-yellow-400 hover:bg-yellow-500 focus:outline-none"
                            >
                                {loading ? 'Loading...' : 'Sign In'}
                            </button>
                        </div>

                        {/* OAuth Section */}
                        <OAuth />

                        {/* Sign Up Link */}
                        <div className="text-center text-xs text-white">
                            <p>
                                Don’t have an account? <Link to="/sign-up" className="text-yellow-400 hover:underline">Sign-Up</Link>
                            </p>
                        </div>

                        {/* Error Message */}
                        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
}
