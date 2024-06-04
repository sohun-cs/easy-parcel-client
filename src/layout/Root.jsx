import Navbar from "@/shared/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../shared/Footer";



const Root = () => {

    const location = useLocation();
    // const { loading } = useAuth()

    // if (loading) return <Flex align="center" gap="middle"><Spin size="large" /></Flex>
    
    
    const authPath = location.pathname.includes('login') || location.pathname.includes('register');

    return (
        <div>
            {
                authPath || <Navbar></Navbar>
            }
            <Outlet></Outlet>
            {
                authPath || <Footer></Footer>
            }

        </div>
    );
};

export default Root;