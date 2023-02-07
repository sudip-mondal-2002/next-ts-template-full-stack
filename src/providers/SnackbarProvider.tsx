import React from "react";
import {Snackbar, Alert} from "@mui/material";

export type Alert = {
    message: string,
    severity: "error" | "success" | "info" | "warning",
    isOpen: boolean
}


export const SnackbarContext = React.createContext<any>(undefined);

export function SnackbarProvider({children}: any) {
    const [alert, setAlert] = React.useState<Alert | undefined>(undefined);

    const openSnackBar = (message: string, severity: "error" | "success" | "info" | "warning") => {
        setAlert({message, severity, isOpen: true});
    }
    React.useEffect(() => {
        if (alert?.isOpen) {
            setTimeout(() => {
                setAlert({...alert, isOpen: false});
            }, 3000);
        }
    }, [alert]);
    return (
        <SnackbarContext.Provider value={{openSnackBar}}>
            {children}
            <Snackbar open={alert?.isOpen}>
                <Alert severity={alert?.severity}>
                    {alert?.message}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
}