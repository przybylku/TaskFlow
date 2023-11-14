import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useNavigation, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { UserType, selectUser, setUser, updateUser } from "../../store/features/userSlice";
import { ArrowDownToDot, Folder, HomeIcon, Inbox } from "lucide-react";
import { DashboardTasks } from "./DashboardTasks";
import { Button, CircularProgress, DialogContent, DialogTitle, Input, Modal, ModalDialog, Option, Select } from "@mui/joy";
import { useForm } from "react-hook-form";
import React from 'react'
import ApiClient from "../../lib/ApiInstance";
export type Inputs = {
    name: string,
    type: "Lista" | "Tabela"
}
export type TaskInputs = {
    title: string,
    description: string
}

export function Dashboard(){
    const router = useNavigate()
    const path = useLocation()
    let [params, setParams] = useSearchParams()
    let _params: string | null = params.get('id')
    let _name: string | null = params.get('name')
    let [id, setId] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(true)
    const [modalLoading, setModalLoading] = useState<boolean>(false)
    const user: UserType = useAppSelector(selectUser)
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [modalTaskOpen, setModalTaskOpen] = useState<boolean>(false)
    const [_refresh, setRefresh] = useState<string>("")
    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors },
      } = useForm<Inputs>();
      const {
        register: registerTask,
        handleSubmit: handleSubmitTask,
        formState: { errors: errorsTask },
      } = useForm<TaskInputs>();
    const userDispatch = useAppDispatch()
    useEffect(() => {
        console.log(user)
        if(user && !user.accessToken){
            router("/login")
        }
        
    }, [user, path.pathname, router])
    const onSubmitModal = (data: Inputs) => {
        setModalLoading(true)
        setTimeout(() => {
            ApiClient.getInstance().post({url: "board", token: user.accessToken, data: data}).then((res) => {
                console.log(res)
                setModalLoading(false)
                ApiClient.getInstance().get({url: "user", token: user.accessToken}).then((res) => {
                    userDispatch(updateUser(res.data))
                })
                setModalOpen(false)
                router(`/dashboard?id=${res.data._id}`)
            })
        }, 1500)
    }
    const onSubmitModalTask = (data: TaskInputs) => {
        ApiClient.getInstance().post({url: `tasks/${_params}`, token: user.accessToken, data: {...data, priority: 0, status: 0}}).then((res) => {
            console.log(res)
            setModalTaskOpen(false)
            router(`/dashboard?id=${_params}&refresh=true`)
            setRefresh(res.data?._id)
        })
    }
    return (
        <>
            <div className="flex flex-row w-full h-full flex-wrap">
                <div className="flex w-full h-[8vh] bg-red-500"></div>
                <div className="flex flex-row flex-nowrap">
                <div className="flex md:w-[250px] py-4 md:h-[calc(100vh-8vh)] bg-primary-foreground flex-col items-center">
                    <ol className="px-4">
                        <li className="flex flex-row pt-2"><HomeIcon className="mr-2" size={20}/>  Strona główna</li>
                        <li className="flex flex-row py-2"><Inbox className="mr-2" size={20}/> Skrzynka odbiorcza</li>
                    </ol>
                    <div className="w-[calc(100%-20px)] px-4 border-t-gray-400 border-t-1 h-[2px]"></div>
                    <ol>
                        {user.Board.map((board) => {
                            return <li className="flex flex-row py-2"><Link className="flex flex-row" to={`/dashboard?id=${board._id}&name=${board.name}`}><Folder className="mr-2" size={20}/> {board.name}</Link></li>
                        })}
                        {/* <li><Link href={`dashboard?id=${user.Board._id}`}>{user.Board.name}</Link></li> */}
                        <li className="flex flex-row py-2" onClick={() => setModalOpen(true)}><ArrowDownToDot/> Nowy</li>
                    </ol>
                </div>
                <div className="flex w-[calc(100vw-250px)] md:w-[calc(100vw-250px)] md:h-[92vh] h-[92vh] bg-white border-l-2">
                        <DashboardTasks name={_name ? _name : ""} params={_params} openTaskModal={() => setModalTaskOpen(true)} refresh={_refresh}/> 
                </div></div>
            </div>
            {/* MODAL DO TWORZENIA PROJEKTU */}
            <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                        <ModalDialog>
                            <DialogTitle>
                                Stwórz nowy projekt
                            </DialogTitle>
                            <DialogContent>
                                Wypełnij informacje o nowym projekcie
                            </DialogContent>
                            { !modalLoading ? <form onSubmit={handleSubmit(onSubmitModal)}>
                                <label htmlFor="name" className="mt-2">Nazwa</label>
                                <Input {...register("name", {required: true})} />
                                <Button type="submit" style={{float: "right", marginTop: "10px"}} color="success">Stwórz</Button>
                            </form> : <div className="flex flex-col w-full h-full justify-center items-center">
                                <CircularProgress size="lg" variant="plain"></CircularProgress>
                                </div>}
                        </ModalDialog>
            </Modal>
            {/* MODAL DO TWORZENIA ZADANIA */}
            <Modal open={modalTaskOpen} onClose={() => setModalTaskOpen(false)}>
                        <ModalDialog>
                            <DialogTitle>
                                Stwórz nowy zadanie
                            </DialogTitle>
                            <DialogContent>
                                Wypełnij informacje o nowym zadaniu
                            </DialogContent>
                            { !modalLoading ? <form onSubmit={handleSubmitTask(onSubmitModalTask)}>
                                <label htmlFor="name" className="mt-2">Nazwa</label>
                                <Input {...registerTask("title", {required: true})} />
                                <label htmlFor="name" className="mt-2">Opis</label>
                                <Input {...registerTask("description", {required: true})} />
                                <Button type="submit" style={{float: "right", marginTop: "10px"}} color="success">Stwórz</Button>
                            </form> : <div className="flex flex-col w-full h-full justify-center items-center">
                                <CircularProgress size="lg" variant="plain"></CircularProgress>
                                </div>}
                        </ModalDialog>
            </Modal>
        </>
    )
}