import CustomContainer from "../../base/Container/CustomContainer";
import React from "react";
import CustomTypography from "../../base/Typography/CustomTypography";
import CustomTextField from "../../base/TextField/CustomTextField";
import CustomButton from "../../base/Button/CustomButton";
import {useRouter} from "next/router";
import useAuth from "../../../hooks/UseAuth";

export function ResetPasswordContainer() {
    const [password, setPassword] = React.useState("");
    const router = useRouter();
    const {resetPassword} = useAuth();
    return <CustomContainer sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "fit-content"
    }}>
        <CustomTypography fontSize={"48px"}>
            Reset Password
        </CustomTypography>
        <CustomContainer sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "fit-content"
        }}>
            <CustomTextField
                label={"New Password"} value={password} type={"email"} required={true}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}/>
            <CustomButton disabled={!password} sx={{
                marginTop: "24px",
            }} onClick={async () => {
                await resetPassword(password, router.query.token as string)
            }}>Reset Password</CustomButton>
        </CustomContainer>
    </CustomContainer>
}