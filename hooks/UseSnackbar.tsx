import React from "react";
import {SnackbarContext} from "../providers/SnackbarProvider";

export default function useSnackbar() {
    const {openSnackBar} = React.useContext(SnackbarContext);

    const openErrorSnackBar = (message: string) => {
        openSnackBar(message, "error");
    }

    const openSuccessSnackBar = (message: string) => {
        openSnackBar(message, "success");
    }

    const openInfoSnackBar = (message: string) => {
        openSnackBar(message, "info");
    }

    const openWarningSnackBar = (message: string) => {
        openSnackBar(message, "warning");
    }
    return {openErrorSnackBar, openSuccessSnackBar, openInfoSnackBar, openWarningSnackBar}
}