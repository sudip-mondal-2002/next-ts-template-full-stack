import React from "react";
import {Card} from "@mui/material";

export default function CustomCard({children, sx, ...props}: any) {
    return (
        <Card {...props} sx={{
            padding: "24px",
            borderRadius: "8px",
            boxShadow: "0px 0px 8px 0px rgba(0,0,0,0.2)",
            ...sx
        }}>
            {children}
        </Card>
    )
}