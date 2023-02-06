import axios from "axios";
import {UserResponseDTO} from "../dto/User/UserResponse";
import {ProfileContext} from "../providers/ProfileProvider";
import React from "react";
import useSnackbar from "./UseSnackbar";

export default function useAuth() {
    const {setUser} = React.useContext(ProfileContext);
    const {openErrorSnackBar} = useSnackbar();
    const login = async (email: string, password: string): Promise<UserResponseDTO | null> => {
        try {
            const response = await axios.post("/api/auth/login", {email, password})
            setUser(response.data);
            return response.data as UserResponseDTO;
        } catch (e: any) {
            openErrorSnackBar(e?.response?.data);
        }
        return null;
    }
    const signup = async (email: string, password: string, name: string): Promise<UserResponseDTO | null> => {
        try {
            const response = await axios.post("/api/auth/signup", {email, password, name})
            setUser(response.data);
            return response.data as UserResponseDTO;
        } catch (e: any) {
            openErrorSnackBar(e?.response?.data);
        }
        return null;
    }

    const logout = async () => {
        setUser(undefined);
        await axios.get("/api/auth/logout");
    }
    return {login, signup, logout}
}