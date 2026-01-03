import { Container } from "react-bootstrap";

import { Link } from "react-router-dom";

export default function Landing() {
    return (
        <>
            
            <div className="d-flex align-items-center justify-content-center flex-wrap hand position-relative">

                
                <div className="content col-lg-5 col-md-8 col-12 text-md-start text-center ">
                     <h6 className= "d-inline-block text-primary bg-white rounded py-1 px-2">SMART SHOPPING STARTS HERE</h6>
                    <h1 className="fw-bold mb-4 text-primary mt-3" style={{marginBottom:'10px'}}>
                       Upgrade Your Everyday Style
                    </h1>
                    <p className="mb-4 text-secondary" style={{fontSize:'18px', marginBottom:'20px'}}>
                         Discover premium headphones, bags, and must-have accessories designed to fit your lifestyle.
                    </p>

                  
                    <Link to="/shop" className="btn btn-primary py-2 px-3 text-light">
                        Shop Now
                    </Link>
                </div>

               
                <div className="landing-img position-absolute hero-wrapper d-flex justify-content-center align-items-center">
                    <div className="circle-container position-relative">
                        {/* circles */}
                        <span className="circle circle-1"></span>
                        <span className="circle circle-2"></span>
                        <span className="circle circle-3"></span>
                        <img
                            src={require("../../../Assets/images/man.webp")}
                            width={"400px"}
                            alt="Landing"
                            className="hero-img"
                        />
                    </div>
                </div>

            </div>
        </>
    );
}