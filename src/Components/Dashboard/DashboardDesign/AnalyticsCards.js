import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUsers, faBox, faFolderOpen, faCartShopping } from "@fortawesome/free-solid-svg-icons"
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

import './dashboardDesign.css'
const analyticsData = [
  {
    title: "Total Users",
    value: "2,543",
    change: "+12%",
    icon: <FontAwesomeIcon icon={faUsers} size={18} />,
    isPositive: true,
  },
  {
    title: "Total Products",
    value: "891",
    change: "+5%",
    icon: <FontAwesomeIcon icon={faBox} size={18} />,
    isPositive: true,
  },
  {
    title: "Total Categories",
    value: "24",
    change: "+2%",
    icon: <FontAwesomeIcon icon={faFolderOpen} size={18} />,
    isPositive: true,
  },
  {
    title: "Latest Orders",
    value: "1,234",
    change: "-3%",
    icon: <FontAwesomeIcon icon={faCartShopping} size={18} />,
    isPositive: false,
  },
];

export default function AnalyticsCards() {
  return (
    <div className="row g-4 analytics-wrapper" >
      {analyticsData.map((item, idx) => (
        <div className="col-12 col-md-6 col-lg-3" key={idx}>
          <div className="card border-0 shadow-sm h-100 analytics-card ">
            <div className="card-body d-flex flex-column justify-content-between">

              {/* Header */}
              <div className="d-flex justify-content-between align-items-center mb-3 ">
                <h6 className="text-muted fw-semibold fs-7 mb-0 ">
                  {item.title}
                </h6>

                <div
                  className="p-2 rounded"
                  style={{
                    backgroundColor: "rgba(13,110,253,0.1)",
                    color: "#0d6efd"
                  }}
                >
                  {item.icon}
                </div>
              </div>

              {/* Content */}
              <div className="d-flex justify-content-between align-items-end">
                <h4 className="fw-bold mb-0">{item.value}</h4>

                <span
                  className={`d-flex align-items-center gap-1 fw-semibold ${
                    item.isPositive ? "text-success" : "text-danger"
                  }`}
                >
                  {item.isPositive ? (
                    <FaArrowTrendUp  size={12} />
                  ) : (
                    <FaArrowTrendDown size={12} />
                  )}
                  {item.change}
                </span>
              </div>

            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
