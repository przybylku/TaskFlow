import { Button } from "@mui/joy";
import { ArrowRightIcon } from "lucide-react";
import { Link } from "react-router-dom";
import {TypeAnimation} from "react-type-animation";
const H1Typing = () => {
  return (
    <TypeAnimation
      sequence={[
        "Zacznij planować swoje zadania.",
        1000,
        "Zarządzaj swoimi projektami.",
        1000,
        "Zadania nigdy nie były tak proste.",
        1000,
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: '1rem', display: 'inline-block' }}
      repeat={Infinity}
    />
  );
};

export default function HomePage() {
  return (
    <>
      <div className="flex flex-row px-6 py-4 justify-between items-end">
        <h1><span className="text-[1.4rem] font-bold text-blue-600">TaskFlow</span>, <H1Typing/></h1>
        <Link to={"/auth/login"} > <Button variant="solid"> Zaloguj się</Button></Link>
      </div>
      <div className="flex flex-col px-2 md:px-40 justify-center content-center items-center mt-6 mb-14">
        <div>Co to TaskFlow?</div>
        {/* Link do heartbeatu maan */}
        <h1 className="text-center text-[2rem] font-semibold mb-4">
          Twoje Miejsce na Skuteczne Zarządzanie Zadaniami
        </h1>
        <p className=" text-center w-[50%]">
          Czy czujesz, że codzienne obowiązki i projekty przytłaczają Cię? Nasza
          platforma do zarządzania zadaniami,
          <span className="text-primary font-bold text-blue-600"> TaskFlow</span>, jest tutaj,
          aby Ci pomóc. Zrozumujemy, że w dzisiejszym dynamicznym świecie
          zarządzanie obowiązkami może stać się trudne i czasochłonne. Dlatego
          stworzyliśmy to narzędzie, aby uprościć Twój proces pracy i umożliwić
          Ci osiąganie celów z łatwością.
        </p>
        <Link className="mt-4" to={"/register"}>
          <Button className="mt-4" variant="solid">
            Sprawdź <ArrowRightIcon size={20} className="ml-1 pt-[2px]" />
          </Button>
          {/* <ArrowRight size={18} className="ml-1" /> */}
        </Link>
        <div className="border-spacing-6 p-2 ring-1 bg-primary/10 ring-primary/50 mt-10 border rounded-md">
          <img
            src={"/asana.png"}
            alt="How it looks"
            width={1174}
            height={904}
            className="rounded-md ring-1 ring-primary/10"
          />
        </div>
        <div className="self-start md:self-center">
          <h2 className="mt-10 text-[1.5rem] font-medium md:text-center">
            Zacznij korzystać w pare minut!
          </h2>
          <p className="text-black md:text-center">
            Zarządzanie czasem i organizacja zadań jest łatwiejsza z{" "}
            <span className="text-primary">TaskFlow</span>
          </p>
          <ol className="flex flex-col md:flex-row mt-5">
            <li className="space-y-4">
              <span className="text-primary">Krok 1</span>
              <p>
                Zabawę w organizację zacznij od{" "}
                <Link to={"/register"} className="text-primary">
                  Zarejestrowania się{" "}
                </Link>{" "}
                i stworzenia swojej tablicy
              </p>
            </li>
            <li className="space-y-4 mmd:py-5">
              <span className="text-primary">Krok 1</span>
              <p>
                Zabawę w organizację zacznij od{" "}
                <Link to={"/register"} className="text-primary">
                  Zarejestrowania się{" "}
                </Link>{" "}
                i stworzenia swojej tablicy
              </p>
            </li>
            <li className="space-y-4">
              <span className="text-primary">Krok 1</span>
              <p>
                Zabawę w organizację zacznij od{" "}
                <Link to={"/register"} className="text-primary">
                  Zarejestrowania się{" "}
                </Link>{" "}
                i stworzenia swojej tablicy
              </p>
            </li>
          </ol>
        </div>
      </div>
    </>
  );
}
