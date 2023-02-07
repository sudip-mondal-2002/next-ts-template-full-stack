import React from "react";
import {UserResponseDTO} from "../dto/User/UserResponse";
import useSnackbar from "../hooks/UseSnackbar";

export const ProfileContext = React.createContext<any>({
    user: null,
    setUser: () => {
    }
});

export function ProfileProvider({children}: any) {
    const [user, setUser] = React.useState<UserResponseDTO | null>(null);
    return (
        <ProfileContext.Provider value={{user, setUser}}>
            {children}
        </ProfileContext.Provider>
    );
}