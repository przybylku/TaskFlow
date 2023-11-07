import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import Link from "next/link";
  import { Link2 } from "lucide-react";
  import { Suspense } from "react";
  import Login from '@/components/login/login'
import Loading from "../register/loading";
  export default function RegisterPage() {
    return (
      <>
      <Suspense fallback={<Loading/>}>
        <div className="flex flex-row h-[100vh]">
          <div className="md:flex w-1/2 hidden bg-primary "><h1 className="px-5 py-3 font-normal text-[1rem] text-white">TaskFlow</h1></div>
          <div className="flex flex-col justify-center items-center align-middle  md:w-1/2 w-full">
            <h1 className="text-[2rem]">Zaloguj się na konto</h1>
            <p className="md:mb-8">Wpisz swoje dane do logowania poniżej</p>
              <Login/>
            <p className="mt-4 text-[0.9rem] flex flex-row">Nie masz konta? <Link className="text-primary flex flex-row" href="/auth/register"><Link2 className="ml-2 mr-1" size={20} /> Zarejestruj się</Link></p>
          </div>
        </div>
        </Suspense>
      </>
    );
  }
  