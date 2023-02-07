import {ProfileContainer} from "../components/container/profile/ProfileContainer";
import {NextPageContext} from "next";
import {CurrentUserController} from "../controllers/user/CurrentUser";
import {UserResponseDTO} from "../dto/User/UserResponse";
import React from "react";
import {ProfileContext} from "../providers/ProfileProvider";
import axios from "axios";

export default function Home({user}: { user: UserResponseDTO }) {
    const {setUser} = React.useContext(ProfileContext);
    React.useEffect(() => {
        if(user) {
            setUser(user);
        } else {

        }
    }, [setUser, user]);
    return (<ProfileContainer/>)
}

Home.getInitialProps = async (ctx: NextPageContext) => {
    const isServer = typeof window === "undefined";
    if(!isServer) {
        try{
            const response = await axios.get("/api/user");
            return {user: response.data};
        } catch (e: any) {
            ctx.res?.writeHead(302, {
                Location: "/auth"
            });
            ctx.res?.end();
            return {
                user: null
            }
        }
    }
    const cookies: any = ctx.req?.headers.cookie?.split(";").map(cookie => cookie.split("=")).reduce((acc, [key, value]) => ({
        ...acc,
        [key.trim()]: value
    }), {});
    const token = cookies?.token;
    if (!token) {
        ctx.res?.writeHead(302, {
            Location: "/auth"
        });
        ctx.res?.end();
        return {
            user: null
        }
    }
    const user = await CurrentUserController(token);
    return {
        user
    }
}