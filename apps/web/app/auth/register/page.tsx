import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Register from "./Register";
export default function RegisterPage() {
  return (
    <>
      <div className="flex flex-row ">
        <div className="md:flex w-1/2 hidden md:w-full">a</div>
        <div className="flex flex-col justify-center items-center align-middle  md:w-1/2 w-full">
          <h1>Create your account</h1>
          <p>Wpisz swój email poniżej. My wyślemy maila</p>
          <Register />
        </div>
      </div>
    </>
  );
}
