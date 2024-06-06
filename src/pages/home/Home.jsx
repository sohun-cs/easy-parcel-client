// import {   Button, DatePicker } from "antd";
// import { PiCodesandboxLogoThin } from "react-icons/pi";

import { Helmet } from "react-helmet-async";
import Banner from "../../component/home/Banner";
import FeatureStats from "../../component/home/FeatureStats";
import Feature from "../../component/home/Feature";
import TopDeliveryPerson from "../../component/home/TopDeliveryPerson";

const Home = () => {

    const url = import.meta.env.VITE_BASE_URL;
    console.log('URL: ', url);

    return (
        <div className="">

            <Helmet>
                <title>Home | EasyParcel</title>
            </Helmet>

            <Banner></Banner>
            <Feature></Feature>
            <FeatureStats></FeatureStats>

            <div className="container mx-auto">
                <TopDeliveryPerson></TopDeliveryPerson>
            </div>


        </div>
    );
};

export default Home;