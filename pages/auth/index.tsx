import React from "react";
import {AuthContainer} from "../../components/container/auth/AuthContainer";
import {NextPageContext} from "next";

export default function AuthPage() {
    return <AuthContainer/>
}

export const getServerSideProps = async (ctx: NextPageContext) => {
    const cookies: any = ctx.req?.headers.cookie?.split(";").map(cookie => cookie.split("=")).reduce((acc, [key, value]) => ({
        ...acc,
        [key.trim()]: value
    }), {});
    const token = cookies?.token;
    if (!token) {
        return {props: {}}
    }
    ctx.res?.writeHead(302, {
        Location: "/"
    });
    ctx.res?.end();
    return {
        props: {
            token
        }
    };
}