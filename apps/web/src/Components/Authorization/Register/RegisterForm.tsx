import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Input, Link } from "@mui/joy";
import ApiClient from "../../../lib/ApiInstance";
import { useAppDispatch, useAppSelector } from "../../../store";
import { selectUser, setUser } from "../../../store/features/userSlice";
import { useNavigate } from "react-router-dom";
import { Link as LucideLink } from "lucide-react";
type Inputs = {
  email: string;
  password: string;
  username: string;
};

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<Inputs>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const userDispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const router = useNavigate();
  const onSubmit = (data: Inputs) => {
    setLoading(true);
    setTimeout(() => {
      console.log("fetching");
      ApiClient.getInstance()
        .post({ url: "/user/register", data })
        .then((res) => {
          console.log(res?.data.accessToken);
          if (res?.data.accessToken) {
            userDispatch(
              setUser({
                ...res.data.user,
                accessToken: res.data.accessToken,
                expiresIn: res.data.expiresIn,
              })
            );
            setLoading(false);
          }
          // if(res.data.status === "success"){
          //     setError(false);
          //     setLoading(false);
          // }
        })
        .then(() => {
          router("/dashboard");
        })
        .catch((err) => {
          console.log(err);
          setError(err?.message || "Wystąpił błąd");
          setLoading(false);
        });
    }, 2000);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className="flex flex-col"
      >
        <label htmlFor="username" className="mt-2">
          Nazwa
        </label>
        <Input {...register("username", { required: true })} />
        {errors.email && (
          <span className="text-red-500">Nazwa jest wymagana!</span>
        )}
        <label htmlFor="email" className="mt-2">
          Email
        </label>
        <Input {...register("email", { required: true })} />
        {errors.email && (
          <span className="text-red-500">Email jest wymagany!</span>
        )}
        <label htmlFor="password" className="mt-2">
          Hasło
        </label>
        <Input {...register("password", { required: true })} type="password" />
        {errors.password && (
          <span className="text-red-500">Hasło jest wymagane!</span>
        )}
        {error && <span className="text-red-500">{error}</span>}
        <Button
          loading={loading}
          type="submit"
          color="primary"
          style={{ marginTop: "10px" }}
          className={
            " mt-5 hover:bg-primary focus:ring-2 shadow-lg transform active:scale-95 transition-transform"
          }
        >
          {loading ? "Szukanie konta.." : "Zaloguj się"}
        </Button>
        <p>
          Masz konto?
          <Link underline="hover" href={"/auth/login"}>
            {" "}
            <LucideLink size={15} className="mr-1" /> Zaloguj się
          </Link>
        </p>
      </form>
    </>
  );
}
