import type {AppProps} from 'next/app'
import {ProfileProvider} from "../providers/ProfileProvider";
import "../styles/global.css";
import React from "react";
import {ErrorBoundary} from "react-error-boundary";
import {SnackbarProvider} from "../providers/SnackbarProvider";

const ErrorFallback = ({error, resetErrorBoundary}: any) => {
    return (
        <div role="alert">
            <p>Something went wrong:</p>
            <pre>{error.message}</pre>
            <button onClick={resetErrorBoundary}>Try again</button>
        </div>
    )
}

export default function App({Component, pageProps}: AppProps) {
    return <ErrorBoundary FallbackComponent={ErrorFallback}>
        <SnackbarProvider>
            <ProfileProvider>
                <Component {...pageProps} />
            </ProfileProvider>
        </SnackbarProvider>
    </ErrorBoundary>
}
