import { Outlet } from "react-router-dom";
import SideBar from "../../Components/Dashboard/SideBar";
import TopBar from "../../Components/Dashboard/TopBar";
import "./dashboard.css";
import DashboardPage from "../../Components/Dashboard/DashboardDesign/Dashboard";
import { useContext } from "react";
import { Menu } from "../../Context/MenuContext";

export default function Dashboard() {
      const menu = useContext(Menu);
  const isOpen = menu.isOpen;
    return (
        <>
            <div className="position-relative  ">
                <TopBar />
                {/* <DashboardPage /> */}
                <div className="dashboard d-flex  gap-1" >
                    <SideBar />


                     <div className={`main-content ${isOpen ? "shifted" : "normal"}`}>
            <Outlet />
          </div>
                    
                </div>

            </div>

        </>
    )
}