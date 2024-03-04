import Quote from "./Quote.tsx";
import InputBox from "./InputBox.tsx";
import { useSetRecoilState } from "recoil";
import authAtom from "../atoms/authAtom.ts";
import { useState } from "react";
import { SignupInput } from "@100xdevs/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config.ts";
import userAtom from "../atoms/userAtom.ts";
import Button from "./Button.tsx";

export default function Signup() {
  const setAuthScreen = useSetRecoilState(authAtom);
  const [inputs, setInputs] = useState<SignupInput>({
    username: "",
    name: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const setUser = useSetRecoilState(userAtom);
  const handleSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/signup`,
        inputs,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response);
      localStorage.setItem("user-info", JSON.stringify(response.data.user));
      setUser(response.data.user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="h-screen flex items-center justify-center flex-col">
        <div className="flex flex-col w-[48%]">
          <div className="text-3xl font-extrabold text-center">
            Create an account
          </div>
          <div className="text-slate-500 text-center">
            Already have an account?
            <button
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                setAuthScreen("login");
              }}
              className="pointer underline pl-1 cursor-pointer"
            >
              Login
            </button>
          </div>

          <div className="pt-8">
            <InputBox
              label="Name"
              placeholder="John Doe"
              onChange={(e) => {
                setInputs({ ...inputs, name: e.target.value });
              }}
            />
            <InputBox
              label="Email"
              placeholder="example@gmail.com"
              onChange={(e) => {
                setInputs({ ...inputs, username: e.target.value });
              }}
            />
            <InputBox
              label="Password"
              placeholder="123456"
              onChange={(e) => {
                setInputs({ ...inputs, password: e.target.value });
              }}
            />

            <Button
              onclick={handleSignup}
              btnText={"Signup"}
              loading={loading}
            />
          </div>
          {/*</div>*/}
        </div>
      </div>

      <Quote />
    </div>
  );
}
