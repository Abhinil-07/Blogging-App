import Quote from "./Quote.tsx";
import InputBox from "./InputBox.tsx";
import { useSetRecoilState } from "recoil";
import authAtom from "../atoms/authAtom.ts";
import { useState } from "react";
import { SigninInput } from "@100xdevs/medium-common";
import Button from "./Button.tsx";
import axios from "axios";
import { BACKEND_URL } from "../config.ts";
import userAtom from "../atoms/userAtom.ts";

export default function Signin() {
  const setAuthScreen = useSetRecoilState(authAtom);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState<SigninInput>({
    username: "",
    password: "",
  });
  const setUser = useSetRecoilState(userAtom);

  const handleSignin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/signin`,
        inputs,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response);
      localStorage.setItem("user-threads", JSON.stringify(response.data.user));
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
            Login to your account
          </div>
          <div className="text-slate-500 text-center">
            Don't have an account?
            <button
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                setAuthScreen("signup");
              }}
              className="pointer underline pl-1 cursor-pointer"
            >
              Signup
            </button>
          </div>

          <div className="pt-8">
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
              btnText={"Sign In"}
              onclick={handleSignin}
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
