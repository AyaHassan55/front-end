import UserGrowthChart from "./UserGrothChart";
import AnalyticsCards from "./AnalyticsCards";
import SalesChart from "./SalesChart";

export default function DashboardPage(){
    return(
        <div className="d-flex flex-column gap-3 mx-4 my-4">
                        <h1 className="fs-2 fw-bold text-dark">Dashboard</h1>
                        <p className="text-muted">Welcome back! Here's your business overview.</p>
                        <AnalyticsCards />
                        <div className="row gy-4">
                            <div className="col-12 col-lg-7">
                                <UserGrowthChart />
                            </div>

                            <div className="col-12 col-lg-5">
                                <SalesChart />
                            </div>
                        </div>
                    </div>
    );
}