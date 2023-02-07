import axios from "axios";
import {UserResponseDTO} from "../dto/User/UserResponse";
import {ProfileContext} from "../providers/ProfileProvider";
import React from "react";
import useSnackbar from "./UseSnackbar";
import {CustomErrorResponseUnit} from "../errors/api";

export default function useAuth() {
    const {setUser} = React.useContext(ProfileContext);
    const {openErrorSnackBar} = useSnackbar();
    const login = async (email: string, password: string): Promise<UserResponseDTO | null> => {
        try {
            const response = await axios.post("/api/auth/login", {email, password})
            setUser(response.data);
            return response.data as UserResponseDTO;
        } catch (e: any) {
            e?.response?.data?.length ?
                e.response.data.forEach((error: CustomErrorResponseUnit) => openErrorSnackBar(error.message))
                : openErrorSnackBar("Something went wrong");
        }
        return null;
    }
    const signup = async (email: string, password: string, name: string): Promise<UserResponseDTO | null> => {
        try {
            const response = await axios.post("/api/auth/signup", {email, password, name})
            setUser(response.data);
            return response.data as UserResponseDTO;
        } catch (e: any) {
            e?.response?.data?.length ?
                e.response.data.forEach((error: CustomErrorResponseUnit) => openErrorSnackBar(error.message))
                : openErrorSnackBar("Something went wrong");
        }
        return null;
    }

    const logout = async () => {
        setUser(undefined);
        await axios.get("/api/auth/logout");
    }

    const resetPassword = async (password: string, token:string) => {
        try {
            await axios.put("/api/auth/reset-password", {password, token});
        } catch (e: any) {
            e?.response?.data?.length ?
                e.response.data.forEach((error: CustomErrorResponseUnit) => openErrorSnackBar(error.message))
                : openErrorSnackBar("Something went wrong");
        }
    }
    return {login, signup, logout, resetPassword}
}