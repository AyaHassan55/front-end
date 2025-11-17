import { Container } from "react-bootstrap";

import { Link } from "react-router-dom";

export default function Landing() {
    return (
        <>
            <div className="d-flex align-items-center justify-content-center flex-wrap hand">
                <Container>
                    <div className="col-lg-5 col-md-8 col-12 text-md-start text-center">
                        <h1 className="display-2 fw-bold">Shampo Nice!</h1>
                        <h5 className="fw-normal" style={{ color: 'grey' }}>Another Nice Thing Which is used by someone i don't know it's a random text</h5>
                        <Link to="/shop" className="btn btn-primary py-3 px-4 fw-bold text-light">Shop Now</Link>
                    </div>

                </Container>

            </div>
            
        </>
    );
}