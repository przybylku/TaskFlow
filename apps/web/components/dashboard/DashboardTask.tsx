

export default function DashboardTasks({id}){

    return (
        <>
            <div className="flex flex-row w-full h-full justify-center items-center"><h1 className="text-[2rem] font-semibold">Nie wybrano projektu</h1></div>
            {id && <div className="flex flex-row w-full h-full justify-center items-center"><h1 className="text-[2rem] font-semibold">Wybrano projekt {id}</h1></div>}       
        </>
    )
}