import React from "react";
import {Container} from "@mui/material";

export default function CustomContainer({children, ...rest}: any) {
    return (
        <Container disableGutters={true} maxWidth={false} {...rest}>
            {children}
        </Container>
    )
}