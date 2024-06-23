import { FcGoogle } from "react-icons/fc";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";



const Login = () => {

    const { signIn, googleSignIn, updateUser, user, setUser } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async data => {

        console.log(data);

        const email = data.email;
        const password = data.password;

        try {
            await signIn(email, password);

            toast.success('Login Successfully!');
            navigate(location?.state ? location.state : '/');


        } catch (error) {

            toast.error(error.message)

        }


    }

    const handleGoogleSignIn = async () => {
        await googleSignIn();

        try {

            await updateUser();

            const googleUser = ({ ...user, role: 'user' })
            setUser(googleUser);

            axiosPublic.post('/users', googleUser)
                .then(res => {
                    console.log("res.data", res.data);
                    if (res.data.insertedId) {
                        toast.success('Successfully toasted!');
                        navigate('/');
                    }
                })


        } catch (error) {

            console.error(error.message);

        }
    }


    return (
        <main className="w-full h-screen flex flex-col items-center justify-center px-4">
            <div className="max-w-sm w-full text-gray-600 space-y-8">
                <div className="text-center">
                    <Link to='/'>
                        <h1 className="font-dongle text-4xl font-bold flex justify-center">Easy <span className=" text-pink-300">Parcel</span></h1>
                    </Link>
                    <div className="mt-5 space-y-2">
                        <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Log in to your account</h3>
                        <p className="">Don&apos;t have an account? <Link to='/register' className="font-medium text-pink-600 hover:text-pink-500">Sign up</Link></p>
                    </div>
                </div>

                {/* ------------------------------------------------------------------------- */}

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >

                    {/* Email */}
                    <div>
                        <label className="font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            {...register("email", { required: true })}
                            placeholder="Enter your email"
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-pink-600 shadow-xs rounded-lg"
                        />
                        {errors.email && <span className="text-red-600 text-xs">Email is required</span>}
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <label className="font-medium">
                            Password
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            {...register("password",
                                {
                                    required: true,
                                })}
                            placeholder="Enter your password"
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-pink-600 shadow-xs rounded-lg"
                        />
                        {
                            showPassword ? <FaRegEyeSlash className="absolute right-3 top-11" onClick={() => setShowPassword(!showPassword)} /> : <FaRegEye className="absolute right-3 top-11" onClick={() => setShowPassword(!showPassword)} />
                        }
                        {errors.password?.type === 'required' && <span className="text-red-600 text-xs">Password is required</span>}

                    </div>

                    {/* Submit Button */}
                    <input
                        type="submit"
                        value='Create account'
                        className="w-full px-4 py-2 text-white font-medium bg-pink-600 hover:bg-pink-500 active:bg-pink-600 rounded-lg duration-150"
                    />
                </form>


                {/* ------------------------------------------------------------------------- */}
                <div className="relative">
                    <span className="block w-full h-px bg-gray-300"></span>
                    <p className="inline-block w-fit text-sm bg-white px-2 absolute -top-2 inset-x-0 mx-auto">Or continue with</p>
                </div>
                <div className="space-y-4 text-sm font-medium">
                    <button onClick={handleGoogleSignIn} className="w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100">
                        <FcGoogle className="text-2xl" />
                        Continue with Google
                    </button>
                    <button className="w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100">
                        <FaTwitter className="text-2xl text-sky-500" />
                        Continue with Twitter
                    </button>
                    <button className="w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100">
                        <FaFacebook className="text-2xl text-blue-500" />
                        Continue with Github
                    </button>
                </div>
                <div className="text-center">
                    <a href="javascript:void(0)" className="text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                </div>
            </div>
        </main>
    );
};

export default Login;