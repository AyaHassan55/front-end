import { LOGOUT } from "../../Api/Api";
import { Axios } from "../../Api/Axios";
import Cookie from "cookie-universal";

const cookies = Cookie();

export default function Home() {
   async function handleLogOut() {
      try{
        const res = await Axios.get(`/${LOGOUT}`);
        cookies.remove('e-commerce');
        window.location.pathname = '/login';
      }catch(err){
        console.log(err);
      }
      
    }
  return (
    <div className="App">
      <header className="App-header">
        <h3>Hello</h3>
        <button onClick={handleLogOut}>LogOut</button>
      </header>
    </div>
  );
}
