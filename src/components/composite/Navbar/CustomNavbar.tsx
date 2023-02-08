import {AppBar, Avatar, Box, IconButton, Menu, MenuItem} from "@mui/material";
import React from "react";
import CustomTypography from "../../base/Typography/CustomTypography";
import {ProfileContext} from "../../../providers/ProfileProvider";
import {useRouter} from "next/router"
import useAuth from "../../../hooks/UseAuth";

export function CustomNavbar({children}: any) {
    const {user} = React.useContext(ProfileContext);
    const [anchorProfileMenu, setAnchorProfileMenu] = React.useState<HTMLElement | null>(null);
    const router = useRouter();
    const {logout} = useAuth();
    return <AppBar position="static" sx={{
        padding: "12px"
    }}>
        <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <CustomTypography variant="h6" component="div">
                Template - NextJS
            </CustomTypography>
            {children}
            <IconButton onClick={(e) => setAnchorProfileMenu(e.currentTarget)}>
                <Avatar>
                    {user?.name && user.name[0]}
                </Avatar>
            </IconButton>
            <Menu open={!!anchorProfileMenu}
                  onClose={() => setAnchorProfileMenu(null)}
                  anchorEl={anchorProfileMenu}
                  elevation={0}
                  anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                  }}
                  transformOrigin={{
                      vertical: -50,
                      horizontal: 'right',
                  }}>
                <MenuItem onClick={async () => {
                    setAnchorProfileMenu(null);
                    await router.push("/")
                }}>Profile</MenuItem>
                <MenuItem onClick={async () => {
                    setAnchorProfileMenu(null);
                    await logout()
                    await router.push("/auth")
                }}>Logout</MenuItem>
            </Menu>
        </Box>
    </AppBar>
}