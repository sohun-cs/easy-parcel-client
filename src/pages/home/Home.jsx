// import {   Button, DatePicker } from "antd";
// import { PiCodesandboxLogoThin } from "react-icons/pi";

import { Helmet } from "react-helmet-async";
import Banner from "../../component/home/Banner";



const Home = () => {




    return (
        <div className="h-[3000px]">

            <Helmet>
                <title>Home | EasyParcel</title>
            </Helmet>

            <Banner></Banner>

        </div>
    );
};

export default Home;