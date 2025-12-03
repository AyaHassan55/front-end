
import { Container } from "react-bootstrap";
import "./home.css"
import Landing from "../Landing/Landing";
import ShowTopRated from "../../../Components/Product/TopRated/ShowTopRated";
import ShowLatestProduct from "../../../Components/Product/LatestProducts/ShowLatestProduct";
import LatestSaleProducts from "../../../Components/Product/SaleProducts/LatestSaleProduct";
import BeforeTopRated from "../../../Components/Website/BeforeTopRated/BeforeTopRated";

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
      <BeforeTopRated />
      <Container className="">
        <div className="d-flex align-items-start flex-wrap mt-5 mb-4 ">
          <ShowTopRated  style={{ width: "45%" }}/>
          <ShowLatestProduct  style={{ width: "45%", marginRight:'12px'}} />
        </div>


        
      </Container>
    </div>


  );
}
