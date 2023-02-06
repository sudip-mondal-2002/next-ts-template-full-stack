import {ProfileContainer} from "../components/container/profile/ProfileContainer";
import {NextPageContext} from "next";
import {CurrentUserController} from "../controllers/auth/currentUser";
import {UserResponseDTO} from "../dto/User/UserResponse";
import React from "react";
import {ProfileContext} from "../providers/ProfileProvider";

export default function Home({user}: { user: UserResponseDTO }) {
    const {setUser} = React.useContext(ProfileContext);
    React.useEffect(() => {
        setUser(user);
    }, [setUser, user]);
    return (<ProfileContainer/>)
}

export const getServerSideProps = async (ctx: NextPageContext) => {
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
            props: {}
        }
    }
    const user = await CurrentUserController(token);
    return {
        props: {
            user
        }
    }
}