import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useNavigation, useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../store";
import { UserType, selectUser } from "../../store/features/userSlice";
import { ArrowDownToDot, Folder, HomeIcon, Inbox } from "lucide-react";
import { DashboardTasks } from "./DashboardTasks";
import { DialogContent, DialogTitle, Input, Modal, ModalDialog, Option, Select } from "@mui/joy";
import { useForm } from "react-hook-form";
import React from 'react'
export type Inputs = {
    name: string,
    type: "Lista" | "Tabela"
}

export function Dashboard(){
    const router = useNavigate()
    const path = useLocation()
    let [params, setParams] = useSearchParams()
    let _params: string | null = params.get('id')
    let [id, setId] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(true)
    const user: UserType = useAppSelector(selectUser)
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors },
      } = useForm<Inputs>();
    useEffect(() => {
        console.log(user)
        if(user && !user.accessToken){
            router("/auth/login")
        }
    }, [user, path.pathname])
    const onSubmitModal = (data: Inputs) => {

    }
    const ModalSelect = React.forwardRef(({onChange, onBlur, name, label}, ref) => (
        <>
            <label>{label}</label>
            {/* <Select defaultValue={"Lista"} name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
                <Option value="Lista">Lista</Option>
                <Option value="Tablica">Tablica</Option>
            </Select> */}
        </>
    ))
    return (
        <>
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
                            return <li className="flex flex-row py-2"><Link className="flex flex-row" to={`/dashboard?id=${board._id}`}><Folder className="mr-2" size={20}/> {board.name}</Link></li>
                        })}
                        {/* <li><Link href={`dashboard?id=${user.Board._id}`}>{user.Board.name}</Link></li> */}
                        <li className="flex flex-row py-2" onClick={() => setModalOpen(true)}><ArrowDownToDot/> Nowy</li>
                    </ol>
                </div>
                <div className="flex w-[calc(100vw-250px)] md:w-[calc(100vw-250px)] md:h-[92vh] h-[92vh] bg-white border-l-2">
                        <DashboardTasks params={_params}/> 
                </div>
            </div>
            <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                        <ModalDialog>
                            <DialogTitle>
                                Stwórz nowy projekt
                            </DialogTitle>
                            <DialogContent>
                                Wypełnij informacje o nowym projekcie
                            </DialogContent>
                            <form onSubmit={handleSubmit(onSubmitModal)}>
                                <label htmlFor="name" className="mt-2">Nazwa</label>
                                <Input {...register("name", {required: true})} />
                                <ModalSelect {...register("type", {required: true})}/>
                            </form>
                        </ModalDialog>
            </Modal>
        </>
    )
}