import Quote from "./Quote.tsx";
import InputBox from "./InputBox.tsx";
import {useSetRecoilState} from "recoil";
import authAtom from "../atoms/authAtom.ts";
import {useState} from "react";
import {SigninInput} from "@100xdevs/medium-common";

export default function Signin() {

    const setAuthScreen = useSetRecoilState(authAtom);
    const [inputs, setInputs] = useState<SigninInput>({
        username: "",
        password: "",
    });

    const handleSignin = async () => {
        console.log(inputs)
    }
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
                        <InputBox label="Email" placeholder="example@gmail.com" onChange={(e) => {
                            setInputs({...inputs, username: e.target.value})
                        }}/>
                        <InputBox label="Password" placeholder="123456" onChange={(e) => {
                            setInputs({...inputs, password: e.target.value})
                        }}/>
                        <button type="button" onClick={handleSignin}
                                className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Sign
                            In
                        </button>
                    </div>
                    {/*</div>*/}
                </div>
            </div>

            <Quote/>

        </div>
    )
}
