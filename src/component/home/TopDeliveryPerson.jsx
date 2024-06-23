import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'

import Tilt from 'react-parallax-tilt';
import HeaderTitles from "../../shared/HeaderTitles";



const TopDeliveryPerson = () => {
    return (
        <div className="my-28">

            <HeaderTitles
                heading='Our Achievements'
                subHeading='Top-rated performance, rugged design, award-winning reliability.'>
            </HeaderTitles>


            <div className=" flex flex-col md:flex-row gap-4 justify-between items-center">

                <Tilt>
                    <div className="max-w-96 p-4 border-2 rounded-xl bg-gray-100 cursor-pointer">
                        <div>
                            <img className="w-full rounded-xl" src="https://i.ibb.co/6HyBZBv/deli-man-1.jpg" alt="" />
                        </div>
                        <div className="mt-4">
                            <h4>Sohun</h4>
                            <div className="flex justify-between">

                                <p>Parcel delivered: 232</p>

                                <Rating
                                    style={{ maxWidth: 100 }}
                                    value={4.8}
                                    readOnly
                                />

                            </div>
                        </div>
                    </div>

                </Tilt>

                <Tilt>
                    <div className="max-w-96 p-4 border-2 rounded-xl bg-gray-100 cursor-pointer">
                        <div>
                            <img className="w-full rounded-xl" src="https://i.ibb.co/k1WTNR9/deli-man-2.jpg" alt="" />
                        </div>
                        <div className="mt-4">
                            <h4>Michael Brown</h4>
                            <div className="flex justify-between">

                                <p>Parcel delivered: 214</p>

                                <Rating
                                    style={{ maxWidth: 100 }}
                                    value={4.5}
                                    readOnly
                                />

                            </div>
                        </div>
                    </div>

                </Tilt>

                <Tilt>
                    <div className="max-w-96 p-4 border-2 rounded-xl bg-gray-100 cursor-pointer">
                        <div>
                            <img className="w-full rounded-xl" src="https://i.ibb.co/7pyLLRr/deli-woman-5.webp" alt="" />
                        </div>
                        <div className="mt-4">
                            <h4>Emily Harris</h4>
                            <div className="flex justify-between">

                                <p>Parcel delivered: 192</p>

                                <Rating
                                    style={{ maxWidth: 100 }}
                                    value={4.4}
                                    readOnly
                                />

                            </div>
                        </div>
                    </div>

                </Tilt>

            </div>


        </div>
    );
};

export default TopDeliveryPerson;