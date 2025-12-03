import { Outlet } from "react-router-dom";
import NavBar from "../../Components/Website/Navbar/Navbar";
import Footer from "../../Components/Website/Footer/Footer";

export default function Website() {
    return (
        <>
            <NavBar />
            <Outlet />
            <Footer/>
        </>
    );
}