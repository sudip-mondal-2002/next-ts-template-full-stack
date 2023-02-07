import CustomContainer from "../../base/Container/CustomContainer";
import CustomTextField from "../../base/TextField/CustomTextField";
import CustomButton from "../../base/Button/CustomButton";
import React from "react";
import useAuth from "../../../hooks/UseAuth";
import {useRouter} from "next/router";

export default function SignupContainer() {
    const [name, setName] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [confirmPassword, setConfirmPassword] = React.useState<string>("");
    const {signup} = useAuth();
    const router = useRouter();
    return <CustomContainer sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "fit-content"
    }}>
        <CustomTextField
            label={"Name"} value={name} required={true}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}/>
        <CustomTextField
            label={"Email"} value={email} type={"email"} required={true}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}/>
        <CustomTextField
            label={"Password"} type={"password"} value={password} required={true}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}/>
        <CustomTextField
            label={"Confirm Password"} type={"password"} value={confirmPassword} required={true}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}/>
        <CustomButton disabled={!email || !password || !name || !confirmPassword || confirmPassword != password} sx={{
            marginTop: "24px",
        }} onClick={async () => {
            const user = await signup(email, password, name)
            if (user) await router.push("/")
        }}>Sign up</CustomButton>
    </CustomContainer>
}