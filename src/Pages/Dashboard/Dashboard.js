import { Outlet } from "react-router-dom";
import SideBar from "../../Components/Dashboard/SideBar";
import TopBar from "../../Components/Dashboard/TopBar";
import "./dashboard.css";
import AnalyticsCards from "../../Components/Dashboard/AnalyticsCards";
export default function Dashboard(){
    return(
        <div className="position-relative  ">
            <TopBar/>
           
            <div className="dashboard d-flex  gap-1" style={{marginTop:'70px'}}>
                <SideBar/>
                  <div className="d-flex flex-column gap-3 mx-4 my-4">
                    <h1 className="fs-2 fw-bold text-dark">Dashboard</h1>
                    <p className="text-muted">Welcome back! Here's your business overview.</p>
                    <AnalyticsCards />

                  </div>

            <Outlet/>
            </div>
        </div>
    )
}