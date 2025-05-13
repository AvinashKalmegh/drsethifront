import { useEffect, useState } from "react";
import MyContext from "./MyContext";

const MyProvider = ({ children }) => {
  // const api = "http://127.0.0.1:8000/api";
  // const imgapi = "http://127.0.0.1:8000";
  const api = "https://1-smarter.net/drsethi/api";
  const imgapi = "https://1-smarter.net"
  const tinyapikey = "6em4723eg99n02uwtef0vdlokdwvwwtdf2dseqru3znm925u";

  const [userName, setUserName] = useState("");
  const [adminid, setAdminId] = useState("");
  const [preview, setPreview] = useState("");

  useEffect(() => {
    let name = localStorage.getItem("firstName");
    setUserName(name);
    setAdminId(localStorage.getItem("adminid"));
  }, [userName]);

  useEffect(() => {
    async function fetchBanner() {
      try {
        const res = await fetch(`${api}/source-banner/`);
        const data = await res.json();
        if (data.image) {
          setPreview(`${imgapi}${data.image}`);
        }
      } catch (err) {
        console.error("Error fetching banner:", err);
      }
    }

    fetchBanner();
  }, []);

  return (
    <MyContext.Provider
      value={{
        api,
        userName,
        adminid,
        imgapi,
        tinyapikey,
        preview
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
export default MyProvider;
