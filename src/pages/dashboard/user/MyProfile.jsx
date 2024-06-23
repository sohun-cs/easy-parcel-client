import { Image } from "antd";
import useAuth from "../../../hooks/useAuth";
import { RiImageEditLine } from "react-icons/ri";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_API;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const MyProfile = () => {

    const axiosPublic = useAxiosPublic();

    const { user, setUser, updateUser } = useAuth();
    console.log("user", user);

    const handleProfileUpdate = async e => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const image = form.image.files[0].name;
        const imageData = form.image.files[0];

        const photo = { image: image }
        console.log(name, photo);

        const formData = new FormData();
        formData.append('image', imageData);

        console.log('form data', formData);

        try {

            const res = await axiosPublic.post(image_hosting_api, formData, {
                headers: {
                    'content-Type': 'multipart/form-data'
                }
            })

            console.log("res.data", res.data.data.url);
            const photo = res.data.data.url;

            await updateUser(name, photo);
            const updatedUser = { ...user, displayName: name, photoURL: photo };
            setUser(updatedUser)


            await axiosPublic.post('/users', updatedUser)
                .then(res => {
                    console.log("res", res);
                    if (res.request.status === 200) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "You updated your porfile successfully",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })




        } catch (error) {

            console.error(error.message);

        }

    }

    return (
        <div className="h-[calc(100vh-82px)]">
            <div className="h-full flex justify-center items-center">
                <div className="max-w-56 md:max-w-xs lg:max-w-xl" >
                    <div className="max-w-48 lg:max-w-96 mx-auto">
                        {/* <img src={user?.photoURL} alt="" /> */}
                        <Image
                            src={user?.photoURL}
                            className=""
                        />
                        <p className="text-xl text-center mb-6" >{user?.displayName}</p>
                    </div>

                    <div>
                        <form onSubmit={handleProfileUpdate} className="space-y-4">

                            <div className="w-full flex items-center bg-gray-100 ps-4 border-b-2 border-pink-200 duration-300 rounded-lg">
                                <RiImageEditLine />

                                <input
                                    className="w-full bg-gray-100 px-4 py-4 border-pink-200 focus:outline-0 rounded-lg"
                                    type="text"
                                    name="name"
                                    placeholder="Enter Your Name"
                                    required />
                            </div>

                            <div>
                                <div className="max-w-md text-xs md:text-base h-28 md:h-40 rounded-lg border-2 border-dashed flex items-center justify-center">
                                    <label htmlFor="file" className="cursor-pointer text-center p-4 md:p-8">
                                        <svg className="w-10 h-10 mx-auto" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.1667 26.6667C8.48477 26.6667 5.5 23.6819 5.5 20C5.5 16.8216 7.72428 14.1627 10.7012 13.4949C10.5695 12.9066 10.5 12.2947 10.5 11.6667C10.5 7.0643 14.231 3.33334 18.8333 3.33334C22.8655 3.33334 26.2288 6.19709 27.0003 10.0016C27.0556 10.0006 27.1111 10 27.1667 10C31.769 10 35.5 13.731 35.5 18.3333C35.5 22.3649 32.6371 25.7279 28.8333 26.5M25.5 21.6667L20.5 16.6667M20.5 16.6667L15.5 21.6667M20.5 16.6667L20.5 36.6667" stroke="#4F46E5" />
                                        </svg>
                                        <p className="mt-3 text-gray-700 max-w-xs mx-auto">Click to <span className="font-medium text-indigo-600">Upload your  file</span> or drag and drop your file here</p>
                                    </label>
                                    <input name="image" id="file" type="file" className="hidden" />
                                </div>
                            </div>

                            <input type="submit"
                                className="w-full text-white font-semibold bg-pink-500 hover:bg-pink-600 duration-300 p-3 rounded-md cursor-pointer" />

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;