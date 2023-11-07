"use client";

import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/store";
import { selectUser, setUser } from "@/store/features/userSlice";
type Inputs = {
  email: string;
  password: string;
  username: string;
};

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<Inputs>();
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const userDispatch = useAppDispatch()
    const onSubmit: SubmitHandler<Inputs> = (data) => {
    setLoading(true)
    setTimeout(() => {
      axios.post("http://localhost:3005/user/register", data, {headers: {'Access-Control-Allow-Origin': "*"}} ).then((res) => {
        console.log(res)
        userDispatch(setUser({...res.data.user, tokenAccess: res.data.tokenAccess, expireIn: res.data.expireIn}))
        setLoading(false)
      }).catch((err) => {
        setError(err.response?.data.message)
        setLoading(false)
      })
    }, 1000)
  }
  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="username">Nazwa użytkownika</label>
      <Input {...register("username", { required: true })} />
      {errors.username && <span className="text-red-500">Nazwa użytkownika jest wymagana!</span>}
      <label htmlFor="email" className="mt-2">Email</label>
      <Input  {...register("email", {required: true})} />
      {errors.email && <span className="text-red-500">Email jest wymagany!</span>}
      <label htmlFor="password" className="mt-2">Hasło</label>
      <Input {...register("password", { required: true })} type="password" />
      {errors.password && <span className="text-red-500">Hasło jest wymagane!</span>}
      {error && <span className="text-red-500">{error}</span>}
      <input type="submit" className={buttonVariants({variant:"default", }) + " mt-3 hover:bg-primary focus:ring-2 shadow-lg transform active:scale-90 transition-transform"} value={`${loading ? "Tworzenie konta." : "Zarejestruj się"}`}/>

    </form>
  );
}
