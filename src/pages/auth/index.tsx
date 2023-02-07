import React from "react";
import {AuthContainer} from "../../components/container/auth/AuthContainer";
import {NextPageContext} from "next";

export default function AuthPage() {
    return <AuthContainer/>
}

AuthPage.getInitialProps = (ctx: NextPageContext) => {
    const cookies: any = ctx.req?.headers.cookie?.split(";").map(cookie => cookie.split("=")).reduce((acc, [key, value]) => ({
        ...acc,
        [key.trim()]: value
    }), {});
    const token = cookies?.token;
    if (!token) {
        return {token : null}
    }
    ctx.res?.writeHead(302, {
        Location: "/"
    });
    ctx.res?.end();
    return {
        token
    };
}