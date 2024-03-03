import {useRecoilValue} from "recoil";
import authAtom from "../atoms/authAtom.ts";
import Signin from "../Components/Signin.tsx";
import Signup from "../Components/Signup.tsx";

const Auth = () => {
    const authState = useRecoilValue(authAtom);
    return <>{authState === "login" ? <Signin /> : <Signup />}</>;
};

export default Auth;