import { useEffect, useState } from "react"
import { UserType, selectUser } from "../../store/features/userSlice"
import { useAppSelector } from "../../store"
import ApiClient from "../../lib/ApiInstance"
import { CircularProgress, Typography } from "@mui/joy"
import { useCountUp } from 'use-count-up';

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


export function DashboardTasks({params}: {params: any}){

    const [data, setData] = useState<data[] | null>()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const user: UserType = useAppSelector(selectUser)
    
    const { value, reset } = useCountUp({
        isCounting: loading,
        duration: 2,
        start: 0,
        end: 100,
        easing: "easeOutCubic"
      });
    // Pobieranie danych o taskach
    useEffect(() => {
        
        if(!params) return;
        setLoading(true)
        setTimeout(() => {
            ApiClient.getInstance().get({url: `tasks/board/${params}`, token: user.accessToken}).then((data) => {
                setData(data.data)
                setLoading(false)
                reset()
            })
        }, 2000)
    }, [params])

    return (
         <>
            {params ? <>
                <div className={`flex flex-col w-full h-full ${loading == true ? "justify-center items-center" :  ""}`}>
                    <div className="">
                    {loading ? <><p className="text-center translate-x-[-25%] mb-3">Pobieranie danych</p><CircularProgress size="lg" variant="plain" determinate value={value as number}>
                                    <Typography>{value}%</Typography>
                                </CircularProgress></>: <>
                        <h1>{data?.map((item) => {
                            return (
                                <>
                                    <p>{item.title}</p>
                                </>
                            )
                        })}</h1>
                    </>}
                    
                    </div>  
                </div>
            </> : <div className="flex flex-row w-full h-full justify-center items-center"><h1 className="text-[2rem] font-semibold">Nie wybrano projektu</h1></div>}       
        </>
    )
}