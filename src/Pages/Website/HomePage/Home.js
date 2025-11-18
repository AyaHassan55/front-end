// import { LOGOUT } from "../../Api/Api";
// import { Axios } from "../../Api/Axios";
// import Cookie from "cookie-universal";

import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./home.css"
import Landing from "../Landing/Landing";




import ShowTopRated from "../../../Components/Product/TopRated/ShowTopRated";
import ShowLatestProduct from "../../../Components/Product/LatestProducts/ShowLatestProduct";
import LatestSaleProducts from "../../../Components/Product/SaleProducts/LatestSaleProduct";

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


      <Landing />
      <LatestSaleProducts />
      <Container>
        <div className="d-flex align-items-start flex-wrap mt-5">
          <ShowTopRated/>
          <ShowLatestProduct />
        </div>
      </Container>
    </div>


  );
}
