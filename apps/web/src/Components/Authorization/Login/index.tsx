import { Link } from "@mui/joy";
import { LoginForm } from "./LoginForm";
import {Link as LucideLink} from 'lucide-react'
export default function Login(){
    return (
        <>
        <div className="flex flex-row h-[100vh]">
            <div className="md:flex w-1/2 hidden bg-primary"></div>
            <div className="flex flex-col justify-center items-center align-middle md:w-1/2 w-full">
                <h1 className="text-[2rem]">Zaloguj się na konto!</h1>
                <p>Wpisz swoje dane logowania</p>
                <LoginForm/>
                <p>Jeśli nie masz konta <Link underline="hover" href={'/register'}> <LucideLink size={15} className="mr-1" />  Zarejestruj się</Link></p>
            </div>
        </div>
        </>
    )
}