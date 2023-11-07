import { RegisterForm } from "./RegisterForm";

export default function Register(){
    return (
        <>
        <div className="flex flex-row h-[100vh]">
            <div className="md:flex w-1/2 hidden bg-primary"></div>
            <div className="flex flex-col justify-center items-center align-middle md:w-1/2 w-full">
                <h1 className="text-[2rem]">Zarejestruj się na konto!</h1>
                <p>Wpisz swoje dane</p>
                <RegisterForm/>
            </div>
        </div>
        </>
    )
}