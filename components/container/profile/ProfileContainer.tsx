import CustomContainer from "../../base/Container/CustomContainer";
import React from "react";
import CustomTypography from "../../base/Typography/CustomTypography";
import CustomCard from "../../base/Card/CustomCard";
import {ProfileContext} from "../../../providers/ProfileProvider";
import {CustomNavbar} from "../../composite/Navbar/CustomNavbar";

export function ProfileContainer() {
    const {user} = React.useContext(ProfileContext);
    return <>
        <CustomNavbar/>
        <CustomContainer sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "fit-content",
            marginTop: "48px"
        }}>
            <CustomCard>
                <CustomTypography fontSize={"48px"}>
                    Profile
                </CustomTypography>
                <CustomTypography fontSize={"24px"}>
                    Name: {user?.name}
                </CustomTypography>
                <CustomTypography fontSize={"24px"}>
                    Email: {user?.email}
                </CustomTypography>
            </CustomCard>
        </CustomContainer>
    </>
}
