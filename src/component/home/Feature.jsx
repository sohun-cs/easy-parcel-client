import { AiOutlineSafety } from "react-icons/ai";
import { TbTruckDelivery } from "react-icons/tb";



const Feature = () => {



    return (
        <div className="bg-yellow-50">
            <section className="py-28">
                <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                    <div className="max-w-2xl mx-auto text-center">
                        <h3 className="text-black text-3xl font-semibold sm:text-4xl">
                            Our customers are always happy
                        </h3>
                        <p className="mt-3 text-gray-700">
                            With advanced tracking and robust security measures, EasyParcel prioritizes the security of your parcels to ensure safe and reliable deliveries.
                        </p>
                    </div>
                    <div className="mt-12">
                        <ul className="flex flex-col md:flex-row">

                            <li className="w-full text-center  px-12 py-4 rounded-lg">
                                <TbTruckDelivery className="text-4xl text-blue-500 mx-auto mb-4" />


                                <h4 className="text-2xl font-semibold">
                                    Super Fast Delivery
                                </h4>
                                <p className="mt-3 text-sm text-gray-600 font-medium">
                                    EasyParcel ensure your parcels reach their destinations quickly and efficiently, every time.
                                </p>
                            </li>
                            <li className="w-full text-center  px-12 py-4 rounded-lg">
                                <AiOutlineSafety className="text-4xl text-green-500 mx-auto mb-4" />

                                <h4 className="text-2xl font-semibold">
                                    Parcel Safety
                                </h4>
                                <p className="mt-3 text-sm text-gray-600 font-medium">
                                    EasyParcel guarantees safe and reliable deliveries every time.
                                </p>
                            </li>
                            <li className="w-full text-center  px-12 py-4 rounded-lg">
                                <TbTruckDelivery className="text-4xl text-blue-500 mx-auto mb-4" />


                                <h4 className="text-2xl font-semibold">
                                    Rapid Service
                                </h4>
                                <p className="mt-3 text-sm text-gray-600 font-medium">
                                    EasyParcel ensures your deliveries are expedited with speed and reliability.
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Feature;