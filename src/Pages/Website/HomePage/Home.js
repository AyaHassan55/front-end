// import { LOGOUT } from "../../Api/Api";
// import { Axios } from "../../Api/Axios";
// import Cookie from "cookie-universal";

import { Container } from "react-bootstrap";
import NavBar from "../../../Components/Website/Navbar/Navbar";
import { Link } from "react-router-dom";
import "./home.css"
// const cookies = Cookie();

export default function HomePage() {
  //  async function handleLogOut() {
  //     try{
  //       const res = await Axios.get(`/${LOGOUT}`);
  //       cookies.remove('e-commerce');
  //       window.location.pathname = '/login';
  //     }catch(err){
  //       console.log(err);
  //     }

  //   }
  return (
    <div>
      <NavBar />
      <div className="d-flex align-items-center justify-content-center flex-wrap hand">
        <Container>
          <div className="col-lg-5 col-md-8 col-12 text-md-start text-center">
            <h1 className="display-2 fw-bold">Shampo Nice!</h1>
            <h5 className="fw-normal" style={{ color: 'grey' }}>Another Nice Thing Which is used by someone i don't know it's a random text</h5>
             <Link to= "/shop" className="btn btn-primary py-3 px-4 fw-bold text-light">Shop Now</Link>
          </div>

        </Container>

      </div>
    </div>


  );
}
