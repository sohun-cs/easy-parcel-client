import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';


const FeatureStats = () => {

    return (
        <div className='my-24'>
            <section className="py-14">
                <div className="max-w-screen-xl mx-auto px-4 text-gray-600 gap-x-12 items-start justify-between lg:flex md:px-8">
                    <div className="sm:hidden lg:block lg:max-w-xl">
                        <img src="https://i.ibb.co/S7NPftL/banner-11.jpg" className="rounded-lg" alt="" />
                    </div>
                    <div className="mt-6 gap-12 sm:mt-0 md:flex lg:block">
                        <div className="max-w-2xl">
                            <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                                Delivering Excellence to Keep Our Customers Satisfied
                            </h3>
                            <p className="mt-3 max-w-xl">
                                Our commitment to outstanding service ensures a seamless and enjoyable experience for all our users.
                            </p>
                        </div>
                        <div className="flex-none mt-6 md:mt-0 lg:mt-6">
                            <ul className="inline-grid gap-y-4 gap-x-10 grid-cols-2">
                                <li className="border-[1px] p-3 border-pink-500 rounded-md bg-pink-50">
                                    <h4 className="text-3xl md:text-4xl text-pink-500 font-semibold">
                                        <CountUp end={35000} duration={5}>
                                            {({ countUpRef, start }) => (
                                                <VisibilitySensor onChange={start} delayedCall>
                                                    <span ref={countUpRef} />
                                                </VisibilitySensor>
                                            )}
                                        </CountUp>+
                                    </h4>
                                    <p className="mt-3 font-medium">Registered Users</p>
                                </li>
                                <li className="border-[1px] p-3 border-pink-500 rounded-md bg-pink-50">
                                    <h4 className="text-3xl md:text-4xl text-pink-500 font-semibold">
                                        <CountUp end={100000} duration={5}>
                                            {({ countUpRef, start }) => (
                                                <VisibilitySensor onChange={start} delayedCall>
                                                    <span ref={countUpRef} />
                                                </VisibilitySensor>
                                            )}
                                        </CountUp>+
                                    </h4>
                                    <p className="mt-3 font-medium">Parcel Delivered</p>
                                </li>
                                <li className="border-[1px] p-3 border-pink-500 rounded-md bg-pink-50">
                                    <h4 className="text-3xl md:text-4xl text-pink-500 font-semibold">
                                        <CountUp end={50} duration={5}>
                                            {({ countUpRef, start }) => (
                                                <VisibilitySensor onChange={start} delayedCall>
                                                    <span ref={countUpRef} />
                                                </VisibilitySensor>
                                            )}
                                        </CountUp>+
                                    </h4>
                                    <p className="mt-3 font-medium">States</p>
                                </li>
                                <li className="border-[1px] p-3 border-pink-500 rounded-md bg-pink-50">
                                    <h4 className="text-3xl md:text-4xl text-pink-500 font-semibold">
                                        <CountUp end={150000} duration={5}>
                                            {({ countUpRef, start }) => (
                                                <VisibilitySensor onChange={start} delayedCall>
                                                    <span ref={countUpRef} />
                                                </VisibilitySensor>
                                            )}
                                        </CountUp>+
                                    </h4>
                                    <p className="mt-3 font-medium">Parcel Booked</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FeatureStats;