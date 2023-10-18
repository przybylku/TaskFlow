import axios from "axios";
import { cookies } from "next/headers";
import { useEffect } from "react";

export default function useCookiedUser(){
    const cookie = cookies()
    useEffect(() => {
        if(!cookie.get("accessToken")){
            return;
        }
        axios.post("/api/user/refresh", {}, {headers: {
            Authorization: `Bearer ${cookie.get("accessToken")}`
        }}).then((data) => {
            cookie.set("accessToken", data.data.accessToken, {expires: new Date(Date.now() + data.data.expiresIn)})
        }).catch((e) => {
            cookie.delete("accessToken")
        })
    }, [cookie])
    
}