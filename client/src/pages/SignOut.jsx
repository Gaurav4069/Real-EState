import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function SignOut() {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.id]: e.target.value,
        });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success === false) {
                setError(data.message);
                setLoading(false);
                return;
            }
            setLoading(false);
            setError(null);
            navigate('/sign-in');
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    }

    return (
        <div className="font-sans bg-gray-900 text-white min-h-screen flex items-center justify-center">
            <div className="grid md:grid-cols-2 gap-6 w-full px-4 md:px-0">
                {/* Image Section */}
                <div className="hidden md:block h-[80vh]">
                    <img
                        src="https://readymadeui.com/signin-image.webp"
                        className="w-full h-full object-contain"
                        alt="login-image"
                    />
                </div>

                {/* Form Section */}
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
                    <form onSubmit={handleSubmit} className="w-full">
                        <h3 className="text-2xl font-semibold text-yellow-400 mb-6 text-center">Create an account</h3>

                        {/* Full Name Field */}
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-lg text-white">Full Name</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                required
                                className="w-full mt-2 bg-transparent text-white border-b-2 border-gray-300 focus:border-yellow-400 py-2 px-3 outline-none"
                                placeholder="Enter Username"
                                onChange={handleChange}
                            />
                        </div>

                        {/* Email Field */}
                        <div className="mb-4">
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
                        <div className="mb-4">
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
                        <div className="flex items-center mb-4">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-yellow-500"
                            />
                            <label htmlFor="remember-me" className="ml-2 text-xs text-white">
                                I accept the <a href="#" className="text-yellow-400 hover:underline">
                                   <Link to="/termsandcondition"> Terms and Conditions</Link>
                                    </a>
                            </label>
                        </div>

                        {/* Register Button */}
                        <div className="mb-6">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-2 px-4 text-sm text-gray-800 font-semibold rounded-md bg-yellow-400 hover:bg-yellow-500 focus:outline-none"
                            >
                                {loading ? 'Loading...' : 'Sign Up'}
                            </button>
                        </div>

                        {/* OAuth Section */}
                        <OAuth />

                        {/* Sign-In Link */}
                        <div className="text-center text-xs text-white mt-4">
                            <p className=''>
                                Already have an account? <Link to="/sign-in" className="text-yellow-400 hover:underline">Sign-In</Link>
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
