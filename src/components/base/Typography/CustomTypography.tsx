import {Typography as MuiTypography} from "@mui/material";

export default function CustomTypography({children, ...rest}: any) {
    return <MuiTypography {...rest}>{children}</MuiTypography>
}