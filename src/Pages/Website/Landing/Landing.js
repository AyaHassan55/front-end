import { Container } from "react-bootstrap";

import { Link } from "react-router-dom";

export default function Landing() {
    return (
        <>
            <div className="d-flex align-items-center justify-content-center flex-wrap hand position-relative">

             {/* <Container > */}
                <div className= "content col-lg-5 col-md-8 col-12 text-md-start text-center position-absolute">
                    {/* <h1 className="display-2 fw-bold">Shampo Nice!</h1> */}
                    <h1 className="fw-normal mb-4" style={{color:'#003e29',marginBottom:'10px'}}>Grap up to 50%  on selected Headphone </h1>
                    <Link to="/shop" className="btn btn-primary py-2 px-3 text-light " style={{borderRadius:'30px',height:'40px',textAlign:'center'}}>Shop Now</Link>
                </div>
                <div className="landing-img position-absolute">
                    <img src={require("../../../Assets/images/girll.png")} width={"400px"} />
                </div>
             {/* </Container> */}
              


            </div>

        </>
    );
}