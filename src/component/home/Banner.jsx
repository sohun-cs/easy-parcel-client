import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Banner = () => {
    return (
        <div className=" bg-[url('https://i.ibb.co/jHNhcqr/banner-10.jpg')] md:bg-[url('https://i.ibb.co/ngS55c1/banner-7.jpg')] bg-cover bg-no-repeat h-screen max-w-full">

            <div className=" bg-black bg-opacity-40 h-full flex flex-col justify-center items-center">

                <div className="bg-white text-white bg-opacity-30 rounded-md px-6 md:px-16 mx-2 py-20 text-center space-y-4">
                    <h1 className="text-xl lg:text-5xl font-bold leading-tight">EasyParcel: Your Complete Parcel <br /> Management Solution</h1>
                    <p className="text-sm md:text-lg mb-4">Book Parcels, Assign Deliveries, and Track Shipments with Ease</p>

                    <div className="flex w-full py-4">
                        <Input className='w-full text-black focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-pink-500 rounded-s-full' type="Search" placeholder="Search" />
                        <Button type='submit' className='rounded-e-full lg:px-12 bg-pink-400 hover:bg-pink-500 duration-300'>Search</Button>
                    </div>
                </div>


            </div>

        </div>
    );
};

export default Banner;