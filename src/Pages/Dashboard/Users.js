import { useEffect } from "react";
import { baseUrl, USERS } from "../../Api/Api";
import axios from "axios";
import Cookie from "cookie-universal";

export default function Users() {
  const cookie = new Cookie();
  useEffect(() => {
    axios
      .get(`${baseUrl}/${USERS}`, {
        headers: {
          Authorization: "Bearer " + cookie.get("e-commerce"),
        },
      })

      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }, []);
  return <div>Hi</div>;
}
