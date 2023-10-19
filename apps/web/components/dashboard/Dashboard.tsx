"use client"
import { useAppDispatch, useAppSelector } from "@/store"
import { UserType, selectUser } from "@/store/features/userSlice"
import axios from "axios"
import { HomeIcon, Inbox } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
// const cookies from 'next/'
import DashboardTasks from "./DashboardTask"

export default function Dashboard(){
    const router = useRouter()
    let [id, setId] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(true)
    const user: UserType = useAppSelector(selectUser)
    
    useEffect(() => {
        console.log(user)
        if(user && !user.accessToken){
            router.push("/auth/login")
        }
        // const params = path.split("/")
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
                <div className="flex md:w-[250px] py-4 md:h-[calc(100vh-8vh)] bg-primary-foreground flex-col items-center">
                    <ol className="px-4">
                        <li className="flex flex-row pt-2"><HomeIcon className="mr-2" size={20}/>  Strona główna</li>
                        <li className="flex flex-row py-2"><Inbox className="mr-2" size={20}/> Skrzynka odbiorcza</li>
                    </ol>
                    <div className="w-[calc(100%-20px)] px-4 border-t-gray-400 border-t-1 h-[2px]"></div>
                    <ol>
                        <li><Link href={`dashboard?id=${user.Board}`} onClick={() => setId(user.Board)}>{user.Board}</Link></li>
                    </ol>
                </div>
                <div className="flex w-[calc(100vw-250px)] md:w-[calc(100vw-250px)] md:h-[92vh] h-[92vh] bg-blue-600">
                    {id === "" ? <>
                    <div className="flex flex-row w-full h-full justify-center items-center"><h1 className="text-[2rem] font-semibold">Nie wybrano projektu</h1></div>
                    </> : <>
                        <DashboardTasks id={id}/> 
                        </>}
                </div>
            </div>
    )
}