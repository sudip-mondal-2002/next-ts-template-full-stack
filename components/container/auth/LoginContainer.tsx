import CustomContainer from "../../base/Container/CustomContainer";
import CustomTextField from "../../base/TextField/CustomTextField";
import CustomButton from "../../base/Button/CustomButton";
import React from "react";
import useAuth from "../../../hooks/UseAuth";
import {useRouter} from "next/router";

export default function LoginContainer() {
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const {login} = useAuth();
    const router = useRouter();
    return <CustomContainer sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "fit-content"
    }}>
        <CustomTextField
            label={"Email"} value={email} type={"email"} required={true}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}/>
        <CustomTextField
            label={"Password"} type={"password"} value={password} required={true}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}/>
        <CustomButton disabled={!email || !password} sx={{
            marginTop: "24px",
        }} onClick={async () => {
            const user = await login(email, password)
            if (user) await router.push("/")
        }}>Sign in</CustomButton>
    </CustomContainer>
}