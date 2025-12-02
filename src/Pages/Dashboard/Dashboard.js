import { Outlet } from "react-router-dom";
import SideBar from "../../Components/Dashboard/SideBar";
import TopBar from "../../Components/Dashboard/TopBar";
import "./dashboard.css";
import DashboardPage from "../../Components/Dashboard/DashboardDesign/Dashboard";

export default function Dashboard() {
    return (
        <>
            <div className="position-relative  ">
                <TopBar />
                {/* <DashboardPage /> */}
                <div className="dashboard d-flex  gap-1" style={{ marginTop: '70px' }}>
                    <SideBar />


                    <Outlet />
                    
                </div>

            </div>

        </>
    )
}