import { Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <nav className="py-3">
            <Container>
                <div className="d-flex align-items-center justify-content-between flex-wrap">
                    <Link className="col-3" to="/">
                        <img
                            width="116px"
                            height='67px'
                            src={require("../../../Assets/images/Logo.png")}
                            alt="logo"
                        />
                    </Link>
                    <div className="col-12 col-md-6 order-md-2 order-3 mt-md-0 mt-3 position-relative ">
                        <Form.Control
                            type="Search"
                            className="form-control custom-search py-3 rounded-0"
                            placeholder="Search Product"
                        />
                        <h3 className="btn btn-primary position-absolute top-0 end-0 h-100 line-height m-0 px-4 rounded-0 d-flex align-items-center justify-content-center">
                            Search
                        </h3>
                    </div>
                    <div className="col-3 d-flex align-items-center justify-content-end gap-4 order-md-3 order-1">
                        <div>
                            <img
                                width="30px"
                                src={require("../../../Assets/Icons/Cart.png")}
                                alt="Cart"
                            />
                        </div>
                        <Link to="/profile">
                            <img
                                width="35px"
                                src={require("../../../Assets/Icons/Profile.png")}
                                alt="Cart"
                            />
                        </Link>
                    </div>
                </div>

            </Container>
        </nav>
    );
}