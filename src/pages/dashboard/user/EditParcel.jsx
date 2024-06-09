import { DatePicker } from "antd";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useParcel from "../../../hooks/useParcel";
import { useLoaderData, useNavigate } from "react-router-dom";
import dayjs from 'dayjs';



const EditParcel = () => {

    const loadedParcel = useLoaderData();
    console.log('loaded parcel data:', loadedParcel)

    const { _id,
        name,
        email,
        phone_number,
        parcel,
        weight,
        reciever_name,
        reciever_phone,
        address,
        date,
        latitude,
        longitude, } = loadedParcel

    console.log('Parcels: ', loadedParcel)
    const loadedPrice = loadedParcel.price

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [startDate, setStartDate] = useState(null);
    const [parcelWeight, setParcelWeight] = useState(weight)
    const [price, setPrice] = useState(loadedPrice);
    const [, refetch] = useParcel();
    const navigate = useNavigate();


    const calculatePrice = parcelWeight => {
        if (parcelWeight <= 1 && parcelWeight > 0) {
            return 50;
        }
        else if (parcelWeight <= 2 && parcelWeight > 1) {
            return 100;
        }
        else if (parcelWeight > 2) {
            return 150;
        }
        else if (parcelWeight < 0) {
            return 0
        }
    }

    const handleWeigthPrice = e => {
        const parcelWeight = parseFloat(e.target.value);

        if (parcelWeight) {
            setParcelWeight(parcelWeight)
            const calculatedPrice = calculatePrice(parcelWeight);
            setPrice(calculatedPrice);
        }
        else {
            setParcelWeight(null);
            setPrice(0);
        }
    }

    const handleBookParcel = e => {

        setStartDate(new Date());

        e.preventDefault();
        const form = new FormData(e.currentTarget);

        const name = user?.displayName;
        const email = user?.email;
        const phone_number = form.get("phone_number");
        const parcel = form.get("parcel");
        const parcelWeight = form.get("parcelWeight");
        const reciever_name = form.get("reciever_name");
        const reciever_phone = form.get("reciever_phone");
        const address = form.get("address");
        const date = form.get("date");
        const latitude = form.get("latitude");
        const longitude = form.get("longitude");
        const price = form.get("price")

        const parcelData = {
            name: name,
            email: email,
            phone_number: phone_number,
            parcel: parcel,
            parcelWeight: parcelWeight,
            reciever_name: reciever_name,
            reciever_phone: reciever_phone,
            address: address,
            date: date,
            latitude: latitude,
            longitude: longitude,
            price: price
        }

        console.log(parcelData)

        axiosSecure.patch(`/parcel/${_id}`, parcelData)
            .then(res => {
                console.log('res: ', res)
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your parcel updated successfully!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                    e.target.reset();
                    setParcelWeight(null);
                    setPrice(0);
                    navigate('/dashboard/my-parcel')
                }
            });

        setStartDate(null);

    }

    return (
        <div className="w-full ">

            <div className="flex min-h-screen justify-center items-center ">

                <form onSubmit={handleBookParcel} className="w-full p-4 md:p-8 lg:p-12 space-y-3 md:space-y-6 overflow-x-auto">

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-8">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold px-4">
                                Name
                            </label>
                            <input
                                className="w-full bg-gray-100 px-4 py-2 border-b-2 border-pink-200 focus:outline-0 focus:bg-gray-50 focus:border-pink-400 duration-300 rounded-lg"
                                type="text"
                                name="name"
                                defaultValue={name}
                                placeholder="Enter Your Name"
                                disabled />
                        </div>


                        <div className="space-y-2">
                            <label className="text-sm font-semibold px-4">
                                Email
                            </label>
                            <input
                                className="w-full bg-gray-100 px-4 py-2 border-b-2 border-pink-200 focus:outline-0 focus:bg-gray-50 focus:border-pink-400 duration-300 rounded-lg"
                                type="email"
                                name="email"
                                defaultValue={email}
                                placeholder='Enter Your Email'
                                disabled />
                        </div>


                        <div className="space-y-2">
                            <label className="text-sm font-semibold px-4">
                                Phone Number
                            </label>
                            <input
                                className="w-full bg-gray-100 px-4 py-2 border-b-2 border-pink-200 focus:outline-0 focus:bg-gray-50 focus:border-pink-400 duration-300 rounded-lg"
                                type="text"
                                name="phone_number"
                                defaultValue={phone_number}
                                placeholder='Enter Your Phone Number'
                                required />
                        </div>
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold px-4">
                                Parcel Type
                            </label> <br />
                            <input
                                className="w-full bg-gray-100 px-4 py-2 border-b-2 border-pink-200 focus:outline-0 focus:bg-gray-50 focus:border-pink-400 duration-300 rounded-lg"
                                type="text"
                                name="parcel"
                                defaultValue={parcel}
                                placeholder='Enter Your Parcel Type'
                                required />
                        </div>


                        <div className="space-y-2">
                            <label className="text-sm font-semibold px-4">
                                Parcel parcelWeight
                            </label> <br />
                            <input
                                className="w-full bg-gray-100 px-4 py-2 border-b-2 border-pink-200 focus:outline-0 focus:bg-gray-50 focus:border-pink-400 duration-300 rounded-lg"
                                type="number"
                                name="parcelWeight"

                                value={parcelWeight}
                                onChange={handleWeigthPrice}
                                placeholder='Enter Your parcel parcelWeight'
                                required />
                        </div>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">

                        <div className="space-y-2">
                            <label className="text-sm font-semibold px-4">
                                Receiver&apos;s Name
                            </label> <br />
                            <input
                                className="w-full bg-gray-100 px-4 py-2 border-b-2 border-pink-200 focus:outline-0 focus:bg-gray-50 focus:border-pink-400 duration-300 rounded-lg"
                                type="text"
                                defaultValue={reciever_name}
                                name="reciever_name"
                                placeholder="Enter Your Receiver's Name"
                                required />
                        </div>


                        <div className="space-y-2">
                            <label className="text-sm font-semibold px-4">
                                Receiver&apos;s Phone Number
                            </label> <br />
                            <input
                                className="w-full bg-gray-100 px-4 py-2 border-b-2 border-pink-200 focus:outline-0 focus:bg-gray-50 focus:border-pink-400 duration-300 rounded-lg"
                                type="text"
                                defaultValue={reciever_phone}
                                name="reciever_phone"
                                placeholder="Enter Your Receiver's Phone Number"
                                required />
                        </div>
                    </div>


                    <div className="gap-4 md:space-y-2">
                        <label className="text-sm font-semibold px-4">
                            Parcel Delivery Address
                        </label> <br />
                        <input
                            className="w-full bg-gray-100 px-4 py-2 border-b-2 border-pink-200 focus:outline-0 focus:bg-gray-50 focus:border-pink-400 duration-300 rounded-lg"
                            type="text"
                            defaultValue={address}
                            name="address"
                            placeholder="Enter Your Parcel Delivery Address"
                            required />
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold px-4">
                                Requested Delivery Date
                            </label> <br />
                            <DatePicker
                                selected={startDate}
                                defaultValue={dayjs(date)}
                                onChange={(date) => setStartDate(date)}
                                className="w-full bg-gray-100 px-4 py-2 border-b-2 border-pink-200 focus:outline-0 focus:bg-gray-50 focus:border-pink-400 duration-300 rounded-lg"
                                name="date"

                                required
                            />

                            {/* <input
                                className="w-full bg-gray-100 px-4 py-2 border-b-2 border-pink-200 focus:outline-0 focus:bg-gray-50 focus:border-pink-400 duration-300 rounded-lg"
                                type="date"
                                name="date"
                                placeholder='Enter Your Requested Delivery Date'
                                required ></input> */}
                        </div>


                        <div className="space-y-2">
                            <label className="text-sm font-semibold px-4">
                                Delivery Address Latitude
                            </label> <br />
                            <input
                                className="w-full bg-gray-100 px-4 py-2 border-b-2 border-pink-200 focus:outline-0 focus:bg-gray-50 focus:border-pink-400 duration-300 rounded-lg"
                                type="text"
                                defaultValue={latitude}
                                name="latitude"
                                placeholder='Enter Your Delivery Address Latitude'
                                required />
                        </div>


                        <div className="space-y-2">
                            <label className="text-sm font-semibold px-4">
                                Delivery Address Longitude
                            </label> <br />
                            <input
                                className="w-full bg-gray-100 px-4 py-2 border-b-2 border-pink-200 focus:outline-0 focus:bg-gray-50 focus:border-pink-400 duration-300 rounded-lg"
                                type="text"
                                defaultValue={longitude}
                                name="longitude"
                                placeholder='Enter Your Delivery Address Longitude'
                                required />
                        </div>

                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold px-4">
                            Price
                        </label> <br />



                        <input
                            className="w-full bg-gray-100 px-4 py-2 border-b-2 border-pink-200 focus:outline-0 focus:bg-gray-50 focus:border-pink-400 duration-300 rounded-lg"
                            value={price}
                            type="text"
                            name="price"
                            disabled />
                    </div>


                    <div>

                        <input
                            className="w-full text-white font-semibold bg-pink-500 hover:bg-pink-600 duration-300 p-3 rounded-md cursor-pointer"
                            type="submit"
                            value='Update Parcel' />
                    </div>



                </form>

            </div>

        </div>
    );
};

export default EditParcel;