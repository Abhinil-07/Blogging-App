import axios from "axios";
import Button from "../Components/Button";
import { BACKEND_URL } from "../config";
import { useRecoilValue, useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import { useState } from "react";

export default function Dashboard() {
  const setUser = useSetRecoilState(userAtom);
  const [loading, setLoading] = useState(false);
  const user = useRecoilValue(userAtom);
  const handleLogout = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      localStorage.removeItem("user-info");
      setUser(null);
      console.log("from logout" + JSON.stringify(user));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="shadow flex justify-between items-center">
      <div className="flex flex-col justify-center items-center ml-4">
        PayTM App
      </div>
      <div className="justify-center items-center flex">
        <Button btnText={"Logout"} onclick={handleLogout} loading={loading} />
      </div>
    </div>
  );
}
