import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";
import image from "../assets/medium.png";
import { useRecoilValue, useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import { useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

export const Appbar = () => {
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
    <div className="border-b flex justify-between px-10 py-4">
      <div className="flex justify-center items-center space-x-2">
        <img className="h-[30px] w-[30px]" src={image} alt="" />
        <Link
          to={"/blogs"}
          className="flex flex-col justify-center cursor-pointer"
        >
          Medium
        </Link>
      </div>

      <div className="flex">
        <Link to={`/publish`}>
          <button
            type="button"
            className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 "
          >
            New
          </button>
        </Link>
        <button
          onClick={handleLogout}
          type="button"
          className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 "
        >
          Logout
        </button>

        <Avatar size={"big"} name={user.name} />
      </div>
    </div>
  );
};
