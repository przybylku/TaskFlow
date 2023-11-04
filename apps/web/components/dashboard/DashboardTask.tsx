"use client"
import { useAppSelector } from "@/store";
import { UserType, selectUser } from "@/store/features/userSlice";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
  } from "@nextui-org/table";
import axios from "axios";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import {Spinner} from '@nextui-org/spinner'
type data = {
    board: string,
    comments: string[],
    createdAt: string,
    description: string,
    priority: string,
    status: string,
    title: string,
    updatedAt: string,
    __v: number,
    _id: string,
}

export default function DashboardTasks({id}){
    const [data, setData] = useState<data[] | null>()
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>('')
    const user: UserType = useAppSelector(selectUser)
    const {toast} = useToast()
    useEffect(() => {
        if(!id) return;
        setTimeout(() => {
            axios.get(`http://localhost:3005/tasks/${id}`, {headers: {"Authorization": `Bearer ${user.accessToken}`}}).then((data) => {
                console.log(data)
                setData(data.data)
                toast({
                    title: "Dane załadowane",
                    description: "Twoje zdania są gotowe!"
                })
            }).then(() => {
                setLoading(false)
                
            }).catch(() => {
                setLoading(false)
                toast({
                    title: "Błąd pobrania zadań",
                    description: "Spróbuj ponownie lub skontaktuj się z administratorem",
                    variant: "destructive"
                })
            })
        }, 5000)
    }, [id])
    return (
        <>
            {id ? <>
                <div className="flex flex-col w-full h-full">
                    <div className="">
                    {loading ? <Spinner label="loading"/> : <>
                        <Table>
                            <TableHeader>
                                <TableColumn>NAME</TableColumn>
                                <TableColumn>utworzony</TableColumn>
                            </TableHeader>
                            <TableBody>
                                {data?.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{item.title}</TableCell>
                                            <TableCell>{item.createdAt}</TableCell>
                                        </TableRow>
                                )) as any}
                            </TableBody>
                        </Table>
                    </>}
                    
                    </div>  
                </div>
            </> : <div className="flex flex-row w-full h-full justify-center items-center"><h1 className="text-[2rem] font-semibold">Nie wybrano projektu</h1></div>}       
        </>
    )
}