import { DatePicker } from "antd";
import { useState } from "react";

const BookParcel = () => {

    const [startDate, setStartDate] = useState(new Date());

    const handleBookParcel = e => {

        e.preventDefault();
        const form = new FormData(e.currentTarget);

        const name = form.get("name");
        const email = form.get("email");
        const phone_number = form.get("phone_number");
        const parcel = form.get("parcel");
        const weight = form.get("weight");
        const reciever_name = form.get("reciever_name");
        const reciever_phone = form.get("reciever_phone");
        const address = form.get("address");
        const date = form.get("date");
        const latitude = form.get("latitude");
        const longitude = form.get("longitude");
        const price = form.get("price");

        const data = {
            name: name,
            email: email,
            phone_number: phone_number,
            parcel: parcel,
            weight: weight,
            reciever_name: reciever_name,
            reciever_phone: reciever_phone,
            address: address,
            date: date,
            latitude: latitude,
            longitude: longitude,
            price: price
        }

        console.log(data)



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
                                placeholder="Enter Your Name"
                                required />
                        </div>


                        <div className="space-y-2">
                            <label className="text-sm font-semibold px-4">
                                Email
                            </label>
                            <input
                                className="w-full bg-gray-100 px-4 py-2 border-b-2 border-pink-200 focus:outline-0 focus:bg-gray-50 focus:border-pink-400 duration-300 rounded-lg"
                                type="email"
                                name="email"
                                placeholder='Enter Your Email'
                                required />
                        </div>


                        <div className="space-y-2">
                            <label className="text-sm font-semibold px-4">
                                Phone Number
                            </label>
                            <input
                                className="w-full bg-gray-100 px-4 py-2 border-b-2 border-pink-200 focus:outline-0 focus:bg-gray-50 focus:border-pink-400 duration-300 rounded-lg"
                                type="text"
                                name="phone_number"
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
                                placeholder='Enter Your Parcel Type'
                                required />
                        </div>


                        <div className="space-y-2">
                            <label className="text-sm font-semibold px-4">
                                Parcel Weight
                            </label> <br />
                            <input
                                className="w-full bg-gray-100 px-4 py-2 border-b-2 border-pink-200 focus:outline-0 focus:bg-gray-50 focus:border-pink-400 duration-300 rounded-lg"
                                type="number"
                                name="weight"
                                placeholder='Enter Your parcel Weight'
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
                            type="text"
                            name="price"
                            placeholder='Enter Your Price'
                            required />
                    </div>


                    <div>

                        <input
                            className="w-full text-white font-semibold bg-pink-500 hover:bg-pink-600 duration-300 p-3 rounded-md cursor-pointer"
                            type="submit"
                            value='Book Button' />
                    </div>



                </form>

            </div>

        </div>
    );
};

export default BookParcel;