"use client"
import { useAppDispatch, useAppSelector } from "@/store"
import { UserType, selectUser } from "@/store/features/userSlice"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Dashboard(){
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(true)
    const user: UserType = useAppSelector(selectUser)
    
    useEffect(() => {
        if(user && !user.accessToken){
            router.push("/auth/login")
        }
        
        setTimeout(() => {
            axios.get("localhost:3005/tasks", {headers: {Authorization: `Bearer ${user.accessToken}`}}).then(res => {
                console.log(res)
                setLoading(false)
            }).catch(err => {
                console.log(err)
            })

        }, 1500)
    }, [user])
    return (
        <div className="flex flex-row w-full h-full flex-wrap">
                <div className="flex w-full h-[8vh] bg-red-500"></div>
                <div className="flex md:w-[250px] md:h-[calc(100vh-8vh)] bg-green-700">

                </div>
                <div className="flex md:w-[calc(100vw-250px)] md:h-[92vh] bg-blue-600">
                    dashboard {user && user.username}
                </div>
            </div>
    )
}