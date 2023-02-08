import CustomContainer from "../../base/Container/CustomContainer";
import React from "react";
import CustomTypography from "../../base/Typography/CustomTypography";
import CustomTextField from "../../base/TextField/CustomTextField";
import CustomButton from "../../base/Button/CustomButton";
import useAuth from "../../../hooks/UseAuth";

export function ResetPasswordRequestContainer() {
    const [email, setEmail] = React.useState("");
    const {resetPasswordRequest} = useAuth();
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
                label={"Email"} value={email} type={"email"} required={true}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}/>
            <CustomButton disabled={!email} sx={{
                marginTop: "24px",
            }} onClick={async () => {
                await resetPasswordRequest(email)
            }}>Reset Password</CustomButton>
        </CustomContainer>
    </CustomContainer>
}