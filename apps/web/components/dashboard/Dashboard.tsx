"use client"
import { useAppDispatch, useAppSelector } from "@/store"
import { UserType, selectUser } from "@/store/features/userSlice"
import axios from "axios"
import { Folder, HomeIcon, Inbox } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import DashboardTasks from "./DashboardTask"

export default function Dashboard(){
    const router = useRouter()
    const path = usePathname()
    let params = useSearchParams()
    let _params: string | null = params.get('id')
    const [loading, setLoading] = useState<boolean>(true)
    const user: UserType = useAppSelector(selectUser)
    
    useEffect(() => {
        if(user && !user.accessToken){
            router.push("/auth/login")
        }
        // const params = path.split("/")
    console.log(params)
        setTimeout(() => {
            axios.get("localhost:3005/tasks", {headers: {Authorization: `Bearer ${user.accessToken}`}}).then(res => {
                console.log(res)
                setLoading(false)
            }).catch(err => {
                console.log(err)
            })

        }, 1500)
    }, [user, path])
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
                        {user.Board.map((board) => {
                            return <li className="flex flex-row py-2"><Link className="flex flex-row" href={`dashboard?id=${board._id}`}><Folder className="mr-2" size={20}/> {board.name}</Link></li>
                        })}
                        {/* <li><Link href={`dashboard?id=${user.Board._id}`}>{user.Board.name}</Link></li> */}
                    </ol>
                </div>
                <div className="flex md:w-[calc(100vw-251px)] md:h-[92vh] bg-blue-600">
                        <DashboardTasks id={_params}/> 
                </div>
            </div>
    )
}