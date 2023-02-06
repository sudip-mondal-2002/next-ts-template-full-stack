import CustomContainer from "../../base/Container/CustomContainer";
import React from "react";
import {Box, Tab, Tabs} from "@mui/material";
import CustomTypography from "../../base/Typography/CustomTypography";
import LoginContainer from "./LoginContainer";
import SignupContainer from "./SignupContainer";
import useSnackbar from "../../../hooks/UseSnackbar";

export function AuthContainer() {
    const [status, setStatus] = React.useState<"login" | "signup">("login");
    const handleTabChange = (event: React.SyntheticEvent, newValue: "login" | "signup") => {
        setStatus(newValue);
    }
    return <CustomContainer sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "fit-content"
    }}>
        <CustomTypography fontSize={"48px"}>
            {status === "login" ? "Sign in" : "Sign up"}
        </CustomTypography>
        <Tabs value={status} onChange={handleTabChange}>
            <Tab label="Login" value={"login"}/>
            <Tab label="Sign Up" value={"signup"}/>
        </Tabs>
        {status === "login" ? <LoginContainer/> : <SignupContainer/>}
        <Box sx={{
            marginTop: "24px",
            border: "1px solid #00F",
            width: "398px",
        }}/>
        {status === "login" ?
            <CustomTypography fontSize={"12px"} sx={{
                marginTop: "12px"
            }}>
                Don&apos;t have an account? <span style={{color: "#00F", cursor: "pointer"}}
                                                  onClick={() => setStatus("signup")}>Sign up</span>
            </CustomTypography>
            : <CustomTypography fontSize={"12px"} sx={{
                marginTop: "12px",
            }}>
                Already have an account? <span style={{color: "#00F", cursor: "pointer"}}
                                               onClick={() => setStatus("login")}>Sign in</span>
            </CustomTypography>
        }
    </CustomContainer>
}