
import React, { useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function SignOut() {
   
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.id]: e.target.value,
        })
    };
    
    const handleSubmit =async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await fetch('/api/auth/signup',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                }
            );
            const data = await res.json();
            if (data.success === false) {
                setError(data.message);
                setLoading(false);
                return;
            }
            setLoading(false);
            setError(null);
            navigate('/sign-in')
            
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    }


    return (
        <div className="font-[sans-serif] bg-white md:h-screen">
            <div className="grid md:grid-cols-2 items-center gap-4 h-half">
                {/* Image Section */}
                <div className="max-md:order-1 p-2 md:block hidden mt-3">
                    <img
                        src="https://readymadeui.com/signin-image.webp"
                        className="lg:max-w-[75%] w-full h-auto object-contain block mx-auto"
                        alt="login-image"
                    />
                </div>

                {/* Form Section */}
                <div className="flex items-center md:p-4 p-3 bg-[#0C172C] h-full lg:w-10/12 lg:ml-auto mt-3">
                    <form onSubmit={handleSubmit} className="max-w-sm w-full mx-auto">
                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-yellow-400">Create an account</h3>
                        </div>

                        {/* Full Name Field */}
                        <div>
                            <label className="text-white text-xs block mb-1">Full Name</label>
                            <div className="relative flex items-center">
                                <input
                                    name="name"
                                    type="text"
                                    required
                                    className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-400 px-2 py-2 outline-none"
                                    id='username'
                                    placeholder="Enter Username"
                                onChange={handleChange}
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-2" viewBox="0 0 24 24">
                                    <circle cx="10" cy="7" r="6" />
                                    <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5z" />
                                </svg>
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="mt-4">
                            <label className="text-white text-xs block mb-1">Email</label>
                            <div className="relative flex items-center">
                                <input
                                    name="email"
                                    type="text"
                                    required
                                    className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-400 px-2 py-2 outline-none"
                                    placeholder="Enter email"
                                    onChange={handleChange}
                                    id='email'
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-2" viewBox="0 0 682.667 682.667">
                                    <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" />
                                </svg>
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="mt-4">
                            <label className="text-white text-xs block mb-1">Password</label>
                            <div className="relative flex items-center">
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-400 px-2 py-2 outline-none"
                                    placeholder="Enter password"
                                    onChange={handleChange}
                                    id='password'
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-2 cursor-pointer" viewBox="0 0 128 128">
                                    <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" />
                                </svg>
                            </div>
                        </div>

                        {/* Terms and Conditions */}
                        <div className="flex items-center mt-4">
                            <input id="remember-me" name="remember-me" type="checkbox" className="h-3 w-3 shrink-0 rounded" />
                            <label htmlFor="remember-me" className="text-white ml-2 text-xs">
                                I accept the <a href="#" className="text-yellow-500 font-semibold hover:underline ml-1">Terms and Conditions</a>
                            </label>
                        </div>

                        {/* Register Button */}
                        <div className="mt-8">
                            <button
                                disabled={loading}
                                type="submit"
                                className="w-full mb-2 shadow-xl py-2 px-4 text-sm text-gray-800 font-semibold rounded-md bg-yellow-400 hover:bg-yellow-500 focus:outline-none"
                            >
                               {loading?"Loading...":'Sign Up'}
                            </button>
                            <OAuth/>
                            <p className="text-xs text-white mt-6">
                            <Link to={"/sign-in"}>
                                Already have an account? <a href="#" className="text-yellow-400 font-semibold hover:underline ml-1">Sign-In</a>
                            </Link>
                            </p>
                            {error && <p className='text-red-500 mt-5'>{ error}</p>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
