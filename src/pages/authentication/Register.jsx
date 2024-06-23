import { FcGoogle } from "react-icons/fc";
import { FaRegEye, FaRegEyeSlash, FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";



const Register = () => {

    const { user, setUser, createUser, googleSignIn, updateUser } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    // const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
    // const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async data => {

        console.log(data);

        const name = data.name;
        const email = data.email;
        const photo = data.photoURL;
        const role = data.role;
        const password = data.password;

        try {
            await createUser(email, password);

            await updateUser(name, photo, email, role);
            const theUser = { ...user, displayName: name, photoURL: photo, email: email, role: role };

            setUser(theUser);

            axiosPublic.post('/users', theUser)
                .then(res => {
                    if (res.data.insertedId) {
                        reset();
                        toast.success('Successfully toasted!');
                        navigate('/');
                    }
                })

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
        <main className="w-full flex">
            <div className="relative flex-1 hidden items-center justify-center h-screen bg-slate-500 lg:flex">
                <div className="relative z-10 w-full max-w-md">
                    <Link to='/'>
                        <h1 className="font-dongle text-4xl font-bold flex">Easy <span className=" text-pink-300">Parcel</span></h1>
                    </Link>
                    <div className=" mt-16 space-y-3">
                        <h3 className="text-white text-3xl font-bold">Start growing your business quickly</h3>
                        <p className="text-gray-300">
                            Create an account and get access to all features for 30-days, No credit card required.
                        </p>
                        <div className="flex items-center -space-x-2 overflow-hidden">
                            <img src="https://randomuser.me/api/portraits/women/79.jpg" className="w-10 h-10 rounded-full border-2 border-white" />
                            <img src="https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg" className="w-10 h-10 rounded-full border-2 border-white" />
                            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=a72ca28288878f8404a795f39642a46f" className="w-10 h-10 rounded-full border-2 border-white" />
                            <img src="https://randomuser.me/api/portraits/men/86.jpg" className="w-10 h-10 rounded-full border-2 border-white" />
                            <img src="https://images.unsplash.com/photo-1510227272981-87123e259b17?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3759e09a5b9fbe53088b23c615b6312e" className="w-10 h-10 rounded-full border-2 border-white" />
                            <p className="text-xs text-gray-400 font-medium translate-x-5">
                                Join 5.000+ users
                            </p>
                        </div>
                    </div>
                </div>
                <div
                    className="absolute inset-0 my-auto h-[500px]"
                    style={{
                        background: "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)", filter: "blur(118px)"
                    }}
                >

                </div>
            </div>
            <div className="flex-1 flex items-center justify-center h-screen">
                <div className="w-full max-w-md space-y-8 px-4 bg-white text-gray-600 xs:px-0">
                    <div className="">

                        <div className="mt-5 space-y-2">
                            <h3 className="text-gray-800 text-2xl font-bold xs:text-3xl">Sign up</h3>
                            <p className="">Already have an account? <Link to='/login' className="font-medium text-pink-600 hover:text-pink-500">Sign in</Link></p>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-x-3">
                        <button onClick={handleGoogleSignIn} className="flex items-center justify-center py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100">
                            <FcGoogle className="text-2xl" />
                        </button>
                        <button className="flex items-center justify-center py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100">
                            <FaTwitter className="text-2xl text-sky-500" />
                        </button>
                        <button className="flex items-center justify-center py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100">
                            <FaFacebook className="text-2xl text-blue-500" />
                        </button>
                    </div>
                    <div className="relative">
                        <span className="block w-full h-px bg-gray-300"></span>
                        <p className="inline-block w-fit text-xs bg-white px-2 absolute -top-2 inset-x-0 mx-auto">Or continue with</p>
                    </div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-5"
                    >
                        {/* Name */}
                        <div>
                            <label className="font-medium">
                                Name
                            </label>
                            <input
                                type="text"
                                {...register("name", { required: true })}
                                placeholder="Enter your name"
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-pink-600 shadow-xs rounded-lg"
                            />
                            {errors.name && <span className="text-red-600 text-xs">Name is required</span>}
                        </div>

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

                        {/* Photo */}
                        {/* <div>
                            <div className="max-w-md h-40 rounded-lg border-2 border-dashed flex items-center justify-center">
                                <label htmlFor="file" className="cursor-pointer text-center p-4 md:p-8">

                                    <p className="mt-3 text-gray-700 max-w-xs mx-auto">Click to <span className="font-medium text-indigo-600">Upload your  file</span> or drag and drop your file here</p>
                                </label>
                                <input
                                    {...register("image", { required: true })}
                                    id="file" type="file" className="hidden" />

                            </div>
                            {errors.photo && <span className="text-red-600 text-xs">Photo is required</span>}
                        </div> */}

                        {/* Photo URL */}
                        <div>
                            <label className="font-medium">
                                PhotoURL
                            </label>
                            <input {...register("photoURL", { required: true })} type="url" name='photoURL' placeholder="url" className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-pink-600 shadow-xs rounded-lg" />
                            {errors.name && <span className="text-red-600">Photo url is required</span>}
                        </div>


                        <div>
                            <label className="font-medium">
                                Register as
                            </label>

                            <select {...register("role", { required: true })}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-pink-600 shadow-xs rounded-lg"
                            >
                                <option className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-pink-600 shadow-xs rounded-lg" value="user">User</option>
                                <option className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-pink-600 shadow-xs rounded-lg" value="deliveryPerson">Delivery Man</option>
                            </select>

                            {errors.name && <span className="text-red-600">Photo url is required</span>}
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
                                        minLength: 6,
                                        pattern: /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])/
                                    })}
                                placeholder="Enter your password"
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-pink-600 shadow-xs rounded-lg"
                            />
                            {
                                showPassword ? <FaRegEyeSlash className="absolute right-3 top-11" onClick={() => setShowPassword(!showPassword)} /> : <FaRegEye className="absolute right-3 top-11" onClick={() => setShowPassword(!showPassword)} />
                            }
                            {errors.password?.type === 'required' && <span className="text-red-600 text-xs">Password is required</span>}
                            {errors.password?.type === 'minLength' && <span className="text-red-600 text-xs">password must be at least 6 characters</span>}
                            {errors.password?.type === 'pattern' && <span className="text-red-600 text-xs">Password must at least a capital letter, a xsall letter, a number and a special character.</span>}
                        </div>

                        {/* Submit Button */}
                        <input
                            type="submit"
                            value='Create account'
                            className="w-full px-4 py-2 text-white font-medium bg-pink-600 hover:bg-pink-500 active:bg-pink-600 rounded-lg duration-150"
                        />
                    </form>
                </div>
            </div>
        </main>
    );
};

export default Register;