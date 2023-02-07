import {Button} from "@mui/material";

export default function CustomButton({children, sx, ...rest}: any) {
    return <Button
        variant={"contained"}
        disableElevation={true}
        sx={{
            borderRadius: "8px",
            textTransform: "unset",
            backgroundColor: "#1A56DB",
            color: "#FFFFFF",
            width: "400px",
            height: "56px",
            marginTop: "20px",
            ...sx
        }} {...rest}>
        {children}
    </Button>
}