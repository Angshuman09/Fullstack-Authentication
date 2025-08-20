import { createContext, useEffect, useState } from "react";
import {toast} from 'react-toastify';
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = (props) =>{

    axios.defaults.withCredentials = true;

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);

    const getAuthState = async ()=>{
        try {
            const {data} = await axios.get(backendUrl + '/api/auth/isAuth');
            if(data.success){
                setIsLoggedIn(true);
                await getUserData();
            }else {
                // Explicitly set to false if not authenticated
                setIsLoggedIn(false);
                setUserData(null);
            }

        } catch (error) {
            if (error.response?.status === 403) {
            // User is not authenticated - this is normal, not an error to show
            setIsLoggedIn(false);
            setUserData(null);
        } else {
            // This is an actual error (network, server, etc.)
            toast.error("Failed to check authentication status");
            console.error("Auth check error:", error);
        }
        }
    }

    const getUserData = async ()=>{
        try {
            const {data} = await axios.get(backendUrl+'/api/user/data');
            data.success? setUserData(data.userData) : toast.error(data.message); 
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(()=>{
        getAuthState();
    },[]);
    
    const value = {
        backendUrl,
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
        getUserData
    }

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;