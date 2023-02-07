import {TextField} from "@mui/material";
import Typography from "../Typography/CustomTypography";

export default function CustomTextField({sx, label, ...rest}: any) {
    return <><Typography
        marginTop={"20px"}
        marginBottom={"4px"}
        fontWeight={500}
        fontSize={"16px"}
        width={"400px"}
        lineHeight={24 / 16}>
        {label} {rest.required && <span style={{color: "red"}}>*</span>}
    </Typography>
        <TextField
            sx={{
                width: "400px",
                height: "56px",
                ...sx
            }}
            {...rest} />
    </>
}